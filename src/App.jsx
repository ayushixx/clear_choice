import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import LiveChatWidget from './components/LiveChatWidget';

import Home from './pages/Home';
import MyStory from './pages/MyStory';
import DrugFacts from './pages/DrugFacts';
import MythVsFact from './pages/MythVsFact';
import GetHelp from './pages/GetHelp';
import Blog from './pages/Blog';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });

  // Light / Dark Theme state saved in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('clearchoice_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('clearchoice_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openLegalModal = (type) => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: 'privacy' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'story':
        return <MyStory setActivePage={setActivePage} />;
      case 'facts':
        return <DrugFacts />;
      case 'quiz':
        return <MythVsFact setActivePage={setActivePage} />;
      case 'help':
        return <GetHelp />;
      case 'blog':
        return <Blog />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#781353] selection:text-white transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Dynamic Main Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Floating Crisis Live Chat */}
      <LiveChatWidget setActivePage={setActivePage} />

      {/* Footer */}
      <Footer 
        setActivePage={setActivePage} 
        openLegalModal={openLegalModal} 
      />

      {/* Legal Privacy / Disclaimer Modal */}
      <LegalModal 
        isOpen={legalModal.isOpen} 
        modalType={legalModal.type} 
        onClose={closeLegalModal} 
      />
    </div>
  );
}
