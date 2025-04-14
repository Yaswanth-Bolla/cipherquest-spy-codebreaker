
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle 
          pressed={theme === 'dark'} 
          onPressedChange={toggleTheme}
          aria-label="Toggle theme"
          className="text-cipher-light hover:bg-cipher-primary/20 hover:text-cipher-primary"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {theme === 'dark' ? 'light' : 'dark'} theme</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
