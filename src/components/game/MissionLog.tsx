
import React from 'react';
import { Scroll, FileText, Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { levels } from '@/utils/gameData';
import { formatDistanceToNow } from 'date-fns';

const MissionLog: React.FC = () => {
  const { progress } = useGame();
  
  // Filter only completed levels
  const completedLevels = levels.filter(level => 
    progress.completedLevels.includes(level.id)
  ).sort((a, b) => a.id - b.id);

  return (
    <Card className="bg-cipher-darker border-cipher-primary/50 h-full">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-cipher-primary/30 pb-2">
        <Scroll className="h-5 w-5 text-cipher-primary" />
        <h3 className="font-bold text-lg">Agent Mission Logs</h3>
      </CardHeader>
      <CardContent className="pt-4">
        {completedLevels.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="mx-auto h-10 w-10 mb-2 opacity-50" />
            <p>No completed missions yet.</p>
            <p className="text-sm">Complete your first mission to see it in your logs.</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            {completedLevels.map((level) => {
              const completionDate = progress.completionDates?.[level.id] 
                ? new Date(progress.completionDates[level.id]) 
                : new Date();
              const hintsUsed = progress.hintsUsed[level.id] || 0;
              
              return (
                <div key={level.id} className="mb-4 pb-4 border-b border-gray-800">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-cipher-primary">Mission {level.id}: {level.title}</h4>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      {formatDistanceToNow(completionDate, { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="mt-1 text-sm text-gray-400">
                    <p>Crypto Method: {level.cryptoType}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {hintsUsed > 0 
                        ? `${hintsUsed} hint${hintsUsed > 1 ? 's' : ''} used` 
                        : 'No hints used'}
                    </p>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MissionLog;
