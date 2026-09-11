import React from 'react';
import { X, Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LegalModal({ isOpen, modalType, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E031D]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-editorial relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-primary)] hover:text-[#781353] dark:hover:text-[#E03590] bg-[var(--bg-secondary)] p-2.5 rounded-full transition-colors touch-target btn-tap cursor-pointer flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {modalType === 'privacy' ? (
          <div>
            <div className="flex items-center gap-3 text-[#781353] dark:text-[#E03590] mb-4">
              <div className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-editorial">
                <Lock className="w-6 h-6 text-[#781353] dark:text-[#E03590]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">Privacy Policy</h3>
                <p className="text-xs uppercase tracking-widest text-[#781353] dark:text-[#E03590] font-sans font-semibold">User Privacy & Confidentiality</p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-primary)]/90 pt-2 border-t border-editorial">
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-editorial font-medium">
                "We do not store sensitive personal data beyond contact requests. Chats may remain anonymous."
              </div>

              <h4 className="font-serif font-bold text-base text-[var(--text-primary)] pt-2">Data Protection Commitment</h4>
              <p>
                At CLEAR CHOICE, user privacy and emotional safety are paramount. We collect only minimal contact details submitted via callback or inquiry forms solely for response purposes.
              </p>

              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                  <span><strong>Anonymous Browsing:</strong> Accessing facts, quiz tools, and recovery stories requires zero registration or identification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                  <span><strong>Encrypted Communication:</strong> All contact request submissions are transmitted via secure SSL protocol.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                  <span><strong>No Data Monetization:</strong> We never share, sell, or commercialize user contact details with third-party marketers.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 text-[#781353] dark:text-[#E03590] mb-4">
              <div className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-editorial">
                <ShieldAlert className="w-6 h-6 text-[#781353] dark:text-[#E03590]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">Medical Disclaimer</h3>
                <p className="text-xs uppercase tracking-widest text-[#781353] dark:text-[#E03590] font-sans font-semibold">Important Medical & Emergency Notice</p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-primary)]/90 pt-2 border-t border-editorial">
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-editorial font-medium">
                "This website does not provide medical advice. Contact emergency services immediately in a medical emergency."
              </div>

              <h4 className="font-serif font-bold text-base text-[var(--text-primary)] pt-2">Scope of Educational Information</h4>
              <p>
                The information provided on CLEAR CHOICE is for educational, awareness, and support guidance only. It is not intended to be a substitute for professional medical diagnosis, treatment, or clinical intervention.
              </p>

              <p>
                Always seek the advice of a qualified physician, psychiatrist, or licensed addiction recovery expert regarding medical conditions or substance dependence detox plans.
              </p>

              <div className="p-4 bg-[#2E031D] text-[#FDF3F7] rounded-xl space-y-2 mt-4">
                <p className="font-bold text-[#E03590] text-sm">Immediate Emergency Assistance:</p>
                <p className="text-xs text-[#F7E4EE]/90">
                  If you or someone nearby is experiencing acute toxicity, breathing difficulties, or loss of consciousness, immediately call emergency services (112 or 102) or proceed to the nearest emergency medical facility.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-editorial flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors btn-tap touch-target cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}
