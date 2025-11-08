import React from 'react';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MainLayout;
