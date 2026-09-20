import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import AmbientParticles from '../components/AmbientParticles';

export default function MyStory({ setActivePage }) {
  return (
    <div className="pt-20 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">

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
              <span className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)]">2 Years Clean (2025–Present)</span>
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

      {/* PULL QUOTE WITH GLASSMORPHISM BORDER & GLOW */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[var(--bg-secondary)] rounded-3xl p-6 sm:p-12 border-l-4 border-[#781353] dark:border-[#E03590] max-w-4xl mx-auto space-y-3 shadow-md overflow-hidden"
      >
        <AmbientParticles count={15} />
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#781353] dark:text-[#E03590] opacity-60 relative z-10" />
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
              What began as a gradual challenge evolved into a difficult chapter marked by uncertainty, isolation, and personal obstacles. Over time, the need for change became impossible to ignore.            </p>
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
            2023 – 2025 • Chapter 02
          </span>
          <h2 className="text-lg sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
            Rehabilitation: The Hardest Chapter
          </h2>
          <div className="text-xs sm:text-base text-muted leading-relaxed font-light space-y-3 pt-1">
            <p>
              In early 2023, admitting that I could no longer manage alone was the hardest decision of my life. Entering rehabilitation was intimidating, but it marked the true beginning of freedom.
            </p>
            <p>
              Two years in rehabilitation required unyielding commitment. Medical supervision managed detoxification, while therapy unraveled the emotional triggers beneath dependency.
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
            2025 – Today • Chapter 03
          </span>
          <h2 className="text-lg sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
            2 Years Clean: Transforming Survival into Advocacy
          </h2>
          <div className="text-xs sm:text-base text-muted leading-relaxed font-light space-y-3 pt-1">
            <p>
              Reaching two years clean in 2025 was not just a personal milestone; it birthed CLEAR CHOICE. Recovery is an active, daily commitment to growth, honesty, and education.
            </p>
            <p>
              CLEAR CHOICE is built to dismantle stigma, provide accurate substance education, and ensure nobody walks through darkness alone.
            </p>
          </div>
        </motion.div>

      </section>

      {/* Understated Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#2E031D] dark:bg-[#16161C] text-white p-6 sm:p-10 border border-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 glow-accent rounded-3xl shadow-xl"
      >
        <div>
          <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">Need Support or Have Questions?</h3>
          <p className="text-xs sm:text-sm text-white/80 font-light mt-1">24/7 confidential assistance is available right now.</p>
        </div>
        <MagneticButton
          onClick={() => { setActivePage('help'); window.scrollTo(0, 0); }}
          className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest transition-all whitespace-nowrap w-full sm:w-auto justify-center touch-target rounded-full shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <span>Get Crisis Support</span>
            <ArrowRight className="w-4 h-4 text-[#E03590]" />
          </span>
        </MagneticButton>
      </motion.div>

    </div>
  );
}
