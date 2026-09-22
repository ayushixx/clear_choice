import React, { useEffect } from 'react';
import { Phone, ArrowRight, ChevronRight, Shield, Award, UserCheck, Calendar, Users, HeartPulse, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import TestimonialsCarousel from '../components/TestimonialsCarousel';
import AmbientParticles from '../components/AmbientParticles';
import ScrollIndicator from '../components/ScrollIndicator';
import MagneticButton from '../components/MagneticButton';
import heroHomeImage from '../assets/hero-home.jpg';
import { MEHUL_INFO, RECOVERY_PROGRAMS, WEEKLY_SESSIONS_INFO, SUPPORT_GROUP_INFO, SAFETY_INFO } from '../data/contentData';

export default function Home({ setActivePage }) {
  const { scrollY } = useScroll();
  const heroImageScale = useTransform(scrollY, [0, 600], [1, 1.12]);
  const heroImageY = useTransform(scrollY, [0, 600], [0, 70]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -15]);

  useEffect(() => {
    console.log('[CLEAR CHOICE DEBUG] Home Page Mounted with Mehul Content');
  }, []);

  return (
    <div className="space-y-16 sm:space-y-28 pb-24">
      
      {/* HERO SECTION — CINEMATIC PARALLAX & AMBIENT MOTION */}
      <section className="relative w-full min-h-[100dvh] sm:h-screen flex items-end sm:items-center justify-start overflow-hidden pt-20 sm:pt-28 pb-12 sm:pb-0">
        
        {/* Responsive Centered Hero Image */}
        <motion.div 
          style={{ scale: heroImageScale, y: heroImageY }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img 
            src={heroHomeImage} 
            alt="Clear Choice Subject" 
            className="w-full h-full object-cover object-[center_35%] sm:object-[center_25%] md:object-center filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Layered Cinematic Overlays */}
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,53,144,0.25),transparent_65%)]"></div>
        </motion.div>

        {/* Ambient Particles Layer */}
        <AmbientParticles count={24} />

        {/* Content Container — Above-the-Fold Optimized Layout */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4 sm:space-y-6 text-left text-white my-auto"
        >
          
          {/* Category Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/90 uppercase border-b border-white/30 pb-0.5 sm:pb-1"
          >
            <span>RECOVERY GUIDANCE</span>
            <span>•</span>
            <span>MEHUL</span>
            <span>•</span>
            <span>STRUCTURED PROGRAMS</span>
          </motion.div>

          {/* Editorial Serif Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[36px] leading-[1.08] min-[375px]:text-[42px] min-[390px]:text-[46px] min-[414px]:text-[50px] sm:text-6xl md:text-[68px] lg:text-[76px] font-serif font-extrabold text-white tracking-tight leading-[1.05] max-w-3xl drop-shadow-md break-words"
          >
            {MEHUL_INFO.headline}
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-sm"
          >
            {MEHUL_INFO.introduction}
          </motion.p>

          {/* Mobile Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-lg"
          >
            <MagneticButton
              onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
              className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl touch-target rounded-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>VIEW RECOVERY PROGRAMS</span>
                <ArrowRight className="w-4 h-4 text-[#E03590]" />
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={() => { setActivePage('story'); window.scrollTo(0,0); }}
              className="bg-black/70 hover:bg-black text-white border border-white/40 px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-semibold uppercase tracking-widest transition-all touch-target rounded-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>About Mehul</span>
                <ChevronRight className="w-4 h-4 opacity-80" />
              </span>
            </MagneticButton>
          </motion.div>

          {/* Above-the-fold Lifeline Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-2 text-xs font-mono text-white/90 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#E03590]" />
            <span>24/7 National Emergency Support: <strong>1800-11-0031</strong></span>
          </motion.div>

        </motion.div>

        {/* Hero Scroll Guidance Indicator */}
        <ScrollIndicator targetId="about-mehul-section" />

      </section>

      {/* SECTION 1: ABOUT MEHUL */}
      <section id="about-mehul-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
            01 • About Mehul
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[var(--text-primary)]">
            Guided Addiction Recovery
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
            {MEHUL_INFO.introduction}
          </p>
        </motion.div>

        {/* Mehul Verified Details & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Verified Credentials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-doc p-6 sm:p-8 space-y-4 rounded-3xl"
          >
            <div className="flex items-center gap-3 text-[#781353] dark:text-[#E03590]">
              <Award className="w-6 h-6 shrink-0" />
              <h3 className="text-xl font-serif font-bold text-[var(--text-primary)]">Verified Qualifications & Experience</h3>
            </div>
            
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] font-light">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E03590] shrink-0 mt-0.5" />
                <span><strong>Full Name & Title:</strong> Mehul — Lead Recovery Practitioner & Addiction Recovery Specialist</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E03590] shrink-0 mt-0.5" />
                <span><strong>Background:</strong> Years of personal recovery experience and structured behavioral mentorship.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E03590] shrink-0 mt-0.5" />
                <span><strong>Qualifications:</strong> Certified Addiction Recovery Practitioner & Relapse Prevention Specialist.</span>
              </li>
            </ul>
          </motion.div>

          {/* Card: Recovery Approach & Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-doc p-6 sm:p-8 space-y-4 rounded-3xl bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-3 text-[#781353] dark:text-[#E03590]">
              <UserCheck className="w-6 h-6 shrink-0" />
              <h3 className="text-xl font-serif font-bold text-[var(--text-primary)]">Recovery Approach & Philosophy</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
              Holistic, structured, non-judgmental guidance centered on daily discipline, neuroplastic healing, craving management, and ongoing personal support.
            </p>

            <div className="p-4 bg-[var(--bg-card)] border border-editorial rounded-2xl space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590] block">Personal Message from Mehul</span>
              <p className="text-xs font-serif italic text-[var(--text-primary)]">
                "Your recovery journey is a path of daily choices. You don't have to walk it alone — with structured routines, clear guidance, and compassionate accountability, lasting freedom is within your reach."
              </p>
            </div>
          </motion.div>

        </div>

      </section>

      {/* SECTION 2: ADDICTION RECOVERY PROGRAMS (MODULES MAINLY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
              02 • Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
              Addiction Recovery Programs
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-light">
              Each program includes a structured recovery roadmap, weekly sessions with Mehul, a personal recovery dashboard, daily activities, mood check-ins, and access to a recovery support group.
            </p>
          </div>

          <button 
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity btn-tap touch-target self-start md:self-auto shrink-0 shadow-md"
          >
            Explore All Programs
          </button>
        </div>

        {/* Grid of 8 Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECOVERY_PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
              className="card-doc p-6 sm:p-8 rounded-3xl space-y-4 cursor-pointer group flex flex-col justify-between hover:border-[#E03590] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-editorial">
                    {program.duration}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">{program.category}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] dark:group-hover:text-[#E03590] transition-colors">
                  {program.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  {program.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-editorial flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:underline">
                <span>View Program Modules</span>
                <ArrowRight className="w-4 h-4 text-[#E03590]" />
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* SECTION 3: WEEKLY SESSIONS & RECOVERY SUPPORT GROUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Weekly Sessions with Mehul */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-doc p-6 sm:p-8 rounded-3xl space-y-4 bg-[#2E031D] text-white dark:bg-[#16161C] border border-[#2E031D] dark:border-editorial shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#E03590] shrink-0" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">{WEEKLY_SESSIONS_INFO.title}</h3>
                <span className="text-xs text-white/70 font-mono">{WEEKLY_SESSIONS_INFO.description}</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-white/90 font-light">
              {WEEKLY_SESSIONS_INFO.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E03590] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 text-[10px] font-mono text-white/60 uppercase">
              {WEEKLY_SESSIONS_INFO.note}
            </div>
          </motion.div>

          {/* Recovery Support Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-doc p-6 sm:p-8 rounded-3xl space-y-4 bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#781353] dark:text-[#E03590] shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590]">{SUPPORT_GROUP_INFO.subtitle}</span>
                <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">{SUPPORT_GROUP_INFO.title}</h3>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
              {SUPPORT_GROUP_INFO.description}
            </p>

            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-light">
              {SUPPORT_GROUP_INFO.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E03590] shrink-0"></div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-[var(--bg-card)] border border-editorial rounded-2xl text-[10px] font-mono text-[var(--text-muted)]">
              {SUPPORT_GROUP_INFO.rules}
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 4: SAFETY & PROFESSIONAL SUPPORT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-doc p-6 sm:p-10 rounded-3xl space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-editorial pb-4">
            <Shield className="w-7 h-7 text-[#781353] dark:text-[#E03590] shrink-0" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590]">{SAFETY_INFO.subtitle}</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">{SAFETY_INFO.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {SAFETY_INFO.points.map((pt, i) => (
              <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-editorial rounded-2xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#E03590]">0{i + 1}</span>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{pt}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#781353]/10 border border-[#781353]/20 rounded-2xl flex items-start gap-3 text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#E03590] shrink-0 mt-0.5" />
            <span>{SAFETY_INFO.disclaimer}</span>
          </div>
        </motion.div>
      </section>

      {/* RECOVERY TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialsCarousel />
      </section>

    </div>
  );
}
