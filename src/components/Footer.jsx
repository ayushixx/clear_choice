import React from 'react';
import { Lock, Shield, ArrowUp } from 'lucide-react';

export default function Footer({ setActivePage, openLegalModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2E031D] text-[#FDF3F7] pt-12 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* DESKTOP FOOTER GRID (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-4 gap-10 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/logo.png" 
                alt="CLEAR CHOICE Logo" 
                className="h-8 w-auto object-contain filter brightness-110"
              />
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                CLEAR CHOICE
              </span>
            </div>
            <p className="text-xs text-[#FDF3F7]/80 leading-relaxed font-light">
              Know the Facts. Choose Your Future. An editorial documentary platform for substance education, recovery advocacy, and crisis intervention.
            </p>
          </div>

          {/* Col 2: Desktop Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#FDF3F7]/80">
              <li>
                <button onClick={() => { setActivePage('home'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Homepage
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('story'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  My Story (Addiction to Advocacy)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('facts'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Drug Facts Library (10 Substances)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('quiz'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Myth vs Fact Guide
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('help'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Get Help Hub
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('crisis-support'); scrollToTop(); }} className="hover:text-white transition-colors text-amber-300 font-semibold cursor-pointer">
                  Crisis Support (24/7 Hotline)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('recovery-centers'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Recovery & Rehab Centers Directory
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('find-support'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Find Support Near You (GPS Map)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact-counselor'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Contact Counselor (Confidential)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('blog'); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer">
                  Blog & Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Helpline */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              24/7 Helpline
            </h4>
            <div className="space-y-2">
              <a 
                href="tel:1800110031" 
                className="text-2xl font-serif font-bold text-white block hover:underline cursor-pointer"
              >
                1800-11-0031
              </a>
              <p className="text-xs text-[#FDF3F7]/70 font-light">
                Free, confidential, 24/7 support available nationwide.
              </p>
            </div>
          </div>

          {/* Col 4: Legal */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Privacy & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => openLegalModal('privacy')}
                  className="text-[#FDF3F7]/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#DC2F87]" />
                  <span>Privacy Policy (Anonymous Data)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('disclaimer')}
                  className="text-[#FDF3F7]/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#DC2F87]" />
                  <span>Medical Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* CLEAN, MINIMAL MOBILE FOOTER (Visible on Mobile Only) */}
        <div className="md:hidden space-y-6 text-center border-b border-white/10 pb-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/assets/logo.png" 
              alt="CLEAR CHOICE Logo" 
              className="h-10 w-auto object-contain filter brightness-110"
            />
            <span className="font-serif font-bold text-2xl text-white tracking-tight">
              CLEAR CHOICE
            </span>
            <p className="text-xs text-[#FDF3F7]/70 max-w-xs font-light">
              Know the Facts. Choose Your Future.
            </p>
          </div>

          {/* Quick Helpline Dial */}
          <div className="bg-[#4E0834]/60 p-5 rounded-2xl border border-white/10 space-y-2 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FDF3F7]/70 block font-bold">
              Immediate Confidential Crisis Support
            </span>
            <a
              href="tel:1800110031"
              className="text-2xl font-serif font-bold text-white hover:text-[#E03590] block transition-colors btn-tap touch-target flex items-center justify-center cursor-pointer"
            >
              📞 1800-11-0031
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-[#FDF3F7]/80 hover:text-white inline-flex items-center gap-2 py-3 px-5 border border-white/15 rounded-full btn-tap touch-target cursor-pointer bg-white/5"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-[#E03590]" />
          </button>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FDF3F7]/60 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CLEAR CHOICE. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => openLegalModal('privacy')} className="hover:underline py-1.5 px-2 btn-tap cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => openLegalModal('disclaimer')} className="hover:underline py-1.5 px-2 btn-tap cursor-pointer">Medical Disclaimer</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
