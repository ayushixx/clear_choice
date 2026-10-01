import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLeadInquiry } from '../api/submissionsApi';

const SUBSTANCE_OPTIONS = [
  'Heroin / Opioid',
  'Cannabis / Weed',
  'Alcohol',
  'Methamphetamine / Ice',
  'Nicotine / Smoking',
  'Cocaine',
  'Inhalants',
  'Multiple Substances',
  'Other / Prefer Not to Say',
];

export default function LeadCaptureModal({ isOpen, onClose, preselectedSubstance }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    substance: preselectedSubstance || '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const nameRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: '',
        phone: '',
        email: '',
        substance: preselectedSubstance || '',
        message: '',
      });
      setStatus('idle');
      setErrorMsg('');
      setTimeout(() => nameRef.current?.focus(), 200);
    }
  }, [isOpen, preselectedSubstance]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const result = await submitLeadInquiry(form);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-editorial">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#781353] block">
                    Personalized Recovery Plan
                  </span>
                  <h2 className="text-xl font-serif font-bold text-[var(--text-primary)]">
                    Get to Know More
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors focus-visible:outline-none"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
              </div>
              <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                Share your details and we'll prepare a personalized recovery module tailored to your needs. All information is kept strictly confidential.
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--text-primary)]">
                      Thank You!
                    </h3>
                    <p className="text-sm text-muted font-light max-w-xs leading-relaxed">
                      A personalized recovery module will be shared after assessment.
                    </p>
                    <p className="text-[11px] text-muted/70 font-light">
                      Our team will reach out to you within 24–48 hours.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-[#2E031D] text-white rounded-full hover:bg-[#4E0834] transition-colors focus-visible:outline-none"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="lead-name" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        id="lead-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="lead-phone" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all"
                      />
                    </div>

                    {/* Email (optional) */}
                    <div className="space-y-1.5">
                      <label htmlFor="lead-email" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                        Email <span className="text-muted/60 font-normal normal-case">(optional)</span>
                      </label>
                      <input
                        id="lead-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all"
                      />
                    </div>

                    {/* Substance / Concern */}
                    <div className="space-y-1.5">
                      <label htmlFor="lead-substance" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                        Substance / Concern <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="lead-substance"
                        name="substance"
                        required
                        value={form.substance}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a concern...</option>
                        {SUBSTANCE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="lead-message" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                        Message <span className="text-muted/60 font-normal normal-case">(optional)</span>
                      </label>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Anything you'd like us to know..."
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-xl">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 bg-[#2E031D] text-white hover:bg-[#4E0834] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-muted/60 text-center font-light leading-relaxed pt-1">
                      Your data is encrypted and shared only with our recovery counselors. We respect your privacy.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
