import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitRecoveryDirectoryInquiry, validatePhone } from '../api/submissionsApi';
import TurnstileWidget from './TurnstileWidget';

const RELATION_OPTIONS = [
  'Self',
  'Mother',
  'Father',
  'Brother',
  'Sister',
  'Spouse',
  'Friend',
  'Other'
];

const BUDGET_OPTIONS = [
  'Under ₹25,000 / mo',
  '₹25,000 - ₹50,000 / mo',
  '₹50,000 - ₹1,00,000 / mo',
  '₹1,00,000+ / mo (Luxury)',
  'Flexible / Need Advice'
];

const SUBSTANCE_OPTIONS = [
  'Alcohol',
  'Opioids / Smack / Heroin',
  'Cannabis / Weed',
  'Prescription Drugs / Sedatives',
  'Stimulants / Cocaine',
  'Multiple Substances',
  'Other'
];

const INITIAL_FORM_STATE = {
  fullName: '',
  phone: '',
  relation: 'Self',
  customRelation: '',
  location: '',
  budgetRange: 'Flexible / Need Advice',
  patientAge: '',
  substance: 'Alcohol',
  customSubstance: ''
};

export default function RecoveryIntakeForm({ onComplete, onSkip }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submittedSnapshot, setSubmittedSnapshot] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setErrorMsg('Please enter a valid contact number (8-15 digits, e.g. +91 98765 43210).');
      return;
    }

    if (formData.relation === 'Other' && !formData.customRelation.trim()) {
      setErrorMsg('Please fill in the box with your relation to the patient.');
      return;
    }

    if (!formData.location.trim()) {
      setErrorMsg('Please specify your preferred city or location (e.g. Mumbai, Delhi NCR, Bangalore).');
      return;
    }

    if (!formData.patientAge.trim()) {
      setErrorMsg('Please enter the age of the patient.');
      return;
    }

    if (formData.substance === 'Other' && !formData.customSubstance.trim()) {
      setErrorMsg('Please fill in the box with the substance or concern.');
      return;
    }

    const finalRelation = formData.relation === 'Other' 
      ? `Other (${formData.customRelation.trim()})`
      : formData.relation;

    const finalSubstance = formData.substance === 'Other'
      ? `Other (${formData.customSubstance.trim()})`
      : formData.substance;

    const finalBudget = formData.budgetRange || 'Flexible / Need Advice';

    const submissionData = {
      name: formData.fullName.trim(),
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      relation: finalRelation,
      location: formData.location.trim(),
      budget: finalBudget,
      budgetRange: finalBudget,
      patientAge: formData.patientAge.trim(),
      substance: finalSubstance,
      turnstileToken
    };

    setSubmitting(true);

    try {
      const result = await submitRecoveryDirectoryInquiry(submissionData);

      if (result.success) {
        setIsSuccess(true);
        setSubmittedSnapshot({
          ...submissionData,
          displayRelation: finalRelation,
          displaySubstance: finalSubstance
        });

        // Clear the form after successful submission
        setFormData(INITIAL_FORM_STATE);

        // Save submission state to sessionStorage so page retains unlock on reload
        try {
          sessionStorage.setItem('cc_recovery_intake_submitted', 'true');
          sessionStorage.setItem('cc_recovery_intake_data', JSON.stringify(submissionData));
        } catch (storageErr) {
          console.warn('Storage unavailable:', storageErr);
        }
      } else {
        console.error('[Directory Inquiry] Submission error returned:', result.error);
        setErrorMsg(result.error || 'Unable to submit your inquiry. Please check your connection and try again.');
      }
    } catch (err) {
      console.error('[Directory Inquiry] Critical network exception:', err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedSnapshot(null);
    setFormData(INITIAL_FORM_STATE);
    setErrorMsg('');
  };

  const displayRelation = submittedSnapshot 
    ? submittedSnapshot.displayRelation 
    : (formData.relation === 'Other' && formData.customRelation ? `Other: ${formData.customRelation}` : formData.relation);

  const displaySubstance = submittedSnapshot
    ? submittedSnapshot.displaySubstance
    : (formData.substance === 'Other' && formData.customSubstance ? `Other: ${formData.customSubstance}` : formData.substance);

  const displayAge = submittedSnapshot ? submittedSnapshot.patientAge : formData.patientAge;
  const displayLocation = submittedSnapshot ? submittedSnapshot.location : formData.location;
  const displayBudget = submittedSnapshot ? submittedSnapshot.budget : formData.budgetRange;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* SUCCESS CONFIRMATION VIEW */}
        {isSuccess ? (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--bg-card)] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 sm:space-y-8"
          >
            {/* Header with Success Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-editorial pb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                    Inquiry Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                    Details Received Confidentially
                  </h2>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-muted bg-[var(--bg-secondary)] px-3 py-1.5 rounded-full border border-editorial w-fit">
                Source: Recovery Directory Inquiry
              </span>
            </div>

            {/* Polite Confirmation Message */}
            <div className="bg-emerald-950/10 dark:bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-5 sm:p-6 space-y-3">
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-serif font-medium leading-relaxed">
                “Thank you for reaching out. Mehul will contact you shortly to discuss suitable recovery and rehabilitation options.”
              </p>
              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Free & Confidential Direct Counselor Review</span>
              </div>
            </div>

            {/* Summary of Submitted Preferences */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted block">
                Your Search Preferences:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-editorial">
                  <span className="text-[9px] font-mono text-muted block uppercase">Relation</span>
                  <span className="font-semibold text-[var(--text-primary)] mt-0.5 block truncate">{displayRelation}</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-editorial">
                  <span className="text-[9px] font-mono text-muted block uppercase">Age of Patient</span>
                  <span className="font-semibold text-[var(--text-primary)] mt-0.5 block truncate">{displayAge ? `${displayAge} yrs` : '—'}</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-editorial">
                  <span className="text-[9px] font-mono text-muted block uppercase">Location</span>
                  <span className="font-semibold text-[var(--text-primary)] mt-0.5 block truncate">{displayLocation || '—'}</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-editorial">
                  <span className="text-[9px] font-mono text-muted block uppercase">Substance</span>
                  <span className="font-semibold text-[var(--text-primary)] mt-0.5 block truncate">{displaySubstance}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons to Continue to Directory */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-editorial">
              <button
                type="button"
                onClick={() => {
                  if (onComplete) onComplete(submittedSnapshot || formData);
                }}
                className="w-full sm:flex-1 bg-[#2E031D] hover:bg-[#4E0834] text-white py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-lg min-h-[48px] btn-tap touch-target cursor-pointer"
              >
                <span>Continue to Recovery Directory & Map</span>
                <ArrowRight className="w-4 h-4 text-[#E03590]" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3.5 text-xs font-mono font-bold text-muted hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 border border-editorial rounded-full transition-all flex items-center justify-center gap-1.5 min-h-[48px] btn-tap touch-target cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* INTAKE FORM VIEW */
          <motion.div
            key="intake-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-[var(--bg-card)] border border-editorial rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg space-y-6 sm:space-y-8"
          >
            {/* Form Header */}
            <div className="space-y-2 border-b border-editorial pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E03590]" />
                  Personalized Intake & Center Matching
                </span>
                <span className="text-[9px] font-mono text-muted uppercase bg-[var(--bg-secondary)] border border-editorial px-2.5 py-1 rounded-full">
                  Step 1 of 2
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
                Find the Right Recovery Center
              </h2>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                Please share a few basic details below. This helps us suggest the most suitable, verified rehabilitation options for your specific situation before you explore the directory.
              </p>
            </div>

            {/* Error Notification */}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-950/80 text-red-200 border border-red-800/80 rounded-2xl text-xs flex items-center gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              
              {/* Row 1: Full Name & Contact Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:border-[#E03590] focus:ring-1 focus:ring-[#E03590] transition-all touch-target"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                    Contact Phone Number <span className="text-muted text-[10px] font-normal">(For confidential counselor follow-up)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^[+]?[0-9\s\-()]*$/.test(val)) {
                        handleChange('phone', val);
                      }
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:border-[#E03590] focus:ring-1 focus:ring-[#E03590] transition-all touch-target"
                  />
                </div>
              </div>

              {/* Row 2: Relation with Patient */}
              <div className="space-y-2">
                <label className="block font-semibold text-[var(--text-primary)]">
                  Relation with Patient <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RELATION_OPTIONS.map((rel) => {
                    const isSelected = formData.relation === rel;
                    return (
                      <button
                        type="button"
                        key={rel}
                        onClick={() => handleChange('relation', rel)}
                        className={`p-3 text-xs font-mono font-semibold rounded-xl border text-center transition-all btn-tap touch-target min-h-[44px] flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#781353] text-white border-[#781353] dark:bg-[#E03590] dark:border-[#E03590] shadow-sm font-bold'
                            : 'bg-[var(--bg-secondary)] border-editorial text-[var(--text-primary)] hover:border-[#E03590]/60'
                        }`}
                      >
                        {rel}
                      </button>
                    );
                  })}
                </div>

                {/* Other Relation - Fill the Box */}
                {formData.relation === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <label className="block font-semibold text-[var(--text-primary)] mb-1 text-xs">
                      Please specify your relation with the patient <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customRelation}
                      onChange={(e) => handleChange('customRelation', e.target.value)}
                      placeholder="Please fill the box (e.g. Uncle, Cousin, Colleague, Mentor)..."
                      className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[#781353] dark:border-[#E03590] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/60 focus:outline-none transition-all touch-target"
                    />
                  </motion.div>
                )}
              </div>

              {/* Row 3: Location & Age of Patient (Manual Input) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                    Location (City / State) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra / Delhi NCR"
                    className="w-full px-4 py-3.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:border-[#E03590] focus:ring-1 focus:ring-[#E03590] transition-all touch-target"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                    Age of Patient <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientAge}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^[0-9\s\w\-+]*$/.test(val)) {
                        handleChange('patientAge', val);
                      }
                    }}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-3.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:border-[#E03590] focus:ring-1 focus:ring-[#E03590] transition-all touch-target font-mono"
                  />
                </div>
              </div>

              {/* Row 4: Budget Range */}
              <div className="space-y-2">
                <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                  Budget Range <span className="text-muted text-[10px] font-normal font-mono">(Optional)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {BUDGET_OPTIONS.map((budget) => {
                    const isSelected = formData.budgetRange === budget;
                    return (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => handleChange('budgetRange', budget)}
                        className={`p-3 text-xs font-mono font-semibold rounded-xl border text-center transition-all btn-tap touch-target min-h-[44px] flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#781353] text-white border-[#781353] dark:bg-[#E03590] dark:border-[#E03590] shadow-sm font-bold'
                            : 'bg-[var(--bg-secondary)] border-editorial text-[var(--text-primary)] hover:border-[#E03590]/60'
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Substance / Concern */}
              <div className="space-y-2">
                <label className="block font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                  Primary Substance / Concern <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {SUBSTANCE_OPTIONS.map((sub) => {
                    const isSelected = formData.substance === sub;
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => handleChange('substance', sub)}
                        className={`p-3 text-xs font-mono font-semibold rounded-xl border text-center transition-all btn-tap touch-target min-h-[44px] flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#781353] text-white border-[#781353] dark:bg-[#E03590] dark:border-[#E03590] shadow-sm font-bold'
                            : 'bg-[var(--bg-secondary)] border-editorial text-[var(--text-primary)] hover:border-[#E03590]/60'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>

                {/* Other Substance - Fill the Box */}
                {formData.substance === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <label className="block font-semibold text-[var(--text-primary)] mb-1 text-xs">
                      Please specify the substance or concern <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customSubstance}
                      onChange={(e) => handleChange('customSubstance', e.target.value)}
                      placeholder="Please fill the box (e.g. Gambling, Inhalants, Benzodiazepines, Gaming)..."
                      className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[#781353] dark:border-[#E03590] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/60 focus:outline-none transition-all touch-target"
                    />
                  </motion.div>
                )}
              </div>

              {/* Spam Protection */}
              <TurnstileWidget onVerify={setTurnstileToken} />

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2E031D] hover:bg-[#4E0834] text-white py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-lg min-h-[48px] btn-tap touch-target disabled:opacity-50 cursor-pointer"
                >
                  <Send className={`w-4 h-4 text-[#E03590] ${submitting ? 'animate-pulse' : ''}`} />
                  <span>{submitting ? 'Submitting Confidential Inquiry...' : 'Submit & Find Suitable Recovery Centers'}</span>
                </button>

                {onSkip && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onSkip}
                      className="text-xs font-mono text-muted hover:text-[var(--text-primary)] hover:underline cursor-pointer py-1"
                    >
                      Or skip intake to explore the full directory & map directly →
                    </button>
                  </div>
                )}
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
