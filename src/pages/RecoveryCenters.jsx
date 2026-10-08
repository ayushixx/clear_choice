import React, { useState, useEffect, useRef } from 'react';
import RehabDirectory from '../components/RehabDirectory';
import RecoveryIntakeForm from '../components/RecoveryIntakeForm';
import TrustBadges from '../components/TrustBadges';
import { ArrowLeft, Sparkles, CheckCircle2, ChevronDown, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecoveryCenters({ setActivePage, setSelectedCenter }) {
  const [activeSelectedCenter, setActiveSelectedCenter] = useState(null);
  
  // Track whether the intake form has been submitted or skipped
  const [hasCompletedIntake, setHasCompletedIntake] = useState(() => {
    try {
      return sessionStorage.getItem('cc_recovery_intake_submitted') === 'true';
    } catch {
      return false;
    }
  });

  const [submittedData, setSubmittedData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('cc_recovery_intake_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showIntakeForm, setShowIntakeForm] = useState(!hasCompletedIntake);
  const directoryRef = useRef(null);

  const handleGetDirections = (center) => {
    if (setSelectedCenter) {
      setSelectedCenter(center);
    }
    setActivePage('find-support');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntakeComplete = (data) => {
    setSubmittedData(data);
    setHasCompletedIntake(true);
    setShowIntakeForm(false);
    
    // Smooth scroll down to directory explorer
    setTimeout(() => {
      if (directoryRef.current) {
        directoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSkipIntake = () => {
    setShowIntakeForm(false);
    setTimeout(() => {
      if (directoryRef.current) {
        directoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
          {showIntakeForm ? 'Personalized Intake' : 'Directory Explorer'}
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
          Accredited Rehabilitation Facilities & Personalized Guidance
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Recovery & Rehabilitation Directory
        </h1>
        <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
          Discover verified addiction treatment clinics, hospital detox facilities, and inpatient care centers across India with personalized counselor matching.
        </p>
      </motion.div>

      {/* INTAKE FORM / RECOMMENDATION STEP */}
      <section className="space-y-6">
        <AnimatePresence mode="wait">
          {showIntakeForm ? (
            <motion.div
              key="intake-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <RecoveryIntakeForm 
                onComplete={handleIntakeComplete} 
                onSkip={handleSkipIntake} 
              />
            </motion.div>
          ) : (
            /* COLLAPSED INTAKE STATUS BANNER (When viewing directory) */
            <motion.div
              key="intake-summary-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--bg-card)] border border-editorial p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {submittedData ? 'Personalized Intake Received' : 'Direct Directory View Active'}
                    </span>
                    {submittedData && (
                      <span className="text-[9px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                        Under Review by Mehul
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted font-light mt-0.5">
                    {submittedData 
                      ? `Browsing options for ${submittedData.relation} in ${submittedData.location} (${submittedData.substance})`
                      : 'You are currently browsing the complete public directory list.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowIntakeForm(true)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono font-bold text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 border border-editorial rounded-full transition-all flex items-center justify-center gap-1.5 btn-tap touch-target cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{submittedData ? 'Update Intake Details' : 'Get Personalized Center Recommendations'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* REHABILITATION CENTER DIRECTORY COMPONENT */}
      <div ref={directoryRef} className="pt-4 border-t border-editorial">
        <RehabDirectory
          selectedCenter={activeSelectedCenter}
          onSelectCenter={setActiveSelectedCenter}
          onGetDirections={handleGetDirections}
        />
      </div>

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
