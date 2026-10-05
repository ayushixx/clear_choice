import React from 'react';
import { Building2, MapPin, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadges from '../components/TrustBadges';
import MagneticButton from '../components/MagneticButton';
import AmbientParticles from '../components/AmbientParticles';

export default function GetHelpHub({ setActivePage }) {
  const options = [
    {
      id: 'contact-counselor',
      badge: 'Discreet Consultation',
      title: 'Contact Counselor Directly',
      description: 'Submit a confidential inquiry or request a call back at your preferred time to speak directly with Mehul / specialist counselor.',
      highlight: '100% Confidential & Direct Assistance',
      icon: MessageSquare,
      cta: 'Request Consultation',
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
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl space-y-2 sm:space-y-3"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
          Get Help Decision Center
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-tight break-words">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
          Select your primary goal below to get directed immediately to the right resources, directory listings, interactive map, or private consultation forms.
        </p>
      </motion.div>

      {/* INTENT CARDS WITH COMPACT PHONE PADDING & MOTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          return (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className={`p-5 sm:p-7 border flex flex-col justify-between relative overflow-hidden rounded-3xl cursor-pointer ${
                opt.primary
                  ? 'bg-[#2E031D] text-white border-[#2E031D] shadow-lg'
                  : 'card-doc hover:border-[#E03590]'
              }`}
            >
              {opt.primary && (
                <AmbientParticles count={10} color="rgba(224,53,144,0.3)" />
              )}

              <div className="space-y-3.5 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[9px] font-mono font-bold uppercase px-3 py-1 border rounded-full ${
                    opt.primary
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-[var(--bg-secondary)] text-[#781353] border-editorial'
                  }`}>
                    {opt.badge}
                  </span>
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    opt.primary
                      ? 'bg-white/10 text-[#E03590] border-white/20'
                      : 'bg-[var(--bg-secondary)] text-[#781353] border-editorial'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h2 className={`text-xl sm:text-2xl font-serif font-bold leading-snug break-words ${
                    opt.primary ? 'text-white' : 'text-[var(--text-primary)]'
                  }`}>
                    {opt.title}
                  </h2>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed mt-1.5 ${
                    opt.primary ? 'text-[#FDF3F7]/80' : 'text-muted'
                  }`}>
                    {opt.description}
                  </p>
                </div>

                <div className={`pt-1 text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                  opt.primary ? 'text-[#E03590]' : 'text-[#781353]'
                }`}>
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{opt.highlight}</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-editorial/40 relative z-10">
                {opt.primary ? (
                  <MagneticButton
                    onClick={() => {
                      setActivePage(opt.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-[#E03590] hover:bg-[#c82b7c] text-white py-3.5 px-5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-full shadow-md min-h-[48px]"
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
                    className="w-full bg-[#2E031D] text-white py-3.5 px-5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-full shadow-sm cursor-pointer min-h-[48px] btn-tap touch-target"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#E03590]" />
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

