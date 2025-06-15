
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Brain, Award, Lock, Zap, Binary, Hash } from 'lucide-react';
import CipherTutorial from '@/components/tutorials/CipherTutorial';
import PracticeMode from '@/components/tutorials/PracticeMode';
import TheorySection from '@/components/tutorials/TheorySection';

const tutorialTopics = [
  {
    id: 'caesar',
    title: 'Caesar Cipher',
    description: 'Learn the basics of substitution ciphers',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: BookOpen,
    missionLevels: [1]
  },
  {
    id: 'text-reversal',
    title: 'Text Reversal',
    description: 'Simple text manipulation techniques',
    difficulty: 'Beginner',
    duration: '8 min',
    icon: Play,
    missionLevels: [2]
  },
  {
    id: 'a1z26',
    title: 'A1Z26 Cipher',
    description: 'Number-to-letter substitution',
    difficulty: 'Beginner',
    duration: '12 min',
    icon: Hash,
    missionLevels: [3]
  },
  {
    id: 'binary',
    title: 'Binary Code',
    description: 'Binary representation and ASCII conversion',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: Binary,
    missionLevels: [4]
  },
  {
    id: 'morse',
    title: 'Morse Code',
    description: 'Dots and dashes communication',
    difficulty: 'Beginner',
    duration: '10 min',
    icon: Zap,
    missionLevels: [5]
  },
  {
    id: 'base64',
    title: 'Base64 Encoding',
    description: 'Understand binary-to-text encoding',
    difficulty: 'Beginner',
    duration: '10 min',
    icon: Play,
    missionLevels: [6]
  },
  {
    id: 'vigenere',
    title: 'Vigenère Cipher',
    description: 'Master polyalphabetic substitution',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: Brain,
    missionLevels: [7]
  },
  {
    id: 'rail-fence',
    title: 'Rail Fence Cipher',
    description: 'Zigzag pattern encryption',
    difficulty: 'Intermediate',
    duration: '18 min',
    icon: Award,
    missionLevels: [8]
  },
  {
    id: 'hex',
    title: 'Hexadecimal Encoding',
    description: 'Learn hex representation of data',
    difficulty: 'Beginner',
    duration: '12 min',
    icon: Hash,
    missionLevels: [9]
  },
  {
    id: 'atbash',
    title: 'Atbash Cipher',
    description: 'Ancient mirror alphabet cipher',
    difficulty: 'Intermediate',
    duration: '15 min',
    icon: Lock,
    missionLevels: [10]
  },
  {
    id: 'rot13',
    title: 'ROT13',
    description: 'Simple rotation cipher',
    difficulty: 'Intermediate',
    duration: '12 min',
    icon: Play,
    missionLevels: [11]
  }
];

const Tutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (selectedTutorial) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTutorial(null)}
              className="mb-4"
            >
              ← Back to Tutorials
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theory">Theory</TabsTrigger>
              <TabsTrigger value="tutorial">Step-by-Step</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="theory" className="mt-6">
              <TheorySection tutorialId={selectedTutorial} />
            </TabsContent>
            
            <TabsContent value="tutorial" className="mt-6">
              <CipherTutorial tutorialId={selectedTutorial} />
            </TabsContent>
            
            <TabsContent value="practice" className="mt-6">
              <PracticeMode tutorialId={selectedTutorial} />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cipher-primary to-cipher-secondary bg-clip-text text-transparent">
            Cryptography Academy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of cryptography with interactive tutorials, step-by-step guides, and hands-on practice.
            Learn the techniques used in your missions!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorialTopics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card 
                key={topic.id}
                className="border-cipher-primary/20 hover:border-cipher-primary/40 transition-all cursor-pointer group"
                onClick={() => setSelectedTutorial(topic.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-8 h-8 text-cipher-primary group-hover:scale-110 transition-transform" />
                    <div className="flex gap-2">
                      <Badge 
                        variant={topic.difficulty === 'Beginner' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {topic.difficulty}
                      </Badge>
                      {topic.missionLevels.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          Lvl {topic.missionLevels.join(', ')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-cipher-primary transition-colors">
                    {topic.title}
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Duration: {topic.duration}
                    </span>
                    <Button size="sm" className="bg-cipher-primary hover:bg-cipher-secondary">
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-cipher-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Brain className="w-6 h-6 text-cipher-primary" />
                Mission-Based Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">1-6</Badge>
                  <span>Basic Encryption: Caesar, Reversal, Numbers, Binary, Morse, Base64</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">7-11</Badge>
                  <span>Intermediate Ciphers: Vigenère, Rail Fence, Hex, Atbash, ROT13</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">12-15</Badge>
                  <span>Advanced Cryptanalysis: Hash Cracking, RSA, Enigma, Steganography</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">∞</Badge>
                  <span>Apply skills in the main mission challenges</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;
