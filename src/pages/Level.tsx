import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { levels } from '@/utils/gameData';
import { useDeviceLocation } from '@/hooks/use-device-location';
import { useIsMobile } from '@/hooks/use-mobile';
import QrCodeScanner from '@/components/game/QrCodeScanner';
import { toast } from 'sonner';
import { 
  Lightbulb, CheckCircle2, ChevronLeft, Timer, RotateCcw,
  MapPin, Navigation, QrCode, Smartphone 
} from 'lucide-react';

const Level = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const numericLevelId = parseInt(levelId || '1', 10);
  const navigate = useNavigate();
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      shadcnToast({
        title: 'Mission Complete!',
        description: 'You have successfully decrypted the message.',
      });
      
      setTimeout(() => {
        if (levelData.id < levels.length) {
          navigate(`/level/${levelData.id + 1}`);
        } else {
          navigate('/levels');
        }
      }, 2000);
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
  
  const handleBack = () => {
    navigate('/levels');
  };
  
  const renderMobileWarning = () => {
    if (!isMobile && (levelData.requiresQrCode || levelData.requiresLocation)) {
      return (
        <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded mb-6">
          <div className="flex items-start">
            <Smartphone className="text-yellow-500 mr-2 mt-1" size={18} />
            <div>
              <h3 className="text-sm text-yellow-500 mb-1">MOBILE DEVICE REQUIRED</h3>
              <p className="text-gray-300 text-sm">
                This mission requires a mobile device with {levelData.requiresLocation ? 'GPS capabilities' : ''} 
                {levelData.requiresLocation && levelData.requiresQrCode ? ' and ' : ''}
                {levelData.requiresQrCode ? 'a camera for QR scanning' : ''}.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  const renderSpecialChallengeUI = () => {
    if (levelData.requiresLocation) {
      return (
        <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded mb-6">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm text-cipher-secondary mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                LOCATION VERIFICATION:
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                You need to be physically at: {levelData.requiresLocation.locationName}
              </p>
              <div className="text-xs text-gray-500">
                {locationVerified ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle2 size={14} className="mr-1" />
                    Location verified
                  </span>
                ) : (
                  <span>Location status: not verified</span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleCheckLocation}
              disabled={locationVerified}
              className="bg-cipher-primary hover:bg-cipher-secondary text-black"
            >
              <Navigation size={16} className="mr-2" />
              {locationLoading ? "Checking..." : "Verify Location"}
            </Button>
          </div>
        </div>
      );
    }
    
    if (levelData.requiresQrCode) {
      return (
        <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded mb-6">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm text-cipher-secondary mb-2 flex items-center">
                <QrCode size={16} className="mr-1" />
                QR CODE MISSION:
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                Scan the mission QR code to retrieve encrypted data
              </p>
              <div className="text-xs text-gray-500">
                {qrCodeScanned ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle2 size={14} className="mr-1" />
                    QR code scanned
                  </span>
                ) : (
                  <span>QR status: not scanned</span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => setShowQrScanner(true)}
              disabled={!isMobile}
              className="bg-cipher-primary hover:bg-cipher-secondary text-black"
            >
              <QrCode size={16} className="mr-2" />
              Scan QR Code
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
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
            
            {renderMobileWarning()}
            
            {renderSpecialChallengeUI()}
            
            {!showQrScanner && (
              <>
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
              </>
            )}
            
            {showQrScanner && (
              <QrCodeScanner 
                onScan={handleQrCodeScan}
                onClose={() => setShowQrScanner(false)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Level;
