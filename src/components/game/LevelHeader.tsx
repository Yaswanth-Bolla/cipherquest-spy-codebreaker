
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Timer } from 'lucide-react';

interface LevelHeaderProps {
  levelId: number;
  timer: string;
}

const LevelHeader: React.FC<LevelHeaderProps> = ({ levelId, timer }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/levels');
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <Button 
        variant="ghost" 
        onClick={handleBack} 
        className="text-cipher-light hover:text-cipher-primary flex items-center gap-1"
      >
        <ChevronLeft size={16} /> Back to Missions
      </Button>
      
      <div className="flex items-center gap-2">
        <Badge className="bg-cipher-primary text-black">Level {levelId}</Badge>
        <div className="flex items-center text-sm text-gray-400">
          <Timer size={14} className="mr-1" /> {timer}
        </div>
      </div>
    </div>
  );
};

export default LevelHeader;
