import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { fetchSubmissions, updateLeadStatus, exportSubmissionsToCSV } from '../api/submissionsApi';
import { ShieldCheck, Download, Search, LogOut, Mail, PhoneCall, RefreshCw, Filter, Paperclip } from 'lucide-react';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Leads state
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'callback'
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Check auth session
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      // In dev mode without Supabase, auto-allow preview session
      setSession({ user: { email: 'admin@clearchoice.org (Dev Mode)' } });
    }
  }, []);

  // Fetch leads when authenticated or active tab changes
  const loadLeads = async () => {
    setLoadingLeads(true);
    const data = await fetchSubmissions(activeTab);
    setLeads(data);
    setLoadingLeads(false);
  };

  useEffect(() => {
    if (session) {
      loadLeads();
    }
  }, [session, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (!isSupabaseConfigured) {
      setSession({ user: { email: email || 'admin@clearchoice.org' } });
      setAuthLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message || 'Invalid credentials');
    } else {
      setSession(data.session);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    await updateLeadStatus(activeTab, id, newStatus);
  };

  // Filtered leads
  const filteredLeads = leads.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const name = (item.full_name || item.name || '').toLowerCase();
    const phone = (item.phone || '').toLowerCase();
    const message = (item.message || '').toLowerCase();
    const matchesSearch = !q || name.includes(q) || phone.includes(q) || message.includes(q);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-400/30';
      case 'in_progress':
        return 'bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-400/30';
      case 'contacted':
        return 'bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-400/30';
      case 'resolved':
        return 'bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/30';
      case 'spam':
        return 'bg-red-950/20 text-red-700 dark:text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/10 text-muted border-editorial';
    }
  };

  // Login view if unauthenticated
  if (!session) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-4 space-y-6">
        <div className="card-doc p-8 space-y-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-10 h-10 text-[#781353] dark:text-[#DC2F87] mx-auto" />
            <h1 className="text-3xl font-serif font-bold text-[var(--text-primary)]">
              Staff Portal Access
            </h1>
            <p className="text-xs text-muted">
              Secure authentication powered by Supabase Auth. Authorized clinical staff only.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/30 border border-red-800 text-red-200 text-xs text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@clearchoice.org"
                required
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--text-primary)] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-3 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              {authLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Authenticated View
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-editorial pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
            Clinical Admin Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Lead Management System
          </h1>
          <p className="text-xs text-muted font-mono mt-1">
            Logged in as: {session.user.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportSubmissionsToCSV(activeTab, filteredLeads)}
            className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV ({filteredLeads.length})
          </button>

          <button
            onClick={handleLogout}
            className="border border-editorial px-3 py-2 text-xs font-mono text-muted hover:text-[var(--text-primary)] flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-editorial gap-6 font-serif">
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 font-bold text-lg border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'contact'
                  ? 'border-[#781353] text-[#781353] dark:border-[#DC2F87] dark:text-[#DC2F87]'
                  : 'border-transparent text-muted hover:text-[var(--text-primary)]'
              }`}
            >
              <Mail className="w-4 h-4" /> Contact Inquiries
            </button>
            <button
              onClick={() => setActiveTab('callback')}
              className={`pb-3 font-bold text-lg border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'callback'
                  ? 'border-[#781353] text-[#781353] dark:border-[#DC2F87] dark:text-[#DC2F87]'
                  : 'border-transparent text-muted hover:text-[var(--text-primary)]'
              }`}
            >
              <PhoneCall className="w-4 h-4" /> Callback Requests
            </button>
          </div>

          <button
            onClick={loadLeads}
            disabled={loadingLeads}
            className="px-3 py-1.5 border border-editorial text-xs font-mono text-muted hover:text-[var(--text-primary)] self-start sm:self-auto flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lead name, phone number, message..."
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#781353] text-[var(--text-primary)]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Filter className="w-4 h-4 text-muted shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none text-[var(--text-primary)]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[var(--bg-card)] border border-editorial overflow-hidden">
        {loadingLeads ? (
          <div className="p-12 text-center text-xs font-mono text-muted">
            Loading submission records...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-muted space-y-2">
            <p>No submission records found.</p>
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="text-[#781353] dark:text-[#DC2F87] underline font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[var(--bg-secondary)] border-b border-editorial text-[10px] uppercase text-muted tracking-wider">
                <tr>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4">Lead Name</th>
                  <th className="p-4">Phone</th>
                  {activeTab === 'callback' && <th className="p-4">Concern / Window</th>}
                  <th className="p-4">Message Details</th>
                  <th className="p-4">Status & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial">
                {filteredLeads.map((item) => (
                  <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 whitespace-nowrap text-muted text-[11px]">
                      {item.created_at ? new Date(item.created_at).toLocaleString() : 'Just now'}
                    </td>

                    <td className="p-4 font-bold text-[var(--text-primary)] font-serif text-sm">
                      {item.full_name || item.name}
                    </td>

                    <td className="p-4">
                      <a href={`tel:${item.phone}`} className="text-[#781353] dark:text-[#DC2F87] font-bold hover:underline">
                        {item.phone}
                      </a>
                    </td>

                    {activeTab === 'callback' && (
                      <td className="p-4 space-y-0.5">
                        <span className="font-bold text-[var(--text-primary)] block">{item.concern_type}</span>
                        <span className="text-[10px] text-muted block">{item.callback_time}</span>
                      </td>
                    )}

                    <td className="p-4 max-w-xs text-muted font-light leading-relaxed">
                      {item.message || <span className="italic text-muted/60">No message body</span>}
                      {item.attachment_url && (
                        <div className="mt-1">
                          <a
                            href={item.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#781353] dark:text-[#DC2F87] text-[10px] underline flex items-center gap-1"
                          >
                            <Paperclip className="w-3 h-3 inline" /> View Attachment
                          </a>
                        </div>
                      )}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 border text-[10px] font-bold uppercase ${getStatusBadgeClass(item.status)}`}>
                          {item.status || 'new'}
                        </span>

                        <select
                          value={item.status || 'new'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className="px-2 py-1 bg-[var(--bg-secondary)] border border-editorial text-[11px] focus:outline-none text-[var(--text-primary)]"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
