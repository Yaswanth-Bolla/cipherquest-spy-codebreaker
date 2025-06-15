
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, RotateCcw } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  instruction: string;
  input: string;
  expectedOutput: string;
  hint: string;
  type: 'encode' | 'decode';
}

interface TutorialData {
  [key: string]: {
    title: string;
    description: string;
    steps: Step[];
  };
}

const tutorialData: TutorialData = {
  caesar: {
    title: 'Caesar Cipher Tutorial',
    description: 'Learn to encode and decode messages using the Caesar cipher',
    steps: [
      {
        id: 1,
        title: 'Basic Encoding',
        instruction: 'Encode "HELLO" using a Caesar cipher with shift 3',
        input: 'HELLO',
        expectedOutput: 'KHOOR',
        hint: 'Each letter moves 3 positions forward: H→K, E→H, L→O, L→O, O→R',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Decoding Practice',
        instruction: 'Decode "ZRUOG" using a Caesar cipher with shift 3',
        input: 'ZRUOG',
        expectedOutput: 'WORLD',
        hint: 'Each letter moves 3 positions backward: Z→W, R→O, U→R, O→L, G→D',
        type: 'decode'
      }
    ]
  },
  'text-reversal': {
    title: 'Text Reversal Tutorial',
    description: 'Learn to reverse text for simple encoding',
    steps: [
      {
        id: 1,
        title: 'Word Reversal',
        instruction: 'Reverse each word: "HELLO WORLD"',
        input: 'HELLO WORLD',
        expectedOutput: 'OLLEH DLROW',
        hint: 'Reverse each word individually, keeping spaces',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Decode Reversed Text',
        instruction: 'Decode "TERCES EGASSEM"',
        input: 'TERCES EGASSEM',
        expectedOutput: 'SECRET MESSAGE',
        hint: 'Reverse each word to get the original message',
        type: 'decode'
      }
    ]
  },
  a1z26: {
    title: 'A1Z26 Cipher Tutorial',
    description: 'Convert letters to numbers and back',
    steps: [
      {
        id: 1,
        title: 'Letters to Numbers',
        instruction: 'Encode "CAB" using A1Z26',
        input: 'CAB',
        expectedOutput: '3-1-2',
        hint: 'C=3, A=1, B=2. Separate with dashes.',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Numbers to Letters',
        instruction: 'Decode "8-5-12-12-15"',
        input: '8-5-12-12-15',
        expectedOutput: 'HELLO',
        hint: '8=H, 5=E, 12=L, 12=L, 15=O',
        type: 'decode'
      }
    ]
  },
  binary: {
    title: 'Binary Code Tutorial',
    description: 'Convert text to binary and back using ASCII',
    steps: [
      {
        id: 1,
        title: 'Text to Binary',
        instruction: 'Encode "HI" to binary',
        input: 'HI',
        expectedOutput: '01001000 01001001',
        hint: 'H=72=01001000, I=73=01001001',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Binary to Text',
        instruction: 'Decode "01001111 01001011"',
        input: '01001111 01001011',
        expectedOutput: 'OK',
        hint: '01001111=79=O, 01001011=75=K',
        type: 'decode'
      }
    ]
  },
  morse: {
    title: 'Morse Code Tutorial',
    description: 'Learn dots and dashes communication',
    steps: [
      {
        id: 1,
        title: 'Text to Morse',
        instruction: 'Encode "SOS" to Morse code',
        input: 'SOS',
        expectedOutput: '... --- ...',
        hint: 'S=..., O=---, S=...',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Morse to Text',
        instruction: 'Decode ".... .."',
        input: '.... ..',
        expectedOutput: 'HI',
        hint: '....=H, ..=I',
        type: 'decode'
      }
    ]
  },
  base64: {
    title: 'Base64 Encoding Tutorial',
    description: 'Learn to encode and decode data using Base64',
    steps: [
      {
        id: 1,
        title: 'Simple Text Encoding',
        instruction: 'Encode "Hello" to Base64',
        input: 'Hello',
        expectedOutput: 'SGVsbG8=',
        hint: 'Base64 converts binary data to text using 64 printable characters',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Decoding Practice',
        instruction: 'Decode "V29ybGQ=" from Base64',
        input: 'V29ybGQ=',
        expectedOutput: 'World',
        hint: 'The = at the end is padding to make the length a multiple of 4',
        type: 'decode'
      }
    ]
  },
  vigenere: {
    title: 'Vigenère Cipher Tutorial',
    description: 'Master the polyalphabetic Vigenère cipher',
    steps: [
      {
        id: 1,
        title: 'Simple Encoding',
        instruction: 'Encode "HELLO" using Vigenère cipher with key "KEY"',
        input: 'HELLO',
        expectedOutput: 'RIJVS',
        hint: 'H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S (using Vigenère table)',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Decoding Practice',
        instruction: 'Decode "RIJVS" using Vigenère cipher with key "KEY"',
        input: 'RIJVS',
        expectedOutput: 'HELLO',
        hint: 'R-K=H, I-E=E, J-Y=L, V-K=L, S-E=O',
        type: 'decode'
      }
    ]
  },
  'rail-fence': {
    title: 'Rail Fence Cipher Tutorial',
    description: 'Learn zigzag pattern encryption',
    steps: [
      {
        id: 1,
        title: 'Three Rail Encoding',
        instruction: 'Encode "HELLO" using 3 rails',
        input: 'HELLO',
        expectedOutput: 'HOELL',
        hint: 'Write in zigzag: H.L.O, .E., read rails: H.L.O + E + empty = HOELL',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Decode Rail Fence',
        instruction: 'Decode "WECRLTEERDSOEEFEAOCAIVDEN" (3 rails)',
        input: 'WECRLTEERDSOEEFEAOCAIVDEN',
        expectedOutput: 'WEAREDISCOVEREDFLEEEATONCE',
        hint: 'Arrange on 3 rails and read in zigzag pattern',
        type: 'decode'
      }
    ]
  },
  hex: {
    title: 'Hexadecimal Encoding Tutorial',
    description: 'Learn to encode and decode data using hexadecimal',
    steps: [
      {
        id: 1,
        title: 'Simple Text to Hex',
        instruction: 'Encode "Hi" to hexadecimal',
        input: 'Hi',
        expectedOutput: '4869',
        hint: 'H=72 decimal=48 hex, i=105 decimal=69 hex',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Hex to Text',
        instruction: 'Decode "48656c6c6f" from hexadecimal',
        input: '48656c6c6f',
        expectedOutput: 'Hello',
        hint: 'Split into pairs: 48=H, 65=e, 6c=l, 6c=l, 6f=o',
        type: 'decode'
      }
    ]
  },
  atbash: {
    title: 'Atbash Cipher Tutorial',
    description: 'Learn the ancient mirror alphabet cipher',
    steps: [
      {
        id: 1,
        title: 'Basic Atbash Encoding',
        instruction: 'Encode "HELLO" using Atbash',
        input: 'HELLO',
        expectedOutput: 'SVOOL',
        hint: 'A↔Z, B↔Y, C↔X... so H↔S, E↔V, L↔O, L↔O, O↔L',
        type: 'encode'
      },
      {
        id: 2,
        title: 'Atbash Decoding',
        instruction: 'Decode "KILM" using Atbash',
        input: 'KILM',
        expectedOutput: 'PRON',
        hint: 'Apply the same mirror transformation: K↔P, I↔R, L↔O, M↔N',
        type: 'decode'
      }
    ]
  },
  rot13: {
    title: 'ROT13 Tutorial',
    description: 'Learn the rotation cipher',
    steps: [
      {
        id: 1,
        title: 'ROT13 Encoding',
        instruction: 'Encode "HELLO" using ROT13',
        input: 'HELLO',
        expectedOutput: 'URYYB',
        hint: 'Shift each letter 13 positions: H→U, E→R, L→Y, L→Y, O→B',
        type: 'encode'
      },
      {
        id: 2,
        title: 'ROT13 Decoding',
        instruction: 'Decode "JBEYQ" using ROT13',
        input: 'JBEYQ',
        expectedOutput: 'WORLD',
        hint: 'ROT13 is self-reciprocal - apply ROT13 again to decode',
        type: 'decode'
      }
    ]
  }
};

// Simple cipher implementations for validation
const processAnswer = (input: string, type: 'encode' | 'decode', tutorialId: string): string => {
  switch (tutorialId) {
    case 'caesar':
      return caesarCipher(input, 3, type === 'decode');
    case 'text-reversal':
      return input.split(' ').map(word => word.split('').reverse().join('')).join(' ');
    case 'a1z26':
      if (type === 'encode') {
        return input.toUpperCase().split('').filter(c => /[A-Z]/.test(c))
          .map(c => (c.charCodeAt(0) - 64).toString()).join('-');
      } else {
        return input.split('-').map(n => String.fromCharCode(parseInt(n) + 64)).join('');
      }
    case 'binary':
      if (type === 'encode') {
        return input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      } else {
        return input.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
      }
    case 'morse':
      const morseMap: {[key: string]: string} = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..'
      };
      if (type === 'encode') {
        return input.toUpperCase().split('').filter(c => morseMap[c]).map(c => morseMap[c]).join(' ');
      } else {
        const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));
        return input.split(' ').map(m => reverseMorse[m] || '').join('');
      }
    case 'base64':
      if (type === 'encode') {
        return btoa(input);
      } else {
        return atob(input);
      }
    case 'hex':
      if (type === 'encode') {
        return input.split('').map(c => c.charCodeAt(0).toString(16)).join('');
      } else {
        return input.match(/.{2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || '';
      }
    case 'atbash':
      return input.toUpperCase().split('').map(c => {
        if (/[A-Z]/.test(c)) {
          return String.fromCharCode(90 - (c.charCodeAt(0) - 65));
        }
        return c;
      }).join('');
    case 'rot13':
      return input.toUpperCase().split('').map(c => {
        if (/[A-Z]/.test(c)) {
          return String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65);
        }
        return c;
      }).join('');
    default:
      return '';
  }
};

const caesarCipher = (text: string, shift: number, decode: boolean = false): string => {
  if (decode) shift = -shift;
  return text.split('').map(char => {
    if (/[A-Z]/.test(char)) {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + shift + 26) % 26) + 65);
    } else if (/[a-z]/.test(char)) {
      return String.fromCharCode(((char.charCodeAt(0) - 97 + shift + 26) % 26) + 97);
    }
    return char;
  }).join('');
};

interface CipherTutorialProps {
  tutorialId: string;
}

const CipherTutorial: React.FC<CipherTutorialProps> = ({ tutorialId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const tutorial = tutorialData[tutorialId];
  
  if (!tutorial) {
    return (
      <Card className="border-cipher-primary/30">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Step-by-step tutorial for this cipher is being developed.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try the Theory section to learn about this cipher type!
          </p>
        </CardContent>
      </Card>
    );
  }

  const step = tutorial.steps[currentStep];
  const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

  const checkAnswer = () => {
    const result = processAnswer(step.input, step.type, tutorialId);
    const correct = userAnswer.trim().toLowerCase() === result.toLowerCase();
    setIsCorrect(correct);
    
    if (correct && !completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
  };

  const nextStep = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  const resetStep = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-cipher-primary">{tutorial.title}</h2>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {tutorial.steps.length}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{tutorial.description}</p>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-cipher-primary/30 mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500" />
              )}
              {step.title}
            </CardTitle>
            <Badge variant={step.type === 'encode' ? 'default' : 'secondary'}>
              {step.type === 'encode' ? 'Encode' : 'Decode'}
            </Badge>
          </div>
          <CardDescription>{step.instruction}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input:</label>
            <div className="bg-cipher-darker/50 p-3 rounded border border-cipher-primary/20 font-mono">
              {step.input}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Answer:</label>
            <div className="flex gap-2">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                className="flex-1 font-mono"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              <Button onClick={checkAnswer} className="bg-cipher-primary hover:bg-cipher-secondary">
                Check
              </Button>
              <Button variant="outline" onClick={resetStep}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {isCorrect !== null && (
            <div className={`p-3 rounded border ${
              isCorrect 
                ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                : 'bg-red-500/20 border-red-500/50 text-red-300'
            }`}>
              {isCorrect ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Correct! Well done.
                </div>
              ) : (
                <div>
                  <p>Not quite right. Expected: <code className="font-mono bg-black/30 px-1 rounded">{step.expectedOutput}</code></p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              size="sm"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          </div>

          {showHint && (
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="pt-4">
                <p className="text-yellow-200">{step.hint}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        
        <Button
          onClick={nextStep}
          disabled={currentStep === tutorial.steps.length - 1 || !isCorrect}
          className="flex items-center gap-2 bg-cipher-primary hover:bg-cipher-secondary"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {currentStep === tutorial.steps.length - 1 && isCorrect && (
        <Card className="mt-6 bg-green-500/10 border-green-500/30">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-300 mb-2">Tutorial Complete!</h3>
            <p className="text-green-200">You've mastered the {tutorial.title}. Ready for the practice mode?</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CipherTutorial;
