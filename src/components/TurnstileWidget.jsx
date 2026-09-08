import React, { useEffect, useRef } from 'react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

export default function TurnstileWidget({ onVerify }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // If Turnstile site key is not configured, simulate instant verification token
    if (!TURNSTILE_SITE_KEY) {
      if (onVerify) onVerify('dev_token_bypass');
      return;
    }

    // Load Turnstile script if missing
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.turnstile && containerRef.current) {
        clearInterval(interval);
        try {
          window.turnstile.render(containerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token) => {
              if (onVerify) onVerify(token);
            },
          });
        } catch (e) {
          console.warn('[Turnstile Widget] Render warning:', e);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onVerify]);

  if (!TURNSTILE_SITE_KEY) {
    return (
      <div className="text-[10px] font-mono text-muted flex items-center gap-1 opacity-70">
        <span>🛡️ Spam Protection Active (Dev Mode)</span>
      </div>
    );
  }

  return <div ref={containerRef} className="my-2 min-h-[65px]" />;
}
