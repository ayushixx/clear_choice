import React, { useState } from 'react';
import { DRUG_FACTS } from '../data/contentData';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DrugFacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubstanceId, setOpenSubstanceId] = useState('opioids');

  const filteredFacts = DRUG_FACTS.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id) => {
    setOpenSubstanceId(openSubstanceId === id ? null : id);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Header & Search */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-4"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Educational Database Archive
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Drug Facts Library
        </h1>
        <p className="text-sm sm:text-lg text-muted font-light leading-relaxed">
          Clear, evidence-based facts on 10 major substances. Short-term effects, long-term health risks, and legal implications.
        </p>

        {/* Minimal Search Input */}
        <div className="pt-2 max-w-md relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search substances (e.g., Opioids, Fentanyl)..."
            className="w-full pl-10 pr-4 py-3 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)]"
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      {/* 4x4 Responsive Grid (Desktop: 4 columns, Mobile: 1 column) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredFacts.map((drug) => {
            const isOpen = openSubstanceId === drug.id;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={drug.id}
                className={`card-doc transition-all duration-200 overflow-hidden flex flex-col justify-between ${isOpen
                    ? 'border-[#781353] dark:border-[#E03590] col-span-1 md:col-span-2 lg:col-span-2 shadow-xs'
                    : 'hover:border-[#781353] dark:hover:border-[#E03590]'
                  }`}
              >
                {/* Card Header (Accordion Toggle) */}
                <div
                  onClick={() => toggleAccordion(drug.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none space-y-3 touch-target btn-tap"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-2.5 py-1 border border-editorial">
                      {drug.category}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? 'rotate-180 text-[var(--text-primary)]' : ''}`} />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                      {drug.name}
                    </h3>
                    <p className="text-xs text-muted font-light mt-1 leading-relaxed">
                      {drug.tagline}
                    </p>
                  </div>
                </div>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-editorial space-y-4 bg-[var(--bg-secondary)] text-xs">

                    {/* Short-Term Effects */}
                    <div className="space-y-1.5">
                      <span className="font-mono font-bold text-[10px] uppercase text-[#781353] dark:text-[#E03590] block">
                        Short-Term Effects
                      </span>
                      <ul className="space-y-1 pl-2 text-[var(--text-primary)]">
                        {drug.shortTermEffects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#781353] dark:bg-[#E03590] shrink-0 mt-1.5"></span>
                            <span className="leading-relaxed">{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Long-Term Risks */}
                    <div className="space-y-1.5">
                      <span className="font-mono font-bold text-[10px] uppercase text-[var(--text-secondary)] block">
                        Long-Term Health Risks
                      </span>
                      <ul className="space-y-1 pl-2 text-[var(--text-primary)]">
                        {drug.longTermEffects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] shrink-0 mt-1.5"></span>
                            <span className="leading-relaxed">{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Legal Penalties */}
                    <div className="p-3.5 bg-[#2E031D] dark:bg-[#16161C] text-white border border-white/10 space-y-1">
                      <span className="text-[9px] font-mono uppercase font-bold text-white/70 block">
                        Legal Implications
                      </span>
                      <p className="text-white text-xs leading-relaxed">
                        {drug.legalPenalties}
                      </p>
                    </div>

                  </div>
                )}

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}

