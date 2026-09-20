import React, { useState } from 'react';
import TurnstileWidget from '../components/TurnstileWidget';
import TrustBadges from '../components/TrustBadges';
import { submitContactInquiry, submitCallbackRequest, validatePhone } from '../api/submissionsApi';
import { Send, Clock, AlertCircle, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactCounselor({ setActivePage }) {
  // Contact Form State
  const [contactForm, setContactForm] = useState({ fullName: '', phone: '', message: '' });
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

    if (!validatePhone(contactForm.phone)) {
      setContactError('Please enter a valid phone number (8-15 digits, e.g. +91 98765 43210).');
      return;
    }

    setContactSubmitting(true);

    const result = await submitContactInquiry({
      ...contactForm,
      turnstileToken: contactTurnstileToken
    });

    if (result.success) {
      setContactSuccess(true);
      setContactForm({ fullName: '', phone: '', message: '' });
      setTimeout(() => setContactSuccess(false), 5000);
    } else {
      setContactError(result.error || 'Failed to submit contact inquiry.');
    }
    setContactSubmitting(false);
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setCallbackError('');

    if (!validatePhone(callbackForm.phone)) {
      setCallbackError('Please enter a valid phone number (8-15 digits, e.g. +91 98765 43210).');
      return;
    }

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
      <div className="bg-[var(--bg-secondary)] border border-editorial p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="p-3.5 bg-[#781353] text-white dark:bg-[#E03590] shrink-0 rounded-xl shadow-xs">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 text-xs sm:text-sm">
          <span className="font-serif font-bold text-[var(--text-primary)] block text-sm sm:text-base">
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
        <div className="card-doc p-6 sm:p-8 space-y-5 sm:space-y-6 rounded-3xl">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] block mb-1">
              Direct Confidential Inquiry
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
              Written Contact Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light mt-1">
              Send a detailed note directly to our advisory counselor team.
            </p>
          </div>

          {contactSuccess && (
            <div className="p-4 bg-emerald-950/80 text-emerald-200 border border-emerald-800/80 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Thank you. Your message has been securely transmitted.</span>
            </div>
          )}

          {contactError && (
            <div className="p-4 bg-red-950/80 text-red-200 border border-red-800/80 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{contactError}</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Full Name *</label>
              <input
                type="text"
                value={contactForm.fullName}
                onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                placeholder="Your full name"
                required
                className="input-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[+]?[0-9\s\-()]*$/.test(val)) {
                    setContactForm({ ...contactForm, phone: val });
                  }
                }}
                placeholder="e.g. +91 98765 43210"
                required
                pattern="^[+]?[0-9\s\-()]{8,20}$"
                title="Please enter a valid phone number (8-15 digits, e.g. +91 98765 43210)"
                className="input-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Message</label>
              <textarea
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Share any details or questions..."
                className="input-primary !min-h-[100px]"
              ></textarea>
            </div>

            {/* Turnstile Spam Protection */}
            <TurnstileWidget onVerify={setContactTurnstileToken} />

            <button
              type="submit"
              disabled={contactSubmitting}
              className="w-full bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 btn-tap shadow-lg touch-target cursor-pointer glow-accent"
            >
              <Send className="w-4 h-4 text-[#E03590] dark:text-[#781353]" /> {contactSubmitting ? 'Transmitting Securely...' : 'Send Secure Message'}
            </button>
          </form>
        </div>

        {/* Callback Request Form */}
        <div className="card-doc p-6 sm:p-8 space-y-5 sm:space-y-6 rounded-3xl">
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
            <div className="p-4 bg-emerald-950/80 text-emerald-200 border border-emerald-800/80 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Callback requested! A counselor will reach out at your requested time.</span>
            </div>
          )}

          {callbackError && (
            <div className="p-4 bg-red-950/80 text-red-200 border border-red-800/80 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{callbackError}</span>
            </div>
          )}

          <form onSubmit={handleCallbackSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Name *</label>
              <input
                type="text"
                value={callbackForm.name}
                onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                placeholder="Your name"
                required
                className="input-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={callbackForm.phone}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[+]?[0-9\s\-()]*$/.test(val)) {
                    setCallbackForm({ ...callbackForm, phone: val });
                  }
                }}
                placeholder="e.g. +91 98765 43210"
                required
                pattern="^[+]?[0-9\s\-()]{8,20}$"
                title="Please enter a valid phone number (8-15 digits, e.g. +91 98765 43210)"
                className="input-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Concern Type</label>
                <select
                  value={callbackForm.concernType}
                  onChange={(e) => setCallbackForm({ ...callbackForm, concernType: e.target.value })}
                  className="input-primary font-mono"
                >
                  <option>General Inquiry</option>
                  <option>Self Substance Support</option>
                  <option>Family / Friend Support</option>
                  <option>Substance Education</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Preferred Time</label>
                <select
                  value={callbackForm.callbackTime}
                  onChange={(e) => setCallbackForm({ ...callbackForm, callbackTime: e.target.value })}
                  className="input-primary font-mono"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1.5">Message (Optional)</label>
              <textarea
                rows="2"
                value={callbackForm.message}
                onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                placeholder="Note..."
                className="input-primary !min-h-[80px]"
              ></textarea>
            </div>

            {/* Turnstile Spam Protection */}
            <TurnstileWidget onVerify={setCallbackTurnstileToken} />

            <button
              type="submit"
              disabled={callbackSubmitting}
              className="w-full bg-[#781353] dark:bg-[#E03590] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 btn-tap shadow-lg touch-target cursor-pointer glow-accent"
            >
              <Clock className="w-4 h-4 text-white" /> {callbackSubmitting ? 'Requesting...' : 'Request Callback'}
            </button>
          </form>
        </div>

      </section>

      {/* TRUST BADGES BAR */}
      <TrustBadges />

    </div>
  );
}
