
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import { setupSupabaseSchema } from "@/lib/setupSupabase";
import Index from "./pages/Index";
import LevelSelect from "./pages/LevelSelect";
import Level from "./pages/Level";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup Supabase schema if needed
    setupSupabaseSchema().catch(error => {
      console.error("Failed to setup Supabase schema:", error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/levels" element={<LevelSelect />} />
                <Route path="/level/:levelId" element={<Level />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
