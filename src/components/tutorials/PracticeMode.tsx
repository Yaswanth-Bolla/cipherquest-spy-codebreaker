
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shuffle, CheckCircle, XCircle, Trophy, Target } from 'lucide-react';
import { caesarCipher, vigenereCipher, base64Encode, base64Decode, hexEncode, hexDecode } from '@/utils/cryptoHelpers';

interface PracticeChallenge {
  input: string;
  type: 'encode' | 'decode';
  key?: string;
  shift?: number;
  description: string;
}

const practiceData: { [key: string]: PracticeChallenge[] } = {
  caesar: [
    { input: 'AGENT', type: 'encode', shift: 7, description: 'Encode with shift 7' },
    { input: 'PLAAL', type: 'decode', shift: 7, description: 'Decode with shift 7' },
    { input: 'Mission Complete', type: 'encode', shift: 13, description: 'Encode with shift 13 (ROT13)' },
    { input: 'Frperg Zrffntr', type: 'decode', shift: 13, description: 'Decode ROT13' },
    { input: 'CIPHER', type: 'encode', shift: 5, description: 'Encode with shift 5' },
  ],
  vigenere: [
    { input: 'SECRET', type: 'encode', key: 'CIPHER', description: 'Encode with key CIPHER' },
    { input: 'UMAVIW', type: 'decode', key: 'CIPHER', description: 'Decode with key CIPHER' },
    { input: 'ATTACK', type: 'encode', key: 'DEFEND', description: 'Encode with key DEFEND' },
    { input: 'DXEEGI', type: 'decode', key: 'DEFEND', description: 'Decode with key DEFEND' },
    { input: 'CRYPTOGRAPHY', type: 'encode', key: 'VIGENERE', description: 'Encode with key VIGENERE' },
  ],
  base64: [
    { input: 'Agent', type: 'encode', description: 'Encode to Base64' },
    { input: 'TWlzc2lvbg==', type: 'decode', description: 'Decode from Base64' },
    { input: 'Top Secret', type: 'encode', description: 'Encode to Base64' },
    { input: 'Q29kZWJyZWFrZXI=', type: 'decode', description: 'Decode from Base64' },
    { input: 'Classified Information', type: 'encode', description: 'Encode to Base64' },
  ],
  hex: [
    { input: 'Spy', type: 'encode', description: 'Encode to hex' },
    { input: '4d697373696f6e', type: 'decode', description: 'Decode from hex' },
    { input: 'Code', type: 'encode', description: 'Encode to hex' },
    { input: '4167656e74', type: 'decode', description: 'Decode from hex' },
    { input: 'Cipher', type: 'encode', description: 'Encode to hex' },
  ]
};

interface PracticeModeProps {
  tutorialId: string;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ tutorialId }) => {
  const [currentChallenge, setCurrentChallenge] = useState<PracticeChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [usedChallenges, setUsedChallenges] = useState<number[]>([]);

  const challenges = practiceData[tutorialId] || [];

  const generateRandomChallenge = () => {
    const availableChallenges = challenges.filter((_, index) => !usedChallenges.includes(index));
    
    if (availableChallenges.length === 0) {
      setUsedChallenges([]);
      return challenges[Math.floor(Math.random() * challenges.length)];
    }
    
    return availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
  };

  const startNewChallenge = () => {
    const challenge = generateRandomChallenge();
    setCurrentChallenge(challenge);
    setUserAnswer('');
    setFeedback(null);
    
    const challengeIndex = challenges.indexOf(challenge);
    if (!usedChallenges.includes(challengeIndex)) {
      setUsedChallenges([...usedChallenges, challengeIndex]);
    }
  };

  const processAnswer = (input: string, challenge: PracticeChallenge): string => {
    switch (tutorialId) {
      case 'caesar':
        const shift = challenge.shift || 3;
        return challenge.type === 'encode' 
          ? caesarCipher(input, shift)
          : caesarCipher(input, shift, true);
      case 'vigenere':
        const key = challenge.key || 'KEY';
        return challenge.type === 'encode'
          ? vigenereCipher(input, key)
          : vigenereCipher(input, key, true);
      case 'base64':
        return challenge.type === 'encode'
          ? base64Encode(input)
          : base64Decode(input);
      case 'hex':
        return challenge.type === 'encode'
          ? hexEncode(input)
          : hexDecode(input);
      default:
        return '';
    }
  };

  const checkAnswer = () => {
    if (!currentChallenge) return;

    const correctAnswer = processAnswer(currentChallenge.input, currentChallenge);
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback({
        correct: true,
        message: `Correct! The answer is "${correctAnswer}"`
      });
    } else {
      setStreak(0);
      setFeedback({
        correct: false,
        message: `Incorrect. The correct answer is "${correctAnswer}"`
      });
    }
  };

  useEffect(() => {
    if (challenges.length > 0) {
      startNewChallenge();
    }
  }, [tutorialId]);

  if (challenges.length === 0) {
    return (
      <Card className="border-cipher-primary/30">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Practice mode not available for this topic yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-cipher-primary/20">
          <CardContent className="pt-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cipher-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        
        <Card className="border-cipher-primary/20">
          <CardContent className="pt-4 text-center">
            <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cipher-primary">{attempts}</div>
            <div className="text-sm text-muted-foreground">Attempts</div>
          </CardContent>
        </Card>
        
        <Card className="border-cipher-primary/20">
          <CardContent className="pt-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cipher-primary">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
        
        <Card className="border-cipher-primary/20">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-cipher-primary">{streak}</div>
            <div className="text-sm text-muted-foreground">Streak</div>
            {streak >= 5 && <div className="text-xs text-yellow-500 mt-1">🔥 On Fire!</div>}
          </CardContent>
        </Card>
      </div>

      {/* Current Challenge */}
      {currentChallenge && (
        <Card className="border-cipher-primary/30 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Practice Challenge</CardTitle>
              <Badge variant={currentChallenge.type === 'encode' ? 'default' : 'secondary'}>
                {currentChallenge.type === 'encode' ? 'Encode' : 'Decode'}
              </Badge>
            </div>
            <CardDescription>{currentChallenge.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input:</label>
              <div className="bg-cipher-darker/50 p-3 rounded border border-cipher-primary/20 font-mono text-lg">
                {currentChallenge.input}
              </div>
              {(currentChallenge.key || currentChallenge.shift) && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {currentChallenge.shift && `Shift: ${currentChallenge.shift}`}
                  {currentChallenge.key && `Key: ${currentChallenge.key}`}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Answer:</label>
              <div className="flex gap-2">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="flex-1 font-mono text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <Button 
                  onClick={checkAnswer} 
                  className="bg-cipher-primary hover:bg-cipher-secondary"
                  disabled={!userAnswer.trim()}
                >
                  Check
                </Button>
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded border ${
                feedback.correct 
                  ? 'bg-green-500/20 border-green-500/50' 
                  : 'bg-red-500/20 border-red-500/50'
              }`}>
                <div className="flex items-center gap-2">
                  {feedback.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className={feedback.correct ? 'text-green-300' : 'text-red-300'}>
                    {feedback.message}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={startNewChallenge}
          className="flex items-center gap-2 bg-cipher-primary hover:bg-cipher-secondary"
        >
          <Shuffle className="w-4 h-4" />
          New Challenge
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            setScore(0);
            setAttempts(0);
            setStreak(0);
            setUsedChallenges([]);
            startNewChallenge();
          }}
        >
          Reset Score
        </Button>
      </div>

      {/* Achievement Messages */}
      {streak >= 10 && (
        <Card className="mt-6 bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-yellow-300">Master Achievement!</h3>
            <p className="text-yellow-200">10 correct answers in a row! You're becoming a crypto expert!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PracticeMode;
