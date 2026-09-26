import React, { useState, useEffect, useMemo } from 'react';
import { Phone, ArrowRight, Shield, Calendar, Users, CheckCircle2, ChevronDown, HelpCircle, HeartHandshake, Sparkles } from 'lucide-react';
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

// Mobile-aware animation presets — lightweight opacity-only on phones
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

export default function Home({ setActivePage }) {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  // Disable parallax on mobile — it causes scroll jank
  const heroTextY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -15]);
  const [openFaqId, setOpenFaqId] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [leadModal, setLeadModal] = useState({ isOpen: false, substance: '' });

  // Programs that require lead capture instead of showing full details
  const GATED_PROGRAM_IDS = ['benzo-recovery', 'prescription-recovery', 'other-recovery'];

  // Reusable animation variants — fast & simple on mobile, richer on desktop
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
    transition: { duration: isMobile ? 0.2 : 0.5 },
    viewport: { once: true },
  }), [isMobile]);

  const fadeSlideRight = useMemo(() => ({
    initial: { opacity: 0, ...(isMobile ? {} : { x: 15 }) },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: isMobile ? 0.2 : 0.5, delay: isMobile ? 0 : 0.1 },
    viewport: { once: true },
  }), [isMobile]);

  useEffect(() => {
    console.log('[CLEAR CHOICE] Phone-Optimized Dynamic Home Loaded');
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
      
      {/* 1. HERO SECTION — DYNAMIC HERO WITH ZOOM-IN PORTRAIT & TIGHT MOBILE SPACING */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 border-b border-editorial overflow-hidden">
        
        <AmbientParticles count={10} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center z-10">
          
          {/* Left Column: Narrative & Action */}
          <motion.div 
            style={{ y: heroTextY }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-left order-1"
          >
            {/* Category Tagline */}
            <motion.div 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.15 : 0.4 }}
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
              transition={{ duration: isMobile ? 0.2 : 0.6, delay: isMobile ? 0 : 0.05 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.08]"
            >
              Your Recovery Journey, Guided by Mehul.
            </motion.h1>

            {/* Mobile-Only Compact Portrait */}
            <div className="block lg:hidden my-3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg border border-editorial bg-[var(--bg-secondary)] group"
              >
                <img 
                  src={mehulPortrait} 
                  alt="Mehul Saini — Addiction Recovery Specialist" 
                  className="w-full h-full object-cover object-[center_18%] filter contrast-[1.02]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E031D]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#E03590] font-bold block">MEHUL SAINI</span>
                  <p className="text-[9px] font-mono text-white/80 uppercase tracking-wider">Recovery Specialist</p>
                </div>
              </motion.div>
            </div>

            {/* Introduction Text */}
            <motion.p 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.15 : 0.5, delay: isMobile ? 0 : 0.12 }}
              className="text-sm sm:text-lg text-muted font-light leading-relaxed max-w-xl"
            >
              {MEHUL_INFO.introduction}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ duration: isMobile ? 0.15 : 0.5, delay: isMobile ? 0 : 0.18 }}
              className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <MagneticButton
                onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
                className="bg-[#2E031D] text-white hover:bg-[#4E0834] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full text-center shadow-md focus-visible:ring-2 focus-visible:ring-[#781353] focus-visible:outline-none"
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
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] hover:text-[#781353] transition-colors border border-editorial rounded-full text-center focus-visible:ring-2 focus-visible:ring-[#781353] focus-visible:outline-none"
              >
                Read Mehul's Story
              </button>
            </motion.div>

            {/* Helpline Notice */}
            <div className="pt-3 border-t border-editorial flex items-center gap-2.5 text-[11px] font-mono text-muted">
              <Shield className="w-3.5 h-3.5 text-[#781353] shrink-0" />
              <span>100% Confidential • Helpline: <strong className="text-[var(--text-primary)]">1800-11-0031</strong></span>
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

      {/* 2. ABOUT MEHUL — EDITORIAL LIST LAYOUT (NO CARDS, TIGHT SPACING) */}
      <section id="about-mehul-story" className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          <motion.div 
            {...fadeSlideLeft}
            className="lg:col-span-5 space-y-3 lg:sticky lg:top-24"
          >
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

            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
                Personal Message from Mehul
              </span>
              <blockquote className="font-serif text-base sm:text-xl text-[var(--text-primary)] italic leading-relaxed border-l-2 border-[#781353] pl-4 py-1">
                "Recovery is a personal journey built on daily choices. With structured guidance, healthy routines, and continuous support, lasting change is possible. You do not have to recover alone."
              </blockquote>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. RECOVERY PHILOSOPHY — CLEAN TYPOGRAPHIC LIST (NO CARDS) */}
      <section className="py-10 sm:py-16 bg-[var(--bg-secondary)] border-b border-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <motion.div 
            {...fadeIn}
            className="space-y-2"
          >
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
      </section>

      {/* 4. ADDICTION RECOVERY PROGRAMS — EDITORIAL ACCORDION LIST (NO REPETITIVE CARDS) */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-editorial pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
              Structured Recovery Pathways.
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light">
              Every program incorporates structured roadmaps, weekly sessions with Mehul, daily check-ins, and ongoing support group access.
            </p>
          </div>

          <button
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="text-xs font-bold uppercase tracking-widest text-[#781353] hover:underline flex items-center gap-1.5 self-start md:self-auto focus-visible:outline-none"
          >
            <span>Explore All Programs</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Divider List View */}
        <div className="divide-y divide-editorial">
          {RECOVERY_PROGRAMS.map((prog, idx) => {
            const isGated = GATED_PROGRAM_IDS.includes(prog.id);

            return (
              <motion.div 
                key={prog.id}
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={fadeIn.viewport}
                transition={{ delay: isMobile ? 0 : idx * 0.03, duration: isMobile ? 0.2 : 0.3 }}
                onClick={() => {
                  if (isGated) {
                    setLeadModal({ isOpen: true, substance: prog.title.replace(/^[A-H]\.\s*/, '') });
                  } else {
                    setActivePage('help');
                    window.scrollTo(0,0);
                  }
                }}
                className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group cursor-pointer hover:bg-[var(--bg-secondary)] transition-all px-3 -mx-3 rounded-xl"
              >
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                      isGated
                        ? 'text-amber-700 bg-amber-100 border-amber-200'
                        : 'text-[#781353] bg-[#781353]/10 border-[#781353]/20'
                    }`}>
                      {prog.duration}
                    </span>
                    <span className="text-[9px] font-mono text-muted uppercase tracking-wider">
                      {prog.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] transition-colors">
                    {prog.title}
                  </h3>
                </div>

                <div className="lg:col-span-6 text-xs text-muted font-light leading-relaxed">
                  {prog.tagline}
                  {isGated && (
                    <span className="block mt-1.5 text-[10px] text-amber-700 font-medium">
                      Personalized plan provided after assessment
                    </span>
                  )}
                </div>

                <div className="lg:col-span-2 flex justify-end">
                  {isGated ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                      <span>Get to Know More</span> <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-[#781353] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 5. THE 5-PHASE ROADMAP — DYNAMIC STEPPED TIMELINE WITH INTERACTIVE STEP HIGHLIGHT & ZOOM */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="max-w-2xl space-y-1.5 mb-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            How Your Journey Unfolds.
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light">
            Recovery progresses through five distinct milestones designed to establish stabilization, rebuild routine, and maintain long-term freedom.
          </p>
        </div>

        {/* Stepped Interactive Timeline Controls (Mobile Horizontal Scroll / Desktop Grid) */}
        <div className="space-y-6">
          
          {/* Step Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {roadmapSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer btn-tap ${
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

          {/* Active Step Highlight Showcase with Dynamic Scale/Zoom Animation */}
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
      </section>

      {/* 6. WEEKLY SESSIONS & SUPPORT GROUP — EDITORIAL SIDE-BY-SIDE (NO BOXED CARDS) */}
      <section className="py-10 sm:py-16 bg-[var(--bg-secondary)] border-b border-editorial">
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
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION — DIVIDER LIST) */}
      <section className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-editorial">
        <div className="text-center space-y-2 mb-6">
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
                  className="w-full text-left py-4 flex items-center justify-between gap-3 cursor-pointer btn-tap focus-visible:outline-none"
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
      </section>



      {/* 9. CONTACT / START CONVERSATION */}
      <section className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
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
            className="bg-[#2E031D] text-white hover:bg-[#4E0834] px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md focus-visible:outline-none"
          >
            Request Private Callback
          </MagneticButton>

          <a
            href="tel:1800110031"
            className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#781353] hover:underline border border-editorial rounded-full inline-flex items-center gap-2 focus-visible:outline-none"
          >
            <Phone className="w-4 h-4" /> Call Helpline: 1800-11-0031
          </a>
        </div>
      </section>

      {/* Lead Capture Modal for Gated Programs */}
      <LeadCaptureModal
        isOpen={leadModal.isOpen}
        onClose={() => setLeadModal({ isOpen: false, substance: '' })}
        preselectedSubstance={leadModal.substance}
      />

    </div>
  );
}
