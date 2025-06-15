
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface CipherAnimationProps {
  type: string;
}

const CipherAnimation: React.FC<CipherAnimationProps> = ({ type }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const animations = {
    'substitution': {
      title: 'Basic Substitution Animation',
      steps: [
        { text: 'Original: HELLO', highlight: [] },
        { text: 'H → K (shift +3)', highlight: [0] },
        { text: 'HE → KH (shift +3)', highlight: [0, 1] },
        { text: 'HEL → KHO (shift +3)', highlight: [0, 1, 2] },
        { text: 'HELL → KHOR (shift +3)', highlight: [0, 1, 2, 3] },
        { text: 'HELLO → KHOOR (shift +3)', highlight: [0, 1, 2, 3, 4] },
        { text: 'Final: KHOOR', highlight: [] }
      ]
    },
    'caesar-shift': {
      title: 'Caesar Cipher Shift Visualization',
      steps: [
        { text: 'Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ', highlight: [] },
        { text: 'With shift 3: DEFGHIJKLMNOPQRSTUVWXYZABC', highlight: [] },
        { text: 'A → D, B → E, C → F...', highlight: [0, 1, 2] },
        { text: 'Example: H (position 8)', highlight: [7] },
        { text: 'H + 3 = K (position 11)', highlight: [7, 10] },
        { text: 'Wrapping: X→A, Y→B, Z→C', highlight: [23, 24, 25] }
      ]
    },
    'vigenere-table': {
      title: 'Vigenère Table Construction',
      steps: [
        { text: 'Row 0: ABCDEFGHIJKLMNOPQRSTUVWXYZ', highlight: [] },
        { text: 'Row 1: BCDEFGHIJKLMNOPQRSTUVWXYZA', highlight: [] },
        { text: 'Row 2: CDEFGHIJKLMNOPQRSTUVWXYZAB', highlight: [] },
        { text: '...26 rows total (Vigenère Square)', highlight: [] },
        { text: 'Keyword determines which row to use', highlight: [] },
        { text: 'Different letters = different shifts', highlight: [] }
      ]
    },
    'vigenere-process': {
      title: 'Vigenère Encryption Process',
      steps: [
        { text: 'Message: HELLO', highlight: [] },
        { text: 'Keyword: KEY', highlight: [] },
        { text: 'Repeat key: KEYKE', highlight: [] },
        { text: 'H + K = R (row K, column H)', highlight: [0] },
        { text: 'HE + KE = RI (using table)', highlight: [0, 1] },
        { text: 'HELLO + KEYKE = RIJVS', highlight: [0, 1, 2, 3, 4] }
      ]
    },
    'base64-process': {
      title: 'Base64 Encoding Process',
      steps: [
        { text: 'Input: "Hi"', highlight: [] },
        { text: 'ASCII: H=72, i=105', highlight: [] },
        { text: 'Binary: 01001000 01101001', highlight: [] },
        { text: 'Group by 6: 010010 000110 1001xx', highlight: [] },
        { text: 'Pad: 010010 000110 100100', highlight: [] },
        { text: 'Decimal: 18, 6, 36', highlight: [] },
        { text: 'Base64: S, G, k', highlight: [] },
        { text: 'Result: "SGk="', highlight: [] }
      ]
    },
    'base64-conversion': {
      title: 'Base64 Character Mapping',
      steps: [
        { text: 'Base64 alphabet: A-Z, a-z, 0-9, +, /', highlight: [] },
        { text: '0-25: A-Z', highlight: [] },
        { text: '26-51: a-z', highlight: [] },
        { text: '52-61: 0-9', highlight: [] },
        { text: '62: +, 63: /', highlight: [] },
        { text: 'Padding character: =', highlight: [] }
      ]
    },
    'hex-conversion': {
      title: 'Hexadecimal Conversion',
      steps: [
        { text: 'Decimal: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15', highlight: [] },
        { text: 'Hex:     0 1 2 3 4 5 6 7 8 9 A  B  C  D  E  F', highlight: [] },
        { text: 'Each hex digit = 4 bits', highlight: [] },
        { text: 'Two hex digits = 1 byte (8 bits)', highlight: [] },
        { text: 'Example: 255 decimal = FF hex', highlight: [] }
      ]
    },
    'byte-to-hex': {
      title: 'Byte to Hex Conversion',
      steps: [
        { text: 'Input: "A" (ASCII 65)', highlight: [] },
        { text: 'Binary: 01000001', highlight: [] },
        { text: 'Split: 0100 0001', highlight: [] },
        { text: 'Convert: 4, 1', highlight: [] },
        { text: 'Hex: 41', highlight: [] }
      ]
    },
    'binary-conversion': {
      title: 'Binary to ASCII Conversion',
      steps: [
        { text: 'Binary: 01001000 01001001', highlight: [] },
        { text: 'Split into bytes: 01001000 | 01001001', highlight: [] },
        { text: 'Convert to decimal: 72 | 73', highlight: [] },
        { text: 'ASCII lookup: H | I', highlight: [] },
        { text: 'Result: "HI"', highlight: [] }
      ]
    },
    'rail-fence-demo': {
      title: 'Rail Fence Cipher (3 Rails)',
      steps: [
        { text: 'Message: WEAREDISCOVERED', highlight: [] },
        { text: 'Rail 1: W   R   S   V   D', highlight: [] },
        { text: 'Rail 2:  E A E D I C O E E', highlight: [] },
        { text: 'Rail 3:   A   D   O   R', highlight: [] },
        { text: 'Read rails: WRSVD + EAEDICOE + ADOR', highlight: [] },
        { text: 'Result: WRSDEAEDICOEADOR', highlight: [] }
      ]
    },
    'atbash-demo': {
      title: 'Atbash Cipher Demonstration',
      steps: [
        { text: 'Normal: A B C D E F G H I J K L M', highlight: [] },
        { text: 'Atbash: Z Y X W V U T S R Q P O N', highlight: [] },
        { text: 'Normal: N O P Q R S T U V W X Y Z', highlight: [] },
        { text: 'Atbash: M L K J I H G F E D C B A', highlight: [] },
        { text: 'Example: HELLO → SVOOL', highlight: [] }
      ]
    },
    'morse-demo': {
      title: 'Morse Code Patterns',
      steps: [
        { text: 'A: .-  B: -...  C: -.-.  D: -..', highlight: [] },
        { text: 'E: .   F: ..-.  G: --.   H: ....', highlight: [] },
        { text: 'I: ..  J: .---  K: -.-   L: .-..', highlight: [] },
        { text: 'M: --  N: -.    O: ---   P: .--.' highlight: [] },
        { text: 'Example: SOS = ... --- ...', highlight: [] }
      ]
    }
  };

  const animation = animations[type] || animations['substitution'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= animation.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isPlaying, animation.steps.length]);

  const togglePlayback = () => {
    if (currentStep >= animation.steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <Card className="border-cipher-primary/30 bg-cipher-darker/30">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-cipher-primary mb-2">
            {animation.title}
          </h3>
          <div className="bg-black/40 p-4 rounded-lg border border-cipher-primary/20">
            <div className="font-mono text-lg text-green-400 min-h-[2rem] flex items-center justify-center">
              {animation.steps[currentStep]?.text}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            onClick={togglePlayback}
            size="sm"
            className="bg-cipher-primary hover:bg-cipher-secondary"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-1">
            {animation.steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-cipher-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          Step {currentStep + 1} of {animation.steps.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default CipherAnimation;
