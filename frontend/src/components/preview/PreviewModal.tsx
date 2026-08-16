import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, BookOpen, CheckCircle, Shield, Clock, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

export const PreviewModal: React.FC = () => {
  const { selectedPreviewTopic, setSelectedPreviewTopic, addToCart, formatPrice } = useCart();

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPreviewTopic(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedPreviewTopic]);

  if (!selectedPreviewTopic) return null;

  const handleOrderVolume = () => {
    addToCart(selectedPreviewTopic.volumeId);
    setSelectedPreviewTopic(null);
  };

  return (
    <div className="fixed inset-0 z-[2050] overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedPreviewTopic(null)}
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center relative">
        <div className="w-full max-w-3xl bg-obsidian-900 border border-gold/40 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 bg-obsidian-950/80 border-b border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[11px] font-bold text-gold-light uppercase tracking-wider">
                <Bookmark className="w-3 h-3 text-gold" />
                <span>{selectedPreviewTopic.volumeLabel}</span>
              </div>
              <h3 className="font-serif font-bold text-white text-xl md:text-2xl pt-1">
                {selectedPreviewTopic.topicTitle}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-3">
                <span>Chapter {selectedPreviewTopic.chapterNumber}: {selectedPreviewTopic.chapterTitle}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-gold-light">
                  <Clock className="w-3 h-3" />
                  {selectedPreviewTopic.readTime}
                </span>
              </p>
            </div>

            <button
              onClick={() => setSelectedPreviewTopic(null)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Key Takeaways Box */}
            <div className="p-4 rounded-xl bg-obsidian-850 border border-gold/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Essential Learning Objectives</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedPreviewTopic.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excerpt Text */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4">
              <div className="p-5 rounded-xl bg-obsidian-950/60 border border-white/10 whitespace-pre-line font-serif text-base italic text-slate-300 leading-relaxed border-l-4 border-l-gold">
                {selectedPreviewTopic.excerptMarkdown}
              </div>
            </div>

            {/* Sample Operational Checklist */}
            {selectedPreviewTopic.sampleChecklist && (
              <div className="p-4 rounded-xl bg-obsidian-850/80 border border-white/10 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Regulatory Compliance Checklist Excerpt
                </h4>
                <div className="space-y-1.5">
                  {selectedPreviewTopic.sampleChecklist.map((chk, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded border border-gold/40 flex items-center justify-center text-[10px] text-gold flex-shrink-0">
                        ✓
                      </div>
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standards Referenced */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium">Standards Referenced:</span>
              {selectedPreviewTopic.standardsReferenced.map((std, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-[11px] font-mono text-gold-light"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-6 bg-obsidian-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <span>Read the complete unedited chapter with all tables in </span>
              <strong className="text-white">{selectedPreviewTopic.volumeLabel.split(':')[0]}</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedPreviewTopic(null)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-white/15 hover:bg-white/5 text-xs text-slate-300 transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={handleOrderVolume}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Order Volume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
