
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { sendChatMessage } from '@/lib/chatService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello, Agent! I\'m your cybersecurity and cryptography assistant. Ask me anything related to encryption, security protocols, or digital forensics.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(currentMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m experiencing technical difficulties. Please try again later.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-cipher-primary hover:bg-cipher-primary/90 border-2 border-cipher-primary/50",
          "transition-all duration-300 hover:scale-110 animate-pulse-glow",
          isOpen && "hidden"
        )}
        size="icon"
      >
        <Bot className="h-6 w-6 text-cipher-dark" />
      </Button>

      {/* Chat Panel with Background Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Background Overlay - Dull/Dimmed Background */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Chat Panel - Fully Opaque */}
          <Card className="absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-cipher-darker border-l-2 border-cipher-primary/50 animate-in slide-in-from-right duration-300">
            <CardHeader className="border-b border-cipher-primary/30 bg-cipher-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cipher-primary" />
                  <CardTitle className="text-cipher-primary">Cyber Assistant</CardTitle>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-cipher-light hover:text-cipher-primary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Cybersecurity & Cryptography Expert
              </Badge>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[calc(100%-120px)]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.isUser
                            ? "bg-cipher-primary text-cipher-dark"
                            : "bg-cipher-dark border border-cipher-primary/30 text-cipher-light"
                        )}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-cipher-dark border border-cipher-primary/30 rounded-lg px-3 py-2 text-sm text-cipher-light">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-cipher-primary/30 p-4 bg-cipher-dark">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about cybersecurity or cryptography..."
                    className="flex-1 bg-cipher-darker border-cipher-primary/30 text-cipher-light placeholder:text-cipher-light/60"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    size="icon"
                    className="bg-cipher-primary hover:bg-cipher-primary/90 text-cipher-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
