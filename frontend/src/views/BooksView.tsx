import React, { useState } from 'react';
import { ActiveView } from '../types';
import { useCart } from '../context/CartContext';

interface BooksViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({ setActiveView }) => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkSubmitted(true);
    setTimeout(() => setBulkSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: 'Who should buy the 4-Volume collection?',
      a: 'The 4-Volume collection is designed for clinical research professionals, regulatory affairs experts, biomedical engineers, medical writers, and clinical trial investigators who require an end-to-end device-dedicated reference.'
    },
    {
      q: 'Do the books include real-world examples?',
      a: 'Yes. Each volume features real-world case studies, audit preparation checklists, and practical templates bridging theoretical requirements with actual clinical trial execution.'
    },
    {
      q: 'Are the books updated with new regulations?',
      a: 'Absolutely. The publication incorporates up-to-date global requirements including US FDA 510(k), De Novo, PMA, EU MDR 2017/745, ISO 14155, ISO 14971, and ISO 62304 / ISO 63204.'
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we offer express global shipping across 100+ countries, as well as direct institutional library procurement options.'
    }
  ];

  return (
    <div className="books-master-page">
      {/* ══════════════════════════════════════
           1. HERO SECTION
           ══════════════════════════════════════ */}
      <section className="b-hero-sec" id="hero">
        <div className="b-hero-container">
          
          {/* Left-Anchored Content, Purchase Card & Laurel Trust Badge */}
          <div className="b-hero-left-content">
            <div className="b-hero-eyebrow-container">
              <span className="b-hero-eyebrow">THE DEFINITIVE 4-VOLUME REFERENCE</span>
              <span className="b-hero-eyebrow-line"></span>
            </div>
            
            <h1 className="b-hero-h1 serif-title">
              Essentials of Medical Device <br />
              <span className="italic-gold">Clinical Research</span>
            </h1>

            <p className="b-hero-desc">
              The first end-to-end reference connecting device evidence — from first-in-human study to post-market vigilance — across 100+ regulatory jurisdictions.
            </p>

            {/* Collection Purchase Card */}
            <div className="b-hero-buy-card">
              <div className="b-buy-card-header">
                <div className="b-buy-card-title">Complete 4-Volume Set</div>
                <div className="b-price-stack">
                  <span className="b-main-price">₹12,999</span>
                  <span className="b-old-price">₹14,999</span>
                  <span className="b-save-badge">SAVE 13%</span>
                </div>
              </div>

              <div className="b-hero-ctas">
                <button onClick={() => addToCart('bundle')} className="btn-gold-primary">
                  BUY THE COMPLETE SET →
                </button>
                <button onClick={() => setActiveView('preview')} className="btn-ghost-sec">
                  <span>Preview &amp; Topics</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="b-trust-row">
                <div className="b-trust-item">
                  <svg className="b-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span>Free India Shipping</span>
                </div>
                <div className="b-trust-item">
                  <svg className="b-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0110 0v4"></path>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="b-trust-item">
                  <svg className="b-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Direct from Author</span>
                </div>
              </div>
            </div>

            {/* Laurel Wreath Trust Badge */}
            <div className="b-hero-laurel-card">
              <div className="b-laurel-icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21a9 9 0 0 0 9-9c0-2.38-.93-4.54-2.44-6.14M12 21a9 9 0 0 1-9-9c0-2.38.93-4.54 2.44-6.14"></path>
                  <path d="M7.5 7.5a6 6 0 0 1 9 0"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <div className="b-laurel-text">
                Trusted by Clinical Research Professionals, Regulatory Experts &amp; Medical Device Innovators in <strong>100+ Countries</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           2. SLIM STATISTICS STRIP
           ══════════════════════════════════════ */}
      <section className="b-stats-strip">
        <div className="b-container">
          <div className="b-stats-grid">
            
            <div className="b-stat-card">
              <div className="b-stat-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div className="b-stat-info">
                <div className="b-stat-num">4</div>
                <div className="b-stat-label">VOLUMES</div>
              </div>
            </div>

            <div className="b-stat-card">
              <div className="b-stat-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="b-stat-info">
                <div className="b-stat-num">40</div>
                <div className="b-stat-label">CHAPTERS</div>
              </div>
            </div>

            <div className="b-stat-card">
              <div className="b-stat-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="b-stat-info">
                <div className="b-stat-num">8</div>
                <div className="b-stat-label">SECTIONS</div>
              </div>
            </div>

            <div className="b-stat-card">
              <div className="b-stat-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="b-stat-info">
                <div className="b-stat-num">100+</div>
                <div className="b-stat-label">COUNTRIES</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           3. BOOK COLLECTION SECTION (WARM IVORY SURFACE)
           ══════════════════════════════════════ */}
      <section className="b-collection-sec sec-padding" id="volumes">
        <div className="b-container">
          
          <div className="b-sec-head-ivory">
            <h2 className="serif-title">Choose the Complete Set — or Start with One Volume</h2>
            <div className="b-recommend-banner">
              <span className="banner-star">★</span>
              <span><strong>BEST VALUE:</strong> The Complete 4-Volume Set offers the best price, full continuity, and lifetime updates.</span>
            </div>
          </div>

          <div className="b-product-grid">
            
            {/* Volume I Card */}
            <div className="b-vol-product-card">
              <div>
                <div className="b-card-img-wrap">
                  <img src="/v1_nobg.png" alt="Volume I: Foundations & Regulatory Landscape" />
                </div>
                <div className="b-card-vol-tag">VOLUME I</div>
                <h3 className="b-card-title">Foundations &amp; Regulatory Landscape</h3>
                <p className="b-card-desc">
                  Core principles, FDA &amp; EU MDR, risk classification, and global regulatory pathways.
                </p>
              </div>
              <div className="b-card-footer">
                <div className="b-card-price-row">
                  <span className="b-card-price">₹3,499</span>
                </div>
                <button onClick={() => addToCart('vol1')} className="btn-card-gold">BUY VOLUME I</button>
              </div>
            </div>

            {/* Volume II Card */}
            <div className="b-vol-product-card">
              <div>
                <div className="b-card-img-wrap">
                  <img src="/v2_nobg.png" alt="Volume II: Safety, Performance & Clinical Evidence" />
                </div>
                <div className="b-card-vol-tag">VOLUME II</div>
                <h3 className="b-card-title">Safety, Performance &amp; Clinical Evidence</h3>
                <p className="b-card-desc">
                  Study design, endpoint strategy, biostatistics, and evidence generation.
                </p>
              </div>
              <div className="b-card-footer">
                <div className="b-card-price-row">
                  <span className="b-card-price">₹3,499</span>
                </div>
                <button onClick={() => addToCart('vol2')} className="btn-card-gold">BUY VOLUME II</button>
              </div>
            </div>

            {/* Volume III Card */}
            <div className="b-vol-product-card">
              <div>
                <div className="b-card-img-wrap">
                  <img src="/v3_nobg.png" alt="Volume III: Clinical Investigation & Operations" />
                </div>
                <div className="b-card-vol-tag">VOLUME III</div>
                <h3 className="b-card-title">Clinical Investigation &amp; Operations</h3>
                <p className="b-card-desc">
                  Trial management, monitoring, site oversight, and data integrity.
                </p>
              </div>
              <div className="b-card-footer">
                <div className="b-card-price-row">
                  <span className="b-card-price">₹3,499</span>
                </div>
                <button onClick={() => addToCart('vol3')} className="btn-card-gold">BUY VOLUME III</button>
              </div>
            </div>

            {/* Volume IV Card */}
            <div className="b-vol-product-card">
              <div>
                <div className="b-card-img-wrap">
                  <img src="/v4_nobg.png" alt="Volume IV: Clinical Affairs & Emerging Applications" />
                </div>
                <div className="b-card-vol-tag">VOLUME IV</div>
                <h3 className="b-card-title">Clinical Affairs &amp; Emerging Applications</h3>
                <p className="b-card-desc">
                  Post-market surveillance, real-world evidence, AI/ML, and future frontiers.
                </p>
              </div>
              <div className="b-card-footer">
                <div className="b-card-price-row">
                  <span className="b-card-price">₹3,499</span>
                </div>
                <button onClick={() => addToCart('vol4')} className="btn-card-gold">BUY VOLUME IV</button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           4. WHY THIS COLLECTION MATTERS (DARK NAVY)
           ══════════════════════════════════════ */}
      <section className="b-why-sec sec-padding">
        <div className="b-container">
          
          <div className="b-sec-head-dark">
            <span className="b-sec-eyebrow-dark">WHY THIS REFERENCE MATTERS</span>
            <h2 className="serif-title">Scientific Authority &amp; Strategic Impact</h2>
          </div>

          <div className="b-why-grid-3">
            
            <div className="b-why-val-card">
              <div className="b-why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 12c-2-2.3-5-4-8-4a6 6 0 0 0 0 12c3 0 6-1.7 8-4m0 0c2 2.3 5 4 8 4a6 6 0 0 0 0-12c-3 0-6 1.7-8 4z" />
                </svg>
              </div>
              <h3 className="b-why-card-title">Evidence as a Continuum</h3>
              <p className="b-why-card-desc">
                Connect first-in-human study to post-market vigilance in one integrated framework for stronger, smarter decisions.
              </p>
            </div>

            <div className="b-why-val-card">
              <div className="b-why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="b-why-card-title">Beyond the Randomized Trial</h3>
              <p className="b-why-card-desc">
                Practical methods for single-arm, real-world, and adaptive designs — when RCTs aren't feasible or appropriate.
              </p>
            </div>

            <div className="b-why-val-card">
              <div className="b-why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className="b-why-card-title">What Enough Evidence Really Means</h3>
              <p className="b-why-card-desc">
                Navigate standards across 100+ regulatory jurisdictions with clarity, consistency, and confidence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           5. WHO IT'S FOR SECTION (DARK NAVY)
           ══════════════════════════════════════ */}
      <section className="b-aud-sec sec-padding">
        <div className="b-container">
          
          <div className="b-sec-head-dark">
            <span className="b-sec-eyebrow-dark">WHO IT'S FOR</span>
            <h2 className="serif-title">Designed for Global MedTech Leaders</h2>
          </div>

          <div className="b-aud-horizontal-grid">
            
            <div className="b-aud-item">
              <div className="b-aud-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="b-aud-title">Clinical Research Professionals</h3>
              <p className="b-aud-desc">Design, run, and deliver high-quality device trials.</p>
            </div>

            <div className="b-aud-item">
              <div className="b-aud-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="b-aud-title">Regulatory Affairs Experts</h3>
              <p className="b-aud-desc">Build stronger submissions aligned with global standards.</p>
            </div>

            <div className="b-aud-item">
              <div className="b-aud-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className="b-aud-title">Medical Device Engineers</h3>
              <p className="b-aud-desc">Bridge engineering, usability, and clinical performance.</p>
            </div>

            <div className="b-aud-item">
              <div className="b-aud-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="b-aud-title">Researchers &amp; Students</h3>
              <p className="b-aud-desc">Learn the full lifecycle of device evidence generation.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           6. FOUR-PART JOURNEY SECTION (DARK NAVY)
           ══════════════════════════════════════ */}
      <section className="b-journey-sec sec-padding">
        <div className="b-container">
          
          <div className="b-sec-head-dark">
            <span className="b-sec-eyebrow-dark" style={{ marginBottom: '0.25rem' }}>FOUR PARTS. ONE COMPLETE JOURNEY.</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary-dark)', marginTop: '0.35rem' }}>A structured path from fundamentals to future-ready clinical research.</p>
          </div>

          <div className="b-journey-steps-grid">
            
            {/* Step 1 */}
            <div className="b-journey-step-card">
              <div className="b-journey-step-tag">PART I</div>
              <h3 className="b-journey-step-title">Foundations &amp; Regulatory Pathways</h3>
              <p className="b-journey-step-desc">
                Understand global regulations, risk classification, and quality systems that underpin every clinical program.
              </p>
              <div className="b-journey-arrow">›</div>
            </div>

            {/* Step 2 */}
            <div className="b-journey-step-card">
              <div className="b-journey-step-tag">PART II</div>
              <h3 className="b-journey-step-title">Study Design &amp; Evidence Generation</h3>
              <p className="b-journey-step-desc">
                Plan robust studies, select the right endpoints, and apply biostatistics with confidence.
              </p>
              <div className="b-journey-arrow">›</div>
            </div>

            {/* Step 3 */}
            <div className="b-journey-step-card">
              <div className="b-journey-step-tag">PART III</div>
              <h3 className="b-journey-step-title">Clinical Operations &amp; Data Integrity</h3>
              <p className="b-journey-step-desc">
                Execute trials efficiently with monitoring, data management, and safety oversight.
              </p>
              <div className="b-journey-arrow">›</div>
            </div>

            {/* Step 4 */}
            <div className="b-journey-step-card">
              <div className="b-journey-step-tag">PART IV</div>
              <h3 className="b-journey-step-title">Post-Market &amp; Future Frontiers</h3>
              <p className="b-journey-step-desc">
                Leverage real-world evidence, AI/ML, and emerging methods to stay ahead.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           7. AUTHOR & ENDORSEMENT SECTION (DARK NAVY)
           ══════════════════════════════════════ */}
      <section className="b-author-sec sec-padding">
        <div className="b-container">
          
          <div className="b-author-endorse-grid">
            
            {/* Author Profile Card */}
            <div className="b-author-card">
              <div className="b-author-top">
                <div className="b-author-img-frame">
                  <img src="/author_dr_ashish_indani.png" alt="Dr. Ashish Indani" />
                </div>
                <div className="b-author-info">
                  <span className="b-author-eyebrow">ABOUT THE AUTHOR</span>
                  <h3 className="b-author-name">Dr. Ashish Indani</h3>
                  <p className="b-author-headline">
                    General Manager, Zydus MedTech • Independent Director • Author • TEDx Speaker
                  </p>
                </div>
              </div>

              <ul className="b-author-bullets">
                <li>
                  <span className="b-bullet-badge">✓</span>
                  <span><strong>25+ years</strong> in clinical medicine, regulatory science &amp; medical technologies.</span>
                </li>
                <li>
                  <span className="b-bullet-badge">✓</span>
                  <span><strong>Formerly GM &amp; Clinical Affairs (AIMI)</strong>, Sr Manager of Clinical Affairs (Stryker).</span>
                </li>
                <li>
                  <span className="b-bullet-badge">✓</span>
                  <span>Global leader in research, innovation &amp; strategic consultancy for global healthcare.</span>
                </li>
              </ul>
            </div>

            {/* Testimonial Quote Card */}
            <div className="b-endorse-card">
              <div>
                <div className="b-quote-mark">“</div>
                <p className="b-endorse-quote">
                  Dr. Ashish Indani has assembled an industry-first knowledge, filling a long-standing gap in the literature where medical device clinical research was traditionally dependent on empirical, 'as-you-go-fed' methodologies.
                </p>
              </div>

              <div className="b-endorse-author">
                <div>
                  <div className="b-endorse-author-name">Kritika Sharma (IAS)</div>
                  <div className="b-endorse-author-title">Managing Director &amp; CEO, UP Promote Pharma Council</div>
                </div>
                <button onClick={() => setActiveView('reviews')} className="b-endorse-link">
                  <span>VIEW FULL ENDORSEMENTS</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           8. FAQ ACCORDION SECTION (DARK NAVY)
           ══════════════════════════════════════ */}
      <section className="b-faq-sec sec-padding" id="faq">
        <div className="b-container">
          
          <div className="b-sec-head-dark">
            <span className="b-sec-eyebrow-dark">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="serif-title">Everything You Need to Know</h2>
          </div>

          <div className="b-faq-container">
            <div className="b-faq-accordion">
              {faqs.map((faq, i) => (
                <div key={i} className={`b-faq-item ${openFaq === i ? 'active' : ''}`}>
                  <button className="b-faq-btn" onClick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
                    <span>{faq.q}</span>
                    <span className="b-faq-icon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="b-faq-content" style={{ display: 'block' }}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="b-faq-contact-prompt">
              Still have questions? Contact us at <a href="mailto:ashish@advanceresearchteck.com">ashish@advanceresearchteck.com</a>
            </div>
          </div>

          {/* Institutional Order Form Box matching books.html */}
          <div className="b-institutional-box" id="order" style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem auto' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                University &amp; Institutional Bulk Orders
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary-dark)' }}>
                Request bulk invoice, corporate training license, or academic library procurement for your organization.
              </p>
            </div>

            {bulkSubmitted ? (
              <div style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid #2ecc71', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: '#2ecc71' }}>
                ✓ Thank you! Your bulk procurement request has been received. Our team will contact you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit}>
                <div className="b-form-grid">
                  <div>
                    <label className="a-label">Institution / Organization Name</label>
                    <input type="text" className="b-input" placeholder="e.g. AIIMS / Stryker / Medtronic" required />
                  </div>
                  <div>
                    <label className="a-label">Contact Person Email</label>
                    <input type="email" className="b-input" placeholder="procurement@organization.com" required />
                  </div>
                  <div>
                    <label className="a-label">Required Quantity</label>
                    <select className="b-select">
                      <option>5 - 10 Sets (Small Department)</option>
                      <option>11 - 25 Sets (Corporate / Faculty)</option>
                      <option>25+ Sets (Institutional Bulk)</option>
                    </select>
                  </div>
                  <div>
                    <label className="a-label">Delivery Location / State</label>
                    <input type="text" className="b-input" placeholder="e.g. New Delhi / Mumbai / USA" required />
                  </div>
                  <div className="full">
                    <label className="a-label">Additional Procurement Notes</label>
                    <textarea className="b-textarea" rows={3} placeholder="Specify purchase order details or delivery timelines..."></textarea>
                  </div>
                  <div className="full" style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button type="submit" className="btn-gold-primary" style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
                      SUBMIT BULK PROCUREMENT REQUEST →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
