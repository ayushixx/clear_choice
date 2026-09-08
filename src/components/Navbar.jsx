import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sun, Moon, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', subtitle: 'Overview & Mission' },
    { id: 'story', label: 'My Story', subtitle: '6 Years to Recovery' },
    { id: 'facts', label: 'Drug Facts', subtitle: 'Substance Library' },
    { id: 'quiz', label: 'Myth vs Fact', subtitle: 'Evidence & Reality' },
    { id: 'help', label: 'Get Help', subtitle: 'Rehab Map & Directory' },
    { id: 'blog', label: 'Blog', subtitle: 'Articles & Stories' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Minimal Emergency Bar */}
      <div className="bg-[#2E031D] text-[#FDF3F7] py-2 px-4 text-[11px] font-mono tracking-widest flex items-center justify-between max-w-7xl mx-auto border-b border-white/10">
        <span className="uppercase opacity-80 hidden sm:inline flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-[#DC2F87]" /> 24/7 Helpline & Recovery Journal
        </span>
        <a 
          href="tel:1800110031" 
          className="hover:underline flex items-center gap-1.5 text-[#FDF3F7] font-semibold w-full sm:w-auto justify-between sm:justify-start"
        >
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#DC2F87]" /> 24/7 Helpline: <strong>1800-11-0031</strong>
          </span>
          <span className="text-[10px] bg-[#DC2F87] text-white px-2 py-0.5 font-bold uppercase rounded-none sm:hidden">
            Call Free
          </span>
        </a>
      </div>

      {/* Main Publication Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md py-3 border-b border-editorial shadow-xs' 
          : 'bg-[var(--bg-primary)] py-4 border-b border-editorial'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="flex items-center gap-3 text-left group btn-tap"
          >
            <div className="w-8 h-8 rounded-none border border-current flex items-center justify-center font-serif font-bold text-xs tracking-tighter text-[#781353] dark:text-[#FDF3F7]">
              CC
            </div>
            <div>
              <span className="font-serif font-extrabold text-xl tracking-tight block leading-none text-[var(--text-primary)]">
                CLEAR CHOICE
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono block mt-1 text-muted">
                A Documentary on Recovery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 btn-tap ${
                    isActive
                      ? 'text-[#781353] dark:text-[#DC2F87] border-b-2 border-current'
                      : 'text-muted hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Theme Switcher & Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-editorial text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all btn-tap"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#2E031D]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300" />
              )}
            </button>

            <button
              onClick={() => {
                setActivePage('help');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#2E031D] dark:bg-[#FDF3F7] text-[#FDF3F7] dark:text-[#2E031D] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity btn-tap"
            >
              Get Crisis Help
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                setActivePage('help');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#781353] dark:bg-[#DC2F87] text-white px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider btn-tap"
            >
              Get Help
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-primary)] btn-tap"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] btn-tap"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* FULL-SCREEN GLASSMORPHIC MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl text-[var(--text-primary)] flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b border-editorial pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-current flex items-center justify-center font-serif font-bold text-xs">
                  CC
                </div>
                <div>
                  <span className="font-serif font-extrabold text-lg tracking-tight block">CLEAR CHOICE</span>
                  <span className="text-[9px] font-mono text-muted uppercase tracking-widest block">Navigation Menu</span>
                </div>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[var(--text-primary)] btn-tap"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Mobile Nav Links with Staggered Animations */}
            <div className="py-6 space-y-4 flex-1 flex flex-col justify-center">
              {navLinks.map((link, index) => {
                const isActive = activePage === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => {
                      setActivePage(link.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 border-l-2 transition-all btn-tap flex items-center justify-between ${
                      isActive 
                        ? 'border-[#781353] dark:border-[#DC2F87] bg-[var(--bg-secondary)]' 
                        : 'border-transparent hover:border-editorial'
                    }`}
                  >
                    <div>
                      <span className={`font-serif text-2xl block ${isActive ? 'font-bold text-[#781353] dark:text-[#DC2F87]' : 'font-semibold text-[var(--text-primary)]'}`}>
                        {link.label}
                      </span>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                        {link.subtitle}
                      </span>
                    </div>

                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#781353] dark:text-[#DC2F87]' : 'text-muted/40'}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Footer Action */}
            <div className="pt-4 border-t border-editorial space-y-3">
              <a
                href="tel:1800110031"
                className="w-full bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-3.5 text-center font-bold text-xs uppercase tracking-widest block transition-opacity btn-tap shadow-md"
              >
                📞 Call Crisis Helpline: 1800-11-0031
              </a>

              <div className="text-[10px] text-center font-mono text-muted">
                100% Free • Confidential • 24/7 Support Across India
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
