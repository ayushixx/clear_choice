import React from 'react';
import { RESOURCE_DIRECTORY } from '../data/contentData';
import { trackHelplineClick } from '../services/ga4Analytics';
import { Phone, Shield, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import AmbientParticles from '../components/AmbientParticles';

export default function CrisisSupport({ setActivePage }) {
  return (
    <div className="pt-24 sm:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      
      {/* Navigation Breadcrumb / Back Link */}
      <div className="flex items-center justify-between pt-4 sm:pt-0">
        <button 
          onClick={() => { setActivePage('help'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-mono text-muted hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors btn-tap touch-target cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Get Help Hub
        </button>
        <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-[#2E031D] text-white dark:bg-[#E03590] px-3 py-1 font-bold shrink-0 rounded-full">
          High Urgency Channel
        </span>
      </div>

      {/* HERO EMERGENCY SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#2E031D] text-white p-6 sm:p-14 border border-[#2E031D] space-y-5 sm:space-y-6 text-left relative overflow-hidden rounded-3xl shadow-xl"
      >
        <AmbientParticles particleCount={18} color="rgba(224,53,144,0.4)" />
        
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#FDF3F7]/80 relative z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E03590] animate-ping shrink-0" />
          <span>Immediate Crisis Support • 24/7 Response Active</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-serif font-bold text-white tracking-tight relative z-10">
          Need Help Right Now?
        </h1>

        <p className="text-xs sm:text-lg text-[#FDF3F7]/90 max-w-2xl font-light leading-relaxed relative z-10">
          Free, confidential, immediate assistance for individuals and families in crisis. Speak directly with a trained counselor right now.
        </p>

        {/* GIANT EMERGENCY ACTION */}
        <div className="pt-2 sm:pt-4 pb-2 relative z-10 overflow-hidden">
          <button
            onClick={() => setActivePage('contact-counselor')}
            className="text-2xl min-[375px]:text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FDF3F7] hover:text-[#E03590] transition-colors tracking-tight block btn-tap cursor-pointer text-left"
          >
            Speak With Counselor
          </button>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-8 text-[11px] sm:text-xs text-[#FDF3F7]/80 font-mono relative z-10">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#E03590]" /> 100% Confidential</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E03590]" /> Direct Counselor Access</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#E03590]" /> Private Consultation</span>
        </div>

        <div className="pt-4 relative z-10">
          <button
            onClick={() => setActivePage('contact-counselor')}
            className="inline-flex items-center justify-center gap-2 bg-[#E03590] hover:bg-[#c82b7c] text-white px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-xs uppercase tracking-widest transition-colors btn-tap shadow-lg touch-target w-full sm:w-auto cursor-pointer rounded-full"
          >
            <Phone className="w-4 h-4" /> Contact Specialist Counselor Now
          </button>
        </div>
      </motion.section>

      {/* NATIONAL HELPLINE DIRECTORY CARDS */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
            National Helplines Directory
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
            Verified Emergency Contacts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {RESOURCE_DIRECTORY.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="card-doc p-5 sm:p-6 space-y-4 flex flex-col justify-between rounded-3xl"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-2.5 py-1 border border-editorial inline-block mb-2 rounded-full">
                  {item.badge}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <a 
                  href={`tel:${item.number.replace(/\s+/g, '')}`} 
                  onClick={() => trackHelplineClick(item.number)}
                  className="text-base sm:text-xl font-serif font-bold text-[#781353] dark:text-[#E03590] hover:underline block mt-1 cursor-pointer"
                >
                  {item.number}
                </a>
                <p className="text-xs text-muted font-light leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <a
                href={`tel:${item.number.replace(/\s+/g, '')}`}
                onClick={() => trackHelplineClick(item.number)}
                className="w-full bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-3 font-bold text-xs uppercase tracking-widest text-center block transition-colors mt-4 btn-tap touch-target cursor-pointer flex items-center justify-center rounded-full shadow-sm"
              >
                Call Line Now
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CRISIS RESPONSE GUIDELINES */}
      <section className="bg-[var(--bg-secondary)] border border-editorial p-6 sm:p-8 space-y-3 sm:space-y-4 rounded-3xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#781353] dark:text-[#E03590]">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Immediate Crisis Guidance</span>
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
          What to Do in a Medical or Substance Emergency
        </h3>
        <ul className="text-xs text-muted space-y-2 font-light leading-relaxed list-disc pl-4">
          <li>If the individual is unconscious, unbreathing, or showing signs of overdose, call <strong>112 (Emergency Medical Services)</strong> immediately.</li>
          <li>Stay with the person and keep them in a safe position on their side (recovery position) to prevent choking.</li>
          <li>Keep calm and reassure the individual without judgment. Do not offer food, drink, or self-medication.</li>
          <li>Submit a direct inquiry to contact our specialist counselor for personalized 1-on-1 recovery guidance.</li>
        </ul>
      </section>

    </div>
  );
}
