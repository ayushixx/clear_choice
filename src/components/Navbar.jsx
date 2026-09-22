import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowRight, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Navbar({ activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileHelpExpand, setMobileHelpExpand] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', subtitle: 'Overview & Mission' },
    { id: 'story', label: 'My Story', subtitle: '6 Years to Recovery' },
    { id: 'facts', label: 'Drug Facts', subtitle: 'Substance Library' },
    { id: 'quiz', label: 'Myth vs Fact', subtitle: 'Evidence & Reality' },
    { id: 'help', label: 'Get Help', subtitle: 'Services & Directory', hasDropdown: true },
    { id: 'blog', label: 'Blog', subtitle: 'Articles & Stories' },
  ];

  const helpSubItems = [
    { id: 'help', label: 'Get Help Hub', subtitle: 'Decision & Intent Center' },
    { id: 'dashboard', label: 'My Recovery Dashboard', subtitle: 'My Recovery Journey' },
    { id: 'crisis-support', label: 'Crisis Support', subtitle: 'Immediate 24/7 Hotline' },
    { id: 'recovery-centers', label: 'Recovery Centers', subtitle: 'Rehab Directory & Search' },
    { id: 'find-support', label: 'Find Support Near You', subtitle: 'Interactive GPS Map' },
    { id: 'contact-counselor', label: 'Contact Counselor', subtitle: 'Confidential Inquiry & Callback' },
  ];

  const isHelpActive = ['help', 'dashboard', 'crisis-support', 'recovery-centers', 'find-support', 'contact-counselor'].includes(activePage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Minimal Emergency Bar */}
      <div className="bg-[#2E031D] text-[#FDF3F7] py-1 px-3 sm:px-4 text-[10px] sm:text-[11px] font-mono tracking-widest flex items-center justify-between max-w-7xl mx-auto border-b border-white/10 pt-[calc(0.25rem+env(safe-area-inset-top,0px))]">
        <span className="uppercase opacity-80 hidden sm:inline-flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-[#DC2F87]" /> 24/7 Helpline & Recovery Journal
        </span>
        <a 
          href="tel:1800110031" 
          className="hover:underline flex items-center gap-1.5 text-[#FDF3F7] font-semibold w-full sm:w-auto justify-between sm:justify-start"
        >
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#DC2F87]" /> 24/7 Helpline: <strong>1800-11-0031</strong>
          </span>
          <span className="text-[9px] bg-[#DC2F87] text-white px-2 py-0.5 font-bold uppercase rounded-none sm:hidden">
            Call Free
          </span>
        </a>
      </div>

      {/* Main Publication Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-primary)] py-2 sm:py-3 border-b border-editorial shadow-xs' 
          : 'bg-[var(--bg-primary)] py-2.5 sm:py-3.5 border-b border-editorial'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Image Asset */}
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="flex items-center gap-2.5 sm:gap-3 text-left group btn-tap"
          >
            <img 
              src="/assets/logo.png" 
              alt="CLEAR CHOICE Logo" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <div>
              <span className="font-serif font-extrabold text-base sm:text-xl tracking-tight block leading-none text-[var(--text-primary)]">
                CLEAR CHOICE
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono block mt-0.5 text-muted">
                A Documentary on Recovery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.id} className="relative" ref={dropdownRef}>
                    <button
                      onMouseEnter={() => setDropdownOpen(true)}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1.5 flex items-center gap-1 btn-tap ${
                        isHelpActive
                          ? 'text-[#781353]'
                          : 'text-muted hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      {isHelpActive && (
                        <motion.div
                          layoutId="activeNavLine"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#781353]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Desktop Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          onMouseLeave={() => setDropdownOpen(false)}
                          className="absolute left-0 top-full mt-2 w-64 bg-[var(--bg-card)] border border-editorial shadow-xl p-2 z-50 space-y-1 rounded-2xl"
                        >
                          <div className="px-3 py-1.5 border-b border-editorial text-[9px] font-mono uppercase font-bold text-muted">
                            Select Assistance Goal:
                          </div>
                          {helpSubItems.map((sub) => {
                            const isSubActive = activePage === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActivePage(sub.id);
                                  setDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between text-xs btn-tap ${
                                  isSubActive
                                    ? 'bg-[var(--bg-secondary)] text-[#781353] font-bold border-l-2 border-[#781353]'
                                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                                }`}
                              >
                                <div>
                                  <span className="block font-serif text-xs font-bold">{sub.label}</span>
                                  <span className="block text-[9px] font-mono text-muted">{sub.subtitle}</span>
                                </div>
                                <ArrowRight className="w-3 h-3 text-muted/50" />
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1.5 btn-tap ${
                    isActive
                      ? 'text-[#781353]'
                      : 'text-muted hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#781353]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <MagneticButton
              onClick={() => {
                setActivePage('crisis-support');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#2E031D] text-[#FDF3F7] px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity btn-tap touch-target shadow-md rounded-full"
            >
              Crisis Hotline 24/7
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[var(--text-primary)] btn-tap touch-target flex items-center justify-center rounded-full border border-editorial bg-[var(--bg-secondary)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* SOLID SLIDE-IN MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="md:hidden fixed inset-0 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between p-5 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto rounded-b-3xl border-b border-editorial shadow-2xl"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b border-editorial pb-4">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/assets/logo.png" 
                  alt="CLEAR CHOICE Logo" 
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <span className="font-serif font-extrabold text-lg tracking-tight block text-[var(--text-primary)]">CLEAR CHOICE</span>
                  <span className="text-[9px] font-mono text-muted uppercase tracking-widest block">Documentary & Recovery</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-[var(--text-primary)] btn-tap touch-target flex items-center justify-center rounded-full border border-editorial bg-[var(--bg-secondary)]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Nav Links with Accordion for Get Help */}
            <div className="py-6 space-y-3 flex-1 flex flex-col justify-center">
              {navLinks.map((link, index) => {
                if (link.id === 'help') {
                  return (
                    <div key={link.id} className="space-y-1.5">
                      <button
                        onClick={() => setMobileHelpExpand(!mobileHelpExpand)}
                        className={`w-full text-left p-4 rounded-2xl transition-all btn-tap flex items-center justify-between touch-target ${
                          isHelpActive
                            ? 'bg-[var(--bg-secondary)] border border-[#E03590]/40' 
                            : 'hover:bg-[var(--bg-secondary)] border border-editorial'
                        }`}
                      >
                        <div>
                          <span className={`font-serif text-xl sm:text-2xl block ${isHelpActive ? 'font-bold text-[#781353]' : 'font-semibold text-[var(--text-primary)]'}`}>
                            {link.label}
                          </span>
                          <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mt-0.5">
                            {link.subtitle}
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileHelpExpand ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expanded Mobile Sub-Items */}
                      {(mobileHelpExpand || isHelpActive) && (
                        <div className="pl-3 space-y-2 border-l-2 border-[#E03590]/40 ml-3 py-2">
                          {helpSubItems.map((sub) => {
                            const isSubActive = activePage === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActivePage(sub.id);
                                  setMobileMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs btn-tap touch-target ${
                                  isSubActive
                                    ? 'bg-[var(--bg-secondary)] text-[#781353] font-bold border border-editorial'
                                    : 'text-muted hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                                }`}
                              >
                                <div>
                                  <span className="block font-semibold">{sub.label}</span>
                                  <span className="block text-[9px] font-mono text-muted">{sub.subtitle}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-70" />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = activePage === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                    onClick={() => {
                      setActivePage(link.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all btn-tap flex items-center justify-between touch-target ${
                      isActive 
                        ? 'bg-[var(--bg-secondary)] border border-[#E03590]/40' 
                        : 'hover:bg-[var(--bg-secondary)] border border-editorial'
                    }`}
                  >
                    <div>
                      <span className={`font-serif text-xl sm:text-2xl block ${isActive ? 'font-bold text-[#781353]' : 'font-semibold text-[var(--text-primary)]'}`}>
                        {link.label}
                      </span>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mt-0.5">
                        {link.subtitle}
                      </span>
                    </div>

                    <ArrowRight className={`w-5 h-5 ${isActive ? 'text-[#781353]' : 'text-muted/40'}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Footer Action */}
            <div className="pt-4 border-t border-editorial space-y-3">
              <a
                href="tel:1800110031"
                className="w-full bg-[#2E031D] text-white py-3.5 px-4 rounded-full text-center font-bold text-xs uppercase tracking-widest transition-all btn-tap shadow-lg touch-target flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E03590]" />
                <span>Call Helpline: 1800-11-0031</span>
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
