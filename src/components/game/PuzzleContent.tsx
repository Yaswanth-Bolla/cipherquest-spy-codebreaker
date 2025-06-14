
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';

interface PuzzleContentProps {
  challenge: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  showHint: boolean;
  hintIndex: number;
  hints: string[];
}

const PuzzleContent: React.FC<PuzzleContentProps> = ({
  challenge,
  answer,
  onAnswerChange,
  showHint,
  hintIndex,
  hints
}) => {
  return (
    <>
      <div className="bg-black/40 border border-cipher-primary/20 p-4 rounded font-mono text-gray-300 mb-6 scanner">
        <h3 className="text-sm text-cipher-secondary mb-2">ENCRYPTED MESSAGE:</h3>
        <div className="whitespace-pre-wrap break-words">
          {challenge}
        </div>
      </div>
      
      {showHint && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded mb-6">
          <div className="flex items-start">
            <Lightbulb className="text-yellow-500 mr-2 mt-1" size={18} />
            <div>
              <h3 className="text-sm text-yellow-500 mb-1">HINT {hintIndex + 1}/{hints.length}:</h3>
              <p className="text-gray-300 text-sm">{hints[hintIndex]}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="answer" className="block text-sm text-gray-400 mb-2">
          Enter your decrypted message:
        </label>
        <Textarea 
          id="answer"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="bg-black/50 border-cipher-primary/30 text-white font-mono"
          rows={4}
          required
        />
      </div>
    </>
  );
};

export default PuzzleContent;
