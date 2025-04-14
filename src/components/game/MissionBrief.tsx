
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Lock } from 'lucide-react';

interface MissionBriefProps {
  title: string;
  content: string;
  onAccept: () => void;
}

const MissionBrief: React.FC<MissionBriefProps> = ({ title, content, onAccept }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30); // Speed of typing
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [content, currentIndex]);

  return (
    <Card className="border border-cipher-primary/50 bg-cipher-darker/80 shadow-lg shadow-cipher-primary/10 max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center mb-4 border-b pb-2 border-cipher-primary/30">
          <FileText className="text-cipher-primary mr-2" size={24} />
          <h2 className="text-xl font-bold text-cipher-primary">{title}</h2>
        </div>
        
        <div className="terminal-text mb-6 text-cipher-light min-h-[200px]">
          {displayedContent}
          <span className={`inline-block bg-cipher-primary w-2 h-4 ml-1 ${isTyping ? 'animate-pulse' : 'hidden'}`}></span>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={onAccept} 
            disabled={isTyping}
            className="bg-cipher-primary text-cipher-dark hover:bg-cipher-secondary flex items-center gap-2"
          >
            <Lock size={16} />
            Accept Mission
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionBrief;
