import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sun, Moon } from 'lucide-react';

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

  // Prevent scroll when mobile full-screen menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'My Story' },
    { id: 'facts', label: 'Drug Facts' },
    { id: 'quiz', label: 'Myth vs Fact' },
    { id: 'help', label: 'Get Help' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Minimal Emergency Bar */}
      <div className="bg-[#2E031D] text-[#FDF3F7] py-2 px-4 text-[11px] font-mono tracking-widest flex items-center justify-between max-w-7xl mx-auto border-b border-white/10">
        <span className="uppercase opacity-80 hidden sm:inline">24/7 Helpline & Recovery Journal</span>
        <a 
          href="tel:1800110031" 
          className="hover:underline flex items-center gap-1.5 text-[#FDF3F7] font-semibold"
        >
          <Phone className="w-3 h-3 text-[#DC2F87]" /> 24/7 Helpline: 1800-11-0031
        </a>
      </div>

      {/* Main Publication Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md py-3 border-b border-editorial shadow-xs' 
          : 'bg-[var(--bg-primary)] py-4 border-b border-editorial'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Aesop / Monocle Inspired Logo */}
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="flex items-center gap-3 text-left group"
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
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
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

          {/* Theme Switcher & Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-editorial text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
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
              className="bg-[#2E031D] dark:bg-[#FDF3F7] text-[#FDF3F7] dark:text-[#2E031D] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Get Crisis Help
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-primary)]"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* FULL-SCREEN SLIDE-OUT MOBILE NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between p-6 animate-fadeIn">
          
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-editorial pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-current flex items-center justify-center font-serif font-bold text-xs">
                CC
              </div>
              <span className="font-serif font-extrabold text-lg tracking-tight">CLEAR CHOICE</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[var(--text-primary)]"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Full Screen Mobile Links */}
          <div className="py-8 space-y-6 flex-1 flex flex-col justify-center">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left font-serif text-3xl sm:text-4xl transition-colors ${
                    isActive 
                      ? 'font-bold text-[#781353] dark:text-[#DC2F87] italic' 
                      : 'font-normal text-muted hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Footer Action */}
          <div className="pt-6 border-t border-editorial space-y-4">
            <a
              href="tel:1800110031"
              className="w-full bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-3.5 text-center font-bold text-xs uppercase tracking-widest block"
            >
              📞 Call Helpline: 1800-11-0031
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
