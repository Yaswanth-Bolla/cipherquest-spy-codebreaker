
import { LevelInfo } from '@/components/game/LevelCard';

export interface MissionData {
  id: number;
  title: string;
  brief: string;
  cryptoType: string;
  difficulty: 'easy' | 'medium' | 'hard';
  puzzleData: {
    challenge: string;
    hint: string[];
    solution: string;
    solutionCheck: (input: string) => boolean;
  };
}

// Level 1: Caesar Cipher
const level1: MissionData = {
  id: 1,
  title: "Operation First Key",
  brief: "Agent, we've intercepted an encrypted message from the enemy. Intelligence suggests they're using a simple Caesar shift cipher. Your task is to decrypt the message and extract the location of their meeting point.",
  cryptoType: "Caesar Cipher",
  difficulty: "easy",
  puzzleData: {
    challenge: "PHHW DW WKH DEDQGRQHG ZDUHKRXVH DW PLGQLJKW. EULQJ WKH SDFNDJH.",
    hint: [
      "Caesar cipher shifts each letter by a fixed number of positions in the alphabet.",
      "The most common shift value is 3, but try others if that doesn't work.",
      "In this case, it's shifted by 3 positions.",
    ],
    solution: "MEET AT THE ABANDONED WAREHOUSE AT MIDNIGHT. BRING THE PACKAGE.",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "MEET AT THE ABANDONED WAREHOUSE AT MIDNIGHT. BRING THE PACKAGE.";
    }
  }
};

// Level 2: Vigenère Cipher
const level2: MissionData = {
  id: 2,
  title: "Operation Poly Alpha",
  brief: "Great work on the last mission! Now we have intercepted another message, but this time they've upgraded their encryption. Our analysts believe they're using a Vigenère cipher. The key is likely related to their organization name: 'SHADOW'.",
  cryptoType: "Vigenère Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "LPAVRW MW HBX FHTK UIPXS VN GUM. HTVVLK XH MZY GVOHM VNCX.",
    hint: [
      "In Vigenère cipher, you need a keyword that repeats to encrypt the message.",
      "Each letter in the keyword shifts the corresponding letter in the plaintext by a different amount.",
      "Try using 'SHADOW' as the key.",
    ],
    solution: "REPORT TO THE BACK ALLEY AT 9PM. ARRIVE AT THE NORTH GATE.",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "REPORT TO THE BACK ALLEY AT 9PM. ARRIVE AT THE NORTH GATE.";
    }
  }
};

// Level 3: Base64 + Hex
const level3: MissionData = {
  id: 3,
  title: "Operation Digital Maze",
  brief: "Agent, this next challenge is more complex. The enemy has started using digital encoding techniques to hide their messages. First, they encoded the message in Base64, then converted parts to hexadecimal. You'll need to reverse both processes.",
  cryptoType: "Base64 + Hex",
  difficulty: "medium",
  puzzleData: {
    challenge: "Q29kZSB3b3JkOiA0ODY1NzgyMDY5NzMyMDc0Njg2NTIwNmQ2MTcwNzM=",
    hint: [
      "This is a two-step process. First, decode from Base64.",
      "After Base64 decoding, you'll find parts that are in hexadecimal format.",
      "Convert those hex values to ASCII to reveal the message.",
    ],
    solution: "Code word: HEIST HAS THE MAPS",
    solutionCheck: (input: string) => {
      const normalized = input.toLowerCase().trim();
      return normalized.includes("heist has the maps");
    }
  }
};

// Game levels data
export const levels: MissionData[] = [level1, level2, level3];

// Player's game progress
export interface GameProgress {
  completedLevels: number[];
  currentLevel: number;
  hintsUsed: Record<number, number>; // Level ID -> number of hints used
}

// Initial game progress
export const initialGameProgress: GameProgress = {
  completedLevels: [],
  currentLevel: 1,
  hintsUsed: {},
};

// Get level info for level selection
export const getLevelInfoList = (progress: GameProgress): LevelInfo[] => {
  return levels.map(level => ({
    id: level.id,
    name: level.title,
    difficulty: level.difficulty,
    cryptoType: level.cryptoType,
    isCompleted: progress.completedLevels.includes(level.id),
    isLocked: level.id > progress.currentLevel && !progress.completedLevels.includes(level.id),
  }));
};
