
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 px-6 text-xs text-center border-t border-cipher-primary/20 text-gray-500">
      <div className="flex items-center justify-center gap-1">
        <Shield size={12} className="text-cipher-primary" />
        <span>CipherQuest Intelligence Agency</span>
        <Shield size={12} className="text-cipher-primary" />
      </div>
      <div className="mt-1">
        Top Secret • Authorized Personnel Only • {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
