import React from 'react';
import { Phone, Building2, MapPin, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadges from '../components/TrustBadges';
import MagneticButton from '../components/MagneticButton';
import AmbientParticles from '../components/AmbientParticles';

export default function GetHelpHub({ setActivePage }) {
  const options = [
    {
      id: 'crisis-support',
      badge: 'Immediate Assistance • 24/7',
      title: 'Crisis Support',
      description: 'Free, confidential, 24/7 crisis response line. Speak directly with a trained counselor right now.',
      highlight: 'Emergency Hotline: 1800-11-0031',
      icon: Phone,
      cta: 'Get Immediate Crisis Help',
      primary: true
    },
    {
      id: 'recovery-centers',
      badge: 'Verified Treatment Directory',
      title: 'Recovery & Rehab Centers',
      description: 'Browse accredited addiction recovery clinics, medical detox facilities, and rehabilitation centers across India.',
      highlight: 'Search & Filter by City / State',
      icon: Building2,
      cta: 'Browse Rehab Directory',
      primary: false
    },
    {
      id: 'find-support',
      badge: 'Location-Based Locator',
      title: 'Find Support Near You',
      description: 'Interactive map to pinpoint nearby support centers, inspect facilities, and retrieve instant GPS directions.',
      highlight: 'Interactive GPS Map Navigator',
      icon: MapPin,
      cta: 'Explore Interactive Map',
      primary: false
    },
    {
      id: 'contact-counselor',
      badge: 'Discreet Consultation',
      title: 'Contact Counselor',
      description: 'Submit a confidential inquiry or request a call back at your preferred time for a private consultation.',
      highlight: '100% Confidential & Secure',
      icon: MessageSquare,
      cta: 'Request Consultation',
      primary: false
    }
  ];

  return (
    <div className="pt-20 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-3 sm:space-y-4 pt-4 sm:pt-0"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Get Help Decision Center
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-lg text-muted font-light leading-relaxed">
          Select your primary goal below to get directed immediately to the right resources, directory listings, interactive map, or private consultation forms.
        </p>
      </motion.div>

      {/* 4 LARGE INTENT FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          return (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 rounded-3xl ${
                opt.primary
                  ? 'bg-[#2E031D] dark:bg-[#16161C] text-white border-[#2E031D] dark:border-editorial shadow-xl'
                  : 'card-doc hover:border-[#E03590]'
              }`}
            >
              {opt.primary && (
                <AmbientParticles count={12} color="rgba(224,53,144,0.3)" />
              )}

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 border rounded-full ${
                    opt.primary
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-[var(--bg-secondary)] text-[#781353] dark:text-[#E03590] border-editorial'
                  }`}>
                    {opt.badge}
                  </span>
                  <div className={`p-3 rounded-2xl border ${
                    opt.primary
                      ? 'bg-white/10 text-[#E03590] border-white/20'
                      : 'bg-[var(--bg-secondary)] text-[#781353] dark:text-[#E03590] border-editorial'
                  }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <div>
                  <h2 className={`text-xl sm:text-3xl font-serif font-bold ${
                    opt.primary ? 'text-white' : 'text-[var(--text-primary)]'
                  }`}>
                    {opt.title}
                  </h2>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed mt-2 ${
                    opt.primary ? 'text-[#FDF3F7]/80' : 'text-muted'
                  }`}>
                    {opt.description}
                  </p>
                </div>

                <div className={`pt-2 text-xs font-mono font-semibold flex items-center gap-2 ${
                  opt.primary ? 'text-[#E03590]' : 'text-[#781353] dark:text-[#E03590]'
                }`}>
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] sm:text-xs">{opt.highlight}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-editorial/40 relative z-10">
                {opt.primary ? (
                  <MagneticButton
                    onClick={() => {
                      setActivePage(opt.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-[#E03590] hover:bg-[#c82b7c] text-white py-3.5 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all btn-tap touch-target rounded-full shadow-lg"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                ) : (
                  <button
                    onClick={() => {
                      setActivePage(opt.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-3.5 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all btn-tap touch-target cursor-pointer rounded-full shadow-md"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#E03590] dark:text-[#781353]" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
