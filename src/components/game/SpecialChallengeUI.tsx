
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MapPin, Navigation, QrCode } from 'lucide-react';

interface LocationRequirement {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  locationName: string;
}

interface SpecialChallengeUIProps {
  requiresLocation?: LocationRequirement;
  requiresQrCode?: boolean;
  locationVerified: boolean;
  qrCodeScanned: boolean;
  locationLoading: boolean;
  isMobile: boolean;
  onCheckLocation: () => void;
  onScanQrCode: () => void;
}

const SpecialChallengeUI: React.FC<SpecialChallengeUIProps> = ({
  requiresLocation,
  requiresQrCode,
  locationVerified,
  qrCodeScanned,
  locationLoading,
  isMobile,
  onCheckLocation,
  onScanQrCode
}) => {
  if (requiresLocation) {
    return (
      <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded mb-6">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm text-cipher-secondary mb-2 flex items-center">
              <MapPin size={16} className="mr-1" />
              LOCATION VERIFICATION:
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              You need to be physically at: {requiresLocation.locationName}
            </p>
            <div className="text-xs text-gray-500">
              {locationVerified ? (
                <span className="text-green-500 flex items-center">
                  <CheckCircle2 size={14} className="mr-1" />
                  Location verified
                </span>
              ) : (
                <span>Location status: not verified</span>
              )}
            </div>
          </div>
          
          <Button 
            onClick={onCheckLocation}
            disabled={locationVerified}
            className="bg-cipher-primary hover:bg-cipher-secondary text-black"
          >
            <Navigation size={16} className="mr-2" />
            {locationLoading ? "Checking..." : "Verify Location"}
          </Button>
        </div>
      </div>
    );
  }
  
  if (requiresQrCode) {
    return (
      <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded mb-6">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm text-cipher-secondary mb-2 flex items-center">
              <QrCode size={16} className="mr-1" />
              QR CODE MISSION:
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Scan the mission QR code to retrieve encrypted data
            </p>
            <div className="text-xs text-gray-500">
              {qrCodeScanned ? (
                <span className="text-green-500 flex items-center">
                  <CheckCircle2 size={14} className="mr-1" />
                  QR code scanned
                </span>
              ) : (
                <span>QR status: not scanned</span>
              )}
            </div>
          </div>
          
          <Button 
            onClick={onScanQrCode}
            disabled={!isMobile}
            className="bg-cipher-primary hover:bg-cipher-secondary text-black"
          >
            <QrCode size={16} className="mr-2" />
            Scan QR Code
          </Button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default SpecialChallengeUI;
