-- ====================================================================
-- CLEAR CHOICE SUPABASE DATABASE MIGRATION SCHEMA
-- Production-Ready Schema for Submissions, Rehab Centers, Site Settings & Storage
-- ====================================================================

-- 1. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    attachment_url TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'contacted', 'resolved', 'spam'))
);

-- 2. CALLBACK REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.callback_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    concern_type TEXT NOT NULL DEFAULT 'General Inquiry',
    callback_time TEXT NOT NULL DEFAULT 'Morning (9 AM - 12 PM)',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'contacted', 'resolved', 'spam'))
);

-- 3. REHAB CENTERS TABLE
CREATE TABLE IF NOT EXISTS public.rehab_centers (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    phone_clean TEXT,
    website TEXT,
    badge TEXT,
    description TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    google_maps_url TEXT
);

-- 4. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_callback_created_at ON public.callback_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rehab_city ON public.rehab_centers(city);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rehab_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anonymous public users can INSERT submissions
CREATE POLICY "Allow public anonymous inserts for contact submissions"
    ON public.contact_submissions FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public anonymous inserts for callback requests"
    ON public.callback_requests FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Public can read rehab centers and site settings
CREATE POLICY "Allow public read access for rehab centers"
    ON public.rehab_centers FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access for site settings"
    ON public.site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated Admin staff full access to all tables
CREATE POLICY "Allow authenticated staff full access to contact submissions"
    ON public.contact_submissions FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff full access to callback requests"
    ON public.callback_requests FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- SEED INITIAL REHAB CENTERS DATA
-- ====================================================================

INSERT INTO public.rehab_centers (id, name, city, state, address, phone, phone_clean, website, badge, description, latitude, longitude, google_maps_url)
VALUES
('nimhans-bangalore', 'NIMHANS Centre for Addiction Medicine', 'Bengaluru', 'Karnataka', 'Hosur Road, Lakkasandra, Wilson Garden, Bengaluru, Karnataka 560029', '+91 80 2699 5000', '08026995000', 'https://nimhans.ac.in', 'Premier National Institute', 'Specialized inpatient and outpatient addiction medicine, research, and holistic rehabilitation programs.', 12.9392, 77.5937, 'https://maps.google.com/?q=NIMHANS+Centre+for+Addiction+Medicine+Bengaluru'),
('aiims-nddtc-delhi', 'AIIMS National Drug Dependence Treatment Centre (NDDTC)', 'New Delhi', 'Delhi NCR', 'C.G.O. Complex, National Drug Dependence Treatment Centre, Ghaziabad / New Delhi 110029', '+91 11 2658 8500', '01126588500', 'https://www.aiims.edu', 'Apex Government Medical Center', 'Comprehensive medical detox, opioid substitution therapy (OST), and psychological counseling services.', 28.5672, 77.2100, 'https://maps.google.com/?q=AIIMS+NDDTC+Delhi'),
('kripa-foundation-mumbai', 'Kripa Foundation Rehabilitation Center', 'Mumbai', 'Maharashtra', 'Mt. Carmel Church Compound, 81 A Chapel Road, Bandra West, Mumbai, Maharashtra 400050', '+91 22 2640 5411', '02226405411', 'https://kripafoundation.org', 'Affiliated with Ministry of Social Justice', 'Renowned non-governmental recovery network using 12-Step therapy, yoga, and meditation.', 19.0544, 72.8302, 'https://maps.google.com/?q=Kripa+Foundation+Bandra+Mumbai')
ON CONFLICT (id) DO NOTHING;
