
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Volume2, VolumeX, RotateCcw, Moon, Sun, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RankingDialog from './RankingDialog';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { resetProgress } = useGame();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [soundVolume, setSoundVolume] = React.useState([50]);
  const [rankingOpen, setRankingOpen] = React.useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
    onOpenChange(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-cipher-darker border-cipher-primary/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-cipher-primary text-xl">Settings</DialogTitle>
            <DialogDescription className="text-gray-400">
              Customize your CipherQuest experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Audio Settings</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <Label htmlFor="sound-toggle" className="text-sm">Sound Effects</Label>
                </div>
                <Switch 
                  id="sound-toggle" 
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="volume-slider" className="text-sm">Volume</Label>
                  <span className="text-sm text-gray-500">{soundVolume}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <VolumeX className="h-4 w-4 text-gray-500" />
                  <Slider
                    id="volume-slider"
                    disabled={!soundEnabled}
                    value={soundVolume}
                    onValueChange={setSoundVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Display Settings</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label htmlFor="theme-toggle" className="text-sm">Dark Theme</Label>
                </div>
                <Switch 
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Agent Information</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setRankingOpen(true)}
                className="w-full flex items-center justify-center gap-2 border-cipher-primary/30 text-cipher-primary hover:bg-cipher-primary/20"
              >
                <Award className="h-4 w-4" />
                View Ranking System
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Game Data</h3>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={resetProgress}
                className="w-full flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All Progress
              </Button>
              <p className="text-xs text-gray-500">
                This will erase all your progress and achievements. This action cannot be undone.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RankingDialog open={rankingOpen} onOpenChange={setRankingOpen} />
    </>
  );
};

export default SettingsDialog;
