import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, LogIn, LogOut, Users, Phone, Mail, MessageSquare, 
  Search, Filter, ChevronDown, ChevronUp, RefreshCw, 
  Download, Trash2, Eye, Clock, Shield, FileText,
  BarChart3, TrendingUp, AlertCircle, CheckCircle2, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Password Config ───
const ADMIN_PASSWORD = 'ClearChoice@2026';

// ─── Google Script URL (same endpoint used by public forms) ───
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Admin Panel
 * Password-protected dashboard for viewing lead inquiries, contact submissions,
 * callback requests, and recovery directory inquiries stored in Google Sheets.
 */
export default function AdminPanel({ setActivePage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Data state
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [directoryInquiries, setDirectoryInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  // UI state
  const [activeTab, setActiveTab] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDir, setSortDir] = useState('desc');
  const [expandedRow, setExpandedRow] = useState(null);

  // Check if previously authenticated this session
  useEffect(() => {
    const auth = sessionStorage.getItem('cc_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      sessionStorage.setItem('cc_admin_auth', 'true');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('cc_admin_auth');
  };

  // Fetch data from Google Sheets via Apps Script
  const fetchData = async () => {
    setLoading(true);
    try {
      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        // Dev mode — load sample data
        const sampleLeads = [
          { timestamp: new Date().toISOString(), name: 'Sample Lead', phone: '+91 98765 43210', email: 'test@example.com', substance: 'Heroin / Opioid', message: 'Looking for recovery support', status: 'new' },
          { timestamp: new Date(Date.now() - 86400000).toISOString(), name: 'Another Lead', phone: '+91 87654 32100', email: '', substance: 'Alcohol', message: '', status: 'new' },
          { timestamp: new Date(Date.now() - 172800000).toISOString(), name: 'Third Lead', phone: '+91 76543 21000', email: 'third@mail.com', substance: 'Other / Prefer Not to Say', message: 'Need help for family member', status: 'contacted' },
        ];
        const sampleContacts = [
          { timestamp: new Date(Date.now() - 3600000).toISOString(), fullName: 'Contact Person', phone: '+91 99887 76655', message: 'General inquiry about programs' },
        ];
        const sampleCallbacks = [
          { timestamp: new Date(Date.now() - 7200000).toISOString(), name: 'Callback User', phone: '+91 88776 65544', concernType: 'Alcohol Recovery', callbackTime: 'Morning (9 AM - 12 PM)', message: 'Please call back ASAP' },
        ];
        const sampleDirectory = [
          { timestamp: new Date().toISOString(), name: 'Rahul Sharma', fullName: 'Rahul Sharma', relation: 'Self', location: 'Mumbai, Maharashtra', budget: '₹50,000 - ₹1,00,000 / mo', budgetRange: '₹50,000 - ₹1,00,000 / mo', patientAge: '28', substance: 'Alcohol', status: 'New' },
          { timestamp: new Date(Date.now() - 18000000).toISOString(), name: 'Ananya Verma', fullName: 'Ananya Verma', relation: 'Brother', location: 'Delhi NCR', budget: '₹25,000 - ₹50,000 / mo', budgetRange: '₹25,000 - ₹50,000 / mo', patientAge: '22', substance: 'Opioids / Smack', status: 'New' },
        ];
        setLeads(sampleLeads);
        setContacts(sampleContacts);
        setCallbacks(sampleCallbacks);
        setDirectoryInquiries(sampleDirectory);
        setLastFetched(new Date());
        setLoading(false);
        return;
      }

      // Fetch from Google Apps Script (GET request with action=fetch)
      const url = `${GOOGLE_SCRIPT_URL}?action=fetch&apiKey=${encodeURIComponent(API_KEY)}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        setContacts(data.contacts || []);
        setCallbacks(data.callbacks || []);
        setDirectoryInquiries(data.directoryInquiries || []);
      } else {
        console.error('[Admin] Failed to fetch data:', response.status);
      }
      setLastFetched(new Date());
    } catch (err) {
      console.error('[Admin] Fetch error:', err);
    }
    setLoading(false);
  };

  // Auto-fetch on login
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Active dataset based on tab
  const activeData = useMemo(() => {
    let data = [];
    switch (activeTab) {
      case 'directory': data = directoryInquiries; break;
      case 'leads': data = leads; break;
      case 'contacts': data = contacts; break;
      case 'callbacks': data = callbacks; break;
      default: data = directoryInquiries;
    }

    // Filter by search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(term)
        )
      );
    }

    // Sort
    data = [...data].sort((a, b) => {
      const aVal = a[sortField] || (sortField === 'name' ? a.fullName : '') || (sortField === 'budget' ? a.budgetRange : '') || '';
      const bVal = b[sortField] || (sortField === 'name' ? b.fullName : '') || (sortField === 'budget' ? b.budgetRange : '') || '';
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? comparison : -comparison;
    });

    return data;
  }, [activeTab, directoryInquiries, leads, contacts, callbacks, searchTerm, sortField, sortDir]);

  // Stats
  const stats = useMemo(() => ({
    totalDirectory: directoryInquiries.length,
    totalLeads: leads.length,
    totalContacts: contacts.length,
    totalCallbacks: callbacks.length,
    total: directoryInquiries.length + leads.length + contacts.length + callbacks.length,
    newDirectory: directoryInquiries.filter(d => d.status === 'New' || !d.status).length,
  }), [directoryInquiries, leads, contacts, callbacks]);


  // Export CSV
  const exportCSV = () => {
    if (activeData.length === 0) return;
    const headers = Object.keys(activeData[0]);
    const csvRows = [
      headers.join(','),
      ...activeData.map(row => 
        headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clear-choice-${activeTab}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDir === 'asc' 
      ? <ChevronUp className="w-3 h-3 inline-block ml-0.5" /> 
      : <ChevronDown className="w-3 h-3 inline-block ml-0.5" />;
  };

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2E031D] via-[#4E0834] to-[#781353] px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6"
        >
          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#781353]/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-[#781353]" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)]">Admin Panel</h1>
            <p className="text-xs text-muted font-light">Enter admin password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] block">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full px-4 py-3.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-sm text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/30 focus:border-[#781353] transition-all pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted hover:text-[#781353] uppercase tracking-wider focus-visible:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#2E031D] text-white hover:bg-[#4E0834] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md focus-visible:outline-none"
            >
              <LogIn className="w-4 h-4" />
              <span>Access Dashboard</span>
            </button>
          </form>

          <button
            onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}
            className="w-full text-center text-xs text-muted hover:text-[#781353] transition-colors focus-visible:outline-none"
          >
            ← Back to Website
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ───
  const tabs = [
    { id: 'directory', label: 'Directory Inquiries', icon: Building2, count: stats.totalDirectory, color: 'text-[#781353] bg-pink-50' },
    { id: 'leads', label: 'Lead Inquiries', icon: Users, count: stats.totalLeads, color: 'text-amber-700 bg-amber-50' },
    { id: 'contacts', label: 'Contact Submissions', icon: MessageSquare, count: stats.totalContacts, color: 'text-blue-700 bg-blue-50' },
    { id: 'callbacks', label: 'Callback Requests', icon: Phone, count: stats.totalCallbacks, color: 'text-emerald-700 bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 sm:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-editorial pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#781353]" />
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-xs text-muted font-light">
              Manage lead inquiries, contact submissions, and callback requests
              {lastFetched && (
                <span className="ml-2 text-muted/60">
                  · Last refreshed: {lastFetched.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#781353] border border-editorial rounded-full hover:bg-[var(--bg-secondary)] transition-all focus-visible:outline-none disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-all focus-visible:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-white border border-editorial rounded-2xl p-5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#781353]/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#781353]" />
              </div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Total</span>
            </div>
            <p className="text-3xl font-serif font-bold text-[var(--text-primary)]">{stats.total}</p>
          </motion.div>

          {tabs.map((tab, i) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.05 }}
              onClick={() => setActiveTab(tab.id)}
              className={`bg-white border rounded-2xl p-5 space-y-2 cursor-pointer transition-all hover:shadow-md ${
                activeTab === tab.id ? 'border-[#781353] ring-1 ring-[#781353]/20' : 'border-editorial'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tab.color}`}>
                  <tab.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest hidden sm:block">{tab.label}</span>
              </div>
              <p className="text-3xl font-serif font-bold text-[var(--text-primary)]">{tab.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Tab Bar + Search + Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchTerm(''); setExpandedRow(null); }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#2E031D] text-white shadow-sm'
                    : 'text-muted hover:text-[var(--text-primary)]'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-[var(--bg-primary)]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search + Export */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search records..."
                className="w-full sm:w-64 pl-9 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-editorial rounded-xl text-xs text-[var(--text-primary)] placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-[#781353]/20 transition-all"
              />
            </div>
            <button
              onClick={exportCSV}
              disabled={activeData.length === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#781353] border border-editorial rounded-xl hover:bg-[var(--bg-secondary)] transition-all focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-editorial rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-6 h-6 text-[#781353] animate-spin" />
              <span className="ml-3 text-sm text-muted">Loading data...</span>
            </div>
          ) : activeData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-muted/40" />
              </div>
              <p className="text-sm text-muted font-light">
                {searchTerm ? 'No records match your search.' : 'No records found yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* ─── DIRECTORY INQUIRIES TABLE ─── */}
              {activeTab === 'directory' && (
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] border-b border-editorial">
                    <tr>
                      <th onClick={() => toggleSort('timestamp')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Timestamp <SortIcon field="timestamp" />
                      </th>
                      <th onClick={() => toggleSort('name')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Name <SortIcon field="name" />
                      </th>
                      <th onClick={() => toggleSort('relation')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Relation With Patient <SortIcon field="relation" />
                      </th>
                      <th onClick={() => toggleSort('location')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Location <SortIcon field="location" />
                      </th>
                      <th onClick={() => toggleSort('budget')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Budget <SortIcon field="budget" />
                      </th>
                      <th onClick={() => toggleSort('patientAge')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Patient Age <SortIcon field="patientAge" />
                      </th>
                      <th onClick={() => toggleSort('substance')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Substance <SortIcon field="substance" />
                      </th>
                      <th onClick={() => toggleSort('status')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Status <SortIcon field="status" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-editorial">
                    {activeData.map((row, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                        className="hover:bg-[var(--bg-secondary)]/50 cursor-pointer transition-colors"
                      >
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          {row.timestamp ? new Date(row.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                          {row.name || row.fullName || '—'}
                        </td>
                        <td className="px-5 py-4 text-xs text-muted whitespace-nowrap">
                          <span className="text-[10px] font-mono font-bold bg-[var(--bg-secondary)] text-[var(--text-primary)] px-2 py-0.5 rounded-md border border-editorial">
                            {row.relation || 'Self'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted whitespace-nowrap">{row.location || '—'}</td>
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">{row.budget || row.budgetRange || 'Flexible'}</span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          {row.patientAge ? `${row.patientAge} yrs` : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-mono font-bold text-[#781353] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200 whitespace-nowrap">
                            {row.substance || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50 whitespace-nowrap">
                            {row.status || 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ─── LEADS TABLE ─── */}
              {activeTab === 'leads' && (
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] border-b border-editorial">
                    <tr>
                      <th onClick={() => toggleSort('timestamp')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Date <SortIcon field="timestamp" />
                      </th>
                      <th onClick={() => toggleSort('name')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Name <SortIcon field="name" />
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Phone</th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Email</th>
                      <th onClick={() => toggleSort('substance')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Substance <SortIcon field="substance" />
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Message</th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-editorial">
                    {activeData.map((row, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                        className="hover:bg-[var(--bg-secondary)]/50 cursor-pointer transition-colors"
                      >
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          {row.timestamp ? new Date(row.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{row.name || '—'}</td>
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          <a href={`tel:${row.phone}`} className="hover:text-[#781353] hover:underline">{row.phone || '—'}</a>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted whitespace-nowrap">
                          {row.email ? <a href={`mailto:${row.email}`} className="hover:text-[#781353] hover:underline">{row.email}</a> : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 whitespace-nowrap">
                            {row.substance || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted max-w-[200px] truncate">{row.message || '—'}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${
                            row.status === 'contacted' 
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              : 'text-blue-700 bg-blue-50 border-blue-200'
                          }`}>
                            {row.status || 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ─── CONTACTS TABLE ─── */}
              {activeTab === 'contacts' && (
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] border-b border-editorial">
                    <tr>
                      <th onClick={() => toggleSort('timestamp')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Date <SortIcon field="timestamp" />
                      </th>
                      <th onClick={() => toggleSort('fullName')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Full Name <SortIcon field="fullName" />
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Phone</th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-editorial">
                    {activeData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          {row.timestamp ? new Date(row.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{row.fullName || '—'}</td>
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          <a href={`tel:${row.phone}`} className="hover:text-[#781353] hover:underline">{row.phone || '—'}</a>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted">{row.message || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ─── CALLBACKS TABLE ─── */}
              {activeTab === 'callbacks' && (
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] border-b border-editorial">
                    <tr>
                      <th onClick={() => toggleSort('timestamp')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Date <SortIcon field="timestamp" />
                      </th>
                      <th onClick={() => toggleSort('name')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Name <SortIcon field="name" />
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Phone</th>
                      <th onClick={() => toggleSort('concernType')} className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted cursor-pointer hover:text-[var(--text-primary)]">
                        Concern <SortIcon field="concernType" />
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Callback Time</th>
                      <th className="px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-editorial">
                    {activeData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          {row.timestamp ? new Date(row.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{row.name || '—'}</td>
                        <td className="px-5 py-4 text-xs text-muted font-mono whitespace-nowrap">
                          <a href={`tel:${row.phone}`} className="hover:text-[#781353] hover:underline">{row.phone || '—'}</a>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 whitespace-nowrap">
                            {row.concernType || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {row.callbackTime || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted">{row.message || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Row count footer */}
          {activeData.length > 0 && (
            <div className="px-5 py-3 border-t border-editorial bg-[var(--bg-secondary)]/50 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted">
                Showing {activeData.length} {activeData.length === 1 ? 'record' : 'records'}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              <span className="text-[10px] font-mono text-muted/60">
                Clear Choice Admin Panel
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
