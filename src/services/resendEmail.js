/**
 * Resend Email Notification Service
 * Sends instant email alerts to staff when new inquiries or callback requests are submitted.
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const RECIPIENT_EMAIL = import.meta.env.VITE_NOTIFICATION_EMAIL || 'admin@clearchoice.org';

export const sendNotificationEmail = async (type, payload) => {
  if (!RESEND_API_KEY) {
    console.log('[Resend Service] VITE_RESEND_API_KEY not configured. Skipping email dispatch for:', type);
    return { success: false, reason: 'unconfigured' };
  }

  const subject = type === 'contact' 
    ? `[CLEAR CHOICE] New Contact Inquiry: ${payload.fullName}`
    : `[CLEAR CHOICE] New Callback Request: ${payload.name} (${payload.concernType})`;

  const htmlContent = type === 'contact'
    ? `
      <h2>New Contact Inquiry</h2>
      <p><strong>Full Name:</strong> ${payload.fullName}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      <p><strong>Message:</strong> ${payload.message || 'N/A'}</p>
      <p><strong>Attachment:</strong> ${payload.attachmentUrl || 'None'}</p>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `
    : `
      <h2>New Callback Request</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      <p><strong>Concern Type:</strong> ${payload.concernType}</p>
      <p><strong>Preferred Callback Time:</strong> ${payload.callbackTime}</p>
      <p><strong>Message:</strong> ${payload.message || 'N/A'}</p>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CLEAR CHOICE <noreply@clearchoice.org>',
        to: [RECIPIENT_EMAIL],
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[Resend Error]', data);
      return { success: false, error: data };
    }

    console.log('[Resend Success] Email sent ID:', data.id);
    return { success: true, data };
  } catch (err) {
    console.error('[Resend Exception]', err);
    return { success: false, error: err.message };
  }
};
