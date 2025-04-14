
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { levels } from '@/utils/gameData';
import { Lightbulb, CheckCircle2, ChevronLeft, Timer, RotateCcw } from 'lucide-react';

const Level = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const numericLevelId = parseInt(levelId || '1', 10);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { progress, completeLevel, useHint } = useGame();
  
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState('00:00');
  
  const levelData = levels.find(l => l.id === numericLevelId);
  
  // Start timer when component mounts
  useEffect(() => {
    setStartTime(new Date());
    
    const timerInterval = setInterval(() => {
      if (startTime) {
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const diffSec = Math.floor((diffMs % 60000) / 1000);
        
        setTimer(`${diffMin.toString().padStart(2, '0')}:${diffSec.toString().padStart(2, '0')}`);
      }
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [startTime]);
  
  if (!levelData) {
    return <div>Level not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (levelData.puzzleData.solutionCheck(answer)) {
      // Correct solution
      completeLevel(levelData.id);
      toast({
        title: 'Mission Complete!',
        description: 'You have successfully decrypted the message.',
      });
      
      // Navigate to next level or level select
      setTimeout(() => {
        if (levelData.id < levels.length) {
          navigate(`/level/${levelData.id + 1}`);
        } else {
          navigate('/levels');
        }
      }, 2000);
    } else {
      // Incorrect solution
      toast({
        title: 'Decryption Failed',
        description: 'The solution is incorrect. Try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleShowHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else if (hintIndex < levelData.puzzleData.hint.length - 1) {
      setHintIndex(prev => prev + 1);
    }
    
    useHint(levelData.id);
  };
  
  const handleReset = () => {
    setAnswer('');
  };
  
  const handleBack = () => {
    navigate('/levels');
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="text-cipher-light hover:text-cipher-primary flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Back to Missions
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-cipher-primary text-black">Level {levelData.id}</Badge>
            <div className="flex items-center text-sm text-gray-400">
              <Timer size={14} className="mr-1" /> {timer}
            </div>
          </div>
        </div>
        
        <Card className="border-cipher-primary/30 bg-cipher-darker/80 mb-6">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-cipher-primary mb-2">{levelData.title}</h1>
            <Badge className="mb-4">{levelData.cryptoType}</Badge>
            
            <p className="terminal-text text-gray-300 mb-6 leading-relaxed">
              {levelData.brief}
            </p>
            
            <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded font-mono text-gray-300 mb-6 scanner">
              <h3 className="text-sm text-cipher-secondary mb-2">ENCRYPTED MESSAGE:</h3>
              <div className="whitespace-pre-wrap break-words">
                {levelData.puzzleData.challenge}
              </div>
            </div>
            
            {showHint && (
              <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded mb-6">
                <div className="flex items-start">
                  <Lightbulb className="text-yellow-500 mr-2 mt-1" size={18} />
                  <div>
                    <h3 className="text-sm text-yellow-500 mb-1">HINT {hintIndex + 1}/{levelData.puzzleData.hint.length}:</h3>
                    <p className="text-gray-300 text-sm">{levelData.puzzleData.hint[hintIndex]}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="answer" className="block text-sm text-gray-400 mb-2">
                  Enter your decrypted message:
                </label>
                <Textarea 
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="bg-black/50 border-cipher-primary/30 text-white font-mono"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex flex-wrap gap-3 justify-between mt-6">
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleShowHint}
                    className="border-yellow-600/50 text-yellow-500 hover:bg-yellow-900/20"
                  >
                    <Lightbulb className="mr-2" size={16} />
                    {!showHint ? 'Request Hint' : 'Next Hint'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={handleReset}
                    className="text-gray-400"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Reset
                  </Button>
                </div>
                
                <Button 
                  type="submit"
                  className="bg-cipher-primary hover:bg-cipher-secondary text-black"
                >
                  <CheckCircle2 className="mr-2" size={16} />
                  Submit Solution
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Level;
