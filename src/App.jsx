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
import Testimonies from './pages/Testimonies';
import AdminPanel from './pages/AdminPanel';
import RecoveryDashboard from './components/RecoveryDashboard';

const ROUTE_MAP = {
  '/': 'home',
  '': 'home',
  '/index.html': 'home',
  '/my-story': 'story',
  '/drug-facts': 'facts',
  '/myth-vs-fact': 'quiz',
  '/get-help': 'help',
  '/get-help-hub': 'help',
  '/my-dashboard': 'dashboard',
  '/crisis-support': 'crisis-support',
  '/recovery-centers': 'recovery-centers',
  '/find-support': 'find-support',
  '/contact-counselor': 'contact-counselor',
  '/testimonies': 'testimonies',
  '/blog': 'blog',
  '/admin': 'admin'
};

const PAGE_TO_ROUTE = {
  home: '/',
  story: '/my-story',
  facts: '/drug-facts',
  quiz: '/myth-vs-fact',
  help: '/get-help',
  dashboard: '/my-dashboard',
  'crisis-support': '/crisis-support',
  'recovery-centers': '/recovery-centers',
  'find-support': '/find-support',
  'contact-counselor': '/contact-counselor',
  testimonies: '/testimonies',
  blog: '/blog',
  admin: '/admin'
};

function getPageFromPath(pathname) {
  if (!pathname || pathname === '/' || pathname === '/index.html' || pathname === '') {
    return 'home';
  }
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return ROUTE_MAP[cleanPath] || 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const [selectedCenter, setSelectedCenter] = useState(null);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });

  // Ensure root stays in standard light mode
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove('dark');
    if (body) body.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = '#FFFFFF';
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
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
      case 'dashboard':
      case 'crisis-support':
        return <ContactCounselor setActivePage={handleSetActivePage} />;
      case 'recovery-centers':
        return <RecoveryCenters setActivePage={handleSetActivePage} setSelectedCenter={setSelectedCenter} />;
      case 'find-support':
        return <FindSupportNearYou setActivePage={handleSetActivePage} selectedCenter={selectedCenter} setSelectedCenter={setSelectedCenter} />;
      case 'contact-counselor':
        return <ContactCounselor setActivePage={handleSetActivePage} />;
      case 'blog':
        return <Blog />;
      case 'testimonies':
        return <Testimonies setActivePage={handleSetActivePage} />;
      case 'admin':
        return <AdminPanel setActivePage={handleSetActivePage} />;
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
