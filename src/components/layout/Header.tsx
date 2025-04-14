
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, HelpCircle, Settings, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="py-4 px-6 flex justify-between items-center bg-cipher-darker border-b border-cipher-primary/20">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Layers className="h-8 w-8 text-cipher-primary animate-pulse-glow" />
          <span className="text-xl font-bold text-cipher-primary tracking-wider spy-shadow">
            CIPHER<span className="text-white">QUEST</span>
          </span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:bg-cipher-primary/20 hover:text-cipher-primary">
                Missions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/levels"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cipher-primary/20 hover:text-cipher-primary"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">Mission Selection</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Browse and select crypto missions to complete
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/leaderboard"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cipher-primary/20 hover:text-cipher-primary"
                      >
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">Agent Leaderboard</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          See top agents and your current ranking
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setHelpOpen(true)}
          className="text-cipher-light hover:bg-cipher-primary/20 hover:text-cipher-primary"
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSettingsOpen(true)}
          className="text-cipher-light hover:bg-cipher-primary/20 hover:text-cipher-primary"
          aria-label="Settings"
        >
          <Settings size={20} />
        </Button>
      </div>
      
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};

export default Header;
