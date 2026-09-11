import React, { useState } from 'react';
import TurnstileWidget from '../components/TurnstileWidget';
import TrustBadges from '../components/TrustBadges';
import { submitContactInquiry, submitCallbackRequest } from '../api/submissionsApi';
import { Send, Clock, Paperclip, AlertCircle, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactCounselor({ setActivePage }) {
  // Contact Form State
  const [contactForm, setContactForm] = useState({ fullName: '', phone: '', message: '' });
  const [contactFile, setContactFile] = useState(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactTurnstileToken, setContactTurnstileToken] = useState('');

  // Callback Form State
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    concernType: 'General Inquiry',
    callbackTime: 'Morning (9 AM - 12 PM)',
    message: ''
  });
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [callbackError, setCallbackError] = useState('');
  const [callbackTurnstileToken, setCallbackTurnstileToken] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError('');
    setContactSubmitting(true);

    const result = await submitContactInquiry({
      ...contactForm,
      turnstileToken: contactTurnstileToken
    });

    if (result.success) {
      setContactSuccess(true);
      setContactForm({ fullName: '', phone: '', message: '' });
      setContactFile(null);
      setTimeout(() => setContactSuccess(false), 5000);
    } else {
      setContactError(result.error || 'Failed to submit contact inquiry.');
    }
    setContactSubmitting(false);
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setCallbackError('');
    setCallbackSubmitting(true);

    const result = await submitCallbackRequest({
      ...callbackForm,
      turnstileToken: callbackTurnstileToken
    });

    if (result.success) {
      setCallbackSuccess(true);
      setCallbackForm({
        name: '',
        phone: '',
        concernType: 'General Inquiry',
        callbackTime: 'Morning (9 AM - 12 PM)',
        message: ''
      });
      setTimeout(() => setCallbackSuccess(false), 5000);
    } else {
      setCallbackError(result.error || 'Failed to request callback.');
    }
    setCallbackSubmitting(false);
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
        <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-[var(--bg-secondary)] border border-editorial text-[#781353] dark:text-[#E03590] px-2.5 py-1 font-bold shrink-0">
          Confidential Channel
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
          Private & Secure Communication
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Contact a Counselor
        </h1>
        <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
          Reach out directly to professional counselors for confidential guidance, treatment planning, or to schedule a private phone consultation.
        </p>
      </motion.div>

      {/* PRIVACY ASSURANCE BANNER */}
      <div className="bg-[var(--bg-secondary)] border border-editorial p-4 sm:p-5 flex items-center gap-4">
        <div className="p-3 bg-[#781353] text-white dark:bg-[#E03590] shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 text-xs">
          <span className="font-serif font-bold text-[var(--text-primary)] block text-sm">
            100% Confidentiality Guarantee
          </span>
          <p className="text-muted font-light">
            Your personal information is encrypted and strictly used to fulfill your requested consultation. We never store or share sensitive personal medical data.
          </p>
        </div>
      </div>

      {/* FORMS SECTION — CALM & DISTRACTION-FREE LAYOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        
        {/* Contact Form */}
        <div className="card-doc p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] block mb-1">
              Direct Confidential Inquiry
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
              Written Contact Inquiry
            </h2>
            <p className="text-xs text-muted font-light mt-1">
              Send a detailed note directly to our advisory counselor team.
            </p>
          </div>

          {contactSuccess && (
            <div className="p-3.5 bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-none text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you. Your message has been securely transmitted.</span>
            </div>
          )}

          {contactError && (
            <div className="p-3.5 bg-red-950/40 text-red-200 border border-red-800 rounded-none text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{contactError}</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Full Name *</label>
              <input
                type="text"
                value={contactForm.fullName}
                onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                placeholder="Your full name"
                required
                className="w-full px-3.5 py-3 bg-[var(--bg-secondary)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] touch-target"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Phone Number *</label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="Phone number"
                required
                className="w-full px-3.5 py-3 bg-[var(--bg-secondary)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] touch-target"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Message</label>
              <textarea
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Share any details or questions..."
                className="w-full px-3.5 py-3 bg-[var(--bg-secondary)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)]"
              ></textarea>
            </div>

            {/* File Attachment */}
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Optional Document / Referral</label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer border border-editorial bg-[var(--bg-secondary)] px-3.5 py-2.5 font-mono text-xs hover:border-[#781353] dark:hover:border-[#E03590] flex items-center gap-1.5 text-[var(--text-primary)] btn-tap touch-target">
                  <Paperclip className="w-3.5 h-3.5" />
                  {contactFile ? contactFile.name : 'Attach File (PDF, DOCX, Image)'}
                  <input
                    type="file"
                    onChange={(e) => setContactFile(e.target.files[0] || null)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                {contactFile && (
                  <button
                    type="button"
                    onClick={() => setContactFile(null)}
                    className="text-[10px] text-muted hover:text-red-500 underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Turnstile Spam Protection */}
            <TurnstileWidget onVerify={setContactTurnstileToken} />

            <button
              type="submit"
              disabled={contactSubmitting}
              className="w-full bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-3.5 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 btn-tap shadow-md touch-target cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> {contactSubmitting ? 'Transmitting Securely...' : 'Send Secure Message'}
            </button>
          </form>
        </div>

        {/* Callback Request Form */}
        <div className="bg-[var(--bg-secondary)] p-5 sm:p-8 border border-editorial space-y-5 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] block mb-1">
              Discreet Consultation
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
              Schedule Callback Request
            </h2>
            <p className="text-xs text-muted font-light mt-1">
              Select your preferred window for a discreet phone consultation.
            </p>
          </div>

          {callbackSuccess && (
            <div className="p-3.5 bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-none text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Callback requested! A counselor will reach out at your requested time.</span>
            </div>
          )}

          {callbackError && (
            <div className="p-3.5 bg-red-950/40 text-red-200 border border-red-800 rounded-none text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{callbackError}</span>
            </div>
          )}

          <form onSubmit={handleCallbackSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Name *</label>
              <input
                type="text"
                value={callbackForm.name}
                onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] touch-target"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Phone Number *</label>
              <input
                type="tel"
                value={callbackForm.phone}
                onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                placeholder="Phone number"
                required
                className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] touch-target"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">Concern Type</label>
                <select
                  value={callbackForm.concernType}
                  onChange={(e) => setCallbackForm({ ...callbackForm, concernType: e.target.value })}
                  className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] font-mono touch-target"
                >
                  <option>General Inquiry</option>
                  <option>Self Substance Support</option>
                  <option>Family / Friend Support</option>
                  <option>Substance Education</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">Preferred Time</label>
                <select
                  value={callbackForm.callbackTime}
                  onChange={(e) => setCallbackForm({ ...callbackForm, callbackTime: e.target.value })}
                  className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)] font-mono touch-target"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Message (Optional)</label>
              <textarea
                rows="2"
                value={callbackForm.message}
                onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                placeholder="Note..."
                className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-editorial text-sm focus:outline-none focus:border-[#781353] dark:focus:border-[#E03590] text-[var(--text-primary)]"
              ></textarea>
            </div>

            {/* Turnstile Spam Protection */}
            <TurnstileWidget onVerify={setCallbackTurnstileToken} />

            <button
              type="submit"
              disabled={callbackSubmitting}
              className="w-full bg-[#781353] dark:bg-[#E03590] text-white py-3.5 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 btn-tap shadow-md touch-target cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" /> {callbackSubmitting ? 'Requesting...' : 'Request Callback'}
            </button>
          </form>
        </div>

      </section>

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
