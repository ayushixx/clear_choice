import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ setActivePage, openLegalModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nav = (page) => { setActivePage(page); scrollToTop(); };

  return (
    <footer className="bg-[#2E031D] text-[#FDF3F7]">

      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* Top: Brand + Helpline (clean two-column) */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-white/8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/logo.png" 
                alt="CLEAR CHOICE" 
                className="h-7 w-auto object-contain brightness-110"
              />
              <span className="font-serif font-bold text-lg text-white tracking-tight">
                CLEAR CHOICE
              </span>
            </div>
            <p className="text-[13px] text-white/50 font-light max-w-sm leading-relaxed">
              Know the Facts. Choose Your Future.
            </p>
          </div>

          <div className="text-left md:text-right space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block">
              Direct Counselor Support
            </span>
            <button 
              onClick={() => nav('contact-counselor')} 
              className="text-xl sm:text-2xl font-serif font-bold text-white hover:text-[#E03590] transition-colors block cursor-pointer"
            >
              Speak with Counselor
            </button>
            <span className="text-[11px] text-white/40 font-light block">
              100% Confidential · Private Guidance
            </span>
          </div>
        </div>

        {/* Middle: Navigation Links — clean 3-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 py-12 border-b border-white/8">

          {/* Column 1: Learn */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
              Learn
            </h4>
            <ul className="space-y-2.5">
              {[
                ['Home', 'home'],
                ['My Story', 'story'],
                ['Anonymous Testimonies', 'testimonies'],
                ['Drug Facts', 'facts'],
                ['Myth vs Fact', 'quiz'],
                ['Blog', 'blog'],
              ].map(([label, page]) => (
                <li key={page}>
                  <button 
                    onClick={() => nav(page)} 
                    className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                ['Get Help', 'help'],
                ['Contact Counselor', 'contact-counselor'],
                ['Rehab Centers', 'recovery-centers'],
                ['Find Support Near You', 'find-support'],
              ].map(([label, page]) => (
                <li key={page}>
                  <button 
                    onClick={() => nav(page)} 
                    className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => nav('contact-counselor')} 
                  className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Contact a Counselor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('privacy')}
                  className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('disclaimer')}
                  className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[11px] text-white/30 font-light">
            © {new Date().getFullYear()} Clear Choice. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[11px] font-mono text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
