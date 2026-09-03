import React from 'react';
import { MYTH_VS_FACT } from '../data/contentData';
import { ArrowRight } from 'lucide-react';

export default function MythVsFact({ setActivePage }) {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
          Editorial Reference Guide
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Myth vs. Fact
        </h1>
        <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
          A minimalist analysis challenging 10 common societal misconceptions surrounding substance dependency, treatment, and recovery.
        </p>
      </div>

      {/* 10 Minimal Editorial Reference Cards */}
      <div className="space-y-8">
        {MYTH_VS_FACT.map((item, idx) => (
          <div 
            key={item.id}
            className="card-doc p-6 sm:p-8 space-y-4"
          >
            {/* Counter Badge */}
            <div className="flex items-center justify-between border-b border-editorial pb-3">
              <span className="text-xs font-mono font-bold text-[#781353] dark:text-[#DC2F87] uppercase tracking-wider">
                Myth 0{idx + 1}
              </span>
              <span className="text-[10px] font-mono text-muted uppercase">
                Evidence-Based Analysis
              </span>
            </div>

            {/* Myth Statement */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-[var(--text-primary)] leading-snug">
                "{item.myth}"
              </h2>
            </div>

            {/* Fact Statement */}
            <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-[#781353] dark:border-[#DC2F87] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#DC2F87] block">
                The Fact
              </span>
              <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                {item.fact}
              </p>
            </div>

            {/* Scientific Explanation */}
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-light pt-1">
              {item.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Understated Bottom Support Link */}
      <div className="pt-8 border-t border-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">Need Medical or Crisis Assistance?</h3>
          <p className="text-xs text-muted font-light">Confidential help is available 24/7 nationwide.</p>
        </div>
        <button
          onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
          className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
        >
          <span>Connect With Support</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
