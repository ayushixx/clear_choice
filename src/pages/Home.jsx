import React, { useState, useEffect, useMemo } from 'react';
import { Phone, ArrowRight, Shield, Calendar, Users, CheckCircle2, ChevronDown, HelpCircle, HeartHandshake, Sparkles, Award, Check } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import AmbientParticles from '../components/AmbientParticles';
import MagneticButton from '../components/MagneticButton';
import LeadCaptureModal from '../components/LeadCaptureModal';
import mehulPortrait from '../assets/mehul-portrait.jpg';
import { 
  MEHUL_INFO, 
  RECOVERY_PROGRAMS, 
  SAFETY_INFO, 
  WEEKLY_SESSIONS_INFO, 
  SUPPORT_GROUP_INFO 
} from '../data/contentData';

// Mobile-aware hook
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setMobile(mql.matches);
    const handler = (e) => setMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return mobile;
}

// Editorial Shutter Section Wrapper — Smooth Shutter & Scale Reveal on Scroll
function ShutterSection({ children, className = '', id = '' }) {
  const isMobile = useIsMobile();
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: isMobile ? 22 : 36, scale: isMobile ? 0.98 : 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-60px" }}
      transition={{ duration: isMobile ? 0.45 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {/* Editorial Shutter Line Reveal */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: isMobile ? "-20px" : "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#781353]/35 to-transparent origin-center pointer-events-none"
      />
      {children}
    </motion.section>
  );
}

export default function Home({ setActivePage }) {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const heroTextY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -15]);
  const [openFaqId, setOpenFaqId] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [leadModal, setLeadModal] = useState({ isOpen: false, substance: '' });

  const fadeIn = useMemo(() => ({
    initial: { opacity: 0, ...(isMobile ? {} : { y: 12 }) },
    animate: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.2 : 0.5 },
    viewport: { once: true },
  }), [isMobile]);

  const fadeSlideLeft = useMemo(() => ({
    initial: { opacity: 0, ...(isMobile ? {} : { x: -15 }) },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: isMobile ? 0.25 : 0.5 },
    viewport: { once: true },
  }), [isMobile]);

  const fadeSlideRight = useMemo(() => ({
    initial: { opacity: 0, ...(isMobile ? {} : { x: 15 }) },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: isMobile ? 0.25 : 0.5, delay: isMobile ? 0 : 0.1 },
    viewport: { once: true },
  }), [isMobile]);

  useEffect(() => {
    console.log('[CLEAR CHOICE] Mobile-Reactive Editorial Home Loaded');
  }, []);

  const faqData = [
    {
      question: "What is Mehul's approach to addiction recovery?",
      answer: MEHUL_INFO.introduction + " " + (MEHUL_INFO.verifiedDetails.find(d => d.label === 'Approach')?.value || '')
    },
    {
      question: "What is included in the weekly sessions with Mehul?",
      answer: `${WEEKLY_SESSIONS_INFO.description} Key features include: ${WEEKLY_SESSIONS_INFO.features.join(', ')}. ${WEEKLY_SESSIONS_INFO.note}`
    },
    {
      question: "How does the 5-Phase Recovery Roadmap work?",
      answer: "Recovery progresses through five structured milestones: Phase 1 (Stabilization & Safety), Phase 2 (Early Recovery), Phase 3 (Physical & Mental Renewal), Phase 4 (Relapse Prevention), and Phase 5 (Maintenance)."
    },
    {
      question: "Is participation in the support group private and confidential?",
      answer: `${SUPPORT_GROUP_INFO.description} ${SUPPORT_GROUP_INFO.rules}`
    },
    {
      question: "What safety screening and medical guidelines are followed?",
      answer: `${SAFETY_INFO.title}: ${SAFETY_INFO.points.join(', ')}. ${SAFETY_INFO.disclaimer}`
    }
  ];

  const roadmapSteps = [
    { phase: '01', title: 'Stabilization & Safety', timeframe: 'Weeks 1–2', desc: 'Understanding dependence, managing withdrawal, and establishing healthy daily sleep & nutrition routines.' },
    { phase: '02', title: 'Early Recovery', timeframe: 'Weeks 3–4', desc: 'Trigger mapping, craving management techniques, and building a supportive recovery network.' },
    { phase: '03', title: 'Physical & Mental Renewal', timeframe: 'Weeks 5–8', desc: 'Physical exercise, nutrition, sleep recovery, emotional regulation, and rebuilding everyday productivity.' },
    { phase: '04', title: 'Relapse Prevention', timeframe: 'Weeks 9–10', desc: 'Recognizing early warning signs, managing high-risk social scenarios, and lapse prevention planning.' },
    { phase: '05', title: 'Maintenance', timeframe: 'Weeks 11–12', desc: 'Long-term recovery goals, 30/60/90-day maintenance blueprint, and ongoing peer mentorship.' },
  ];

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#781353] selection:text-white">
      
      {/* 1. HERO SECTION — DYNAMIC EDITORIAL HERO */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center pt-14 sm:pt-20 pb-8 sm:pb-12 border-b border-editorial overflow-hidden">
        
        <AmbientParticles count={isMobile ? 6 : 12} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center z-10">
          
          {/* Left Column: Narrative & Action */}
          <motion.div 
            style={{ y: heroTextY }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-left order-1"
          >
            {/* Category Tagline Badge */}
            <motion.div 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.2 : 0.4 }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#781353] uppercase border-b border-[#781353]/30 pb-1"
            >
              <Sparkles className="w-3 h-3 text-[#E03590]" />
              <span>A DOCUMENTARY ON RECOVERY</span>
              <span>•</span>
              <span>MEHUL SAINI</span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1 
              initial={{ opacity: 0, ...(isMobile ? {} : { y: 16, scale: 0.98 }) }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: isMobile ? 0.25 : 0.6, delay: isMobile ? 0 : 0.05 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.08]"
            >
              Your Recovery Journey, Guided by Mehul.
            </motion.h1>

            {/* Mobile-Only Compact Luxury Portrait */}
            <div className="block lg:hidden my-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-xl border border-editorial bg-[var(--bg-secondary)] group cursor-pointer"
                onClick={() => {
                  const el = document.getElementById('about-mehul-story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img 
                  src={mehulPortrait} 
                  alt="Mehul Saini — Addiction Recovery Specialist" 
                  className="w-full h-full object-cover object-[center_18%] filter contrast-[1.02]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E031D]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#E03590] font-bold block">MEHUL SAINI</span>
                  <p className="text-[9px] font-mono text-white/80 uppercase tracking-wider">Recovery Specialist</p>
                </div>
              </motion.div>
            </div>

            {/* Introduction Text */}
            <motion.p 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.2 : 0.5, delay: isMobile ? 0 : 0.12 }}
              className="text-sm sm:text-lg text-muted font-light leading-relaxed max-w-xl"
            >
              {MEHUL_INFO.introduction}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.2 : 0.5, delay: isMobile ? 0 : 0.18 }}
              className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <MagneticButton
                onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
                className="bg-[#2E031D] text-white hover:bg-[#4E0834] active:scale-[0.98] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full text-center shadow-md focus-visible:ring-2 focus-visible:ring-[#781353] focus-visible:outline-none"
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
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] hover:text-[#781353] active:scale-[0.98] transition-colors border border-editorial rounded-full text-center focus-visible:ring-2 focus-visible:ring-[#781353] focus-visible:outline-none"
              >
                Read Mehul's Story
              </button>
            </motion.div>

            {/* High-Trust Mobile Direct Helpline Bar */}
            <div className="pt-3 border-t border-editorial">
              <a 
                href="tel:1800110031"
                className="w-full sm:w-auto p-3 bg-[var(--bg-secondary)] hover:bg-[#2E031D] hover:text-white rounded-xl border border-editorial flex items-center justify-between gap-3 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div className="text-left">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted group-hover:text-white/70 block font-bold">24/7 Confidential Helpline</span>
                    <span className="text-xs sm:text-sm font-bold font-serif text-[var(--text-primary)] group-hover:text-white tracking-wide">1800-11-0031</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#781353] group-hover:text-[#E03590] bg-[#781353]/10 group-hover:bg-white/10 px-2.5 py-1 rounded-full border border-[#781353]/20 shrink-0">
                  Free Support
                </span>
              </a>
            </div>

          </motion.div>

          {/* Desktop Right Column: Compact Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex lg:col-span-5 relative justify-center items-center order-2"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-editorial bg-[var(--bg-secondary)] group cursor-pointer"
            >
              <img 
                src={mehulPortrait} 
                alt="Mehul Saini — Addiction Recovery Specialist" 
                className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E031D]/85 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E03590] bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                  MEHUL SAINI
                </span>
                <p className="font-serif text-sm font-bold leading-snug pt-0.5 text-white">
                  "Recovery is built on daily choices."
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </section>

      {/* 2. ABOUT MEHUL — SHUTTER REVEAL SECTION */}
      <ShutterSection id="about-mehul-story" className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          <motion.div 
            {...fadeSlideLeft}
            className="lg:col-span-5 space-y-3 lg:sticky lg:top-24"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#781353] block">
              About Mehul Saini
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight">
              A Personal Approach to Lasting Recovery.
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              Every individual facing addiction deserves non-judgmental guidance grounded in structure, discipline, and practical coping strategies.
            </p>
          </motion.div>

          <motion.div 
            {...fadeSlideRight}
            className="lg:col-span-7 space-y-6 lg:border-l border-editorial pl-0 lg:pl-10"
          >
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[var(--text-primary)] border-b border-editorial pb-2">
                Verified Credentials & Focus
              </h3>

              <div className="divide-y divide-editorial/60">
                {MEHUL_INFO.verifiedDetails.map((item, idx) => (
                  <div key={idx} className="py-3.5 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#781353] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] font-light leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Trust Editorial Quote Card */}
            <div className="p-5 sm:p-6 bg-[#2E031D] text-white rounded-2xl shadow-xl space-y-3 relative overflow-hidden border border-[#2E031D]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E03590] font-bold">
                <Award className="w-3.5 h-3.5" /> Personal Message from Mehul
              </div>
              <blockquote className="font-serif text-sm sm:text-lg text-white/95 italic leading-relaxed">
                "Recovery is a personal journey built on daily choices. With structured guidance, healthy routines, and continuous support, lasting change is possible. You do not have to recover alone."
              </blockquote>
              <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-white/60 uppercase">
                <Check className="w-3 h-3 text-emerald-400" /> Verified Recovery Specialist • Non-Judgmental Support
              </div>
            </div>

          </motion.div>

        </div>
      </ShutterSection>

      {/* 3. RECOVERY PHILOSOPHY — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-10 sm:py-16 bg-[var(--bg-secondary)] border-b border-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <motion.div 
            {...fadeIn}
            className="space-y-2"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#781353] block">
              Core Recovery Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight">
              Structured Routines. Habit Building. Personal Accountability.
            </h2>
            <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
              Addiction recovery relies on replacing harmful triggers with disciplined daily routines, continuous habit restructuring, and compassionate personal accountability.
            </p>
          </motion.div>

          {/* Connected Narrative Pillars — Divider List */}
          <div className="divide-y divide-editorial border-t border-b border-editorial">
            <motion.div 
              {...fadeIn}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 items-start"
            >
              <span className="md:col-span-4 text-[10px] sm:text-xs font-mono font-bold text-[#781353] uppercase">01 / STRUCTURED ROUTINES</span>
              <div className="md:col-span-8 space-y-0.5">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">Daily Discipline & Habits</h3>
                <p className="text-xs text-muted font-light leading-relaxed">
                  Establishing healthy sleep schedules, hydration, guided breathing, physical wellness, and craving management activities to stabilize neurochemistry.
                </p>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: isMobile ? 0 : 0.05 }}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 items-start"
            >
              <span className="md:col-span-4 text-[10px] sm:text-xs font-mono font-bold text-[#781353] uppercase">02 / PERSONAL ACCOUNTABILITY</span>
              <div className="md:col-span-8 space-y-0.5">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">Private Recovery Dashboard</h3>
                <p className="text-xs text-muted font-light leading-relaxed">
                  A personal progress portal to log mood check-ins, track craving levels (0–10), record reflection notes, and celebrate active recovery streaks.
                </p>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: isMobile ? 0 : 0.1 }}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 items-start"
            >
              <span className="md:col-span-4 text-[10px] sm:text-xs font-mono font-bold text-[#781353] uppercase">03 / ONGOING SUPPORT</span>
              <div className="md:col-span-8 space-y-0.5">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">Weekly Sessions & Community</h3>
                <p className="text-xs text-muted font-light leading-relaxed">
                  Scheduled one-on-one sessions with Mehul alongside access to a moderated, private support group focused on mutual encouragement and belonging.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </ShutterSection>

      {/* 4. RECOVERY PROGRAMS — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#781353] block">
              Recovery Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Structured Pathways.
            </h2>
          </div>
          <button
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#781353] hover:underline focus-visible:outline-none shrink-0"
          >
            All Programs <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Program Cards — Editorial Layout [Title + Metadata] [Summary] [CTA] */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {[
            { id: 'opioid-recovery', letter: 'A', category: 'Opioid Dependence', name: 'Heroin / Opioid Recovery', summary: 'Structured recovery pathway for opioid dependence.', duration: '12 Weeks' },
            { id: 'cannabis-recovery', letter: 'B', category: 'Behavioral Support', name: 'Cannabis Recovery', summary: 'Behavioral recovery and habit transformation.', duration: '4 Weeks' },
            { id: 'alcohol-recovery', letter: 'C', category: 'Routine Building', name: 'Alcohol Recovery', summary: 'Rebuild routines and long-term stability.', duration: '12 Weeks' },
            { id: 'meth-recovery', letter: 'D', category: 'Stimulant Support', name: 'Ice / Meth Recovery', summary: 'Support for stimulant dependency recovery.', duration: '12 Weeks' },
            { id: 'nicotine-recovery', letter: 'E', category: 'Cessation Pathway', name: 'Nicotine Recovery', summary: 'Guided pathway toward a smoke-free life.', duration: '8 Weeks' },
            { id: 'benzo-recovery', letter: 'F', category: 'Clinician Coordinated', name: 'Benzodiazepine Recovery', summary: 'Clinician-coordinated dependence support.', duration: 'Personalized' },
            { id: 'prescription-recovery', letter: 'G', category: 'Medication Support', name: 'Prescription Recovery', summary: 'Support for medication dependence.', duration: 'Personalized' },
            { id: 'other-recovery', letter: 'H', category: 'Custom Pathway', name: 'Other Substances', summary: 'Individualized recovery pathways.', duration: 'Personalized' },
          ].map((prog, idx) => (
            <motion.button
              key={prog.id}
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ delay: isMobile ? 0 : idx * 0.02, duration: isMobile ? 0.2 : 0.25 }}
              onClick={() => {
                setLeadModal({ isOpen: true, substance: prog.name });
              }}
              className="group relative text-left p-4 sm:p-5 rounded-2xl border border-editorial bg-[var(--bg-card)] hover:border-[#781353]/40 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-10px_rgba(120,19,83,0.12)] active:scale-[0.98] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781353]/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                
                {/* [Title + Metadata] */}
                <div className="sm:w-5/12 space-y-1 shrink-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] block">
                    {prog.letter} • {prog.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] transition-colors leading-snug">
                    {prog.name}
                  </h3>
                </div>

                {/* [Summary & Duration] */}
                <div className="sm:w-4/12 space-y-1">
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wide text-[var(--text-primary)]/60 bg-[var(--bg-secondary)] border border-editorial px-2 py-0.5 rounded-full">
                    {prog.duration}
                  </span>
                  <p className="text-xs text-muted/80 font-light leading-relaxed">
                    {prog.summary}
                  </p>
                </div>

                {/* [CTA] */}
                <div className="sm:w-3/12 flex items-center justify-start sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-editorial/40">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#781353] group-hover:text-[#2E031D] transition-colors">
                    <span>Get to Know More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile: All Programs Link */}
        <button
          onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
          className="sm:hidden flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#781353] hover:underline focus-visible:outline-none mt-6 mx-auto"
        >
          Explore All Programs <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </ShutterSection>

      {/* 5. THE 5-PHASE ROADMAP — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="max-w-2xl space-y-1.5 mb-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#781353] block">
            5-Phase Recovery Roadmap
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            How Your Journey Unfolds.
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light">
            Recovery progresses through five distinct milestones designed to establish stabilization, rebuild routine, and maintain long-term freedom.
          </p>
        </div>

        {/* Stepped Interactive Timeline Controls */}
        <div className="space-y-6">
          
          {/* Step Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {roadmapSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#2E031D] text-white shadow-md scale-105'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-editorial hover:border-[#781353]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-[#E03590] text-white' : 'bg-[#781353]/15 text-[#781353]'
                  }`}>
                    {step.phase}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase with Zoom Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, ...(isMobile ? {} : { scale: 0.96, y: 8 }) }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, ...(isMobile ? {} : { scale: 0.96, y: -8 }) }}
              transition={{ duration: isMobile ? 0.2 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 bg-[var(--bg-secondary)] border-l-4 border-[#781353] border border-editorial rounded-2xl shadow-md space-y-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-editorial pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#781353] bg-[#781353]/10 px-2.5 py-0.5 rounded-full border border-[#781353]/20">
                    Phase {roadmapSteps[activeStep].phase}
                  </span>
                  <span className="text-xs font-mono text-muted uppercase font-bold">
                    {roadmapSteps[activeStep].timeframe}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted uppercase hidden sm:block">
                  Milestone {activeStep + 1} of 5
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  {roadmapSteps[activeStep].title}
                </h3>
                <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
                  {roadmapSteps[activeStep].desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#781353] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#781353]" />
                <span>Structured Weekly Goal & Progress Activity</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </ShutterSection>

      {/* 6. WEEKLY SESSIONS & SUPPORT GROUP — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-10 sm:py-16 bg-[var(--bg-secondary)] border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          
          {/* Weekly Sessions Info */}
          <motion.div 
            {...fadeIn}
            className="space-y-4 border-b lg:border-b-0 lg:border-r border-editorial pb-8 lg:pb-0 lg:pr-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#781353]/10 text-[#781353] rounded-xl border border-editorial">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
                  ONE-ON-ONE MENTORSHIP
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
                  {WEEKLY_SESSIONS_INFO.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              {WEEKLY_SESSIONS_INFO.description}
            </p>

            <ul className="space-y-2.5 pt-1">
              {WEEKLY_SESSIONS_INFO.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)] font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#781353] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] text-muted font-mono pt-3 border-t border-editorial">
              {WEEKLY_SESSIONS_INFO.note}
            </p>
          </motion.div>

          {/* Support Group Info */}
          <motion.div 
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: isMobile ? 0 : 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#781353]/10 text-[#781353] rounded-xl border border-editorial">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
                  {SUPPORT_GROUP_INFO.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
                  {SUPPORT_GROUP_INFO.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              {SUPPORT_GROUP_INFO.description}
            </p>

            <ul className="space-y-2.5 pt-1">
              {SUPPORT_GROUP_INFO.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)] font-light">
                  <HeartHandshake className="w-4 h-4 text-[#781353] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] text-muted font-mono pt-3 border-t border-editorial">
              {SUPPORT_GROUP_INFO.rules}
            </p>
          </motion.div>

        </div>
      </ShutterSection>

      {/* 7. FREQUENTLY ASKED QUESTIONS — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="text-center space-y-2 mb-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#781353] block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Everything You Need to Know.
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light max-w-xl mx-auto">
            Clear, authentic answers regarding program structure, weekly sessions, privacy guidelines, and safety principles.
          </p>
        </div>

        <div className="divide-y divide-editorial border-t border-b border-editorial">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqId === idx;
            return (
              <div key={idx} className="py-2">
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : idx)}
                  className="w-full text-left py-4 flex items-center justify-between gap-3 cursor-pointer active:opacity-75 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#781353] shrink-0" />
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform shrink-0 ${isOpen ? 'rotate-180 text-[#781353]' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pt-1 text-xs text-muted font-light leading-relaxed pl-7">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ShutterSection>

      {/* 8. CONTACT / START CONVERSATION — SHUTTER REVEAL SECTION */}
      <ShutterSection className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
            TAKE THE FIRST STEP
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Begin Your Guided Recovery Path.
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light max-w-xl mx-auto">
            Confidential inquiries, program registration, and immediate 24/7 crisis support. You don't have to walk this path alone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <MagneticButton
            onClick={() => { setActivePage('contact-counselor'); window.scrollTo(0,0); }}
            className="bg-[#2E031D] text-white hover:bg-[#4E0834] active:scale-[0.98] px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md focus-visible:outline-none"
          >
            Request Private Callback
          </MagneticButton>

          <a
            href="tel:1800110031"
            className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#781353] hover:underline active:scale-[0.98] border border-editorial rounded-full inline-flex items-center gap-2 focus-visible:outline-none"
          >
            <Phone className="w-4 h-4" /> Call Helpline: 1800-11-0031
          </a>
        </div>
      </ShutterSection>

      {/* Lead Capture Modal for Gated Programs */}
      <LeadCaptureModal
        isOpen={leadModal.isOpen}
        onClose={() => setLeadModal({ isOpen: false, substance: '' })}
        preselectedSubstance={leadModal.substance}
      />

    </div>
  );
}
