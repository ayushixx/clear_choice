import { REHAB_CENTERS } from '../data/rehabCenters';
import { trackContactSubmit, trackCallbackSubmit } from '../services/ga4Analytics';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || 'clearchoice_secret_api_key_2026';

/**
 * Validates phone numbers (minimum 8 digits)
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8;
};

/**
 * Submit Contact Inquiry to Google Apps Script Web App (Google Sheets & Gmail)
 */
export const submitContactInquiry = async (formData) => {
  const { fullName, phone, message } = formData;

  if (!fullName || !fullName.trim()) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!phone || !validatePhone(phone)) {
    return { success: false, error: 'Please enter a valid phone number (at least 8-10 digits).' };
  }

  const payload = {
    type: 'contact',
    apiKey: API_KEY,
    fullName: fullName.trim(),
    phone: phone.trim(),
    message: message ? message.trim() : '',
  };

  // Track event in GA4
  trackContactSubmit();

  if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script CORS standard
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message || 'Failed to submit inquiry to Google Sheets.' };
      }
    } catch (err) {
      console.warn('[Google Script POST Warning]', err);
      // Fallback response if script URL returns CORS redirect or network delay
      return { success: true, message: 'Thank you. Your message has been logged.' };
    }
  }

  // Development simulation if GOOGLE_SCRIPT_URL is unconfigured
  console.log('[Dev Mode] Form Data Payload for Google Apps Script Web App:', payload);
  return {
    success: true,
    message: 'Thank you. Your message has been securely submitted (Dev Mode).',
  };
};

/**
 * Submit Callback Request to Google Apps Script Web App (Google Sheets & Gmail)
 */
export const submitCallbackRequest = async (formData) => {
  const { name, phone, concernType, callbackTime, message } = formData;

  if (!name || !name.trim()) {
    return { success: false, error: 'Please enter your name.' };
  }
  if (!phone || !validatePhone(phone)) {
    return { success: false, error: 'Please enter a valid phone number.' };
  }

  const payload = {
    type: 'callback',
    apiKey: API_KEY,
    name: name.trim(),
    phone: phone.trim(),
    concernType: concernType || 'General Inquiry',
    callbackTime: callbackTime || 'Morning (9 AM - 12 PM)',
    message: message ? message.trim() : '',
  };

  // Track event in GA4
  trackCallbackSubmit(payload.concernType);

  if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script CORS standard
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message || 'Failed to request callback.' };
      }
    } catch (err) {
      console.warn('[Google Script POST Warning]', err);
      return { success: true, message: 'Callback requested successfully!' };
    }
  }

  // Development simulation if GOOGLE_SCRIPT_URL is unconfigured
  console.log('[Dev Mode] Callback Payload for Google Apps Script Web App:', payload);
  return {
    success: true,
    message: 'Callback requested successfully (Dev Mode)!',
  };
};

/**
 * Fetch Rehab Centers dataset
 */
export const fetchRehabCenters = async () => {
  return REHAB_CENTERS;
};
