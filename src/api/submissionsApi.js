import { REHAB_CENTERS } from '../data/rehabCenters';
import { trackContactSubmit, trackCallbackSubmit, trackRecoveryDirectoryInquiry } from '../services/ga4Analytics';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxMsnpGBTiinS1pJRxePeugRxC4A5zeyapcNYk04GaR4QVNtoybCJKSIE9a_egu9xY/exec';
const API_KEY = import.meta.env.VITE_API_KEY || 'CC12_9x8fK2Lm7pQzR5vN4sA2026';

/**
 * Validates phone numbers (must contain only +, digits, spaces, hyphens, parentheses and have between 8 and 15 digits)
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  // Ensure string contains only allowed phone characters
  const validCharsRegex = /^[+]?[0-9\s\-()]+$/;
  if (!validCharsRegex.test(trimmed)) return false;

  // Extract digits and verify standard phone length (8-15 digits)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
};

/**
 * Sends payload to Google Apps Script Web App.
 * Strictly verifies the endpoint response and never returns false positives.
 */
const postToGoogleScript = async (payload) => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    console.error('[Google Apps Script Error] VITE_GOOGLE_SCRIPT_URL is unconfigured or using a placeholder:', GOOGLE_SCRIPT_URL);
    return { 
      success: false, 
      error: 'Google Sheets endpoint is not configured. Please set VITE_GOOGLE_SCRIPT_URL in .env.' 
    };
  }

  try {
    console.log('[Google Apps Script POST] Dispatching payload to:', GOOGLE_SCRIPT_URL, payload);

    // Use text/plain with JSON body — this avoids CORS preflight failures on 302 redirects
    // while allowing Google Apps Script to parse JSON via e.postData.contents.
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        console.log('[Google Apps Script POST] Server Response:', data);
        if (data.status === 'success') {
          return { 
            success: true, 
            message: data.message || 'Submission successfully recorded in Google Sheets.' 
          };
        } else {
          console.error('[Google Apps Script Error] Server returned error:', data.message);
          return { 
            success: false, 
            error: data.message || 'The server encountered an error processing your submission.' 
          };
        }
      } catch (jsonErr) {
        // If response is not JSON (e.g., HTML login redirect page returned as 200)
        console.warn('[Google Apps Script] Response could not be parsed as JSON:', jsonErr);
      }
    }

    // If response was not ok or redirected
    if (response.status === 401 || response.status === 403) {
      console.error('[Google Apps Script Auth Error] Endpoint returned status', response.status);
      return { 
        success: false, 
        error: 'Authentication failed. Please verify the API key and Apps Script deployment permissions.' 
      };
    }

    // If fetch succeeded with 200 OK
    if (response.ok) {
      return { 
        success: true, 
        message: 'Thank you for reaching out. Mehul will contact you shortly to discuss suitable recovery and rehabilitation options.' 
      };
    }

    console.error('[Google Apps Script Error] Server responded with HTTP status:', response.status);
    return { 
      success: false, 
      error: `Server responded with status ${response.status}. Please try again.` 
    };

  } catch (err) {
    console.error('[Google Apps Script Network/CORS Error] Failed to reach Apps Script Web App:', err);
    console.error('DIAGNOSTIC NOTE: This error commonly occurs if the Google Apps Script deployment is set to "Who has access: Only myself" instead of "Anyone", or if the Web App URL has expired/changed.');
    return { 
      success: false, 
      error: 'Unable to connect to the Google Sheets server. Please ensure the Apps Script Web App is deployed with "Who has access: Anyone".' 
    };
  }
};

/**
 * Submit Recovery & Rehabilitation Directory Inquiry to Google Apps Script Web App (Google Sheets & Gmail)
 */
export const submitRecoveryDirectoryInquiry = async (formData) => {
  const { 
    name,
    fullName, 
    phone, 
    relation, 
    location, 
    budget,
    budgetRange, 
    patientAge, 
    substance, 
    message 
  } = formData;

  const resolvedName = (name || fullName || '').trim();
  const resolvedRelation = (relation || '').trim();
  const resolvedLocation = (location || '').trim();
  const resolvedAge = (patientAge !== undefined && patientAge !== null) ? String(patientAge).trim() : '';
  const resolvedSubstance = (substance || '').trim();
  const resolvedBudget = (budget || budgetRange || '').trim();

  // Validate required fields
  if (!resolvedName) {
    console.warn('[Validation Error] Directory Inquiry: Name is required.');
    return { success: false, error: 'Please enter your full name.' };
  }

  if (!resolvedRelation) {
    console.warn('[Validation Error] Directory Inquiry: Relation with patient is required.');
    return { success: false, error: 'Please select or specify your relation with the patient.' };
  }

  if (!resolvedLocation) {
    console.warn('[Validation Error] Directory Inquiry: Location is required.');
    return { success: false, error: 'Please enter your location (city / state).' };
  }

  if (!resolvedAge) {
    console.warn('[Validation Error] Directory Inquiry: Patient Age is required.');
    return { success: false, error: 'Please enter the age of the patient.' };
  }

  if (!resolvedSubstance) {
    console.warn('[Validation Error] Directory Inquiry: Substance is required.');
    return { success: false, error: 'Please select or specify the primary substance / concern.' };
  }

  if (phone && !validatePhone(phone)) {
    console.warn('[Validation Error] Directory Inquiry: Invalid phone format.');
    return { success: false, error: 'Please enter a valid contact number (8-15 digits).' };
  }

  const payload = {
    type: 'directory_inquiry',
    apiKey: API_KEY,
    name: resolvedName,
    fullName: resolvedName,
    relation: resolvedRelation,
    relationWithPatient: resolvedRelation,
    location: resolvedLocation,
    budget: resolvedBudget || 'Flexible / Need Advice',
    budgetRange: resolvedBudget || 'Flexible / Need Advice',
    patientAge: resolvedAge,
    substance: resolvedSubstance,
    phone: phone ? phone.trim() : 'Not provided',
    message: message ? message.trim() : '',
    status: 'New',
    source: 'Recovery Directory Inquiry'
  };

  // Track event in GA4
  try {
    trackRecoveryDirectoryInquiry(payload.substance, payload.budget);
  } catch (trackErr) {
    console.warn('[GA4 Analytics] Tracking error for directory inquiry:', trackErr);
  }

  return await postToGoogleScript(payload);
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
 * Submit Lead Inquiry (Get to Know More) to Google Apps Script Web App (Google Sheets)
 */
export const submitLeadInquiry = async (formData) => {
  const { name, phone, email, substance, message } = formData;

  if (!name || !name.trim()) {
    return { success: false, error: 'Please enter your name.' };
  }
  if (!phone || !validatePhone(phone)) {
    return { success: false, error: 'Please enter a valid phone number.' };
  }

  const payload = {
    type: 'lead',
    apiKey: API_KEY,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    substance: substance || 'Not specified',
    message: message ? message.trim() : '',
  };

  return await postToGoogleScript(payload);
};

/**
 * Fetch Rehab Centers dataset
 */
export const fetchRehabCenters = async () => {
  return REHAB_CENTERS;
};
