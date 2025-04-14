
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy, Medal, Award, Clock, Star, Loader2 } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Badge } from '@/components/ui/badge';
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

const Leaderboard = () => {
  const { progress } = useGame();
  const [isLocalUser, setIsLocalUser] = useState(true);
  
  // Fetch leaderboard data from Supabase
  const { data: leaderboardData, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
  });

  // Calculate player rank based on completed missions
  const getPlayerRank = (completedCount: number) => {
    if (completedCount >= 9) return "Master Cryptographer";
    if (completedCount >= 7) return "Senior Agent";
    if (completedCount >= 5) return "Field Operative";
    if (completedCount >= 3) return "Analyst";
    return "Recruit";
  };

  const playerCompletedCount = progress.completedLevels.length;
  const playerRank = getPlayerRank(playerCompletedCount);

  // Fallback data in case of error or empty response
  const fallbackData: LeaderboardEntry[] = [
    { id: 1, name: "Agent Shadow", completedLevels: 10, totalTime: "01:45:22", rank: "Master Cryptographer" },
    { id: 2, name: "CodeBreaker", completedLevels: 9, totalTime: "02:10:45", rank: "Senior Agent" },
    { id: 3, name: "CipherHunter", completedLevels: 8, totalTime: "02:30:18", rank: "Field Operative" },
    { id: 4, name: "NightCoder", completedLevels: 7, totalTime: "02:55:40", rank: "Analyst" },
    { id: 5, name: "BinaryPhantom", completedLevels: 6, totalTime: "03:15:50", rank: "Recruit" },
  ];

  // Use real data if available, otherwise use fallback
  const displayData = (leaderboardData && leaderboardData.length > 0) ? leaderboardData : fallbackData;

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-3" size={28} />
            <h1 className="text-2xl font-bold">Agent Leaderboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main leaderboard table */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="border-b">
              <h2 className="text-lg font-semibold">Top Field Agents</h2>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin h-8 w-8 text-cipher-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>Error loading leaderboard data.</p>
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
                        <TableCell className="hidden sm:table-cell">{agent.completedLevels}/10</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {agent.totalTime}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{agent.rank}</Badge>
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
                      <span className="text-cipher-primary">{playerCompletedCount}/10</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div 
                        className="h-full bg-cipher-primary rounded-full"
                        style={{ width: `${(playerCompletedCount / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground mt-4">
                    Complete more missions to increase your rank
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
