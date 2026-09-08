import React, { useState } from 'react';
import { RESOURCE_DIRECTORY } from '../data/contentData';
import { REHAB_CENTERS } from '../data/rehabCenters';
import RehabDirectory from '../components/RehabDirectory';
import InteractiveMap from '../components/InteractiveMap';
import TurnstileWidget from '../components/TurnstileWidget';
import { submitContactInquiry, submitCallbackRequest } from '../api/submissionsApi';
import { trackHelplineClick } from '../services/ga4Analytics';
import { Send, Clock, Paperclip, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function GetHelp() {
  // Selected rehab center state for highlighting on map
  const [selectedCenter, setSelectedCenter] = useState(null);

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

  // Smooth scroll to map when "Get Directions" is clicked on any card
  const handleGetDirections = (center) => {
    setSelectedCenter(center);
    const mapElement = document.getElementById('interactive-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* CRISIS SECTION - GIANT ELEGANT TYPOGRAPHY */}
      <section className="bg-[#2E031D] text-white p-8 sm:p-16 border border-[#2E031D] space-y-6 text-left relative overflow-hidden">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FDF3F7]/70 block">
          Immediate Crisis Support • 24/7
        </span>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
          Need Help Right Now?
        </h1>

        <p className="text-base sm:text-lg text-[#FDF3F7]/80 max-w-2xl font-light leading-relaxed">
          Free, confidential, immediate assistance for individuals and families. Speak directly with a trained counselor.
        </p>

        {/* GIANT HELPLINE NUMBER */}
        <div className="pt-4 pb-2">
          <a
            href="tel:1800110031"
            onClick={() => trackHelplineClick('1800-11-0031')}
            className="text-4xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#FDF3F7] hover:text-[#DC2F87] transition-colors tracking-tight block"
          >
            1800-11-0031
          </a>
        </div>

        <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#FDF3F7]/70 font-mono">
          <span>• 100% Confidential</span>
          <span>• Nationwide Access</span>
          <span>• 365 Days / Year</span>
        </div>
      </section>

      {/* RESOURCE DIRECTORY */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
            National Helplines
          </span>
          <h2 className="text-3xl font-serif font-bold text-[var(--text-primary)]">
            Resource Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCE_DIRECTORY.map((item, idx) => (
            <div key={idx} className="card-doc p-6 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#781353] dark:text-[#DC2F87] bg-[var(--bg-secondary)] px-2 py-0.5 border border-editorial inline-block mb-2">
                  {item.badge}
                </span>
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <a 
                  href={`tel:${item.number.replace(/\s+/g, '')}`} 
                  onClick={() => trackHelplineClick(item.number)}
                  className="text-xl font-serif font-bold text-[#781353] dark:text-[#DC2F87] hover:underline block mt-1"
                >
                  {item.number}
                </a>
                <p className="text-xs text-muted font-light leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <a
                href={`tel:${item.number.replace(/\s+/g, '')}`}
                onClick={() => trackHelplineClick(item.number)}
                className="w-full bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-2 font-bold text-xs uppercase tracking-widest text-center block transition-colors mt-4"
              >
                Call Line
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* REHABILITATION CENTER DIRECTORY */}
      <RehabDirectory
        selectedCenter={selectedCenter}
        onSelectCenter={setSelectedCenter}
        onGetDirections={handleGetDirections}
      />

      {/* INTERACTIVE GOOGLE MAP */}
      <InteractiveMap
        selectedCenter={selectedCenter}
        allCenters={REHAB_CENTERS}
        onSelectCenter={setSelectedCenter}
      />

      {/* FORMS SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Form */}
        <div className="card-doc p-8 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#DC2F87] block mb-1">
              Direct Confidential Inquiry
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Contact Form
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              We do not store sensitive personal data beyond contact requests.
            </p>
          </div>

          {contactSuccess && (
            <div className="p-3 bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-none text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you. Your message has been securely transmitted.</span>
            </div>
          )}

          {contactError && (
            <div className="p-3 bg-red-950/40 text-red-200 border border-red-800 rounded-none text-xs flex items-center gap-2">
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
                placeholder="Name"
                required
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
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
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Message</label>
              <textarea
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Message details..."
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              ></textarea>
            </div>

            {/* File Attachment */}
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Optional Document / Referral</label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer border border-editorial bg-[var(--bg-secondary)] px-3 py-1.5 font-mono text-[11px] hover:border-[#781353] flex items-center gap-1.5 text-[var(--text-primary)]">
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
                    className="text-[10px] text-muted hover:text-red-500 underline"
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
              className="w-full bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-3 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> {contactSubmitting ? 'Transmitting Securely...' : 'Send Secure Message'}
            </button>
          </form>
        </div>

        {/* Callback Request Form */}
        <div className="bg-[var(--bg-secondary)] p-8 border border-editorial space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#DC2F87] block mb-1">
              Discreet Consultation
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Callback Request Form
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              Select your preferred callback window for a discreet phone consultation.
            </p>
          </div>

          {callbackSuccess && (
            <div className="p-3 bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-none text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Callback requested! A counselor will reach out at your requested time.</span>
            </div>
          )}

          {callbackError && (
            <div className="p-3 bg-red-950/40 text-red-200 border border-red-800 rounded-none text-xs flex items-center gap-2">
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
                placeholder="Name"
                required
                className="w-full px-3 py-2 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
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
                className="w-full px-3 py-2 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[var(--text-primary)] mb-1">Concern Type</label>
                <select
                  value={callbackForm.concernType}
                  onChange={(e) => setCallbackForm({ ...callbackForm, concernType: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
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
                  className="w-full px-3 py-2 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
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
                className="w-full px-3 py-2 bg-[var(--bg-card)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              ></textarea>
            </div>

            {/* Turnstile Spam Protection */}
            <TurnstileWidget onVerify={setCallbackTurnstileToken} />

            <button
              type="submit"
              disabled={callbackSubmitting}
              className="w-full bg-[#781353] dark:bg-[#DC2F87] text-white py-3 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Clock className="w-3.5 h-3.5" /> {callbackSubmitting ? 'Requesting...' : 'Request Callback'}
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
