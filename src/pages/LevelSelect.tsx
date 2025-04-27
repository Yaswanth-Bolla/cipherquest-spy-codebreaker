
import React from 'react';
import Layout from '@/components/layout/Layout';
import LevelCard from '@/components/game/LevelCard';
import MissionLog from '@/components/game/MissionLog';
import { useGame } from '@/contexts/GameContext';
import { getLevelInfoList } from '@/utils/gameData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, QrCode, Smartphone } from 'lucide-react';

const LevelSelect = () => {
  const { progress } = useGame();
  const levelInfoList = getLevelInfoList(progress);
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b border-cipher-primary/30 pb-2">
          <div className="flex items-center">
            <FileText className="text-cipher-primary mr-2" />
            <h1 className="text-2xl font-bold text-white">
              Mission Selection
            </h1>
          </div>
          
          <Link to="/qr-tools">
            <Button variant="outline" size="sm" className="border-cipher-primary/50 text-cipher-primary hover:bg-cipher-primary/10">
              <Smartphone size={16} className="mr-1" />
              <QrCode size={16} className="mr-1" />
              Field Tools
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {levelInfoList.map((level) => (
                <LevelCard key={level.id} level={level} />
              ))}
            </div>
            
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>Complete each mission to unlock the next challenge.</p>
              <p className="mt-1">Your progress is saved automatically.</p>
              <p className="mt-4">
                <Smartphone size={14} className="inline mr-1 text-cipher-primary" />
                Some missions require a mobile device with GPS and camera.
              </p>
            </div>
          </div>
          
          <div>
            <MissionLog />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LevelSelect;
