import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import LiveChatWidget from './components/LiveChatWidget';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import MyStory from './pages/MyStory';
import DrugFacts from './pages/DrugFacts';
import MythVsFact from './pages/MythVsFact';
import GetHelpHub from './pages/GetHelpHub';
import CrisisSupport from './pages/CrisisSupport';
import RecoveryCenters from './pages/RecoveryCenters';
import FindSupportNearYou from './pages/FindSupportNearYou';
import ContactCounselor from './pages/ContactCounselor';
import Blog from './pages/Blog';

const ROUTE_MAP = {
  '/': 'home',
  '/my-story': 'story',
  '/drug-facts': 'facts',
  '/myth-vs-fact': 'quiz',
  '/get-help': 'help',
  '/crisis-support': 'crisis-support',
  '/recovery-centers': 'recovery-centers',
  '/find-support': 'find-support',
  '/contact-counselor': 'contact-counselor',
  '/blog': 'blog'
};

const PAGE_TO_ROUTE = {
  home: '/',
  story: '/my-story',
  facts: '/drug-facts',
  quiz: '/myth-vs-fact',
  help: '/get-help',
  'crisis-support': '/crisis-support',
  'recovery-centers': '/recovery-centers',
  'find-support': '/find-support',
  'contact-counselor': '/contact-counselor',
  blog: '/blog'
};

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname;
    return ROUTE_MAP[path] || 'home';
  });

  const [selectedCenter, setSelectedCenter] = useState(null);
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

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setActivePage(ROUTE_MAP[path] || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetActivePage = (pageId) => {
    setActivePage(pageId);
    const targetRoute = PAGE_TO_ROUTE[pageId] || '/';
    if (window.location.pathname !== targetRoute) {
      window.history.pushState({}, '', targetRoute);
    }
  };

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
        return <Home setActivePage={handleSetActivePage} />;
      case 'story':
        return <MyStory setActivePage={handleSetActivePage} />;
      case 'facts':
        return <DrugFacts />;
      case 'quiz':
        return <MythVsFact setActivePage={handleSetActivePage} />;
      case 'help':
        return <GetHelpHub setActivePage={handleSetActivePage} />;
      case 'crisis-support':
        return <CrisisSupport setActivePage={handleSetActivePage} />;
      case 'recovery-centers':
        return <RecoveryCenters setActivePage={handleSetActivePage} setSelectedCenter={setSelectedCenter} />;
      case 'find-support':
        return <FindSupportNearYou setActivePage={handleSetActivePage} selectedCenter={selectedCenter} setSelectedCenter={setSelectedCenter} />;
      case 'contact-counselor':
        return <ContactCounselor setActivePage={handleSetActivePage} />;
      case 'blog':
        return <Blog />;
      default:
        return <Home setActivePage={handleSetActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#781353] selection:text-white transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handleSetActivePage} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Dynamic Main Page Content with Smooth Route Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Crisis Live Chat */}
      <LiveChatWidget setActivePage={handleSetActivePage} />

      {/* Footer */}
      <Footer 
        setActivePage={handleSetActivePage} 
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
