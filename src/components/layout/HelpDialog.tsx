
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cipher-darker border-cipher-primary/50 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-cipher-primary text-xl">CipherQuest Help</DialogTitle>
          <DialogDescription className="text-gray-400">
            Learn how to play and decrypt messages like a master spy.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="pr-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-to-play">
                <AccordionTrigger className="text-white">How to Play</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>CipherQuest is a cryptography-based puzzle game where you play as a secret agent decoding encrypted messages.</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Select a mission from the Mission Selection screen</li>
                    <li>Read the mission brief carefully</li>
                    <li>Decrypt the encrypted message using the specified cryptography method</li>
                    <li>Enter your solution and submit it</li>
                    <li>Complete missions to unlock more advanced challenges</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="crypto-methods">
                <AccordionTrigger className="text-white">Cryptography Methods</AccordionTrigger>
                <AccordionContent className="text-gray-300 space-y-3">
                  <div>
                    <h4 className="font-bold">Caesar Cipher</h4>
                    <p>Shifts each letter in the plaintext by a fixed number of positions in the alphabet.</p>
                    <p className="text-xs mt-1 text-gray-500">Example: With a shift of 3, 'A' becomes 'D', 'B' becomes 'E', etc.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Vigenère Cipher</h4>
                    <p>Uses a keyword to determine different shift values for each position in the text.</p>
                    <p className="text-xs mt-1 text-gray-500">Example: With key 'KEY', the shifts would be 10, 4, 24, then repeat.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Base64 & Hex</h4>
                    <p>Base64 encodes binary data as ASCII text. Hexadecimal represents binary data as base-16 numbers.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">AES Encryption</h4>
                    <p>Advanced Encryption Standard - a symmetric encryption algorithm used worldwide.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Hashing (SHA-256)</h4>
                    <p>Creates a fixed-length string from input data. Cannot be reversed, only compared.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Steganography</h4>
                    <p>The practice of hiding messages within other non-secret data or media.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="hints">
                <AccordionTrigger className="text-white">Using Hints</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>If you get stuck, you can use the hint system:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Each mission has multiple hints available</li>
                    <li>Click the "Request Hint" button to reveal a hint</li>
                    <li>Additional hints can be revealed by clicking "Next Hint"</li>
                    <li>Using hints is tracked in your mission logs</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="progression">
                <AccordionTrigger className="text-white">Game Progression</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>CipherQuest features a progressive difficulty curve:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Complete missions to unlock new ones</li>
                    <li>Earlier missions teach concepts needed for later challenges</li>
                    <li>Your progress is saved automatically</li>
                    <li>Earn ranks based on missions completed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="about">
                <AccordionTrigger className="text-white">About CipherQuest</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>CipherQuest was designed to teach real cryptography concepts through an engaging spy narrative.</p>
                  <p className="mt-2">Learn about encryption methods used throughout history and in modern security systems while solving challenging puzzles.</p>
                  <p className="mt-2">Track your progress, compete for high scores, and become a master cryptographer!</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
