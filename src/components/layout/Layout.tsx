
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '@/components/chat/ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cipher-dark crt-effect">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
