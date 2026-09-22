import React, { useState } from 'react';
import RehabDirectory from '../components/RehabDirectory';
import TrustBadges from '../components/TrustBadges';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecoveryCenters({ setActivePage, setSelectedCenter }) {
  const [activeSelectedCenter, setActiveSelectedCenter] = useState(null);

  const handleGetDirections = (center) => {
    if (setSelectedCenter) {
      setSelectedCenter(center);
    }
    setActivePage('find-support');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pt-4 sm:pt-0">
        <button 
          onClick={() => { setActivePage('help'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-mono text-muted hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors btn-tap touch-target cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Get Help Hub
        </button>
        <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-[var(--bg-secondary)] border border-editorial text-[#781353] dark:text-[#E03590] px-3 py-1 font-bold shrink-0 rounded-full">
          Directory Explorer
        </span>
      </div>

      {/* PAGE HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl space-y-3"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Accredited Rehabilitation Facilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Recovery & Rehabilitation Directory
        </h1>
        <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
          Filter and discover verified addiction treatment clinics, hospital facilities, and inpatient care centers across major Indian cities and states.
        </p>
      </motion.div>

      {/* REHABILITATION CENTER DIRECTORY COMPONENT */}
      <RehabDirectory
        selectedCenter={activeSelectedCenter}
        onSelectCenter={setActiveSelectedCenter}
        onGetDirections={handleGetDirections}
      />

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
