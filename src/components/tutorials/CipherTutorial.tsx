
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, RotateCcw } from 'lucide-react';
import { caesarCipher, vigenereCipher, base64Encode, base64Decode, hexEncode, hexDecode } from '@/utils/cryptoHelpers';

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
      },
      {
        id: 3,
        title: 'Mixed Case Challenge',
        instruction: 'Encode "Hello World" using a Caesar cipher with shift 5',
        input: 'Hello World',
        expectedOutput: 'Mjqqt Btwqi',
        hint: 'Preserve the case and spaces. Only letters are shifted.',
        type: 'encode'
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
      },
      {
        id: 3,
        title: 'Longer Message',
        instruction: 'Encode "CRYPTOGRAPHY" using Vigenère cipher with key "SECRET"',
        input: 'CRYPTOGRAPHY',
        expectedOutput: 'UVASDTJZGFR',
        hint: 'The key "SECRET" repeats: SECRETSECRE to match the message length',
        type: 'encode'
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
      },
      {
        id: 3,
        title: 'Phrase Encoding',
        instruction: 'Encode "Secret Message" to Base64',
        input: 'Secret Message',
        expectedOutput: 'U2VjcmV0IE1lc3NhZ2U=',
        hint: 'Spaces and special characters are preserved in Base64 encoding',
        type: 'encode'
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
      },
      {
        id: 3,
        title: 'Message Encoding',
        instruction: 'Encode "Test" to hexadecimal',
        input: 'Test',
        expectedOutput: '54657374',
        hint: 'T=54, e=65, s=73, t=74 in hex',
        type: 'encode'
      }
    ]
  }
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
    return <div>Tutorial not available for this topic.</div>;
  }

  const step = tutorial.steps[currentStep];
  const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

  const processAnswer = (input: string, type: 'encode' | 'decode'): string => {
    switch (tutorialId) {
      case 'caesar':
        if (type === 'encode') {
          return caesarCipher(input, 3);
        } else {
          return caesarCipher(input, 3, true);
        }
      case 'vigenere':
        if (type === 'encode') {
          return vigenereCipher(input, 'KEY');
        } else {
          return vigenereCipher(input, 'KEY', true);
        }
      case 'base64':
        if (type === 'encode') {
          return base64Encode(input);
        } else {
          return base64Decode(input);
        }
      case 'hex':
        if (type === 'encode') {
          return hexEncode(input);
        } else {
          return hexDecode(input);
        }
      default:
        return '';
    }
  };

  const checkAnswer = () => {
    const result = processAnswer(step.input, step.type);
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
