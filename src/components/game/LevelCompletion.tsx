
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { levels } from '@/utils/gameData';

interface LevelCompletionProps {
  levelId: number;
}

const LevelCompletion: React.FC<LevelCompletionProps> = ({ levelId }) => {
  const navigate = useNavigate();
  
  const handleAdvanceToNext = () => {
    if (levelId < levels.length) {
      navigate(`/level/${levelId + 1}`);
    } else {
      navigate('/levels');
    }
  };

  return (
    <div className="text-center py-8">
      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-green-500 mb-2">Mission Accomplished!</h2>
      <p className="text-gray-300 mb-6">You have successfully completed this operation.</p>
      
      <Button 
        onClick={handleAdvanceToNext}
        className="bg-cipher-primary hover:bg-cipher-secondary text-black"
        size="lg"
      >
        <ArrowRight className="mr-2" size={16} />
        {levelId < levels.length ? 'Advance to Next Operation' : 'Return to Mission Control'}
      </Button>
    </div>
  );
};

export default LevelCompletion;
