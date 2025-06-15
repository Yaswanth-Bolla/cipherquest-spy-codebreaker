
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
      },
      {
        title: 'Strengths and Weaknesses',
        content: 'While simple to implement, the Caesar cipher is easily broken through frequency analysis or brute force attacks, as there are only 25 possible keys.',
        keyPoints: [
          'Strength: Simple to use and understand',
          'Weakness: Only 25 possible keys',
          'Weakness: Vulnerable to frequency analysis',
          'Historical significance in cryptography'
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
      },
      {
        title: 'Breaking Vigenère',
        content: 'While much stronger than Caesar, Vigenère can be broken using the Kasiski test to find the keyword length, then frequency analysis.',
        keyPoints: [
          'Kasiski test finds repeated patterns',
          'Frequency analysis on each position',
          'Longer keywords provide better security'
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
          'Adds padding with = characters'
        ]
      },
      {
        title: 'The Encoding Process',
        content: 'Every 3 bytes (24 bits) are split into four 6-bit groups. Each 6-bit value (0-63) maps to a character in the Base64 alphabet.',
        animation: 'base64-conversion',
        keyPoints: [
          '24 bits split into four 6-bit groups',
          'Each 6-bit value maps to Base64 character',
          'Padding ensures output length is multiple of 4'
        ]
      },
      {
        title: 'Common Uses',
        content: 'Base64 is widely used in email, web URLs, and data transmission where binary data needs to be represented as text.',
        keyPoints: [
          'Email attachments (MIME)',
          'Data URLs in web pages',
          'API responses and JSON data',
          'Not for security - easily reversible'
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
      },
      {
        title: 'Converting to Hex',
        content: 'Each byte (8 bits) becomes two hex digits. For example, the byte 255 in decimal becomes FF in hexadecimal.',
        animation: 'byte-to-hex',
        keyPoints: [
          'Split byte into two 4-bit nibbles',
          'Convert each nibble to hex digit',
          'Common in programming and debugging'
        ]
      },
      {
        title: 'Applications',
        content: 'Hex encoding is used in programming, color codes, memory addresses, and representing binary data in a human-readable format.',
        keyPoints: [
          'Memory addresses in debugging',
          'Color codes in web design (#FF0000)',
          'Cryptographic hashes and keys',
          'Raw data representation'
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
    return <div>Theory not available for this topic.</div>;
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
