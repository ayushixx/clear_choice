import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import AmbientParticles from '../components/AmbientParticles';

export default function MyStory({ setActivePage }) {
  return (
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">

      {/* Magazine Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center pt-4 sm:pt-0">

        {/* Left Side: Title & Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-4 sm:space-y-6"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block border-b border-editorial pb-1">
            Documentary Case Archive
          </span>

          <h1 className="text-3xl sm:text-6xl font-serif font-extrabold tracking-tight leading-[1.1] text-[var(--text-primary)] break-words">
            From Addiction to <span className="italic font-normal text-[#781353] dark:text-[#E03590]">Advocacy</span>
          </h1>

          <p className="text-sm sm:text-lg text-muted font-light leading-relaxed">
            A six-year personal journey through dependency, clinical rehabilitation, and establishing a life rooted in clarity, purpose, and public education.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-editorial text-xs">
            <div>
              <span className="font-mono text-muted uppercase block text-[9px] sm:text-[10px]">Clean Milestone</span>
              <span className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)]">Clean (2024–Present)</span>
            </div>
            <div>
              <span className="font-mono text-muted uppercase block text-[9px] sm:text-[10px]">Guiding Principle</span>
              <span className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)]">Honesty Over Fear</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="rounded-3xl overflow-hidden border border-editorial bg-[var(--bg-secondary)] aspect-[4/5] max-w-md mx-auto lg:max-w-none shadow-xl relative">
            <img
              src="/assets/mystory-portrait.jpg"
              alt="Founding Advocate Portrait"
              className="w-full h-full object-cover object-[center_20%] sm:object-center filter contrast-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* PULL QUOTE WITH SOLID EDITORIAL BORDER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[var(--bg-secondary)] rounded-3xl p-6 sm:p-12 border-l-4 border-[#781353] dark:border-[#E03590] border border-editorial max-w-4xl mx-auto space-y-3 shadow-md overflow-hidden"
      >
        <AmbientParticles count={15} />
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#781353] dark:text-[#E03590] opacity-70 relative z-10" />
        <blockquote className="text-base sm:text-3xl font-serif italic font-bold text-[var(--text-primary)] leading-snug relative z-10 break-words">
          "Recovery begins when honesty becomes stronger than fear."
        </blockquote>
        <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-muted block relative z-10">
          — Clear Choice Core Principle
        </span>
      </motion.section>

      {/* JOURNALISTIC CHAPTERS */}
      <section className="max-w-3xl mx-auto space-y-10 sm:space-y-16">

        {/* Chapter 1 */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 border-l-2 border-[#E03590]/40 pl-4 sm:pl-8"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590]">
            2017 – 2023 • Chapter 01
          </span>
          <h2 className="text-lg sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
            Six Years of Addiction: A Period of Struggle
          </h2>
          <div className="text-xs sm:text-base text-muted leading-relaxed font-light space-y-3 pt-1">
            <p>
              What began as a gradual challenge evolved into a difficult chapter marked by uncertainty, isolation, and personal obstacles. Over time, the need for change became impossible to ignore.
            </p>
          </div>
        </motion.div>

        {/* Chapter 2 */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 border-l-2 border-[#E03590]/40 pl-4 sm:pl-8"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590]">
            2023 – 2024 • Chapter 02
          </span>
          <h2 className="text-lg sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
            Rehabilitation: The Hardest Chapter
          </h2>
          <div className="text-xs sm:text-base text-muted leading-relaxed font-light space-y-3 pt-1">
            <p>
              In early 2023, admitting that I could no longer manage alone was the hardest decision of my life. Entering rehabilitation was intimidating, but it marked the true beginning of freedom.
            </p>
            <p>
              Rehabilitation required unyielding commitment. Medical supervision managed detoxification, while therapy unraveled the emotional triggers beneath dependency.
            </p>
          </div>
        </motion.div>

        {/* Chapter 3 */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 border-l-2 border-[#E03590]/40 pl-4 sm:pl-8"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590]">
            2024 – TODAY • CHAPTER 03
          </span>
          <h2 className="text-lg sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
            Clean & Free: Transforming Survival into Advocacy
          </h2>
          <div className="text-xs sm:text-base text-muted leading-relaxed font-light space-y-3 pt-1">
            <p>
              Reaching clean recovery in 2024 was not just a personal milestone; it birthed CLEAR CHOICE. Recovery is an active, daily commitment to growth, honesty, and education.
            </p>
            <p>
              CLEAR CHOICE is built to dismantle stigma, provide accurate substance education, and ensure nobody walks through darkness alone.
            </p>
          </div>
        </motion.div>

      </section>

      {/* REAL RECOVERY JOURNEY — EDITORIAL TRANSFORMATION STORIES */}
      <section 
        className="w-full bg-[#FCFAFB] dark:bg-[var(--bg-secondary)] border border-[rgba(120,19,83,0.08)] dark:border-editorial rounded-[32px] p-6 sm:p-12 lg:p-[72px] max-w-[1200px] mx-auto shadow-sm"
        aria-labelledby="recovery-journey-heading"
      >
        <div className="space-y-10 sm:space-y-16">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#781353] dark:text-[#E03590] block">
              REAL RECOVERY JOURNEY
            </span>
            <h2 
              id="recovery-journey-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2E031D] dark:text-[var(--text-primary)] tracking-tight leading-tight"
            >
              Transformation Stories
            </h2>
            <p className="text-xs sm:text-base text-muted font-light leading-relaxed max-w-2xl mx-auto">
              Recovery is not a single moment. It is a series of small decisions that create lasting change.
            </p>
          </motion.div>

          {/* Image Gallery: 2 Columns on Desktop, Single Column with Clear Separation on Mobile/Tablet */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 items-start">
            
            {/* Column / Section 1: Before Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-[rgba(120,19,83,0.08)] dark:border-editorial">
                <span className="w-2 h-2 rounded-full bg-[#781353]/60 dark:bg-[#E03590]/60" />
                <h3 className="font-serif font-bold text-base sm:text-xl text-[#2E031D] dark:text-[var(--text-primary)]">
                  Before Recovery
                </h3>
              </div>

              {/* Image 1 */}
              <div className="rounded-[24px] overflow-hidden border border-[rgba(120,19,83,0.08)] dark:border-editorial/60 bg-[var(--bg-primary)] shadow-sm relative group aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/recovery-before-1.jpg"
                  alt="Mehul Saini during the struggle with substance dependency - Before Recovery"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-30" />
              </div>

              {/* Image 2 */}
              <div className="rounded-[24px] overflow-hidden border border-[rgba(120,19,83,0.08)] dark:border-editorial/60 bg-[var(--bg-primary)] shadow-sm relative group aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/recovery-before-2.jpg"
                  alt="Documentary archive photo during the active addiction phase - Before Recovery"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_20%] sm:object-center filter contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-30" />
              </div>
            </motion.div>

            {/* Mobile / Tablet Visual Divider */}
            <div className="block lg:hidden my-2 border-t border-[rgba(120,19,83,0.12)] dark:border-editorial" aria-hidden="true" />

            {/* Column / Section 2: After Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-[rgba(120,19,83,0.08)] dark:border-editorial">
                <span className="w-2 h-2 rounded-full bg-[#E03590]" />
                <h3 className="font-serif font-bold text-base sm:text-xl text-[#2E031D] dark:text-[var(--text-primary)]">
                  After Recovery
                </h3>
              </div>

              {/* Image 3 */}
              <div className="rounded-[24px] overflow-hidden border border-[rgba(120,19,83,0.08)] dark:border-editorial/60 bg-[var(--bg-primary)] shadow-sm relative group aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/recovery-after-1.jpg"
                  alt="Mehul Saini embracing physical discipline and renewed health - After Recovery"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-30" />
              </div>

              {/* Image 4 */}
              <div className="rounded-[24px] overflow-hidden border border-[rgba(120,19,83,0.08)] dark:border-editorial/60 bg-[var(--bg-primary)] shadow-sm relative group aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/recovery-after-2.jpg"
                  alt="Mehul Saini post-rehabilitation demonstrating strength and recovery discipline - After Recovery"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-30" />
              </div>
            </motion.div>

          </div>

          {/* Footnote & Premium Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6 sm:pt-8 border-t border-[rgba(120,19,83,0.08)] dark:border-editorial space-y-6"
          >
            {/* Permission Footnote */}
            <p className="text-[11px] sm:text-xs font-mono text-muted text-center tracking-wide">
              Images shared with permission for awareness and educational purposes.
            </p>

            {/* Premium Quote Block */}
            <div className="bg-[#2E031D] text-white rounded-[24px] p-6 sm:p-8 lg:p-10 border border-[#2E031D] shadow-md relative overflow-hidden text-center max-w-3xl mx-auto space-y-3">
              <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-[#E03590] opacity-80 mx-auto" />
              <blockquote className="font-serif text-sm sm:text-lg lg:text-xl text-white/95 italic leading-relaxed">
                "Recovery does not happen overnight. It happens one choice, one day, and one step at a time."
              </blockquote>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Understated Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#2E031D] dark:bg-[#16161C] text-white p-6 sm:p-10 border border-[#2E031D] dark:border-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-3xl shadow-xl"
      >
        <div>
          <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">Need Support or Have Questions?</h3>
          <p className="text-xs sm:text-sm text-white/80 font-light mt-1">Confidential counselor guidance is available for you.</p>
        </div>
        <MagneticButton
          onClick={() => { setActivePage('contact-counselor'); window.scrollTo(0, 0); }}
          className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest transition-all whitespace-nowrap w-full sm:w-auto justify-center touch-target rounded-full shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <span>Contact Counselor Directly</span>
            <ArrowRight className="w-4 h-4 text-[#E03590]" />
          </span>
        </MagneticButton>
      </motion.div>

    </div>
  );
}
