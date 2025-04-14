
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface LevelInfo {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cryptoType: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface LevelCardProps {
  level: LevelInfo;
}

const LevelCard: React.FC<LevelCardProps> = ({ level }) => {
  const difficultyColorMap = {
    easy: 'bg-green-600',
    medium: 'bg-yellow-600',
    hard: 'bg-red-600',
  };

  return (
    <Link to={level.isLocked ? '#' : `/level/${level.id}`} className={`block ${level.isLocked ? 'cursor-not-allowed' : 'hover:scale-105 transition-transform'}`}>
      <Card className={`border ${level.isCompleted ? 'border-green-500/50' : 'border-cipher-primary/50'} bg-cipher-darker/80 h-full relative overflow-hidden`}>
        {level.isLocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <Lock className="text-gray-400" size={40} />
          </div>
        )}
        {level.isCompleted && (
          <div className="absolute top-2 right-2 z-10">
            <CircleCheck className="text-green-500" size={20} />
          </div>
        )}
        <CardContent className={`p-4 ${level.isLocked ? 'opacity-50' : ''}`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg tracking-wide">
              <span className="text-cipher-primary">LEVEL {level.id}:</span>
              <span className="text-white block">{level.name}</span>
            </h3>
            <Badge className={`${difficultyColorMap[level.difficulty]} uppercase text-xs`}>
              {level.difficulty}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-400 mb-2">
            CRYPTO TYPE: <span className="text-cipher-secondary">{level.cryptoType}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            {level.isCompleted ? 'Mission Completed' : 'Mission Pending'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LevelCard;
