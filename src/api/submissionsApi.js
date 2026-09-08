import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { REHAB_CENTERS } from '../data/rehabCenters';
import { sendNotificationEmail } from '../services/resendEmail';
import { trackContactSubmit, trackCallbackSubmit } from '../services/ga4Analytics';

/**
 * Validates phone numbers (10+ digits)
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8;
};

/**
 * Uploads attachment to Supabase Storage bucket 'inquiry_attachments'
 */
export const uploadAttachmentToStorage = async (file) => {
  if (!file || !isSupabaseConfigured) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `attachments/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('inquiry_attachments')
      .upload(filePath, file);

    if (error) {
      console.warn('[Supabase Storage Upload Error]', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('inquiry_attachments')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('[Storage Upload Exception]', err);
    return null;
  }
};

/**
 * Submit Contact Inquiry to Supabase `contact_submissions` table
 */
export const submitContactInquiry = async (formData, fileAttachment = null) => {
  const { fullName, phone, message } = formData;

  if (!fullName || !fullName.trim()) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!phone || !validatePhone(phone)) {
    return { success: false, error: 'Please enter a valid phone number (at least 8-10 digits).' };
  }

  let attachmentUrl = null;
  if (fileAttachment) {
    attachmentUrl = await uploadAttachmentToStorage(fileAttachment);
  }

  const payload = {
    full_name: fullName.trim(),
    phone: phone.trim(),
    message: message ? message.trim() : '',
    attachment_url: attachmentUrl,
    status: 'new',
  };

  // Track event in GA4
  trackContactSubmit();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('[Supabase Insert Error]', error);
        return { success: false, error: error.message || 'Failed to submit inquiry.' };
      }

      // Trigger Resend email notification
      sendNotificationEmail('contact', {
        fullName: payload.full_name,
        phone: payload.phone,
        message: payload.message,
        attachmentUrl,
      });

      return { success: true, data };
    } catch (err) {
      console.error('[Supabase Submit Exception]', err);
      return { success: false, error: 'Network error submitting request.' };
    }
  }

  // Development Fallback if Supabase is unconfigured
  console.log('[Dev Fallback] Contact Submission Captured:', payload);
  sendNotificationEmail('contact', {
    fullName: payload.full_name,
    phone: payload.phone,
    message: payload.message,
    attachmentUrl,
  });

  return { success: true, data: { ...payload, id: 'dev_' + Date.now() } };
};

/**
 * Submit Callback Request to Supabase `callback_requests` table
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
    name: name.trim(),
    phone: phone.trim(),
    concern_type: concernType || 'General Inquiry',
    callback_time: callbackTime || 'Morning (9 AM - 12 PM)',
    message: message ? message.trim() : '',
    status: 'new',
  };

  // Track event in GA4
  trackCallbackSubmit(payload.concern_type);

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('callback_requests')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('[Supabase Insert Error]', error);
        return { success: false, error: error.message || 'Failed to request callback.' };
      }

      // Trigger Resend email notification
      sendNotificationEmail('callback', payload);

      return { success: true, data };
    } catch (err) {
      console.error('[Supabase Submit Exception]', err);
      return { success: false, error: 'Network error requesting callback.' };
    }
  }

  // Development Fallback if Supabase is unconfigured
  console.log('[Dev Fallback] Callback Request Captured:', payload);
  sendNotificationEmail('callback', payload);

  return { success: true, data: { ...payload, id: 'dev_' + Date.now() } };
};

/**
 * Fetch Rehab Centers from Supabase database with fallback to static dataset
 */
export const fetchRehabCenters = async () => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('rehab_centers')
        .select('*')
        .order('name');

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          city: item.city,
          state: item.state,
          address: item.address,
          phone: item.phone,
          phoneClean: item.phone_clean || item.phone.replace(/\s+/g, ''),
          website: item.website,
          badge: item.badge,
          description: item.description,
          coordinates: { lat: item.latitude || 12.9716, lng: item.longitude || 77.5946 },
          googleMapsUrl: item.google_maps_url,
        }));
      }
    } catch (err) {
      console.warn('[Supabase Fetch Centers Warning]', err);
    }
  }
  return REHAB_CENTERS;
};

/**
 * Fetch submissions for Admin Dashboard
 */
export const fetchSubmissions = async (type = 'contact') => {
  const table = type === 'contact' ? 'contact_submissions' : 'callback_requests';
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data;
  }
  return [];
};

/**
 * Update lead status in Supabase (`new`, `in_progress`, `contacted`, `resolved`, `spam`)
 */
export const updateLeadStatus = async (type, id, newStatus) => {
  const table = type === 'contact' ? 'contact_submissions' : 'callback_requests';
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from(table)
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) return { success: true };
    return { success: false, error: error.message };
  }
  return { success: true };
};

/**
 * Exports data to CSV file download
 */
export const exportSubmissionsToCSV = (type, dataList) => {
  if (!dataList || dataList.length === 0) return;

  const headers = type === 'contact' 
    ? ['ID', 'Date', 'Full Name', 'Phone', 'Message', 'Attachment', 'Status']
    : ['ID', 'Date', 'Name', 'Phone', 'Concern Type', 'Preferred Time', 'Message', 'Status'];

  const rows = dataList.map((item) => {
    if (type === 'contact') {
      return [
        item.id,
        item.created_at || new Date().toISOString(),
        `"${(item.full_name || '').replace(/"/g, '""')}"`,
        `"${(item.phone || '').replace(/"/g, '""')}"`,
        `"${(item.message || '').replace(/"/g, '""')}"`,
        `"${(item.attachment_url || '').replace(/"/g, '""')}"`,
        item.status || 'new',
      ];
    } else {
      return [
        item.id,
        item.created_at || new Date().toISOString(),
        `"${(item.name || '').replace(/"/g, '""')}"`,
        `"${(item.phone || '').replace(/"/g, '""')}"`,
        `"${(item.concern_type || '').replace(/"/g, '""')}"`,
        `"${(item.callback_time || '').replace(/"/g, '""')}"`,
        `"${(item.message || '').replace(/"/g, '""')}"`,
        item.status || 'new',
      ];
    }
  });

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `clearchoice_${type}_leads_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
};
