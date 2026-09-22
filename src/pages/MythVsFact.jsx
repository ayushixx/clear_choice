import React from 'react';
import { MYTH_VS_FACT } from '../data/contentData';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MythVsFact({ setActivePage }) {
  return (
    <div className="pt-20 sm:pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-3 sm:space-y-4 pt-4 sm:pt-0"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Editorial Reference Guide
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Myth vs. Fact
        </h1>
        <p className="text-xs sm:text-lg text-muted font-light leading-relaxed">
          A minimalist analysis challenging 10 common societal misconceptions surrounding substance dependency, treatment, and recovery.
        </p>
      </motion.div>

      {/* 10 Minimal Editorial Reference Cards */}
      <div className="space-y-6 sm:space-y-8">
        {MYTH_VS_FACT.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="card-doc p-6 sm:p-8 space-y-4 rounded-3xl"
          >
            {/* Counter Badge */}
            <div className="flex items-center justify-between border-b border-editorial pb-3 gap-2">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#781353] dark:text-[#E03590] uppercase tracking-wider bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-editorial">
                Myth 0{idx + 1}
              </span>
              <span className="text-[10px] font-mono text-muted uppercase">
                Evidence-Based Analysis
              </span>
            </div>

            {/* Myth Statement */}
            <div>
              <h2 className="text-lg sm:text-2xl font-serif italic font-bold text-[var(--text-primary)] leading-snug break-words">
                "{item.myth}"
              </h2>
            </div>

            {/* Fact Statement */}
            <div className="p-4 sm:p-5 bg-[var(--bg-secondary)] border-l-4 border-[#781353] dark:border-[#E03590] border border-editorial space-y-1 rounded-2xl shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] block">
                The Fact
              </span>
              <p className="text-xs sm:text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                {item.fact}
              </p>
            </div>

            {/* Scientific Explanation */}
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-light pt-1">
              {item.explanation}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Understated Bottom Support Link */}
      <div className="pt-8 border-t border-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">Need Medical or Crisis Assistance?</h3>
          <p className="text-xs text-muted font-light">Confidential help is available 24/7 nationwide.</p>
        </div>
        <button
          onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
          className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2 btn-tap touch-target w-full sm:w-auto cursor-pointer shadow-md"
        >
          <span>Connect With Support</span>
          <ArrowRight className="w-4 h-4 text-[#E03590] dark:text-[#781353]" />
        </button>
      </div>

    </div>
  );
}
