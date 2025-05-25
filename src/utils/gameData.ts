
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

// Easy Levels (1-15)
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
    solution: "BANK VAULTS AT MIDNIGHT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "BANK VAULTS AT MIDNIGHT";
    }
  }
};

const level4: MissionData = {
  id: 4,
  title: "Operation Substitution",
  brief: "ENIGMA has upgraded to a substitution cipher. Each letter is replaced with another letter consistently. Use frequency analysis to crack their code.",
  cryptoType: "Substitution Cipher",
  difficulty: "easy",
  puzzleData: {
    challenge: "WKH VHFUHW FRGH LV EOXH PRQGDB",
    hint: [
      "This is a simple substitution where each letter is shifted by the same amount.",
      "Try different shift values.",
      "The shift is 3 positions forward.",
    ],
    solution: "THE SECRET CODE IS BLUE MONDAY",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "THE SECRET CODE IS BLUE MONDAY";
    }
  }
};

const level5: MissionData = {
  id: 5,
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

const level6: MissionData = {
  id: 6,
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

const level7: MissionData = {
  id: 7,
  title: "Operation Hex Decoder",
  brief: "ENIGMA's tech division is using hexadecimal encoding. This intercepted data contains coordinates to their next meeting.",
  cryptoType: "Hexadecimal",
  difficulty: "easy",
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

const level8: MissionData = {
  id: 8,
  title: "Operation Atbash Mirror",
  brief: "Ancient but effective - ENIGMA is using the Atbash cipher where A=Z, B=Y, C=X, and so on. Crack this mirrored alphabet code.",
  cryptoType: "Atbash Cipher",
  difficulty: "easy",
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

const level9: MissionData = {
  id: 9,
  title: "Operation ROT13",
  brief: "ENIGMA's communications team is using ROT13 - a simple letter substitution cipher that replaces each letter with the letter 13 positions after it.",
  cryptoType: "ROT13",
  difficulty: "easy",
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

const level10: MissionData = {
  id: 10,
  title: "Operation Keyboard Shift",
  brief: "Clever ENIGMA operatives are using a keyboard shift cipher. Each letter is replaced by the key to its right on a QWERTY keyboard.",
  cryptoType: "Keyboard Shift",
  difficulty: "easy",
  puzzleData: {
    challenge: "VPTD VPKD VPD DPDTU",
    hint: [
      "Each letter is shifted one position to the right on QWERTY keyboard.",
      "Q becomes W, W becomes E, etc.",
      "Shift each letter one position to the left to decode.",
    ],
    solution: "CODE NAME THE ENEMY",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "CODE NAME THE ENEMY";
    }
  }
};

const level11: MissionData = {
  id: 11,
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

const level12: MissionData = {
  id: 12,
  title: "Operation Pigpen",
  brief: "ENIGMA is using the ancient Pigpen cipher, also known as the Freemason cipher. Symbols replace letters based on their position in a grid.",
  cryptoType: "Pigpen Cipher",
  difficulty: "easy",
  puzzleData: {
    challenge: "For this simulation: AGENT RED",
    hint: [
      "Pigpen cipher uses geometric symbols to represent letters.",
      "Letters are arranged in grids and X patterns.",
      "For this simulation, the decoded message is 'AGENT RED'.",
    ],
    solution: "AGENT RED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "AGENT RED";
    }
  }
};

const level13: MissionData = {
  id: 13,
  title: "Operation Phone Pad",
  brief: "ENIGMA operatives are using old phone keypad encoding where each number corresponds to letters (2=ABC, 3=DEF, etc.).",
  cryptoType: "Phone Keypad",
  difficulty: "easy",
  puzzleData: {
    challenge: "3453 28 6439",
    hint: [
      "Phone keypads have letters: 2=ABC, 3=DEF, 4=GHI, 5=JKL, 6=MNO, 7=PQRS, 8=TUV, 9=WXYZ",
      "Each digit represents a letter from that group.",
      "Position in sequence determines which letter.",
    ],
    solution: "FLEE AT PIER",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "FLEE AT PIER";
    }
  }
};

const level14: MissionData = {
  id: 14,
  title: "Operation URL Encoding",
  brief: "ENIGMA's web team is hiding messages in URL encoding. Decode this percent-encoded message.",
  cryptoType: "URL Encoding",
  difficulty: "easy",
  puzzleData: {
    challenge: "ESCAPE%20NOW%20DANGER%20CLOSE",
    hint: [
      "URL encoding replaces special characters with % followed by hex values.",
      "%20 represents a space character.",
      "Replace %20 with spaces to decode.",
    ],
    solution: "ESCAPE NOW DANGER CLOSE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "ESCAPE NOW DANGER CLOSE";
    }
  }
};

const level15: MissionData = {
  id: 15,
  title: "Operation ASCII Values",
  brief: "ENIGMA is transmitting using raw ASCII values. Convert these decimal numbers to their corresponding characters.",
  cryptoType: "ASCII Decimal",
  difficulty: "easy",
  puzzleData: {
    challenge: "70 73 78 65 76 32 80 72 65 83 69",
    hint: [
      "Each number represents the ASCII value of a character.",
      "Convert decimal ASCII values to letters.",
      "Use an ASCII table or converter.",
    ],
    solution: "FINAL PHASE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "FINAL PHASE";
    }
  }
};

// Medium Levels (16-35)
const level16: MissionData = {
  id: 16,
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

const level17: MissionData = {
  id: 17,
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

const level18: MissionData = {
  id: 18,
  title: "Operation Playfair Square",
  brief: "Advanced ENIGMA operatives are using the Playfair cipher with the keyword 'MONARCHY'. This cipher uses a 5x5 grid and encrypts pairs of letters.",
  cryptoType: "Playfair Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: TARGET ACQUIRED",
    hint: [
      "Playfair cipher uses a 5x5 grid filled with the keyword.",
      "Letters are encrypted in pairs using specific rules.",
      "For this simulation, the answer is 'TARGET ACQUIRED'.",
    ],
    solution: "TARGET ACQUIRED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "TARGET ACQUIRED";
    }
  }
};

const level19: MissionData = {
  id: 19,
  title: "Operation Book Cipher",
  brief: "ENIGMA is using a book cipher. Each number triplet represents page-line-word from a common text. The reference is the first chapter of 'The Art of War'.",
  cryptoType: "Book Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: RENDEZVOUS POINT CHARLIE",
    hint: [
      "Book ciphers reference specific words in a known text.",
      "Numbers typically refer to page, line, and word positions.",
      "For this simulation, the decoded message is provided.",
    ],
    solution: "RENDEZVOUS POINT CHARLIE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "RENDEZVOUS POINT CHARLIE";
    }
  }
};

const level20: MissionData = {
  id: 20,
  title: "Operation Polybius Square",
  brief: "ENIGMA is using the ancient Polybius Square cipher. Each letter is represented by its row and column coordinates in a 5x5 grid.",
  cryptoType: "Polybius Square",
  difficulty: "medium",
  puzzleData: {
    challenge: "43 11 13 51 24 13 24 41 43",
    hint: [
      "Polybius Square arranges letters in a 5x5 grid.",
      "Each letter is represented by its row and column numbers.",
      "First digit is row, second digit is column.",
    ],
    solution: "SACRIFICE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "SACRIFICE";
    }
  }
};

const level21: MissionData = {
  id: 21,
  title: "Operation Beaufort Cipher",
  brief: "ENIGMA has adopted the Beaufort cipher, a variant of Vigenère. The key is 'ENIGMA' and it uses reciprocal decryption.",
  cryptoType: "Beaufort Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: OPERATION BLACKOUT",
    hint: [
      "Beaufort cipher is similar to Vigenère but uses different math.",
      "It uses subtraction instead of addition.",
      "The key 'ENIGMA' repeats to decrypt the message.",
    ],
    solution: "OPERATION BLACKOUT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "OPERATION BLACKOUT";
    }
  }
};

const level22: MissionData = {
  id: 22,
  title: "Operation Four Square",
  brief: "ENIGMA's cryptographers are using the Four Square cipher with keywords 'EXAMPLE' and 'KEYWORD'. This uses four 5x5 squares to encrypt pairs of letters.",
  cryptoType: "Four Square Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: ABORT MISSION NOW",
    hint: [
      "Four Square cipher uses four 5x5 letter squares.",
      "Two squares contain keywords, two contain the standard alphabet.",
      "Letters are encrypted in pairs using the square positions.",
    ],
    solution: "ABORT MISSION NOW",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "ABORT MISSION NOW";
    }
  }
};

const level23: MissionData = {
  id: 23,
  title: "Operation Gronsfeld Cipher",
  brief: "ENIGMA is using a Gronsfeld cipher, similar to Vigenère but using a numeric key: 3141592 (digits of π).",
  cryptoType: "Gronsfeld Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "FRFUHW DJHQW LQILOWUDWHG",
    hint: [
      "Gronsfeld cipher is like Vigenère but uses numbers instead of letters.",
      "Each digit in the key shifts the corresponding letter.",
      "The key is 3141592 (repeating).",
    ],
    solution: "SECRET AGENT INFILTRATED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "SECRET AGENT INFILTRATED";
    }
  }
};

const level24: MissionData = {
  id: 24,
  title: "Operation Trifid Cipher",
  brief: "ENIGMA has escalated to the Trifid cipher, which uses three-dimensional coordinates to encrypt letters in groups of three.",
  cryptoType: "Trifid Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: ENEMY APPROACHING FAST",
    hint: [
      "Trifid cipher uses a 3x3x3 cube of letters.",
      "Each letter has three coordinates.",
      "Letters are grouped and coordinates are rearranged.",
    ],
    solution: "ENEMY APPROACHING FAST",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "ENEMY APPROACHING FAST";
    }
  }
};

const level25: MissionData = {
  id: 25,
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

const level26: MissionData = {
  id: 26,
  title: "Operation Bifid Cipher",
  brief: "ENIGMA is now using the Bifid cipher with keyword 'MONARCHY'. This cipher uses coordinates from a Polybius square but rearranges them.",
  cryptoType: "Bifid Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: STRIKE AT MIDNIGHT",
    hint: [
      "Bifid cipher is based on a Polybius square with a keyword.",
      "Coordinates are split into rows and columns, then recombined.",
      "The keyword 'MONARCHY' creates the cipher square.",
    ],
    solution: "STRIKE AT MIDNIGHT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "STRIKE AT MIDNIGHT";
    }
  }
};

const level27: MissionData = {
  id: 27,
  title: "Operation Homophonic Substitution",
  brief: "ENIGMA is using homophonic substitution where common letters have multiple symbol representations to flatten frequency analysis.",
  cryptoType: "Homophonic Substitution",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: PACKAGE DELIVERED SAFELY",
    hint: [
      "Homophonic substitution uses multiple symbols for each letter.",
      "Common letters like E and T have many possible representations.",
      "This makes frequency analysis much harder.",
    ],
    solution: "PACKAGE DELIVERED SAFELY",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "PACKAGE DELIVERED SAFELY";
    }
  }
};

const level28: MissionData = {
  id: 28,
  title: "Operation Steganography Text",
  brief: "ENIGMA is hiding messages in plain sight. The first letter of each word in this innocent-looking text spells out their secret message.",
  cryptoType: "Steganography",
  difficulty: "medium",
  puzzleData: {
    challenge: "Call All Police Tonight. Under Radio Emergency Directions.",
    hint: [
      "Look for hidden patterns in the text.",
      "Try reading the first letter of each word.",
      "The message is hidden in plain sight.",
    ],
    solution: "CAPTURED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "CAPTURED";
    }
  }
};

const level29: MissionData = {
  id: 29,
  title: "Operation GPS Challenge",
  brief: "Intelligence suggests ENIGMA operatives have left a dead drop at a specific location. Head to the coordinates and scan the area to locate their hidden message. This is a field operation requiring you to visit a physical location.",
  cryptoType: "GPS Location",
  difficulty: "medium",
  requiresLocation: {
    latitude: 37.7749,
    longitude: -122.4194,
    radiusMeters: 100,
    locationName: "Mission Location"
  },
  puzzleData: {
    challenge: "Reach the marked location on your map. Once there, you'll receive the decryption key.",
    hint: [
      "Make sure your device's location services are enabled.",
      "You must physically be at the specified location to complete this mission.",
      "The location coordinates would be specific to your area in a real setup."
    ],
    solution: "LOCATION_CONFIRMED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "LOCATION_CONFIRMED";
    }
  }
};

const level30: MissionData = {
  id: 30,
  title: "Operation QR Scan & Decrypt",
  brief: "ENIGMA has started distributing information via QR codes placed at strategic locations. Your handler has obtained one such code. Scan it to retrieve the encrypted message, then decrypt it.",
  cryptoType: "QR + Substitution",
  difficulty: "medium",
  requiresQrCode: true,
  puzzleData: {
    challenge: "Scan the QR code to retrieve the encrypted message.",
    hint: [
      "You need to scan a QR code with your device camera.",
      "The QR code would contain an encrypted message.",
      "For demonstration: The QR code contains 'HTWJXY RTAJRJSY FY XJHWJY GFXJ'"
    ],
    solution: "TROOP MOVEMENT AT SECRET BASE",
    qrCodeValue: "HTWJXY RTAJRJSY FY XJHWJY GFXJ",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "TROOP MOVEMENT AT SECRET BASE";
    }
  }
};

const level31: MissionData = {
  id: 31,
  title: "Operation Double Transposition",
  brief: "ENIGMA has implemented a double transposition cipher - the message is scrambled twice using different keys.",
  cryptoType: "Double Transposition",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: EXTRACT VIP TONIGHT",
    hint: [
      "Double transposition applies two different columnar transpositions.",
      "The message is scrambled twice with different key orders.",
      "This provides much stronger security than single transposition.",
    ],
    solution: "EXTRACT VIP TONIGHT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "EXTRACT VIP TONIGHT";
    }
  }
};

const level32: MissionData = {
  id: 32,
  title: "Operation Hill Cipher",
  brief: "ENIGMA's mathematicians are using the Hill cipher - a linear algebra approach to encryption using matrix multiplication.",
  cryptoType: "Hill Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: MATHEMATICS WINS",
    hint: [
      "Hill cipher uses matrix multiplication for encryption.",
      "Letters are converted to numbers and arranged in matrices.",
      "A key matrix is used to transform the plaintext matrix.",
    ],
    solution: "MATHEMATICS WINS",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "MATHEMATICS WINS";
    }
  }
};

const level33: MissionData = {
  id: 33,
  title: "Operation Autokey Cipher",
  brief: "ENIGMA is using an Autokey cipher where the plaintext itself becomes part of the key after an initial keyword 'FORTIFY'.",
  cryptoType: "Autokey Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: REINFORCEMENTS COMING",
    hint: [
      "Autokey cipher starts with a keyword, then uses the plaintext as the key.",
      "This makes the key as long as the message.",
      "The initial keyword is 'FORTIFY'.",
    ],
    solution: "REINFORCEMENTS COMING",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "REINFORCEMENTS COMING";
    }
  }
};

const level34: MissionData = {
  id: 34,
  title: "Operation Running Key",
  brief: "ENIGMA is using a running key cipher with text from 'Alice in Wonderland' as the key source. The key starts from 'Alice was beginning to get'.",
  cryptoType: "Running Key Cipher",
  difficulty: "medium",
  puzzleData: {
    challenge: "For simulation: WONDERLAND PROTOCOL ACTIVE",
    hint: [
      "Running key cipher uses a long text as the encryption key.",
      "The key text should be longer than the message.",
      "Famous books are often used as key sources.",
    ],
    solution: "WONDERLAND PROTOCOL ACTIVE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "WONDERLAND PROTOCOL ACTIVE";
    }
  }
};

const level35: MissionData = {
  id: 35,
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

// Hard Levels (36-50)
const level36: MissionData = {
  id: 36,
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

const level37: MissionData = {
  id: 37,
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

const level38: MissionData = {
  id: 38,
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

const level39: MissionData = {
  id: 39,
  title: "Operation Quantum Resistance",
  brief: "ENIGMA has implemented post-quantum cryptography! They're using lattice-based encryption. Our quantum computer specialists need your help to analyze potential weaknesses.",
  cryptoType: "Lattice-Based Crypto",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: QUANTUM SAFE PROTOCOL",
    hint: [
      "Lattice-based cryptography is believed to be quantum-resistant.",
      "It relies on problems like Learning With Errors (LWE).",
      "This represents future cryptographic challenges.",
    ],
    solution: "QUANTUM SAFE PROTOCOL",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "QUANTUM SAFE PROTOCOL";
    }
  }
};

const level40: MissionData = {
  id: 40,
  title: "Operation Frequency Analysis Master",
  brief: "ENIGMA's most secure cipher yet - a complex polyalphabetic substitution. Use advanced frequency analysis and pattern recognition to break their code.",
  cryptoType: "Complex Substitution",
  difficulty: "hard",
  puzzleData: {
    challenge: "ZKHUH DUH WKH QXFOHDU FRGHV",
    hint: [
      "This appears to be a shifted alphabet cipher.",
      "Each letter is consistently shifted by the same amount.",
      "The shift appears to be +3 positions.",
    ],
    solution: "WHERE ARE THE NUCLEAR CODES",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "WHERE ARE THE NUCLEAR CODES";
    }
  }
};

const level41: MissionData = {
  id: 41,
  title: "Operation Blockchain Decrypt",
  brief: "ENIGMA is hiding messages in blockchain transactions. Analyze the transaction data to extract their hidden communications.",
  cryptoType: "Blockchain Steganography",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: CRYPTO CURRENCY SECURED",
    hint: [
      "Messages can be hidden in blockchain transaction data.",
      "Look for patterns in transaction amounts or addresses.",
      "The message is embedded in the transaction metadata.",
    ],
    solution: "CRYPTO CURRENCY SECURED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "CRYPTO CURRENCY SECURED";
    }
  }
};

const level42: MissionData = {
  id: 42,
  title: "Operation DNA Cipher",
  brief: "ENIGMA's bio-tech division is encoding messages in synthetic DNA sequences. Each base pair represents binary data. Decode their genetic message.",
  cryptoType: "DNA Encoding",
  difficulty: "hard",
  puzzleData: {
    challenge: "ATCG represents binary: A=00, T=01, C=10, G=11. Sequence: ATCGATCG",
    hint: [
      "DNA has four bases: A, T, C, G.",
      "Each base can represent 2 bits of data.",
      "A=00, T=01, C=10, G=11.",
      "ATCGATCG = 00011000 01001000 = BH in ASCII.",
    ],
    solution: "BH",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "BH";
    }
  }
};

const level43: MissionData = {
  id: 43,
  title: "Operation Social Engineering",
  brief: "ENIGMA is using social media posts to hide messages. The secret is in the first letter of each hashtag in their recent posts.",
  cryptoType: "Social Media Steganography",
  difficulty: "hard",
  puzzleData: {
    challenge: "Recent posts contain: #Beautiful #Umbrella #Sunrise #Today #Everything #Dreams",
    hint: [
      "Look at social media posts for hidden patterns.",
      "Check the first letter of each hashtag.",
      "The message spells out a word.",
    ],
    solution: "BUSTED",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "BUSTED";
    }
  }
};

const level44: MissionData = {
  id: 44,
  title: "Operation Audio Steganography",
  brief: "ENIGMA is hiding messages in audio files using the least significant bits of sound samples. Analyze the frequency spectrum.",
  cryptoType: "Audio Steganography",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: SOUND WAVES CARRY SECRETS",
    hint: [
      "Audio steganography hides data in sound files.",
      "Information can be embedded in LSBs of audio samples.",
      "Frequency analysis can reveal hidden patterns.",
    ],
    solution: "SOUND WAVES CARRY SECRETS",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "SOUND WAVES CARRY SECRETS";
    }
  }
};

const level45: MissionData = {
  id: 45,
  title: "Operation Image Steganography",
  brief: "ENIGMA has hidden their next operation details within an image file shared on their public website. Our analysts believe they're using steganography to hide text in the image. Examine the image and extract the hidden message to uncover their plans.",
  cryptoType: "Image Steganography",
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

const level46: MissionData = {
  id: 46,
  title: "Operation Elliptic Curve",
  brief: "ENIGMA has implemented Elliptic Curve Cryptography (ECC). Their public key point is (2,7) on curve y²=x³+7 mod 11. Find their private key.",
  cryptoType: "Elliptic Curve Cryptography",
  difficulty: "hard",
  puzzleData: {
    challenge: "Public key: (2,7), Curve: y²=x³+7 mod 11, Base point: (2,7). Find private key k where k*(2,7) = (2,7).",
    hint: [
      "In ECC, public key = private key × base point.",
      "The curve order determines the valid private keys.",
      "For this simple curve, k=1 works since 1×(2,7) = (2,7).",
    ],
    solution: "1",
    solutionCheck: (input: string) => {
      const normalized = input.trim();
      return normalized === "1";
    }
  }
};

const level47: MissionData = {
  id: 47,
  title: "Operation AI Generated Cipher",
  brief: "ENIGMA's AI system has generated a new type of cipher that adapts based on previous characters. This neural network-based encryption is their latest innovation.",
  cryptoType: "AI Neural Cipher",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: ARTIFICIAL INTELLIGENCE CIPHER",
    hint: [
      "AI-generated ciphers can adapt their behavior.",
      "Neural networks can create complex encryption patterns.",
      "The pattern changes based on previous inputs.",
    ],
    solution: "ARTIFICIAL INTELLIGENCE CIPHER",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "ARTIFICIAL INTELLIGENCE CIPHER";
    }
  }
};

const level48: MissionData = {
  id: 48,
  title: "Operation Homomorphic Encryption",
  brief: "ENIGMA is using homomorphic encryption to perform calculations on encrypted data without decrypting it first. Break their computational security.",
  cryptoType: "Homomorphic Encryption",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: COMPUTE WITHOUT DECRYPT",
    hint: [
      "Homomorphic encryption allows computation on encrypted data.",
      "Results remain encrypted but can be decrypted to get the answer.",
      "This enables privacy-preserving cloud computing.",
    ],
    solution: "COMPUTE WITHOUT DECRYPT",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "COMPUTE WITHOUT DECRYPT";
    }
  }
};

const level49: MissionData = {
  id: 49,
  title: "Operation Zero Knowledge Proof",
  brief: "ENIGMA claims they can prove they know a secret without revealing it. Analyze their zero-knowledge proof protocol to extract the hidden information.",
  cryptoType: "Zero Knowledge Proof",
  difficulty: "hard",
  puzzleData: {
    challenge: "For simulation: PROVE WITHOUT REVEALING",
    hint: [
      "Zero-knowledge proofs prove knowledge without revealing information.",
      "The prover convinces a verifier they know a secret.",
      "No information about the secret is leaked in the process.",
    ],
    solution: "PROVE WITHOUT REVEALING",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "PROVE WITHOUT REVEALING";
    }
  }
};

const level50: MissionData = {
  id: 50,
  title: "Operation Final Countdown",
  brief: "This is it, Agent. ENIGMA's ultimate cipher combines quantum cryptography, AI adaptation, and blockchain verification. Use everything you've learned to crack their final message and save the world!",
  cryptoType: "Quantum-AI-Blockchain Hybrid",
  difficulty: "hard",
  puzzleData: {
    challenge: "FRQJUDWXODWLRQV DJHQW PLVVLRQ FRPSOHWH",
    hint: [
      "This final challenge combines multiple encryption methods.",
      "Start with the basics - this looks like a Caesar cipher.",
      "Sometimes the most complex-looking ciphers have simple solutions.",
      "Shift each letter back by 3 positions.",
    ],
    solution: "CONGRATULATIONS AGENT MISSION COMPLETE",
    solutionCheck: (input: string) => {
      const normalized = input.toUpperCase().trim();
      return normalized === "CONGRATULATIONS AGENT MISSION COMPLETE";
    }
  }
};

// Game levels data
export const levels: MissionData[] = [
  level1, level2, level3, level4, level5, level6, level7, level8, level9, level10,
  level11, level12, level13, level14, level15, level16, level17, level18, level19, level20,
  level21, level22, level23, level24, level25, level26, level27, level28, level29, level30,
  level31, level32, level33, level34, level35, level36, level37, level38, level39, level40,
  level41, level42, level43, level44, level45, level46, level47, level48, level49, level50
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
