import { REHAB_CENTERS } from '../data/rehabCenters';
import { trackContactSubmit, trackCallbackSubmit } from '../services/ga4Analytics';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Validates phone numbers (minimum 8 digits)
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8;
};

/**
 * Sends payload to Google Apps Script Web App using URLSearchParams and no-cors mode
 * to guarantee CORS compatibility across all browser environments.
 */
const postToGoogleScript = async (payload) => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    console.log('[Dev Mode] Form Payload (Unconfigured Web App URL):', payload);
    return { success: true, message: 'Submission received (Dev Mode).' };
  }

  try {
    const params = new URLSearchParams();
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        params.append(key, payload[key]);
      }
    }

    // Google Apps Script Web Apps require no-cors mode with x-www-form-urlencoded
    // to bypass cross-origin redirect blocks on script.googleusercontent.com
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('[Google Apps Script POST] Dispatched payload:', payload);
    return { success: true, message: 'Thank you. Your entry has been recorded in Google Sheets.' };
  } catch (err) {
    console.error('[Google Script POST Error]', err);
    return { success: false, error: 'Network error submitting request. Please try again.' };
  }
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

  return await postToGoogleScript(payload);
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

  return await postToGoogleScript(payload);
};

/**
 * Fetch Rehab Centers dataset
 */
export const fetchRehabCenters = async () => {
  return REHAB_CENTERS;
};
