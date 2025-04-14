
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MissionBrief from '@/components/game/MissionBrief';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileWarning, Shield, ChevronRight, Lock } from 'lucide-react';

const Index = () => {
  const [showBrief, setShowBrief] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    setShowBrief(true);
  };

  const handleAcceptMission = () => {
    navigate('/levels');
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        {!showBrief ? (
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Shield className="h-32 w-32 text-cipher-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 spy-shadow">
              <span className="text-cipher-primary">CIPHER</span>
              <span className="text-white">QUEST</span>
            </h1>
            <p className="text-lg mb-8 text-gray-400 max-w-xl mx-auto typewriter">
              The world's secrets are in your hands, agent. 
              Can you crack the code and save the day?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleStartGame}
                className="bg-cipher-primary hover:bg-cipher-secondary text-black font-bold py-3 px-6 flex items-center gap-2"
              >
                <Lock size={18} />
                Begin Operation
                <ChevronRight size={18} />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-cipher-primary/50 text-cipher-primary hover:bg-cipher-primary/10"
              >
                <FileWarning size={18} className="mr-2" />
                Mission Logs
              </Button>
            </div>
            
            <p className="text-xs text-gray-600 mt-16">
              TOP SECRET • AUTHORIZED ACCESS ONLY
            </p>
          </div>
        ) : (
          <MissionBrief 
            title="Operation CipherQuest"
            content={`\
ATTENTION AGENT:

You have been selected for a specialized task force dedicated to cryptographic operations and intelligence gathering.

Your mission, should you choose to accept it, is to break through a series of encrypted messages and codes that have been intercepted from a mysterious organization known as "The Shadow Protocol."

Each level will test your abilities in different cryptographic techniques:

- Classical ciphers
- Modern encoding methods
- Advanced encryption systems

Our intelligence suggests that The Shadow Protocol is planning something big, and we need to stay one step ahead of them.

Time is of the essence. Are you ready to begin?`}
            onAccept={handleAcceptMission}
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
