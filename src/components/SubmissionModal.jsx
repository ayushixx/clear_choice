import React, { useState, useEffect } from 'react';
import { getSubmissions, clearSubmissions } from '../services/dataStorage';
import { X, Download, Trash2, Database, Mail, PhoneCall } from 'lucide-react';

export default function SubmissionModal({ isOpen, onClose }) {
  const [data, setData] = useState({ contacts: [], callbacks: [] });
  const [activeTab, setActiveTab] = useState('contacts');

  const refreshData = () => {
    setData(getSubmissions());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  // Listen for real-time submission events
  useEffect(() => {
    const handleNewData = () => {
      refreshData();
    };
    window.addEventListener('clearchoice_data_submitted', handleNewData);
    return () => window.removeEventListener('clearchoice_data_submitted', handleNewData);
  }, []);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clearchoice_submissions_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all stored submission records?')) {
      clearSubmissions();
      refreshData();
    }
  };

  const totalCount = data.contacts.length + data.callbacks.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--bg-card)] border border-editorial max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-editorial flex items-center justify-between bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#781353] dark:text-[#DC2F87]" />
            <div>
              <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
                Captured Form Submissions
              </h3>
              <p className="text-xs text-muted font-mono">
                Total Captured Entries: {totalCount}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-editorial px-6 pt-4 gap-4 bg-[var(--bg-card)] text-xs font-mono">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'border-[#781353] text-[#781353] dark:border-[#DC2F87] dark:text-[#DC2F87]'
                : 'border-transparent text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            <Mail className="w-4 h-4" /> Contact Forms ({data.contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('callbacks')}
            className={`pb-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'callbacks'
                ? 'border-[#781353] text-[#781353] dark:border-[#DC2F87] dark:text-[#DC2F87]'
                : 'border-transparent text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            <PhoneCall className="w-4 h-4" /> Callback Requests ({data.callbacks.length})
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
          {activeTab === 'contacts' && (
            <div>
              {data.contacts.length === 0 ? (
                <p className="text-muted italic text-center py-8">No contact submissions captured yet.</p>
              ) : (
                <div className="space-y-4">
                  {data.contacts.map((c) => (
                    <div key={c.id} className="p-4 border border-editorial bg-[var(--bg-secondary)] space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-[var(--text-primary)] text-sm">{c.fullName}</span>
                        <span className="text-[10px] text-muted">{new Date(c.submittedAt).toLocaleString()}</span>
                      </div>
                      <p><strong className="text-muted">Phone:</strong> {c.phone}</p>
                      {c.message && <p><strong className="text-muted">Message:</strong> {c.message}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'callbacks' && (
            <div>
              {data.callbacks.length === 0 ? (
                <p className="text-muted italic text-center py-8">No callback requests captured yet.</p>
              ) : (
                <div className="space-y-4">
                  {data.callbacks.map((c) => (
                    <div key={c.id} className="p-4 border border-editorial bg-[var(--bg-secondary)] space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-[var(--text-primary)] text-sm">{c.name}</span>
                        <span className="text-[10px] text-muted">{new Date(c.submittedAt).toLocaleString()}</span>
                      </div>
                      <p><strong className="text-muted">Phone:</strong> {c.phone}</p>
                      <p><strong className="text-muted">Concern:</strong> {c.concernType}</p>
                      <p><strong className="text-muted">Preferred Time:</strong> {c.callbackTime}</p>
                      {c.message && <p><strong className="text-muted">Note:</strong> {c.message}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-editorial bg-[var(--bg-secondary)] flex justify-between items-center">
          <button
            onClick={handleClear}
            className="text-xs font-mono text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Data
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleExportJSON}
              className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Data (JSON)
            </button>
            <button
              onClick={onClose}
              className="border border-editorial px-4 py-2 text-xs font-mono font-bold text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
