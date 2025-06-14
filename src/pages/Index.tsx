
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Play, Trophy, Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="w-12 h-12 text-cipher-primary mx-auto mb-4 animate-pulse" />
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-20 h-20 text-cipher-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cipher-primary to-cipher-secondary bg-clip-text text-transparent">
            CipherQuest
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Welcome to the ultimate cryptographic adventure. Decode secrets, solve puzzles, and become a master cryptographer.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cipher-primary hover:bg-cipher-secondary">
                <Link to="/auth" className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Join the Agency
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/levels" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Browse Missions
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cipher-primary hover:bg-cipher-secondary">
                <Link to="/levels" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Continue Missions
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/leaderboard" className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  View Leaderboard
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-cipher-primary/20 hover:border-cipher-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-cipher-primary" />
                50+ Missions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Progressive difficulty levels from basic ciphers to advanced cryptographic challenges.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-cipher-primary/20 hover:border-cipher-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-cipher-primary" />
                Compete & Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track your progress and compete with other agents on the global leaderboard.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-cipher-primary/20 hover:border-cipher-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-cipher-primary" />
                Learn & Grow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interactive tutorials and hints help you master the art of cryptography.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {user && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Welcome back, Agent {user.email?.split('@')[0]}! Ready for your next mission?
            </p>
          </div>
        )}

        {!user && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ready to start your journey as a cryptographic agent?
            </p>
            <Button asChild variant="outline">
              <Link to="/auth">Create Your Agent Profile</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
