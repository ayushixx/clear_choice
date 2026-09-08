/**
 * Service to store, capture and manage user form submissions (Contact Forms & Callback Requests).
 * Saved locally in localStorage and dispatched via custom events so the admin/application
 * can inspect or export captured entries anytime.
 */

const STORAGE_KEYS = {
  CONTACT_SUBMISSIONS: 'clearchoice_contact_submissions',
  CALLBACK_SUBMISSIONS: 'clearchoice_callback_submissions',
};

export const saveContactSubmission = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS) || '[]');
    const newEntry = {
      id: 'cnt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      fullName: data.fullName,
      phone: data.phone,
      message: data.message || '',
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, JSON.stringify(updated));
    
    // Dispatch custom event for real-time app notifications or debug drawers
    window.dispatchEvent(new CustomEvent('clearchoice_data_submitted', { detail: { type: 'contact', entry: newEntry } }));
    console.log('[ClearChoice Data Storage] Captured Contact Entry:', newEntry);
    return newEntry;
  } catch (err) {
    console.error('Failed to save contact submission:', err);
    return null;
  }
};

export const saveCallbackSubmission = (data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALLBACK_SUBMISSIONS) || '[]');
    const newEntry = {
      id: 'clb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      name: data.name,
      phone: data.phone,
      concernType: data.concernType || 'General Inquiry',
      callbackTime: data.callbackTime || 'Morning (9 AM - 12 PM)',
      message: data.message || '',
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEYS.CALLBACK_SUBMISSIONS, JSON.stringify(updated));
    
    // Dispatch custom event for real-time app notifications or debug drawers
    window.dispatchEvent(new CustomEvent('clearchoice_data_submitted', { detail: { type: 'callback', entry: newEntry } }));
    console.log('[ClearChoice Data Storage] Captured Callback Entry:', newEntry);
    return newEntry;
  } catch (err) {
    console.error('Failed to save callback submission:', err);
    return null;
  }
};

export const getSubmissions = () => {
  try {
    const contacts = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS) || '[]');
    const callbacks = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALLBACK_SUBMISSIONS) || '[]');
    return { contacts, callbacks };
  } catch (err) {
    console.error('Failed to load submissions:', err);
    return { contacts: [], callbacks: [] };
  }
};

export const clearSubmissions = () => {
  localStorage.removeItem(STORAGE_KEYS.CONTACT_SUBMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.CALLBACK_SUBMISSIONS);
};
