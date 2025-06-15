
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Lightbulb, BookOpen } from 'lucide-react';
import CipherAnimation from './CipherAnimation';

interface TheoryData {
  [key: string]: {
    title: string;
    sections: {
      title: string;
      content: string;
      animation?: string;
      keyPoints: string[];
    }[];
  };
}

const theoryData: TheoryData = {
  caesar: {
    title: 'Caesar Cipher Theory',
    sections: [
      {
        title: 'Introduction to Substitution Ciphers',
        content: 'A substitution cipher replaces each letter in the plaintext with another letter according to a fixed system. The Caesar cipher is the simplest form of substitution cipher.',
        animation: 'substitution',
        keyPoints: [
          'Each letter is replaced by another letter',
          'The replacement follows a consistent pattern',
          'Named after Julius Caesar who used it'
        ]
      },
      {
        title: 'How Caesar Cipher Works',
        content: 'The Caesar cipher shifts each letter in the alphabet by a fixed number of positions. For example, with a shift of 3, A becomes D, B becomes E, and so on.',
        animation: 'caesar-shift',
        keyPoints: [
          'Uses a fixed shift value (key)',
          'Wraps around the alphabet (Z+1 = A)',
          'Preserves letter case and non-alphabetic characters'
        ]
      }
    ]
  },
  'text-reversal': {
    title: 'Text Reversal Theory',
    sections: [
      {
        title: 'Simple Text Manipulation',
        content: 'Text reversal is one of the simplest encoding methods where the message is written backwards. It can be applied to the entire message or word by word.',
        keyPoints: [
          'Reverse entire message or individual words',
          'Preserves original characters',
          'Easy to implement and decode',
          'Not secure but useful for obfuscation'
        ]
      },
      {
        title: 'Applications and Variations',
        content: 'Text reversal is often combined with other techniques for layered security. It can be used for simple puzzles, basic obfuscation, or as part of more complex encoding schemes.',
        keyPoints: [
          'Can be combined with other ciphers',
          'Used in puzzles and games',
          'Foundation for understanding transformation',
          'Historical use in mirror writing'
        ]
      }
    ]
  },
  a1z26: {
    title: 'A1Z26 Cipher Theory',
    sections: [
      {
        title: 'Number-Letter Substitution',
        content: 'The A1Z26 cipher replaces each letter with its position in the alphabet. A=1, B=2, C=3, and so on up to Z=26.',
        keyPoints: [
          'Direct mapping: A=1, B=2, ..., Z=26',
          'Numbers separated by dashes or spaces',
          'Preserves word boundaries',
          'Easy to encode and decode'
        ]
      },
      {
        title: 'Variations and Uses',
        content: 'A1Z26 can be modified with different starting numbers, reverse ordering, or combined with mathematical operations for added complexity.',
        keyPoints: [
          'Can start from 0 instead of 1',
          'Reverse order (Z=1, Y=2, etc.)',
          'Mathematical operations on numbers',
          'Used in educational cryptography'
        ]
      }
    ]
  },
  binary: {
    title: 'Binary Code Theory',
    sections: [
      {
        title: 'Binary Number System',
        content: 'Binary uses only two digits (0 and 1) to represent all data. In text encoding, each character is represented by its ASCII value converted to binary.',
        animation: 'binary-conversion',
        keyPoints: [
          'Base-2 number system (0s and 1s)',
          'Each bit represents a power of 2',
          '8 bits = 1 byte = 1 character',
          'Foundation of all digital communication'
        ]
      },
      {
        title: 'ASCII and Binary Conversion',
        content: 'ASCII assigns numbers to characters (A=65, B=66, etc.). These numbers are then converted to 8-bit binary representations.',
        keyPoints: [
          'ASCII: American Standard Code for Information Interchange',
          'Each character has a unique number',
          'Numbers converted to 8-bit binary',
          'Extended ASCII includes special characters'
        ]
      }
    ]
  },
  morse: {
    title: 'Morse Code Theory',
    sections: [
      {
        title: 'Dots, Dashes, and Communication',
        content: 'Morse code represents letters and numbers using combinations of short signals (dots) and long signals (dashes). Developed for telegraph communication.',
        keyPoints: [
          'Dots (.) and dashes (-) represent letters',
          'Spaces separate letters',
          'Longer pauses separate words',
          'Optimized for telegraph transmission'
        ]
      },
      {
        title: 'International Morse Code',
        content: 'The International Morse Code standardized the system worldwide. Common letters like E (.) and T (-) use shorter codes for efficiency.',
        keyPoints: [
          'Standardized worldwide system',
          'Frequent letters use shorter codes',
          'SOS (...---...) is universal distress signal',
          'Still used in aviation and radio'
        ]
      }
    ]
  },
  base64: {
    title: 'Base64 Encoding Theory',
    sections: [
      {
        title: 'Binary to Text Encoding',
        content: 'Base64 encoding converts binary data into ASCII text using 64 printable characters. It\'s not encryption, but a way to represent data.',
        animation: 'base64-process',
        keyPoints: [
          'Uses 64 characters: A-Z, a-z, 0-9, +, /',
          'Converts 3 bytes into 4 characters',
          'Adds padding with = characters',
          'Not encryption - easily reversible'
        ]
      }
    ]
  },
  vigenere: {
    title: 'Vigenère Cipher Theory',
    sections: [
      {
        title: 'Polyalphabetic Substitution',
        content: 'The Vigenère cipher uses multiple substitution alphabets, making it much stronger than simple substitution ciphers like Caesar.',
        animation: 'vigenere-table',
        keyPoints: [
          'Uses a keyword to determine shifts',
          'Different letters use different shift values',
          'Much stronger than monoalphabetic ciphers'
        ]
      },
      {
        title: 'The Vigenère Table',
        content: 'The cipher uses a 26×26 grid of letters. Each row represents a Caesar cipher with a different shift. The keyword determines which row to use for each letter.',
        animation: 'vigenere-process',
        keyPoints: [
          '26×26 letter grid (Vigenère square)',
          'Keyword repeats to match message length',
          'Each keyword letter determines the shift'
        ]
      }
    ]
  },
  'rail-fence': {
    title: 'Rail Fence Cipher Theory',
    sections: [
      {
        title: 'Zigzag Pattern Encryption',
        content: 'The Rail Fence cipher writes the message in a zigzag pattern across multiple horizontal lines (rails), then reads the letters off line by line.',
        keyPoints: [
          'Message written in zigzag pattern',
          'Uses multiple horizontal rails',
          'Read letters row by row',
          'Number of rails is the key'
        ]
      },
      {
        title: 'Encryption Process',
        content: 'Characters are placed on rails following a zigzag pattern. When the bottom rail is reached, direction reverses upward. The ciphertext is formed by reading each rail left to right.',
        keyPoints: [
          'Start at top rail',
          'Zigzag down then up',
          'Direction changes at top and bottom',
          'Concatenate all rails for final cipher'
        ]
      }
    ]
  },
  hex: {
    title: 'Hexadecimal Encoding Theory',
    sections: [
      {
        title: 'Base 16 Number System',
        content: 'Hexadecimal uses 16 symbols (0-9, A-F) to represent data. Each hex digit represents 4 bits, making it perfect for representing bytes.',
        animation: 'hex-conversion',
        keyPoints: [
          'Uses digits 0-9 and letters A-F',
          'Each hex digit = 4 bits',
          'Two hex digits = 1 byte'
        ]
      }
    ]
  },
  atbash: {
    title: 'Atbash Cipher Theory',
    sections: [
      {
        title: 'Mirror Alphabet Substitution',
        content: 'Atbash is an ancient substitution cipher where the alphabet is reversed: A becomes Z, B becomes Y, C becomes X, and so on.',
        keyPoints: [
          'Ancient Hebrew cipher',
          'Alphabet mirrored: A↔Z, B↔Y, C↔X',
          'Self-reciprocal (encoding = decoding)',
          'Used in biblical texts'
        ]
      },
      {
        title: 'Mathematical Approach',
        content: 'In Atbash, each letter\'s position is subtracted from 26 (for English) and added to 1. So A (position 1) becomes 26-1+1 = Z (position 26).',
        keyPoints: [
          'Formula: new_position = 27 - old_position',
          'Works for any alphabet size',
          'Symmetric encryption/decryption',
          'Simple but effective obfuscation'
        ]
      }
    ]
  },
  rot13: {
    title: 'ROT13 Theory',
    sections: [
      {
        title: 'Rotation Cipher',
        content: 'ROT13 is a special case of the Caesar cipher where each letter is replaced with the letter 13 positions after it in the alphabet.',
        keyPoints: [
          'Caesar cipher with shift of 13',
          'Self-reciprocal (ROT13 of ROT13 = original)',
          'A becomes N, B becomes O, etc.',
          'Commonly used in online forums'
        ]
      },
      {
        title: 'Practical Applications',
        content: 'ROT13 is often used to obscure spoilers, offensive content, or puzzle solutions in online discussions. It\'s not secure but provides simple text obfuscation.',
        keyPoints: [
          'Used for spoiler protection',
          'Simple text obfuscation',
          'Not cryptographically secure',
          'Easy mental calculation'
        ]
      }
    ]
  }
};

interface TheorySectionProps {
  tutorialId: string;
}

const TheorySection: React.FC<TheorySectionProps> = ({ tutorialId }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const theory = theoryData[tutorialId];
  
  if (!theory) {
    return (
      <Card className="border-cipher-primary/30">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Theory content for this cipher is being developed.</p>
          <p className="text-sm text-muted-foreground mt-2">
            This cipher appears in Mission Level {tutorialId} - try the step-by-step tutorial instead!
          </p>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentSection + 1) / theory.sections.length) * 100;
  const section = theory.sections[currentSection];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-cipher-primary">{theory.title}</h2>
          <span className="text-sm text-muted-foreground">
            {currentSection + 1} of {theory.sections.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-cipher-primary/30 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cipher-primary" />
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              {section.content}
            </p>
          </div>

          {section.animation && (
            <div className="my-8">
              <CipherAnimation type={section.animation} />
            </div>
          )}

          <Card className="bg-cipher-darker/50 border-cipher-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-cipher-primary font-bold">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentSection(Math.min(theory.sections.length - 1, currentSection + 1))}
          disabled={currentSection === theory.sections.length - 1}
          className="flex items-center gap-2 bg-cipher-primary hover:bg-cipher-secondary"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TheorySection;
