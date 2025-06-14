
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, RotateCcw, CheckCircle2 } from 'lucide-react';

interface LevelActionsProps {
  showHint: boolean;
  onShowHint: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

const LevelActions: React.FC<LevelActionsProps> = ({
  showHint,
  onShowHint,
  onReset,
  onSubmit
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between mt-6">
      <div className="flex gap-3">
        <Button 
          type="button"
          variant="outline"
          onClick={onShowHint}
          className="border-yellow-600/50 text-yellow-500 hover:bg-yellow-900/20"
        >
          <Lightbulb className="mr-2" size={16} />
          {!showHint ? 'Request Hint' : 'Next Hint'}
        </Button>
        
        <Button 
          type="button"
          variant="ghost"
          onClick={onReset}
          className="text-gray-400"
        >
          <RotateCcw className="mr-2" size={16} />
          Reset
        </Button>
      </div>
      
      <Button 
        type="submit"
        onClick={onSubmit}
        className="bg-cipher-primary hover:bg-cipher-secondary text-black"
      >
        <CheckCircle2 className="mr-2" size={16} />
        Submit Solution
      </Button>
    </div>
  );
};

export default LevelActions;
