
import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center bg-cipher-darker border-b border-cipher-primary/20">
      <Link to="/" className="flex items-center gap-2">
        <Layers className="h-8 w-8 text-cipher-primary animate-pulse-glow" />
        <span className="text-xl font-bold text-cipher-primary tracking-wider spy-shadow">
          CIPHER<span className="text-white">QUEST</span>
        </span>
      </Link>
      
      <div className="flex gap-3">
        <Button variant="ghost" size="icon" className="text-cipher-light hover:bg-cipher-primary/20 hover:text-cipher-primary">
          <HelpCircle size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-cipher-light hover:bg-cipher-primary/20 hover:text-cipher-primary">
          <Settings size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
