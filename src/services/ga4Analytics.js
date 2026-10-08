/**
 * Google Analytics 4 (GA4) Analytics Tracking Service
 */

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

// Dynamically inject GA4 script if measurement ID is present
if (typeof window !== 'undefined' && GA4_ID && !window.gtag) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { send_page_view: true });
}

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  console.log(`[GA4 Event Tracked] ${eventName}:`, params);
};

export const trackContactSubmit = () => {
  trackEvent('form_submit_contact', {
    category: 'Lead Generation',
    label: 'Contact Form Inquiry',
  });
};

export const trackCallbackSubmit = (concernType) => {
  trackEvent('form_submit_callback', {
    category: 'Lead Generation',
    label: concernType || 'Callback Request',
  });
};

export const trackRecoveryDirectoryInquiry = (substance, budgetRange) => {
  trackEvent('form_submit_directory_inquiry', {
    category: 'Directory Intake',
    label: `${substance || 'General'} | ${budgetRange || 'Any Budget'}`,
  });
};

export const trackHelplineClick = (number) => {
  trackEvent('helpline_click', {
    category: 'Counselor Contact',
    label: number || 'counselor-contact',
  });
};

export const trackDirectionsClick = (centerName) => {
  trackEvent('directions_click', {
    category: 'Rehab Directory',
    label: centerName,
  });
};
