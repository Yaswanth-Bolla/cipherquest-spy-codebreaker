
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import QrCodeGenerator from '@/components/game/QrCodeGenerator';
import { levels } from '@/utils/gameData';
import { QrCode, ArrowDown } from 'lucide-react';

const QrTools = () => {
  const [customQrValue, setCustomQrValue] = useState('');
  const [selectedMission, setSelectedMission] = useState<number | null>(null);

  // Find all missions that require QR codes
  const qrMissions = levels.filter(level => level.puzzleData.qrCodeValue);
  
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-cipher-primary">
          <QrCode className="inline-block mr-2" size={24} />
          QR Code Tools
        </h1>
        
        <p className="text-gray-300 mb-8">
          Use this page to generate QR codes for testing the mobile gameplay elements. 
          Print these codes or display them on another device to scan during missions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cipher-primary/30 bg-cipher-darker/80">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-white">Mission QR Codes</h2>
              <p className="text-sm text-gray-400 mb-4">
                Generate official QR codes for the CipherQuest missions:
              </p>
              
              <div className="space-y-4">
                {qrMissions.map(mission => (
                  <div 
                    key={mission.id} 
                    className="p-3 border border-cipher-primary/20 rounded cursor-pointer hover:bg-cipher-primary/10 transition"
                    onClick={() => setSelectedMission(mission.id)}
                  >
                    <h3 className="text-white font-bold">Level {mission.id}: {mission.title}</h3>
                    <p className="text-sm text-gray-400">
                      {mission.puzzleData.qrCodeValue?.substring(0, 20)}
                      {mission.puzzleData.qrCodeValue && mission.puzzleData.qrCodeValue.length > 20 ? '...' : ''}
                    </p>
                  </div>
                ))}
                
                {qrMissions.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No QR missions found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            {selectedMission && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-white flex items-center justify-center">
                  <ArrowDown className="text-cipher-primary mr-2" size={18} />
                  Mission QR Code
                </h2>
                
                {(() => {
                  const mission = levels.find(m => m.id === selectedMission);
                  if (mission && mission.puzzleData.qrCodeValue) {
                    return (
                      <QrCodeGenerator 
                        value={mission.puzzleData.qrCodeValue}
                        title={`Level ${mission.id}: ${mission.title}`}
                      />
                    );
                  }
                  return null;
                })()}
              </div>
            )}
            
            <Card className="border-cipher-primary/30 bg-cipher-darker/80">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4 text-white">Custom QR Code Generator</h2>
                
                <Textarea 
                  value={customQrValue}
                  onChange={(e) => setCustomQrValue(e.target.value)}
                  placeholder="Enter text to encode in QR code..."
                  className="bg-black/50 border-cipher-primary/30 text-white mb-4"
                  rows={3}
                />
                
                {customQrValue && (
                  <QrCodeGenerator 
                    value={customQrValue}
                    title="Custom QR Code"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QrTools;
