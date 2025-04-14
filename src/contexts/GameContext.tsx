
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameProgress, initialGameProgress, levels } from '@/utils/gameData';

interface GameContextType {
  progress: GameProgress;
  completeLevel: (levelId: number) => void;
  useHint: (levelId: number) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<GameProgress>(() => {
    // Load saved progress from localStorage on initial mount
    const savedProgress = localStorage.getItem('cipherQuestProgress');
    return savedProgress ? JSON.parse(savedProgress) : initialGameProgress;
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cipherQuestProgress', JSON.stringify(progress));
  }, [progress]);

  const completeLevel = (levelId: number) => {
    setProgress(prev => {
      // Add to completed levels if not already there
      const completedLevels = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];
      
      // Unlock next level
      const nextLevel = Math.min(levelId + 1, levels.length);
      const currentLevel = Math.max(prev.currentLevel, nextLevel);
      
      return {
        ...prev,
        completedLevels,
        currentLevel,
      };
    });
  };

  const useHint = (levelId: number) => {
    setProgress(prev => {
      const hintsUsed = { ...prev.hintsUsed };
      hintsUsed[levelId] = (hintsUsed[levelId] || 0) + 1;
      
      return {
        ...prev,
        hintsUsed,
      };
    });
  };

  const resetProgress = () => {
    setProgress(initialGameProgress);
  };

  const value = {
    progress,
    completeLevel,
    useHint,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
