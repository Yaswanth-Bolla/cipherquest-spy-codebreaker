
import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { QrCode, Camera } from "lucide-react";

interface QrCodeScannerProps {
  onScan: (decodedText: string) => void;
  onClose?: () => void;
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScan, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerElement, setScannerElement] = useState<HTMLDivElement | null>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const isMobile = useIsMobile();
  
  const startScanner = async () => {
    if (!scannerElement || scanner) return;
    
    try {
      const newScanner = new Html5Qrcode("qr-scanner");
      setScanner(newScanner);
      setIsScanning(true);
      
      const constraints = isMobile 
        ? { facingMode: { exact: "environment" } } // Use back camera on mobile
        : true; // Use any camera on desktop

      await newScanner.start(
        { facingMode: constraints },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // On successful scan
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // QR scan error (ignored to prevent error spam)
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setIsScanning(false);
    }
  };
  
  const stopScanner = () => {
    if (scanner && isScanning) {
      scanner.stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch(err => console.error("Error stopping scanner:", err));
    }
  };
  
  useEffect(() => {
    return () => {
      if (scanner && isScanning) {
        scanner.stop().catch(err => console.error("Error stopping scanner:", err));
      }
    };
  }, [scanner, isScanning]);
  
  return (
    <Card className="w-full max-w-md mx-auto bg-cipher-darker border-cipher-primary/20">
      <CardContent className="p-4">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold text-cipher-primary mb-2">
            <QrCode className="inline mr-2" size={18} /> 
            QR Code Scanner
          </h3>
          <p className="text-sm text-gray-400">
            Point your camera at the mission QR code to scan
          </p>
        </div>
        
        <div 
          id="qr-scanner"
          ref={setScannerElement}
          className="relative w-full h-64 bg-black rounded overflow-hidden mb-4"
          style={{ minHeight: "250px" }}
        />
        
        <div className="flex justify-between">
          {!isScanning ? (
            <Button 
              onClick={startScanner} 
              className="bg-cipher-primary hover:bg-cipher-secondary text-black"
            >
              <Camera className="mr-2" size={16} />
              Start Scanner
            </Button>
          ) : (
            <Button 
              onClick={stopScanner} 
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-900/20"
            >
              Stop Scanner
            </Button>
          )}
          
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeScanner;
