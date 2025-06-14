
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameProgress, initialGameProgress, levels } from '@/utils/gameData';
import { updateLeaderboardEntry } from '@/lib/supabase';

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
      
      // Record completion date
      const completionDates = {
        ...prev.completionDates,
        [levelId]: new Date().toISOString()
      };
      
      // Unlock next level
      const nextLevel = Math.min(levelId + 1, levels.length);
      const currentLevel = Math.max(prev.currentLevel, nextLevel);
      
      const newProgress = {
        ...prev,
        completedLevels,
        completionDates,
        currentLevel,
      };

      // Calculate total time spent (simple estimation based on completion dates)
      const totalTimeMs = calculateTotalTime(completionDates);
      
      // Update leaderboard asynchronously
      updateLeaderboardEntry(completedLevels.length, totalTimeMs)
        .catch(error => console.error('Failed to update leaderboard:', error));
      
      return newProgress;
    });
  };

  // Simple function to calculate total time based on completion dates
  const calculateTotalTime = (completionDates: Record<number, string>): number => {
    const dates = Object.values(completionDates).map(date => new Date(date).getTime());
    if (dates.length < 2) return 300000; // Default 5 minutes for first level
    
    const earliest = Math.min(...dates);
    const latest = Math.max(...dates);
    return latest - earliest + 300000; // Add base time for each level
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
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      setProgress(initialGameProgress);
    }
  };

  const value = {
    progress,
    completeLevel,
    useHint,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
