
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Brain, Award } from 'lucide-react';
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
    icon: BookOpen
  },
  {
    id: 'vigenere',
    title: 'Vigenère Cipher',
    description: 'Master polyalphabetic substitution',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: Brain
  },
  {
    id: 'base64',
    title: 'Base64 Encoding',
    description: 'Understand binary-to-text encoding',
    difficulty: 'Beginner',
    duration: '10 min',
    icon: Play
  },
  {
    id: 'hex',
    title: 'Hexadecimal Encoding',
    description: 'Learn hex representation of data',
    difficulty: 'Beginner',
    duration: '12 min',
    icon: Award
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
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                    <Badge 
                      variant={topic.difficulty === 'Beginner' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {topic.difficulty}
                    </Badge>
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
                Learning Path Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">1</Badge>
                  <span>Start with Caesar Cipher to understand substitution basics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">2</Badge>
                  <span>Learn Base64 and Hex encoding for data representation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">3</Badge>
                  <span>Master Vigenère Cipher for advanced techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">4</Badge>
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
