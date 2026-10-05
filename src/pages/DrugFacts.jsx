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
    <div className="pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

      {/* Header & Search */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-3 sm:space-y-4 pt-4 sm:pt-0"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Educational Database Archive
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Drug Facts Library
        </h1>
        <p className="text-xs sm:text-lg text-muted font-light leading-relaxed">
          Clear, evidence-based facts on 10 major substances. Short-term effects, long-term health risks, and legal implications.
        </p>

        {/* Minimal Search Input */}
        <div className="pt-2 max-w-md relative flex items-center">
          <Search className="w-4 h-4 text-muted absolute left-4 pointer-events-none z-10" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search substances (e.g., Opioids, Fentanyl)..."
            className="input-primary input-icon-left !pl-11 pr-4 rounded-xl"
          />
        </div>
      </motion.div>

      {/* Responsive Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
                className={`card-doc transition-all duration-200 overflow-hidden flex flex-col justify-between rounded-3xl ${
                  isOpen
                    ? 'border-[#E03590] ring-2 ring-[#E03590]/40 col-span-1 md:col-span-2 lg:col-span-2 shadow-lg'
                    : 'hover:border-[#E03590]'
                }`}
              >
                {/* Card Header (Accordion Toggle) */}
                <div
                  onClick={() => toggleAccordion(drug.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none space-y-3 touch-target btn-tap"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-3 py-1 border border-editorial rounded-full shrink-0">
                      {drug.category}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform shrink-0 ${isOpen ? 'rotate-180 text-[var(--text-primary)]' : ''}`} />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                      {drug.name}
                    </h3>
                    <p className="text-xs text-muted font-light mt-1 leading-relaxed">
                      {drug.tagline}
                    </p>
                  </div>
                </div>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-3 border-t border-editorial space-y-4 bg-[var(--bg-secondary)] text-xs">

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
                      <span className="font-mono font-bold text-[10px] uppercase text-[var(--text-secondary)] dark:text-white/80 block">
                        Long-Term Health Risks
                      </span>
                      <ul className="space-y-1 pl-2 text-[var(--text-primary)]">
                        {drug.longTermEffects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#781353] dark:bg-[#E03590] shrink-0 mt-1.5"></span>
                            <span className="leading-relaxed">{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Legal Penalties */}
                    <div className="p-4 bg-[#2E031D] dark:bg-[#16161C] text-white border border-white/10 rounded-2xl space-y-1">
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
