import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Mail, Phone, MapPin, Building2, CheckCircle2, Sparkles, Send, ShieldCheck, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ setActiveView }) => {
  const [formType, setFormType] = useState<'advisory' | 'speaking' | 'bulk' | 'general'>('advisory');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    country: 'United States',
    estimatedAttendees: '50-100',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4A44A', '#F0C97B', '#FFFFFF']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  return (
    <div className="pt-20 bg-obsidian-950 min-h-screen text-slate-200">
      
      {/* Header Banner */}
      <section className="py-16 md:py-20 border-b border-gold/20 bg-gradient-to-b from-obsidian-950 to-obsidian-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-xs font-bold text-gold-light uppercase tracking-widest">
              Executive Advisory &amp; Keynote Inquiries
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Engage Dr. Ashish Indani for <span className="gold-gradient-text">Advisory &amp; Keynotes</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct consultation for medical technology enterprises, regulatory dossier reviews, institutional masterclasses, and keynote speeches at global health technology summits.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Publisher Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold/30 shadow-luxury space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">Executive Liaison Office</h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Advisory &amp; Speaking Inquiries</strong>
                    <span className="text-slate-400">dr.ashish.indani@clinicalmedtech.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Global Publisher</strong>
                    <span className="text-slate-400">B Jain Publishers (P) Ltd.</span>
                    <p className="text-[11px] text-slate-500">New Delhi • London • Global Distribution</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Institutional &amp; University Bulk Orders</strong>
                    <span className="text-slate-400">orders@bjain.com (Special Academic Discounts)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-light">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Confidential Advisory Protocols</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All pre-market technology discussions, clinical protocols, and regulatory filings are handled under strict reciprocal Non-Disclosure Agreements (NDA).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-obsidian-900 border border-gold/30 shadow-luxury">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Inquiry Transmitted</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your inquiry has been received by Dr. Indani's advisory executive office. A formal briefing response will follow within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); }}
                    className="px-6 py-2.5 rounded-lg bg-gold text-obsidian-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Inquiry Type Buttons */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-2">
                      Nature of Engagement
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'advisory', label: 'Corporate Advisory' },
                        { id: 'speaking', label: 'Keynote / Summit' },
                        { id: 'bulk', label: 'Institutional Bulk' },
                        { id: 'general', label: 'General Inquiry' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormType(item.id as any)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                            formType === item.id
                              ? 'bg-gold text-obsidian-950 border-gold shadow-md font-bold'
                              : 'bg-obsidian-850 text-slate-300 border-white/10 hover:border-gold/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Jane Reynolds"
                        className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Professional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@medtech-corp.com"
                        className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Organization / University *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Medtronic / Harvard Medical"
                        className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Direct Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {formType === 'speaking' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Estimated Audience Size
                        </label>
                        <select
                          value={formData.estimatedAttendees}
                          onChange={(e) => setFormData({ ...formData, estimatedAttendees: e.target.value })}
                          className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                        >
                          <option>Under 50 Attendees</option>
                          <option>50 - 200 Attendees</option>
                          <option>200 - 500 Attendees</option>
                          <option>500+ Global Summit</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Event Location / Format
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. In-Person (Geneva) / Virtual Webinar"
                          className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Scope of Advisory or Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the specific clinical, regulatory (EU MDR / FDA), or speaking engagement scope..."
                      className="w-full bg-obsidian-950 border border-white/15 focus:border-gold rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin">⟳ Transmitting Briefing...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Formal Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    Protected by SSL 256-bit encryption. Strict NDA terms applied automatically.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
