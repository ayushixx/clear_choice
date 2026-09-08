import React from 'react';
import { Phone, Lock, Shield } from 'lucide-react';

export default function Footer({ setActivePage, openLegalModal }) {
  return (
    <footer className="bg-[#2E031D] text-[#FDF3F7] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-white text-[#2E031D] flex items-center justify-center font-serif font-bold text-sm">
                CC
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                CLEAR CHOICE
              </span>
            </div>
            <p className="text-xs text-[#FDF3F7]/80 leading-relaxed font-light">
              Know the Facts. Choose Your Future. An editorial documentary platform for substance education, recovery advocacy, and crisis intervention.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#FDF3F7]/80">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                  Homepage
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('story'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                  My Story (Addiction to Advocacy)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('facts'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                  Drug Facts Library (10 Substances)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('quiz'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                  Myth vs Fact Guide
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('help'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                  Get Help & Recovery Centers Map
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
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
                className="text-2xl font-serif font-bold text-white block hover:underline"
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
                  className="text-[#FDF3F7]/80 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#AA1E71]" />
                  <span>Privacy Policy (Anonymous Data)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('disclaimer')}
                  className="text-[#FDF3F7]/80 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#AA1E71]" />
                  <span>Medical Disclaimer</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('admin'); window.scrollTo(0,0); }}
                  className="text-[#FDF3F7]/60 hover:text-white transition-colors flex items-center gap-1.5 pt-1"
                >
                  <Lock className="w-3 h-3 text-[#AA1E71]/70" />
                  <span>Staff Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FDF3F7]/60 gap-4">
          <p>© {new Date().getFullYear()} CLEAR CHOICE. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => openLegalModal('privacy')} className="hover:underline">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => openLegalModal('disclaimer')} className="hover:underline">Medical Disclaimer</button>
            <span>•</span>
            <button onClick={() => { setActivePage('admin'); window.scrollTo(0,0); }} className="hover:underline">Staff Portal</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
