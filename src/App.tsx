
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { setupSupabaseSchema } from "@/lib/setupSupabase";
import { toast } from "sonner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Tutorials from "./pages/Tutorials";
import LevelSelect from "./pages/LevelSelect";
import Level from "./pages/Level";
import Leaderboard from "./pages/Leaderboard";
import QrTools from "./pages/QrTools";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { handleEasterEggKeydown } from '@/utils/easterEggs';

const queryClient = new QueryClient();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        await setupSupabaseSchema();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to setup Supabase schema:", error);
        toast.error("Failed to connect to Supabase. Some features may not work correctly.");
        setIsInitialized(true);
      }
    };

    initializeSupabase();

    // Initialize easter eggs
    window.addEventListener('keydown', handleEasterEggKeydown);
    return () => window.removeEventListener('keydown', handleEasterEggKeydown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <GameProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/levels" element={
                    <ProtectedRoute>
                      <LevelSelect />
                    </ProtectedRoute>
                  } />
                  <Route path="/level/:levelId" element={
                    <ProtectedRoute>
                      <Level />
                    </ProtectedRoute>
                  } />
                  <Route path="/leaderboard" element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/qr-tools" element={
                    <ProtectedRoute>
                      <QrTools />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </GameProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
