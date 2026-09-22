import React, { useEffect } from 'react';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import AmbientParticles from '../components/AmbientParticles';
import MagneticButton from '../components/MagneticButton';
import mehulPortrait from '../assets/mehul-portrait.jpg';
import { MEHUL_INFO, RECOVERY_PROGRAMS, SAFETY_INFO } from '../data/contentData';

export default function Home({ setActivePage }) {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -25]);

  useEffect(() => {
    console.log('[CLEAR CHOICE] Documentary Editorial Home Mounted');
  }, []);

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#781353] selection:text-white">
      
      {/* 1. HERO SECTION — MEHUL'S PORTRAIT AS PRIMARY VISUAL ANCHOR */}
      <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-20 border-b border-editorial overflow-hidden">
        
        {/* Subtle Background Particle Accent */}
        <AmbientParticles count={14} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center z-10">
          
          {/* Left Column: Narrative Lead */}
          <motion.div 
            style={{ y: heroTextY }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#781353] uppercase border-b border-[#781353]/30 pb-1"
            >
              <span>A DOCUMENTARY ON RECOVERY</span>
              <span>•</span>
              <span>MEHUL SAINI</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.06]"
            >
              Your Recovery Journey, Guided by Mehul.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-base sm:text-xl text-muted font-light leading-relaxed max-w-2xl"
            >
              {MEHUL_INFO.introduction}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <MagneticButton
                onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
                className="bg-[#2E031D] text-white hover:bg-[#4E0834] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-full text-center shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Explore Recovery Programs</span>
                  <ArrowRight className="w-4 h-4 text-[#E03590]" />
                </span>
              </MagneticButton>

              <button
                onClick={() => {
                  const el = document.getElementById('about-mehul-story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] hover:text-[#781353] transition-colors border border-editorial rounded-full text-center"
              >
                Read Mehul's Story
              </button>
            </motion.div>

            <div className="pt-4 border-t border-editorial flex items-center gap-3 text-xs font-mono text-muted">
              <Shield className="w-4 h-4 text-[#781353] shrink-0" />
              <span>100% Confidential • 24/7 Helpline: <strong className="text-[var(--text-primary)]">1800-11-0031</strong></span>
            </div>

          </motion.div>

          {/* Right Column: Mehul's Portrait — Primary Visual Anchor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-editorial group">
              <img 
                src={mehulPortrait} 
                alt="Mehul Saini — Addiction Recovery Specialist" 
                className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E03590] font-bold block">
                  MEHUL SAINI
                </span>
                <p className="font-serif text-lg font-bold leading-snug">
                  "Recovery is built on daily choices and continuous guidance."
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* 2. ABOUT MEHUL — EDITORIAL NARRATIVE SPLIT */}
      <section id="about-mehul-story" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-4 sticky top-28">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
              CHAPTER 01 • MEET MEHUL SAINI
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
              A Personal Approach to Lasting Recovery.
            </h2>
            <p className="text-base text-muted font-light leading-relaxed">
              Every individual facing addiction deserves non-judgmental guidance grounded in structure, discipline, and practical coping strategies.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-10 border-l border-editorial pl-0 lg:pl-12">
            
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] border-b border-editorial pb-3">
                Verified Credentials & Focus
              </h3>

              <div className="space-y-6">
                {MEHUL_INFO.verifiedDetails.map((item, idx) => (
                  <div key={idx} className="space-y-1 border-b border-editorial/50 pb-4">
                    <span className="text-xs font-mono font-bold text-[#781353] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <p className="text-base text-[var(--text-primary)] font-light leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
                Personal Message from Mehul
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] italic leading-relaxed border-l-2 border-[#781353] pl-6 py-2">
                "Recovery is a personal journey built on daily choices. With structured guidance, healthy routines, and continuous support, lasting change is possible. You do not have to recover alone."
              </blockquote>
            </div>

          </div>

        </div>
      </section>

      {/* 3. RECOVERY PHILOSOPHY — NARRATIVE BLOCK */}
      <section className="py-24 sm:py-32 bg-[var(--bg-secondary)] border-b border-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
              CHAPTER 02 • RECOVERY PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
              Structured Routines. Habit Building. Personal Accountability.
            </h2>
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
              Addiction recovery relies on replacing harmful triggers with disciplined daily routines, continuous habit restructuring, and compassionate personal accountability.
            </p>
          </div>

          {/* Connected Narrative Pillars — No Cards */}
          <div className="space-y-8 border-t border-editorial pt-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-editorial pb-6">
              <span className="md:col-span-3 text-xs font-mono font-bold text-[#781353] uppercase">01 / STRUCTURED ROUTINES</span>
              <div className="md:col-span-9 space-y-1">
                <h4 className="font-serif font-bold text-xl text-[var(--text-primary)]">Daily Discipline & Habits</h4>
                <p className="text-sm text-muted font-light leading-relaxed">
                  Establishing healthy sleep schedules, hydration, guided breathing, physical wellness, and craving management activities to stabilize neurochemistry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-editorial pb-6">
              <span className="md:col-span-3 text-xs font-mono font-bold text-[#781353] uppercase">02 / PERSONAL ACCOUNTABILITY</span>
              <div className="md:col-span-9 space-y-1">
                <h4 className="font-serif font-bold text-xl text-[var(--text-primary)]">Private Recovery Dashboard</h4>
                <p className="text-sm text-muted font-light leading-relaxed">
                  A personal progress portal to log mood check-ins, track craving levels (0–10), record reflection notes, and celebrate active recovery streaks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pb-2">
              <span className="md:col-span-3 text-xs font-mono font-bold text-[#781353] uppercase">03 / ONGOING SUPPORT</span>
              <div className="md:col-span-9 space-y-1">
                <h4 className="font-serif font-bold text-xl text-[var(--text-primary)]">Weekly Sessions & Community</h4>
                <p className="text-sm text-muted font-light leading-relaxed">
                  Scheduled one-on-one sessions with Mehul alongside access to a moderated, private support group focused on mutual encouragement and belonging.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ADDICTION RECOVERY PROGRAMS — FULL-WIDTH TIMELINE EXPLORER */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
              CHAPTER 03 • RECOVERY PROGRAM MODULES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)]">
              Structured Recovery Pathways.
            </h2>
            <p className="text-sm text-muted font-light">
              Every program incorporates structured roadmaps, weekly sessions with Mehul, daily check-ins, and ongoing support group access.
            </p>
          </div>

          <button
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="text-xs font-bold uppercase tracking-widest text-[#781353] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Explore All Programs</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Open Editorial List */}
        <div className="divide-y divide-editorial">
          {RECOVERY_PROGRAMS.map((prog) => (
            <div 
              key={prog.id}
              onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors px-4 -mx-4 rounded-xl"
            >
              <div className="lg:col-span-4 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#781353] block">
                  {prog.duration} • {prog.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] transition-colors">
                  {prog.title}
                </h3>
              </div>

              <div className="lg:col-span-6 text-sm text-muted font-light leading-relaxed">
                {prog.tagline}
              </div>

              <div className="lg:col-span-2 flex justify-end">
                <span className="text-xs font-bold uppercase tracking-wider text-[#781353] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>View Details</span> <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. THE 5-PHASE ROADMAP — CONTINUOUS VISUAL TIMELINE */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="max-w-3xl space-y-2 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
            CHAPTER 04 • THE 5-PHASE ROADMAP
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)]">
            How Your Journey Unfolds.
          </h2>
          <p className="text-sm text-muted font-light">
            Recovery progresses through five distinct milestones designed to establish stabilization, rebuild routine, and maintain long-term freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-editorial pt-8">
          {[
            { phase: 'Phase 1', title: 'Stabilization & Safety', desc: 'Understanding dependence, managing withdrawal, and daily routine setup.' },
            { phase: 'Phase 2', title: 'Early Recovery', desc: 'Trigger mapping, craving management, and support network building.' },
            { phase: 'Phase 3', title: 'Physical & Mental Renewal', desc: 'Exercise, nutrition, sleep recovery, and stress management.' },
            { phase: 'Phase 4', title: 'Relapse Prevention', desc: 'Warning signs, high-risk coping, and personal recovery planning.' },
            { phase: 'Phase 5', title: 'Maintenance', desc: 'Long-term goals, 30/60/90-day plan, and ongoing mentorship.' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#781353] block">{item.phase}</span>
              <h4 className="font-serif font-bold text-base text-[var(--text-primary)]">{item.title}</h4>
              <p className="text-xs text-muted font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SAFETY & PROFESSIONAL SUPPORT */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-editorial pb-4">
            <Shield className="w-6 h-6 text-[#781353] shrink-0" />
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">{SAFETY_INFO.title}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SAFETY_INFO.points.map((pt, i) => (
              <div key={i} className="space-y-1 border-t border-editorial pt-3">
                <span className="text-[10px] font-mono font-bold text-[#781353] block">0{i + 1}</span>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{pt}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted leading-relaxed font-light pt-4 border-t border-editorial">
            {SAFETY_INFO.disclaimer}
          </p>
        </div>
      </section>

      {/* 7. CONTACT / START CONVERSATION */}
      <section className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] block">
            TAKE THE FIRST STEP
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)]">
            Begin Your Guided Recovery Path.
          </h2>
          <p className="text-base text-muted font-light max-w-xl mx-auto">
            Confidential inquiries, program registration, and immediate 24/7 crisis support. You don't have to walk this path alone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <MagneticButton
            onClick={() => { setActivePage('contact-counselor'); window.scrollTo(0,0); }}
            className="bg-[#2E031D] text-white hover:bg-[#4E0834] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md"
          >
            Request Private Callback
          </MagneticButton>

          <a
            href="tel:1800110031"
            className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#781353] hover:underline border border-editorial rounded-full inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call Helpline: 1800-11-0031
          </a>
        </div>
      </section>

    </div>
  );
}
