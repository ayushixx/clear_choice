import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-supabase-project')
);

if (!isSupabaseConfigured) {
  console.warn(
    '[ClearChoice Supabase] Environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing or set to defaults. API calls will use static fallbacks.'
  );
}

// Fallback dummy URL to prevent createClient initialization error if env vars are empty
const safeUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co';
const safeKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key';

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
