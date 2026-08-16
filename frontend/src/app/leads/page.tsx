'use client';

import React, { useState } from 'react';
import { Building2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function LeadsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post('/leads', {
        name,
        email,
        phone,
        collegeName,
        source: 'FORM',
        notes,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit quote request');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Inquiry Received!</h1>
        <p className="text-slate-600 text-sm">
          Thank you, <strong>{name}</strong>. Our publishing team will review your request for <strong>{collegeName}</strong> and issue an official Proforma Invoice with applicable bulk discounts.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
          <Building2 className="h-4 w-4" />
          <span>1400+ Medical Colleges Support</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Request Institutional Bulk Quote</h1>
        <p className="text-slate-600 text-sm">
          Librarians & procurement officers can submit requirements to receive official quotes, PO formats, and Proforma Tax Invoices.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 text-sm border border-red-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Contact Person Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="Dr. Ramesh Sharma"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Official Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="rsharma@aiims.edu.in"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Phone / Mobile Number *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="+919812345678"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Medical College / Institute Name *</label>
            <input
              type="text"
              required
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
              placeholder="Kasturba Medical College, Manipal"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">Quantity / Inquiry Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-sky-500"
            placeholder="Inquiring for 50 hardcover 3-volume sets for central library procurement..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold py-3.5 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          <span>{submitting ? 'Submitting Quote Request...' : 'Submit Institutional Quote Request'}</span>
        </button>
      </form>
    </div>
  );
}
