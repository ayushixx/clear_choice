import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { REHAB_CENTERS } from '../data/rehabCenters';
import TrustBadges from '../components/TrustBadges';
import { ArrowLeft, MapPin, Phone, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FindSupportNearYou({ setActivePage, selectedCenter, setSelectedCenter }) {
  const [activeCenter, setActiveCenter] = useState(selectedCenter || REHAB_CENTERS[0]);

  const handleSelectCenter = (center) => {
    setActiveCenter(center);
    if (setSelectedCenter) {
      setSelectedCenter(center);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pt-4 sm:pt-0">
        <button 
          onClick={() => { setActivePage('help'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-mono text-muted hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors btn-tap touch-target cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Get Help Hub
        </button>
        <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-[var(--bg-secondary)] border border-editorial text-[#781353] dark:text-[#E03590] px-3 py-1 font-bold shrink-0 rounded-full">
          GPS Location Navigator
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
          Interactive Facility Map
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Find Support Near You
        </h1>
        <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
          Locate certified rehabilitation centers, outpatient clinics, and emergency counseling facilities on an interactive map.
        </p>
      </motion.div>

      {/* PERSONALIZED RECOMMENDATION CTA BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="bg-gradient-to-r from-[#2E031D] to-[#4E0834] text-white p-5 sm:p-6 rounded-3xl border border-[#781353] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E03590]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E03590]">
              Need Guidance Choosing a Center?
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
            Get Personalized Center Recommendations
          </h3>
          <p className="text-xs text-[#FDF3F7]/80 font-light">
            Fill out our quick 1-minute intake form to receive tailored center options matched to your budget, location, and specific care needs.
          </p>
        </div>

        <button
          onClick={() => {
            setActivePage('recovery-centers');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#E03590] hover:bg-[#c82b7c] text-white py-3 px-5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-full shadow-md shrink-0 btn-tap touch-target cursor-pointer w-full sm:w-auto"
        >
          <span>Find the Right Recovery Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>


      {/* MAP HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <InteractiveMap
          selectedCenter={activeCenter}
          allCenters={REHAB_CENTERS}
          onSelectCenter={handleSelectCenter}
        />
      </motion.div>

      {/* NEARBY FACILITY GRID SELECTOR */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-editorial pb-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
              Quick Pin Selector
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              All Listed Support Locations
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">{REHAB_CENTERS.length} Locations Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REHAB_CENTERS.map((center) => {
            const isSelected = activeCenter?.id === center.id;
            return (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => handleSelectCenter(center)}
                className={`p-5 sm:p-6 cursor-pointer transition-all border flex flex-col justify-between btn-tap rounded-3xl ${
                  isSelected
                    ? 'border-[#781353] dark:border-[#E03590] bg-[var(--bg-secondary)] shadow-md'
                    : 'card-doc hover:border-[#781353]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#781353] dark:text-[#E03590] bg-[var(--bg-card)] px-2.5 py-1 border border-editorial rounded-full shrink-0">
                      {center.city}, {center.state}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-mono font-bold uppercase bg-[#781353] text-white dark:bg-[#E03590] px-2.5 py-1 shrink-0 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] leading-snug">
                    {center.name}
                  </h3>
                  <p className="text-xs text-muted font-light flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                    {center.address}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-editorial flex items-center justify-between text-xs gap-2">
                  <a
                    href={`tel:${center.phoneClean || center.phone.replace(/\s+/g, '')}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono font-bold text-[#781353] dark:text-[#E03590] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Phone className="w-3 h-3" /> {center.phone}
                  </a>
                  <a
                    href={center.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-bold uppercase text-muted hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                  >
                    GPS <ExternalLink className="w-3 h-3 text-[#E03590]" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
