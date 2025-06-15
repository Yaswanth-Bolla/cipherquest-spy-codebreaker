
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Award, Star, Shield, Zap, Crown, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RankingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RankingDialog: React.FC<RankingDialogProps> = ({ open, onOpenChange }) => {
  const ranks = [
    {
      name: "Recruit",
      icon: <Star className="h-6 w-6" />,
      requirement: "0-4 missions completed",
      description: "New agent just starting their cryptographic journey",
      color: "text-gray-400",
    },
    {
      name: "Junior Agent",
      icon: <Shield className="h-6 w-6" />,
      requirement: "5-14 missions completed",
      description: "Basic understanding of fundamental ciphers",
      color: "text-green-400",
    },
    {
      name: "Analyst",
      icon: <Zap className="h-6 w-6" />,
      requirement: "15-24 missions completed",
      description: "Competent in intermediate cryptographic techniques",
      color: "text-blue-400",
    },
    {
      name: "Field Operative",
      icon: <Award className="h-6 w-6" />,
      requirement: "25-34 missions completed",
      description: "Advanced skills in complex cipher operations",
      color: "text-purple-400",
    },
    {
      name: "Senior Agent",
      icon: <Trophy className="h-6 w-6" />,
      requirement: "35-44 missions completed",
      description: "Expert level cryptographer with specialized knowledge",
      color: "text-yellow-400",
    },
    {
      name: "Master Cryptographer",
      icon: <Crown className="h-6 w-6" />,
      requirement: "45+ missions completed",
      description: "Elite agent with mastery of all cryptographic disciplines",
      color: "text-cipher-primary",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cipher-darker border-cipher-primary/50 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-cipher-primary text-xl flex items-center gap-2">
            <Award className="h-6 w-6" />
            Agent Ranking System
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Progress through the ranks by completing cryptographic missions. Each rank represents your mastery level in the art of cryptography.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {ranks.map((rank, index) => (
            <Card key={rank.name} className="bg-cipher-darker border-cipher-primary/20 hover:border-cipher-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`${rank.color} flex-shrink-0`}>
                    {rank.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${rank.color}`}>
                        {rank.name}
                      </h3>
                      <span className="text-sm text-gray-500 bg-cipher-primary/10 px-2 py-1 rounded">
                        Rank {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-cipher-primary mb-1">
                      {rank.requirement}
                    </p>
                    <p className="text-sm text-gray-400">
                      {rank.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-cipher-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-cipher-primary">Pro Tip:</strong> Complete missions to advance through the ranks. 
            Each rank unlocks new challenges and recognition within the CipherQuest community.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RankingDialog;
