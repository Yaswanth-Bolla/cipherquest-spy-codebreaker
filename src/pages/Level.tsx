
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { levels } from '@/utils/gameData';
import { useDeviceLocation } from '@/hooks/use-device-location';
import { useIsMobile } from '@/hooks/use-mobile';
import QrCodeScanner from '@/components/game/QrCodeScanner';
import LevelHeader from '@/components/game/LevelHeader';
import MobileWarning from '@/components/game/MobileWarning';
import SpecialChallengeUI from '@/components/game/SpecialChallengeUI';
import LevelCompletion from '@/components/game/LevelCompletion';
import PuzzleContent from '@/components/game/PuzzleContent';
import LevelActions from '@/components/game/LevelActions';
import { toast } from 'sonner';

const Level = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const numericLevelId = parseInt(levelId || '1', 10);
  const { toast: shadcnToast } = useToast();
  const { progress, completeLevel, useHint } = useGame();
  const { 
    location, isLoading: locationLoading, requestLocation, checkLocationProximity 
  } = useDeviceLocation();
  const isMobile = useIsMobile();
  
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState('00:00');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [locationVerified, setLocationVerified] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  
  const levelData = levels.find(l => l.id === numericLevelId);
  
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

  useEffect(() => {
    setAnswer('');
    setIsLevelCompleted(false);
    setQrCodeScanned(false);
    setQrCodeValue('');
    setLocationVerified(false);
    setShowHint(false);
    setHintIndex(0);
  }, [numericLevelId]);
  
  if (!levelData) {
    return <div>Level not found</div>;
  }
  
  const handleQrCodeScan = (data: string) => {
    setQrCodeScanned(true);
    setShowQrScanner(false);
    setQrCodeValue(data);
    
    if (levelData.puzzleData.qrCodeValue && data === levelData.puzzleData.qrCodeValue) {
      toast.success("QR code successfully scanned!");
      setAnswer(data);
    } else {
      toast("QR code scanned", {
        description: "The code contains: " + data,
      });
      setAnswer(data);
    }
  };
  
  const handleCheckLocation = () => {
    if (!levelData.requiresLocation) return;
    
    requestLocation();
    
    if (location.latitude && location.longitude) {
      const isNearTarget = checkLocationProximity(
        levelData.requiresLocation.latitude,
        levelData.requiresLocation.longitude,
        levelData.requiresLocation.radiusMeters
      );
      
      if (isNearTarget) {
        setLocationVerified(true);
        toast.success("Location confirmed!", {
          description: `You've reached ${levelData.requiresLocation.locationName}`,
        });
        setAnswer("LOCATION_CONFIRMED");
      } else {
        toast.error("Location verification failed", {
          description: "You're not at the required location yet.",
        });
      }
    }
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (levelData.requiresLocation && !locationVerified) {
      toast.error("Location verification required", {
        description: "You need to verify your location first.",
      });
      return;
    }
    
    if (levelData.requiresQrCode && !qrCodeScanned) {
      toast.error("QR code scan required", {
        description: "You need to scan the QR code first.",
      });
      return;
    }
    
    if (levelData.puzzleData.solutionCheck(answer)) {
      completeLevel(levelData.id);
      setIsLevelCompleted(true);
      shadcnToast({
        title: 'Mission Complete!',
        description: 'You have successfully decrypted the message.',
      });
    } else {
      shadcnToast({
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
    setQrCodeScanned(false);
    setQrCodeValue('');
    setLocationVerified(false);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <LevelHeader levelId={levelData.id} timer={timer} />
        
        <Card className="border-cipher-primary/30 bg-cipher-darker/80 mb-6">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-cipher-primary mb-2">{levelData.title}</h1>
            <Badge className="mb-4">{levelData.cryptoType}</Badge>
            
            <p className="terminal-text text-gray-300 mb-6 leading-relaxed">
              {levelData.brief}
            </p>
            
            {!isMobile && (levelData.requiresQrCode || levelData.requiresLocation) && (
              <MobileWarning 
                requiresLocation={!!levelData.requiresLocation}
                requiresQrCode={!!levelData.requiresQrCode}
              />
            )}
            
            <SpecialChallengeUI
              requiresLocation={levelData.requiresLocation}
              requiresQrCode={levelData.requiresQrCode}
              locationVerified={locationVerified}
              qrCodeScanned={qrCodeScanned}
              locationLoading={locationLoading}
              isMobile={isMobile}
              onCheckLocation={handleCheckLocation}
              onScanQrCode={() => setShowQrScanner(true)}
            />

            {isLevelCompleted ? (
              <LevelCompletion levelId={levelData.id} />
            ) : (
              <>
                {!showQrScanner && (
                  <form onSubmit={handleSubmit}>
                    <PuzzleContent
                      challenge={levelData.puzzleData.challenge}
                      answer={answer}
                      onAnswerChange={setAnswer}
                      showHint={showHint}
                      hintIndex={hintIndex}
                      hints={levelData.puzzleData.hint}
                    />
                    
                    <LevelActions
                      showHint={showHint}
                      onShowHint={handleShowHint}
                      onReset={handleReset}
                      onSubmit={handleSubmit}
                    />
                  </form>
                )}
                
                {showQrScanner && (
                  <QrCodeScanner 
                    onScan={handleQrCodeScan}
                    onClose={() => setShowQrScanner(false)}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Level;
