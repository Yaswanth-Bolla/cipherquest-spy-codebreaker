
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download } from 'lucide-react';
import QRCode from 'qrcode';

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  title?: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ value, size = 200, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 1,
        color: {
          dark: '#00FFCC',
          light: '#121212'
        }
      });
    }
  }, [value, size]);
  
  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `cipherquest-qr-${value.substring(0, 10)}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };
  
  return (
    <Card className="border-cipher-primary/30 bg-cipher-darker/80">
      <CardContent className="p-4 flex flex-col items-center">
        {title && <h3 className="text-center text-cipher-primary mb-2">{title}</h3>}
        
        <div className="bg-black p-4 rounded mb-3">
          <canvas ref={canvasRef} />
        </div>
        
        <div className="text-xs text-gray-500 mb-2 text-center">
          Value: {value}
        </div>
        
        <Button 
          onClick={handleDownload} 
          variant="outline" 
          size="sm"
          className="border-cipher-primary/50 text-cipher-primary hover:bg-cipher-primary/10"
        >
          <Download size={14} className="mr-1" /> Save QR Code
        </Button>
      </CardContent>
    </Card>
  );
};

export default QrCodeGenerator;
