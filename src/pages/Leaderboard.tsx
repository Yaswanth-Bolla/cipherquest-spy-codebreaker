
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy, Medal, Award, Clock, Star } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Badge } from '@/components/ui/badge';

// Placeholder leaderboard data - in a real app, this would come from a database
const topAgents = [
  { id: 1, name: "Agent Shadow", completedLevels: 10, totalTime: "01:45:22", rank: "Master Cryptographer" },
  { id: 2, name: "CodeBreaker", completedLevels: 9, totalTime: "02:10:45", rank: "Senior Agent" },
  { id: 3, name: "CipherHunter", completedLevels: 8, totalTime: "02:30:18", rank: "Field Operative" },
  { id: 4, name: "NightCoder", completedLevels: 7, totalTime: "02:55:40", rank: "Analyst" },
  { id: 5, name: "BinaryPhantom", completedLevels: 6, totalTime: "03:15:50", rank: "Recruit" },
];

const Leaderboard = () => {
  const { progress } = useGame();
  
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

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Trophy className="text-yellow-500 mr-3" size={28} />
          <h1 className="text-2xl font-bold text-white">Agent Leaderboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main leaderboard table */}
          <Card className="col-span-1 lg:col-span-2 bg-cipher-darker border-cipher-primary/50">
            <CardHeader className="border-b border-cipher-primary/30">
              <h2 className="text-lg font-semibold text-white">Top Field Agents</h2>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-cipher-dark/50">
                  <tr className="text-left text-xs uppercase text-gray-500">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Agent</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Missions</th>
                    <th className="py-3 px-4 hidden md:table-cell">Total Time</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {topAgents.map((agent, index) => (
                    <tr key={agent.id} className="text-gray-300 hover:bg-cipher-primary/10">
                      <td className="py-3 px-4 font-medium">
                        {index === 0 ? (
                          <Award className="text-yellow-500" size={20} />
                        ) : index === 1 ? (
                          <Medal className="text-gray-400" size={20} />
                        ) : index === 2 ? (
                          <Medal className="text-amber-700" size={20} />
                        ) : (
                          `#${index + 1}`
                        )}
                      </td>
                      <td className="py-3 px-4">{agent.name}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">{agent.completedLevels}/10</td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {agent.totalTime}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <Badge className="bg-cipher-primary text-xs">{agent.rank}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Your stats card */}
          <Card className="bg-cipher-darker border-cipher-primary/50">
            <CardHeader className="border-b border-cipher-primary/30">
              <h2 className="text-lg font-semibold text-white">Your Status</h2>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-cipher-primary/20 flex items-center justify-center mb-4 border border-cipher-primary/30">
                  <Star className="text-cipher-primary h-12 w-12" />
                </div>
                
                <h3 className="font-bold text-lg mb-1">Field Agent</h3>
                <Badge className="mb-4">{playerRank}</Badge>
                
                <div className="w-full space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Missions Completed</span>
                      <span className="text-cipher-primary">{playerCompletedCount}/10</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full">
                      <div 
                        className="h-full bg-cipher-primary rounded-full"
                        style={{ width: `${(playerCompletedCount / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500 mt-4">
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
