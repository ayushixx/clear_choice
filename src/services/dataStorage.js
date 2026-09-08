/**
 * Legacy Storage Module Wrapper (Redirects to Supabase API)
 */
import { submitContactInquiry, submitCallbackRequest } from '../api/submissionsApi';

export const saveContactSubmission = (data) => submitContactInquiry(data);
export const saveCallbackSubmission = (data) => submitCallbackRequest(data);
