
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
  brief: "Agent, we've intercepted an encrypted message from the ENIGMA syndicate. Intelligence suggests they're using a simple Caesar shift cipher. Your task is to decrypt the message and extract the location of their upcoming weapons exchange.",
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
  brief: "The ENIGMA syndicate is evolving their encryption techniques. This time, we've intercepted a message encrypted with a Vigenère cipher. One of our double agents has revealed the key is related to their organization name: 'SHADOW'. Decrypt this message to uncover their next meeting point.",
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
  brief: "Agent, we're getting closer to ENIGMA's inner circle. Their elite communications team has started using digital encoding techniques. This message was first encoded in Base64, then parts were converted to hexadecimal. Decode it to learn about their hidden asset.",
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

// Level 4: AES Decryption
const level4: MissionData = {
  id: 4,
  title: "Operation Cipher Lock",
  brief: "Critical mission! We've infiltrated ENIGMA's data server and extracted an encrypted file. Our tech team believes it's encrypted using AES. An informant has provided the password hint: 'The name of the operation where ENIGMA was first discovered + the year'. Decrypt the data to reveal their next target.",
  cryptoType: "AES Decryption",
  difficulty: "medium",
  puzzleData: {
    challenge: "U2VjdXJlZCBkYXRhOiBFbmNyeXB0ZWQgd2l0aCBBRVMuIFVzZSBwYXNzd29yZCBoaW50LiBUYXJnZXQgaXM6IENJVFlfSEFMTA==",
    hint: [
      "The operation was 'BLACKBIRD' and the year was '2018'",
      "Combine them without spaces: BLACKBIRD2018",
      "For this simulation, the AES-encrypted data is represented in Base64. Decoding it with the correct password reveals: 'CITY_HALL'",
    ],
    solution: "CITY_HALL",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "CITY_HALL";
    }
  }
};

// Level 5: Hash Cracking
const level5: MissionData = {
  id: 5,
  title: "Operation Hash Hunter",
  brief: "We've intercepted ENIGMA's password hash for their secure facility. Their security systems use SHA-256 hashing, but intelligence suggests they're using a simple password. Crack the hash to gain access to their main facility and continue your infiltration.",
  cryptoType: "Hash Cracking (SHA-256)",
  difficulty: "hard",
  puzzleData: {
    challenge: "Hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    hint: [
      "This is a SHA-256 hash of a common password.",
      "Try common passwords like 'admin', 'password', '123456', etc.",
      "The password is 'admin'",
    ],
    solution: "admin",
    solutionCheck: (input: string) => {
      const normalized = input.toLowerCase().trim();
      return normalized === "admin";
    }
  }
};

// Level 6: Steganography
const level6: MissionData = {
  id: 6,
  title: "Operation Hidden Message",
  brief: "ENIGMA has hidden their next operation details within an image file shared on their public website. Our analysts believe they're using steganography to hide text in the image. Examine the image and extract the hidden message to uncover their plans.",
  cryptoType: "Steganography",
  difficulty: "hard",
  puzzleData: {
    challenge: "The message is hidden in the least significant bits of the image. Extract it to reveal their plans.",
    hint: [
      "In steganography, data can be hidden in the least significant bits (LSB) of image pixels.",
      "For this simulation, the message is: 'ATTACK AT DAWN, OPERATION THUNDERSTRIKE IS GO'",
      "In a real steganography challenge, you would use tools to extract this data.",
    ],
    solution: "ATTACK AT DAWN, OPERATION THUNDERSTRIKE IS GO",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized.includes("ATTACK AT DAWN") && normalized.includes("THUNDERSTRIKE");
    }
  }
};

// Game levels data
export const levels: MissionData[] = [level1, level2, level3, level4, level5, level6];

// Player's game progress
export interface GameProgress {
  completedLevels: number[];
  currentLevel: number;
  hintsUsed: Record<number, number>; // Level ID -> number of hints used
  completionDates?: Record<number, string>; // Level ID -> completion date
}

// Initial game progress
export const initialGameProgress: GameProgress = {
  completedLevels: [],
  currentLevel: 1,
  hintsUsed: {},
  completionDates: {}
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
