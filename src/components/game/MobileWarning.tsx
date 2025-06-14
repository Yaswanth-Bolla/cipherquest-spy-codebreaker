
import React from 'react';
import { Smartphone } from 'lucide-react';

interface MobileWarningProps {
  requiresLocation: boolean;
  requiresQrCode: boolean;
}

const MobileWarning: React.FC<MobileWarningProps> = ({ requiresLocation, requiresQrCode }) => {
  return (
    <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded mb-6">
      <div className="flex items-start">
        <Smartphone className="text-yellow-500 mr-2 mt-1" size={18} />
        <div>
          <h3 className="text-sm text-yellow-500 mb-1">MOBILE DEVICE REQUIRED</h3>
          <p className="text-gray-300 text-sm">
            This mission requires a mobile device with {requiresLocation ? 'GPS capabilities' : ''} 
            {requiresLocation && requiresQrCode ? ' and ' : ''}
            {requiresQrCode ? 'a camera for QR scanning' : ''}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
