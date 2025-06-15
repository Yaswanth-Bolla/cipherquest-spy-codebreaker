
import React from 'react';
import { User, LogOut, Award } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';

const ProfilePopover: React.FC = () => {
  const { user, signOut } = useAuth();
  const { progress } = useGame();

  if (!user) return null;

  const getPlayerRank = (completedCount: number): string => {
    if (completedCount >= 15) return "Master Cryptographer";
    if (completedCount >= 13) return "Senior Agent";
    if (completedCount >= 10) return "Field Operative";
    if (completedCount >= 6) return "Analyst";
    if (completedCount >= 3) return "Junior Agent";
    return "Recruit";
  };

  const completedLevels = progress.completedLevels.length;
  const currentRank = getPlayerRank(completedLevels);
  const agentName = user.user_metadata.name || 'Anonymous Agent';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-cipher-primary/20 text-cipher-primary text-xs">
              {agentName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-cipher-darker border-cipher-primary/50 text-white" align="end">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-cipher-primary/20 text-cipher-primary">
                {agentName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cipher-primary truncate">
                {agentName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <Separator className="bg-cipher-primary/20" />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-cipher-secondary" />
              <span className="text-sm font-medium">Current Rank</span>
            </div>
            <p className="text-xs text-cipher-primary ml-6">
              {currentRank}
            </p>
            <p className="text-xs text-gray-400 ml-6">
              {completedLevels} missions completed
            </p>
          </div>

          <Separator className="bg-cipher-primary/20" />

          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-gray-300 hover:bg-cipher-primary/20 hover:text-cipher-primary"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
