import React, { useState } from 'react';
import { X, Star, CheckCircle, Award } from 'lucide-react';
import { ReviewItem } from '../../types';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({ isOpen, onClose, onAddReview }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [orgType, setOrgType] = useState<ReviewItem['organizationType']>('Industry & MedTech');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote || !title) return;

    const newReview: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      name,
      designation,
      organization,
      organizationType: orgType,
      rating,
      quoteTitle: title,
      fullQuote: quote,
      date: 'Just now',
      verified: true,
      highlightBadge: 'Verified Reader Review'
    };

    onAddReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center relative">
        <div className="w-full max-w-lg bg-obsidian-900 border border-gold/40 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
          
          <div className="p-6 bg-obsidian-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg">Submit Industry Review</h3>
                <p className="text-xs text-slate-400">Share your assessment of the 4-Volume Master Reference</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Review Submitted!</h4>
              <p className="text-xs text-slate-300">
                Thank you for contributing your professional perspective. Your review has been recorded.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Your Rating *</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-gold focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating || rating) >= star ? 'fill-gold text-gold' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gold-light ml-2 font-bold">{rating} / 5 Stars</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Job Title / Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Clinical Affairs Director"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Organization</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Global MedTech Corp"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value as ReviewItem['organizationType'])}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Industry & MedTech">Industry &amp; MedTech</option>
                    <option value="Government & Regulators">Government &amp; Regulators</option>
                    <option value="CRO & Delivery">CRO &amp; Delivery</option>
                    <option value="Academic & Research">Academic &amp; Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. An absolute masterclass in device regulatory strategy"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Your Full Review *</label>
                <textarea
                  rows={4}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Describe how this reference has impacted your research, regulatory submissions, or trial execution..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-white/15 text-xs text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm"
                >
                  Publish Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
