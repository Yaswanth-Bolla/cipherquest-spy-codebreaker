import { LevelInfo } from '@/components/game/LevelCard';

export interface MissionData {
  id: number;
  title: string;
  brief: string;
  cryptoType: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiresLocation?: {
    latitude: number;
    longitude: number;
    radiusMeters: number;
    locationName: string;
  };
  requiresQrCode?: boolean;
  puzzleData: {
    challenge: string;
    hint: string[];
    solution: string;
    solutionCheck: (input: string) => boolean;
    qrCodeValue?: string;
  };
}

// Easy Levels (1-6)
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

const level2: MissionData = {
  id: 2,
  title: "Operation Mirror Text",
  brief: "ENIGMA operatives are using simple text reversal to hide their communications. We've intercepted this message from their secure channel.",
  cryptoType: "Text Reversal",
  difficulty: "easy",
  puzzleData: {
    challenge: "EGAKCAP EHT PORD DNA NOISREV EHT ETELED",
    hint: [
      "This message has been written backwards.",
      "Try reading it from right to left.",
      "Each word is reversed individually.",
    ],
    solution: "DELETE THE VERSION AND DROP THE PACKAGE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "DELETE THE VERSION AND DROP THE PACKAGE";
    }
  }
};

const level3: MissionData = {
  id: 3,
  title: "Operation Number Code",
  brief: "Intelligence reports that ENIGMA is using A1Z26 cipher - where A=1, B=2, C=3, and so on. Decode this numeric sequence to reveal their next target.",
  cryptoType: "A1Z26 Cipher",
  difficulty: "easy",
  puzzleData: {
    challenge: "2-1-14-11 22-1-21-12-20 1-20 13-9-4-14-9-7-8-20",
    hint: [
      "Each number represents a letter's position in the alphabet.",
      "A=1, B=2, C=3... Z=26",
      "Dashes separate numbers, spaces separate words.",
    ],
    solution: "BANK VAULT AT MIDNIGHT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "BANK VAULT AT MIDNIGHT";
    }
  }
};

const level4: MissionData = {
  id: 4,
  title: "Operation Binary Message",
  brief: "Our cyber team intercepted a binary transmission from ENIGMA's digital operations. Convert this binary code to reveal their digital password.",
  cryptoType: "Binary Code",
  difficulty: "easy",
  puzzleData: {
    challenge: "01000001 01000111 01000101 01001110 01010100 00110000 00110111",
    hint: [
      "Binary uses only 0s and 1s to represent data.",
      "Each group of 8 bits represents one character.",
      "Use binary to ASCII conversion.",
    ],
    solution: "AGENT07",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "AGENT07";
    }
  }
};

const level5: MissionData = {
  id: 5,
  title: "Operation Morse Alert",
  brief: "An emergency transmission in Morse code was intercepted from ENIGMA's radio frequency. Decode this urgent message.",
  cryptoType: "Morse Code",
  difficulty: "easy",
  puzzleData: {
    challenge: "... --- ... / .- -... --- .-. -",
    hint: [
      "Morse code uses dots (.) and dashes (-) to represent letters.",
      "Spaces separate letters, slashes (/) separate words.",
      "S = ..., O = ---, A = .-, B = -..., R = .-.-, T = -",
    ],
    solution: "SOS ABORT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "SOS ABORT";
    }
  }
};

const level6: MissionData = {
  id: 6,
  title: "Operation Base64 Basic",
  brief: "ENIGMA's digital team is encoding messages in Base64. This is a common encoding used to transmit data safely across networks.",
  cryptoType: "Base64",
  difficulty: "easy",
  puzzleData: {
    challenge: "VE9QIFNFQ1JFVA==",
    hint: [
      "Base64 encoding uses A-Z, a-z, 0-9, +, and / characters.",
      "The message ends with '==' which is Base64 padding.",
      "Use any Base64 decoder to reveal the message.",
    ],
    solution: "TOP SECRET",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "TOP SECRET";
    }
  }
};

// Medium Levels (7-11)
const level7: MissionData = {
  id: 7,
  title: "Operation Poly Alpha",
  brief: "The ENIGMA syndicate is evolving their encryption techniques. This time, we've intercepted a message encrypted with a Vigenère cipher. One of our double agents has revealed the key is related to their organization name: 'SHADOW'. Decrypt this message to uncover their next meeting point.",
  cryptoType: "Vigenère Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "JLNGSVNVUV OP LOE RZZ USOFYPGDEU OP EPDQWCZA",
    hint: [
      "In Vigenère cipher, you need a keyword that repeats to encrypt the message.",
      "Each letter in the keyword shifts the corresponding letter in the plaintext by a different amount.",
      "Try using 'SHADOW' as the key.",
    ],
    solution: "RENDEZVOUS AT THE OLD CLOCKTOWER AT MIDNIGHT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "RENDEZVOUS AT THE OLD CLOCKTOWER AT MIDNIGHT";
    }
  }
};

const level8: MissionData = {
  id: 8,
  title: "Operation Rail Fence",
  brief: "ENIGMA is using a Rail Fence cipher - writing the message in a zigzag pattern across multiple lines, then reading it off line by line.",
  cryptoType: "Rail Fence Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "TGTOETEMAHMSSEREEI",
    hint: [
      "Rail Fence cipher writes text in a zigzag pattern.",
      "Try arranging the letters on 3 rails (lines).",
      "Read the letters row by row after zigzag arrangement.",
    ],
    solution: "THE GAME IS OVER MEET",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "THE GAME IS OVER MEET";
    }
  }
};

const level9: MissionData = {
  id: 9,
  title: "Operation Hex Decoder",
  brief: "ENIGMA's tech division is using hexadecimal encoding. This intercepted data contains coordinates to their next meeting.",
  cryptoType: "Hexadecimal",
  difficulty: "medium",
  puzzleData: {
    challenge: "50494552 204e494e45",
    hint: [
      "Hexadecimal uses base-16 numbering (0-9, A-F).",
      "Convert hex to ASCII text.",
      "Each pair of hex digits represents one character.",
    ],
    solution: "PIER NINE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "PIER NINE";
    }
  }
};

const level10: MissionData = {
  id: 10,
  title: "Operation Atbash Mirror",
  brief: "Ancient but effective - ENIGMA is using the Atbash cipher where A=Z, B=Y, C=X, and so on. Crack this mirrored alphabet code.",
  cryptoType: "Atbash Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "XLMTVI ULLW ZG MVDILMG",
    hint: [
      "In Atbash cipher, the alphabet is reversed: A=Z, B=Y, C=X, etc.",
      "Each letter is replaced with its mirror position.",
      "Apply the same transformation to decode.",
    ],
    solution: "WINTER FOOD AT NEWFRONT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "WINTER FOOD AT NEWFRONT";
    }
  }
};

const level11: MissionData = {
  id: 11,
  title: "Operation ROT13",
  brief: "ENIGMA's communications team is using ROT13 - a simple letter substitution cipher that replaces each letter with the letter 13 positions after it.",
  cryptoType: "ROT13",
  difficulty: "medium",
  puzzleData: {
    challenge: "FRPERG ZRRGVAT NG QNJA",
    hint: [
      "ROT13 shifts each letter by 13 positions.",
      "A becomes N, B becomes O, etc.",
      "Apply ROT13 again to decode (it's symmetric).",
    ],
    solution: "SECRET MEETING AT DAWN",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "SECRET MEETING AT DAWN";
    }
  }
};

// Hard Levels (12-15)
const level12: MissionData = {
  id: 12,
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

const level13: MissionData = {
  id: 13,
  title: "Operation RSA Weakness",
  brief: "ENIGMA is using RSA encryption with small prime numbers. We've intercepted their public key components. Use mathematical weakness to break their encryption.",
  cryptoType: "RSA Cryptanalysis",
  difficulty: "hard",
  puzzleData: {
    challenge: "n=143, e=7, encrypted message=129. Find p, q, and decrypt.",
    hint: [
      "Factor n=143 into two prime numbers p and q.",
      "143 = 11 × 13, so p=11, q=13.",
      "Calculate φ(n) = (p-1)(q-1) = 10×12 = 120.",
      "Find d such that e×d ≡ 1 (mod φ(n)). d=103.",
      "Decrypt: 129^103 mod 143 = 6, which represents 'G'."
    ],
    solution: "G",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "G";
    }
  }
};

const level14: MissionData = {
  id: 14,
  title: "Operation Enigma Machine",
  brief: "We've captured an actual ENIGMA machine! The rotors are set to positions A-A-A, and the plugboard swaps A↔B, C↔D. Decrypt their high-priority message.",
  cryptoType: "Enigma Machine",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: VICTORY IS OURS",
    hint: [
      "The Enigma machine uses rotors, reflectors, and a plugboard.",
      "Rotors advance with each letter, changing the encryption.",
      "The same settings decrypt as encrypt due to reciprocal wiring.",
    ],
    solution: "VICTORY IS OURS",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "VICTORY IS OURS";
    }
  }
};

const level15: MissionData = {
  id: 15,
  title: "Operation Final Countdown",
  brief: "This is it, Agent. ENIGMA has hidden their final message within an image file shared on their public website. Our analysts believe they're using steganography to hide text in the image. Extract the hidden message to complete your mission and save the world!",
  cryptoType: "Image Steganography",
  difficulty: "hard",
  puzzleData: {
    challenge: "The message is hidden in the least significant bits of the image. Extract it to reveal their plans.",
    hint: [
      "In steganography, data can be hidden in the least significant bits (LSB) of image pixels.",
      "For this simulation, the message is: 'MISSION COMPLETE AGENT CONGRATULATIONS'",
      "In a real steganography challenge, you would use tools to extract this data.",
    ],
    solution: "MISSION COMPLETE AGENT CONGRATULATIONS",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized.includes("MISSION COMPLETE") && normalized.includes("CONGRATULATIONS");
    }
  }
};

// Game levels data
export const levels: MissionData[] = [
  level1, level2, level3, level4, level5, level6, level7, level8, level9, level10,
  level11, level12, level13, level14, level15
];

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
