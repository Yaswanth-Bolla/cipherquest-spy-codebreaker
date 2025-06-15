
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy, Medal, Award, Clock, Star, Loader2, RefreshCw } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getLeaderboard, LeaderboardEntry } from '@/lib/supabase';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

const LEADERBOARD_MISSION_TOTAL = 15;

const getPlayerRank = (completedCount: number) => {
  if (completedCount >= 13) return "Master Cryptographer";
  if (completedCount >= 10) return "Senior Agent";
  if (completedCount >= 7) return "Field Operative";
  if (completedCount >= 4) return "Analyst";
  if (completedCount >= 1) return "Junior Agent";
  return "Recruit";
};

const Leaderboard = () => {
  const { progress } = useGame();
  const queryClient = useQueryClient();

  // Fetch leaderboard data from Supabase with auto-refresh
  const {
    data: leaderboardData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchInterval: 30000,
  });

  // Real-time listener for leaderboard changes
  useEffect(() => {
    // Listen to changes on the leaderboard table
    const channel = supabase
      .channel('realtime-leaderboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leaderboard' },
        (payload) => {
          console.log('Leaderboard realtime payload:', payload);
          // Invalidate and refetch leaderboard data
          queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const playerCompletedCount = progress.completedLevels.length;
  const playerRank = getPlayerRank(playerCompletedCount);

  const displayData = leaderboardData || [];

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-3" size={28} />
            <h1 className="text-2xl font-bold">Agent Leaderboard</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main leaderboard table */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="border-b">
              <h2 className="text-lg font-semibold">Top Field Agents</h2>
              <p className="text-sm text-muted-foreground">
                Complete missions to see your name here!
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin h-8 w-8 text-cipher-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>Error loading leaderboard data.</p>
                  <Button variant="outline" onClick={() => refetch()} className="mt-2">
                    Try Again
                  </Button>
                </div>
              ) : !displayData || displayData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No leaderboard data available yet.</p>
                  <p className="text-sm">
                    Complete missions to become the first elite cryptography agent on the leaderboard!
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead className="hidden sm:table-cell">Missions</TableHead>
                      <TableHead className="hidden md:table-cell">Total Time</TableHead>
                      <TableHead className="hidden sm:table-cell">Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayData.map((agent, index) => (
                      <TableRow key={agent.id} className="hover:bg-cipher-primary/10">
                        <TableCell className="font-medium">
                          {index === 0 ? (
                            <Award className="text-yellow-500" size={20} />
                          ) : index === 1 ? (
                            <Medal className="text-gray-400" size={20} />
                          ) : index === 2 ? (
                            <Medal className="text-amber-700" size={20} />
                          ) : (
                            `#${index + 1}`
                          )}
                        </TableCell>
                        <TableCell>{agent.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{agent.completedLevels}/{LEADERBOARD_MISSION_TOTAL}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {agent.totalTime}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{getPlayerRank(agent.completedLevels)}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {displayData.length === 0 && (
                    <TableCaption>No leaderboard data available</TableCaption>
                  )}
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Your stats card */}
          <Card>
            <CardHeader className="border-b">
              <h2 className="text-lg font-semibold">Your Status</h2>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-cipher-primary/20 flex items-center justify-center mb-4 border border-cipher-primary/30">
                  <Star className="text-cipher-primary h-12 w-12" />
                </div>
                
                <h3 className="font-bold text-lg mb-1">Field Agent</h3>
                <Badge variant="outline" className="mb-4">{playerRank}</Badge>
                
                <div className="w-full space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Missions Completed</span>
                      <span className="text-cyan-400 font-bold">{playerCompletedCount}/{LEADERBOARD_MISSION_TOTAL}</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full border border-gray-600">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full shadow-lg"
                        style={{ width: `${(playerCompletedCount / LEADERBOARD_MISSION_TOTAL) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground mt-4">
                    Complete more missions to increase your rank and appear on the leaderboard
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
