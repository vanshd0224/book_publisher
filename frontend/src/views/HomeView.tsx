import React, { useState, useEffect } from 'react';
import { ActiveView } from '../types';
import { useCart } from '../context/CartContext';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
  const { addToCart } = useCart();
  const [activeSpecimen, setActiveSpecimen] = useState<'risk' | 'divergence' | 'samd' | 'cer'>('risk');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    
    const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll('.s-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 16);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.v-card') as NodeListOf<HTMLElement>;
    
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / centerY * -8;
      const tiltY = (x - centerX) / centerX * 8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px) translateY(-8px)`;
      card.style.boxShadow = `${-tiltY * 2}px ${-tiltX * 2}px 40px rgba(0,0,0,0.25), 0 20px 50px rgba(0,0,0,0.15)`;
    };
    
    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = '';
      card.style.boxShadow = '';
    };
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });
    
    return () => {
      cards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

  const specimens = {
    risk: {
      left: 'VOL II · SECTION 4.1',
      right: 'ISO 14971:2019 COMPLIANCE',
      kicker: 'Device Risk Integration Protocol',
      title: 'ISO 14971 Risk-Benefit Determination in CIP Design',
      lead: 'Clinical risk management cannot remain an isolated post-design activity. Pre-clinical FMEA failure modes must directly map to Clinical Investigation Plan safety endpoints.',
      diagramTitle: 'Evidence Mitigation Pipeline',
      steps: ['Hazard Analysis (FMEA)', 'CIP Safety Endpoints', 'Residual Benefit-Risk'],
      quote: 'Core Rule: Measurable Clinical Benefit must mathematically outweigh the combination of baseline physiological risk and device-specific failure probabilities.',
      page: 'Page 148'
    },
    divergence: {
      left: 'VOL I · SECTION 1.3',
      right: 'METHODOLOGICAL DIVERGENCE',
      kicker: 'Drug vs. Device Trial Architecture',
      title: 'Eliminating Pharmacological Bias in Medical Device Endpoints',
      lead: 'Medical device trials evaluate mechanical and physical interactions. Borrowing systemic pharmacokinetic models leads to protocol failure and regulatory rejection.',
      diagramTitle: 'Comparative Endpoint Structure',
      steps: ['Physical Mode of Action', 'Operator Learning Curve', 'Objective Performance Criteria'],
      quote: 'Principle: Device trials measure physical performance and usability safety rather than systemic receptor binding kinetics.',
      page: 'Page 42'
    },
    samd: {
      left: 'VOL IV · SECTION 2.4',
      right: 'IEC 62304 & GMLP STANDARDS',
      kicker: 'AI/ML Validation Framework',
      title: 'Good Machine Learning Practice (GMLP) in Clinical Algorithms',
      lead: 'Adaptive healthcare algorithms require predetermined change control plans (PCCP) and automated telemetry to catch clinical inference drift before patient harm occurs.',
      diagramTitle: 'Algorithmic Lifecycle Pipeline',
      steps: ['Training Provenance', 'Clinical Cohort Validation', 'Post-Market Drift Telemetry'],
      quote: 'Core Rule: An algorithm without continuous validation is a latent safety liability.',
      page: 'Page 210'
    },
    cer: {
      left: 'VOL II · SECTION 5.2',
      right: 'EU MDR 2017/745 ANNEX XIV',
      kicker: 'Clinical Evaluation Report (CER)',
      title: 'Methodological Equivalence & State of the Art (SOTA)',
      lead: 'Under EU MDR 2017/745, demonstrating equivalence demands clinical, technical, and biological parity. Without direct access to predicate technical files, independent clinical investigation is mandatory.',
      diagramTitle: 'CER Synthesis Pathway',
      steps: ['SOTA Benchmark', 'Equivalence Audit', 'PMCF Plan Mapping'],
      quote: 'Regulatory Mandate: Claims of substantial equivalence must be backed by full biological and technical conformity dossiers.',
      page: 'Page 284'
    }
  };

  const currentSpecimen = specimens[activeSpecimen];

  const handleBuyNow = (id: 'bundle' | 'vol1' | 'vol2' | 'vol3' | 'vol4') => {
    addToCart(id);
  };

  return (
    <>
      {/* ══════════════════════════════════════
           HERO SECTION (EXACT REPLICA WITH FULL BG IMAGE)
          ══════════════════════════════════════ */}
      <section className="hero" id="hero">
        {/* Full high-res 3D scene image background */}
        <img
          src="/hero_scene_bg.png"
          alt="Essentials of Medical Device Clinical Research 4-Volume Set Scene"
          className="hero-bg-img"
        />
        
        <div className="hero-overlay-gradient"></div>

        <div className="hero-container">
          <div className="hero-left">
            <p className="hero-eyebrow">THE DEFINITIVE 4-VOLUME REFERENCE</p>
            <h1 className="hero-title">
              <span className="t-white">Mastering</span>
              <span className="t-white">Medical Device</span>
              <span className="t-gold">Clinical Research</span>
            </h1>
            <p className="hero-desc">
              The most comprehensive resource for professionals driving innovation, safety, and excellence in medical devices.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => addToCart('bundle')} className="btn-hero-solid">
                ORDER COMPLETE SET →
              </button>
              <button onClick={() => setActiveView('books')} className="btn-hero-ghost">
                <span className="play-icon">▶</span> EXPLORE THE BOOKS PAGE
              </button>
            </div>

            <div className="hero-badges-row">
              <div className="h-badge">
                <svg className="h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="4" y="3" width="12" height="18" rx="1.5" strokeWidth="1.5" />
                  <rect x="8" y="3" width="12" height="18" rx="1.5" strokeWidth="1.5" />
                </svg>
                <div className="hb-text">
                  <strong>4</strong>
                  <span>VOLUMES</span>
                </div>
              </div>
              <div className="h-badge">
                <svg className="h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 6h16M4 10h16M4 14h10" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="hb-text">
                  <strong>2500+</strong>
                  <span>PAGES</span>
                </div>
              </div>
              <div className="h-badge">
                <svg className="h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                  <path d="M12 3a9 9 0 010 18M3 12h18" strokeWidth="1.5" />
                </svg>
                <div className="hb-text">
                  <strong>REAL WORLD</strong>
                  <span>CASE STUDIES</span>
                </div>
              </div>
              <div className="h-badge">
                <svg className="h-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                  <path d="M9 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="hb-text">
                  <strong>INTERNATIONAL</strong>
                  <span>STANDARDS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span className="hero-scroll-hint-text">SCROLL</span>
          <div className="hero-scroll-hint-line"></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           TRUST STRIP (INFINITE MARQUEE LOOP)
          ══════════════════════════════════════ */}
      <section className="trust-strip" aria-label="Trusted by leading organizations">
        <div className="trust-container">
          <p className="trust-title">TRUSTED BY LEADING ORGANISATIONS WORLDWIDE</p>
          <div className="trust-marquee-wrapper" tabIndex={0} role="region" aria-label="Partner Organizations Carousel">
            <div className="trust-marquee-track">
              
              {/* Marquee Group 1 */}
              <div className="trust-marquee-group">
                <div className="trust-pill logo-upppc">
                  <span className="trust-icon upppc-badge">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </span>
                  <span className="trust-name">UTTAR PRADESH PROMOTE PHARMA COUNCIL</span>
                </div>

                <div className="trust-pill logo-aimed">
                  <span className="trust-accent-dot aimed-dot"></span>
                  <span className="trust-name">AIMED</span>
                </div>

                <div className="trust-pill logo-mtai">
                  <span className="trust-symbol mtai-sym">◆</span>
                  <span className="trust-name">MTAI</span>
                </div>

                <div className="trust-pill logo-tenet">
                  <span className="trust-icon tenet-pulse">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </span>
                  <span className="trust-name">TENET HEALTH EDUTECH</span>
                </div>

                <div className="trust-pill logo-shrinks">
                  <span className="trust-icon shrinks-mark">✦</span>
                  <span className="trust-name">Corporate Shrinks</span>
                </div>

                <div className="trust-pill logo-visualboxx">
                  <span className="trust-icon boxx-mark">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </span>
                  <span className="trust-name">Visual Boxx</span>
                </div>

                <div className="trust-pill logo-upppc">
                  <span className="trust-icon upppc-badge">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </span>
                  <span className="trust-name">UTTAR PRADESH PROMOTE PHARMA COUNCIL</span>
                </div>

                <div className="trust-pill logo-aimed">
                  <span className="trust-accent-dot aimed-dot"></span>
                  <span className="trust-name">AIMED</span>
                </div>

                <div className="trust-pill logo-mtai">
                  <span className="trust-symbol mtai-sym">◆</span>
                  <span className="trust-name">MTAI</span>
                </div>

                <div className="trust-pill logo-tenet">
                  <span className="trust-icon tenet-pulse">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </span>
                  <span className="trust-name">TENET HEALTH EDUTECH</span>
                </div>

                <div className="trust-pill logo-shrinks">
                  <span className="trust-icon shrinks-mark">✦</span>
                  <span className="trust-name">Corporate Shrinks</span>
                </div>

                <div className="trust-pill logo-visualboxx">
                  <span className="trust-icon boxx-mark">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </span>
                  <span className="trust-name">Visual Boxx</span>
                </div>
              </div>

              {/* Marquee Group 2 (Exact Duplicate for Seamless Continuous Looping) */}
              <div className="trust-marquee-group" aria-hidden="true">
                <div className="trust-pill logo-upppc">
                  <span className="trust-icon upppc-badge">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </span>
                  <span className="trust-name">UTTAR PRADESH PROMOTE PHARMA COUNCIL</span>
                </div>

                <div className="trust-pill logo-aimed">
                  <span className="trust-accent-dot aimed-dot"></span>
                  <span className="trust-name">AIMED</span>
                </div>

                <div className="trust-pill logo-mtai">
                  <span className="trust-symbol mtai-sym">◆</span>
                  <span className="trust-name">MTAI</span>
                </div>

                <div className="trust-pill logo-tenet">
                  <span className="trust-icon tenet-pulse">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </span>
                  <span className="trust-name">TENET HEALTH EDUTECH</span>
                </div>

                <div className="trust-pill logo-shrinks">
                  <span className="trust-icon shrinks-mark">✦</span>
                  <span className="trust-name">Corporate Shrinks</span>
                </div>

                <div className="trust-pill logo-visualboxx">
                  <span className="trust-icon boxx-mark">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </span>
                  <span className="trust-name">Visual Boxx</span>
                </div>

                <div className="trust-pill logo-upppc">
                  <span className="trust-icon upppc-badge">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </span>
                  <span className="trust-name">UTTAR PRADESH PROMOTE PHARMA COUNCIL</span>
                </div>

                <div className="trust-pill logo-aimed">
                  <span className="trust-accent-dot aimed-dot"></span>
                  <span className="trust-name">AIMED</span>
                </div>

                <div className="trust-pill logo-mtai">
                  <span className="trust-symbol mtai-sym">◆</span>
                  <span className="trust-name">MTAI</span>
                </div>

                <div className="trust-pill logo-tenet">
                  <span className="trust-icon tenet-pulse">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </span>
                  <span className="trust-name">TENET HEALTH EDUTECH</span>
                </div>

                <div className="trust-pill logo-shrinks">
                  <span className="trust-icon shrinks-mark">✦</span>
                  <span className="trust-name">Corporate Shrinks</span>
                </div>

                <div className="trust-pill logo-visualboxx">
                  <span className="trust-icon boxx-mark">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </span>
                  <span className="trust-name">Visual Boxx</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           ABOUT THE AUTHOR
          ══════════════════════════════════════ */}
      <section className="author-section reveal-up" id="author-preview">
        <div className="author-container reveal-up">
          
          {/* Photo Box */}
          <div className="author-photo-box">
            <div className="photo-card">
              <img src="/author_photo_hd.jpg" alt="Dr. Ashish Indani" className="author-portrait-img" />
            </div>
            <div className="author-signature">Ashish Indani</div>
          </div>

          {/* Bio Box */}
          <div className="author-bio-box">
            <p className="section-eyebrow">ABOUT THE AUTHOR</p>
            <h2 className="author-name">Dr. Ashish Indani</h2>
            <p className="author-subtitle">One of India's most respected voices in Medical Device Clinical Research.</p>

            <div className="author-metrics-grid">
              <div className="am-item">
                <svg className="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
                  <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" strokeWidth="1.5" />
                </svg>
                <div className="am-val">20+</div>
                <div className="am-lbl">Years of<br />Experience</div>
              </div>
              <div className="am-item">
                <svg className="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                  <path d="M8 12h8M12 8v8" strokeWidth="1.5" />
                </svg>
                <div className="am-val">Global</div>
                <div className="am-lbl">Speaker</div>
              </div>
              <div className="am-item">
                <svg className="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.5" />
                </svg>
                <div className="am-val">Research</div>
                <div className="am-lbl">Mentor</div>
              </div>
              <div className="am-item">
                <svg className="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11l3 3L22 4" strokeWidth="1.5" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="1.5" />
                </svg>
                <div className="am-val">Industry</div>
                <div className="am-lbl">Advisor</div>
              </div>
              <div className="am-item">
                <svg className="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="1.5" />
                  <circle cx="9" cy="7" r="4" strokeWidth="1.5" />
                </svg>
                <div className="am-val">Trainer to</div>
                <div className="am-lbl">Thousands</div>
              </div>
            </div>

            <p className="author-bio-text">
              With over two decades of experience across Zydus MedTech, AMS, Stryker, and TCS, Dr. Indani has been at the forefront of advancing clinical research standards in the medical device industry.
            </p>

            <button onClick={() => setActiveView('about')} className="btn-author-more">
              VISIT OFFICIAL ABOUT AUTHOR PAGE →
            </button>
          </div>

          {/* Timeline Box */}
          <div className="author-timeline-box">
            <div className="timeline-list">
              <div className="tl-row">
                <div className="tl-dot"></div>
                <div className="tl-info">
                  <span className="tl-year">2016 – 2021</span>
                  <span className="tl-desc">Principal Scientist &amp; Head R&amp;I, TCS</span>
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-dot"></div>
                <div className="tl-info">
                  <span className="tl-year">2021 – 2025</span>
                  <span className="tl-desc">Senior Manager Clinical Affairs, Stryker</span>
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-dot"></div>
                <div className="tl-info">
                  <span className="tl-year">2025</span>
                  <span className="tl-desc">GM Clinical &amp; Medical Affairs, AMS</span>
                </div>
              </div>
              <div className="tl-row">
                <div className="tl-dot"></div>
                <div className="tl-info">
                  <span className="tl-year">PRESENT</span>
                  <span className="tl-desc">General Manager - MedTech, Zydus MedTech</span>
                </div>
              </div>
              <div className="tl-row tl-highlight">
                <div className="tl-dot tl-gold-dot"></div>
                <div className="tl-info">
                  <span className="tl-year tl-gold-year">2026</span>
                  <span className="tl-desc tl-gold-desc">Author: Complete 4-Volume Reference Collection</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           FOUR VOLUMES SECTION
          ══════════════════════════════════════ */}
      <section className="volumes-section" id="volumes">
        <div className="volumes-container">
          
          <div className="volumes-header">
            <div>
              <p className="section-eyebrow">THE COMPLETE COLLECTION</p>
              <h2 className="volumes-main-title">Four Volumes. Infinite Knowledge.</h2>
            </div>
            <button onClick={() => setActiveView('books')} className="btn-comparison">
              EXPLORE FULL BOOKS PAGE →
            </button>
          </div>

          <div className="volumes-grid-4 reveal-up stagger">
            
            {/* Vol 1 */}
            <div className="v-card">
              <div className="v-card-num">01</div>
              <div className="v-card-img-wrap">
                <img src="/v1_nobg.png" alt="Volume I Cover - Foundations" className="v-cover-img" />
              </div>
              <div className="v-card-body">
                <span className="v-label">VOLUME I</span>
                <h3 className="v-title">Foundations &amp; Regulatory Pathways</h3>
                <p className="v-text">Core principles, FDA 510(k)/PMA, EU MDR 2017/745, study design &amp; pre-clinical stages.</p>
                <button onClick={() => setActiveView('books')} className="v-link">
                  EXPLORE VOLUME I DETAILS →
                </button>
              </div>
              <div className="v-card-hover-actions">
                <button className="v-card-add-btn" onClick={() => handleBuyNow('vol1')}>
                  ADD TO CART →
                </button>
              </div>
            </div>

            {/* Vol 2 */}
            <div className="v-card">
              <div className="v-card-num">02</div>
              <div className="v-card-img-wrap">
                <img src="/v2_nobg.png" alt="Volume II Cover - Clinical Operations" className="v-cover-img" />
              </div>
              <div className="v-card-body">
                <span className="v-label">VOLUME II</span>
                <h3 className="v-title">Scientific Core &amp; Risk Management</h3>
                <p className="v-text">Medical writing, ISO 14971 risk management, ISO 14155 GCP &amp; CER compilation.</p>
                <button onClick={() => setActiveView('books')} className="v-link">
                  EXPLORE VOLUME II DETAILS →
                </button>
              </div>
              <div className="v-card-hover-actions">
                <button className="v-card-add-btn" onClick={() => handleBuyNow('vol2')}>
                  ADD TO CART →
                </button>
              </div>
            </div>

            {/* Vol 3 */}
            <div className="v-card">
              <div className="v-card-num">03</div>
              <div className="v-card-img-wrap">
                <img src="/v3_nobg.png" alt="Volume III Cover - Regulatory &amp; Compliance" className="v-cover-img" />
              </div>
              <div className="v-card-body">
                <span className="v-label">VOLUME III</span>
                <h3 className="v-title">Data Management &amp; Biostatistics</h3>
                <p className="v-text">Device EDC, MedDRA coding, FDA Device Problem Codes, materiovigilance &amp; statistics.</p>
                <button onClick={() => setActiveView('books')} className="v-link">
                  EXPLORE VOLUME III DETAILS →
                </button>
              </div>
              <div className="v-card-hover-actions">
                <button className="v-card-add-btn" onClick={() => handleBuyNow('vol3')}>
                  ADD TO CART →
                </button>
              </div>
            </div>

            {/* Vol 4 */}
            <div className="v-card">
              <div className="v-card-num">04</div>
              <div className="v-card-img-wrap">
                <img src="/v4_nobg.png" alt="Volume IV Cover - Advanced Topics" className="v-cover-img" />
              </div>
              <div className="v-card-body">
                <span className="v-label">VOLUME IV</span>
                <h3 className="v-title">Software, AI &amp; Post-Market Evidence</h3>
                <p className="v-text">SaMD, SiMD, ISO 62304 / 63204 SDLC, diagnostic devices, IVDR &amp; PMCF evidence.</p>
                <button onClick={() => setActiveView('books')} className="v-link">
                  EXPLORE VOLUME IV DETAILS →
                </button>
              </div>
              <div className="v-card-hover-actions">
                <button className="v-card-add-btn" onClick={() => handleBuyNow('vol4')}>
                  ADD TO CART →
                </button>
              </div>
            </div>

          </div>

          {/* Prominent Dedicated Books Page CTA Banner */}
          <div style={{ textAlign: 'center', marginTop: '3rem', background: 'rgba(8,18,30,0.8)', border: '1px solid rgba(199,154,86,0.3)', borderRadius: '14px', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.5rem' }}>Want to Learn More About Each Volume?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Visit our dedicated Books Masterwork page for chapter-by-chapter topics, target audience guides, and direct discounts.</p>
            <button onClick={() => setActiveView('books')} className="btn-hero-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>OPEN DEDICATED BOOKS PAGE</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           STATS STRIP
          ══════════════════════════════════════ */}
      <section className="stats-strip">
        <div className="stats-container reveal-up">
          <div className="s-box">
            <div className="s-number" data-target="20" data-suffix="+">20+</div>
            <div className="s-label">YEARS OF EXPERIENCE</div>
          </div>
          <div className="s-divider"></div>
          <div className="s-box">
            <div className="s-number" data-target="5000" data-suffix="+">5000+</div>
            <div className="s-label">PROFESSIONALS TRAINED</div>
          </div>
          <div className="s-divider"></div>
          <div className="s-box">
            <div className="s-number" data-target="4">4</div>
            <div className="s-label">COMPREHENSIVE VOLUMES</div>
          </div>
          <div className="s-divider"></div>
          <div className="s-box">
            <div className="s-number" data-target="100" data-suffix="+">100+</div>
            <div className="s-label">INDUSTRY TOPICS COVERED</div>
          </div>
          <div className="s-divider"></div>
          <div className="s-box">
            <div className="s-number" data-target="25" data-suffix="+">25+</div>
            <div className="s-label">COUNTRIES IMPACTED</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           CLINICAL INTELLIGENCE ECOSYSTEM SHOWCASE (3-COLUMN MASTERPIECE)
          ══════════════════════════════════════ */}
      <section className="three-col-block showcase-master-sec" id="preview">
        <div className="showcase-master-container">
          
          {/* Grand Section Framing */}
          <div className="showcase-sec-header reveal-up">
            <div className="showcase-eyebrow-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
              </svg>
              <span>EXECUTIVE KNOWLEDGE SUITE</span>
            </div>
            <h2 className="showcase-sec-title">
              The Architecture of <span className="italic-gold">Medical Device Evidence</span>
            </h2>
            <p className="showcase-sec-subtitle">
              Bridging the fundamental divide between pharmaceutical retrofitting and true device-centric clinical science across 100+ global regulatory jurisdictions.
            </p>
          </div>

          {/* 3-Column Luxury Matrix */}
          <div className="showcase-grid-3">
            
            {/* ─── COLUMN 1: 4 MASTERWORK PILLARS ─── */}
            <div className="showcase-col showcase-pillars-col">
              <div className="showcase-col-head">
                <div className="showcase-col-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Curriculum Pillars</span>
                </div>
                <span className="showcase-col-badge">4 Volumes · 60+ Ch</span>
              </div>

              <div className="pillars-list">
                {/* Vol 1 */}
                <button onClick={() => setActiveView('preview')} className="pillar-card" style={{ width: '100%', textAlign: 'left' }}>
                  <div className="pillar-card-top">
                    <span className="pillar-vol-pill">Volume I</span>
                    <span className="pillar-arrow">→</span>
                  </div>
                  <div className="pillar-title">Global Regulatory Pathways</div>
                  <p className="pillar-desc">FDA 510(k), PMA, De Novo &amp; EU MDR 2017/745 classification matrices.</p>
                  <div className="pillar-chips">
                    <span className="p-chip">FDA 21 CFR</span>
                    <span className="p-chip">EU MDR Art 61</span>
                    <span className="p-chip">ISO 13485</span>
                  </div>
                </button>

                {/* Vol 2 */}
                <button onClick={() => setActiveView('preview')} className="pillar-card" style={{ width: '100%', textAlign: 'left' }}>
                  <div className="pillar-card-top">
                    <span className="pillar-vol-pill">Volume II</span>
                    <span className="pillar-arrow">→</span>
                  </div>
                  <div className="pillar-title">Protocol Design &amp; ISO 14971 Risk</div>
                  <p className="pillar-desc">ISO 14155 CIP engineering, FMEA hazard control &amp; 4-stage CER architecture.</p>
                  <div className="pillar-chips">
                    <span className="p-chip">ISO 14155:2020</span>
                    <span className="p-chip">ISO 14971</span>
                    <span className="p-chip">MEDDEV 2.7/1</span>
                  </div>
                </button>

                {/* Vol 3 */}
                <button onClick={() => setActiveView('preview')} className="pillar-card" style={{ width: '100%', textAlign: 'left' }}>
                  <div className="pillar-card-top">
                    <span className="pillar-vol-pill">Volume III</span>
                    <span className="pillar-arrow">→</span>
                  </div>
                  <div className="pillar-title">Clinical Operations &amp; Biostatistics</div>
                  <p className="pillar-desc">Device CDM, CDISC standards, non-inferiority trials &amp; materiovigilance.</p>
                  <div className="pillar-chips">
                    <span className="p-chip">CDISC SDTM</span>
                    <span className="p-chip">Non-Inferiority</span>
                    <span className="p-chip">FDA MedWatch</span>
                  </div>
                </button>

                {/* Vol 4 */}
                <button onClick={() => setActiveView('preview')} className="pillar-card" style={{ width: '100%', textAlign: 'left' }}>
                  <div className="pillar-card-top">
                    <span className="pillar-vol-pill">Volume IV</span>
                    <span className="pillar-arrow">→</span>
                  </div>
                  <div className="pillar-title">SaMD, AI Validation &amp; Post-Market</div>
                  <p className="pillar-desc">IEC 62304 SDLC, Good Machine Learning Practice (GMLP) &amp; continuous PMCF.</p>
                  <div className="pillar-chips">
                    <span className="p-chip">IEC 62304</span>
                    <span className="p-chip">AI/ML GMLP</span>
                    <span className="p-chip">ISO 20916 IVD</span>
                  </div>
                </button>
              </div>

              <button onClick={() => setActiveView('preview')} className="btn-pillar-catalog">
                <span>EXPLORE FULL 60+ CHAPTER CATALOG</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* ─── COLUMN 2: INTERACTIVE OPEN MANUSCRIPT SIMULATOR ─── */}
            <div className="showcase-col showcase-manuscript-col">
              <div className="showcase-col-head">
                <div className="showcase-col-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>Live Manuscript Specimen</span>
                </div>
                <span className="showcase-col-badge">Interactive Spread</span>
              </div>

              <div className="manuscript-box-wrapper">
                {/* Top Interactive Switcher Tabs */}
                <div className="manuscript-tabs-nav" role="tablist">
                  <button
                    className={`m-tab-btn ${activeSpecimen === 'risk' ? 'active' : ''}`}
                    onClick={() => setActiveSpecimen('risk')}
                    role="tab"
                    aria-selected={activeSpecimen === 'risk'}
                  >
                    Risk Flow
                  </button>
                  <button
                    className={`m-tab-btn ${activeSpecimen === 'divergence' ? 'active' : ''}`}
                    onClick={() => setActiveSpecimen('divergence')}
                    role="tab"
                    aria-selected={activeSpecimen === 'divergence'}
                  >
                    Divergence
                  </button>
                  <button
                    className={`m-tab-btn ${activeSpecimen === 'samd' ? 'active' : ''}`}
                    onClick={() => setActiveSpecimen('samd')}
                    role="tab"
                    aria-selected={activeSpecimen === 'samd'}
                  >
                    SaMD &amp; AI
                  </button>
                  <button
                    className={`m-tab-btn ${activeSpecimen === 'cer' ? 'active' : ''}`}
                    onClick={() => setActiveSpecimen('cer')}
                    role="tab"
                    aria-selected={activeSpecimen === 'cer'}
                  >
                    CER Model
                  </button>
                </div>

                {/* Open Book Specimen Spread */}
                <div className="manuscript-open-spread" id="landingManuscriptSpread">
                  <div className="manuscript-top-strip">
                    <span id="landingSpecimenHeaderLeft">{currentSpecimen.left}</span>
                    <span id="landingSpecimenHeaderRight">{currentSpecimen.right}</span>
                  </div>

                  <div className="manuscript-body-content" id="landingManuscriptBody">
                    <div className="m-section-kicker" id="landingSpecimenKicker">{currentSpecimen.kicker}</div>
                    <h3 className="m-page-h3" id="landingSpecimenTitle">{currentSpecimen.title}</h3>
                    <p className="m-page-lead" id="landingSpecimenLead">
                      {currentSpecimen.lead}
                    </p>

                    <div className="m-visual-diagram-card" id="landingSpecimenDiagram">
                      <div className="m-diagram-title">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        <span>{currentSpecimen.diagramTitle}</span>
                      </div>
                      <div className="m-flow-row">
                        {currentSpecimen.steps.map((st, i) => (
                          <div key={i} className="m-flow-step">
                            <div className="m-step-num">Step 0{i + 1}</div>
                            <div className="m-step-text">{st}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="m-takeaway-quote" id="landingSpecimenQuote">
                      {currentSpecimen.quote}
                    </div>
                  </div>

                  <div className="manuscript-page-footer">
                    <span id="landingSpecimenFooterBook">Essentials of Medical Device Clinical Research</span>
                    <span id="landingSpecimenFooterPage">{currentSpecimen.page}</span>
                  </div>
                </div>

                <button onClick={() => setActiveView('preview')} className="btn-manuscript-explore">
                  <span>OPEN EXPANDED SAMPLE READER</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ─── COLUMN 3: EXECUTIVE & GOVERNMENT ACCLAIM ─── */}
            <div className="showcase-col showcase-acclaim-col">
              <div className="showcase-col-head">
                <div className="showcase-col-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15l-2 5l9-9l-9-9l2 5l-7 4z" />
                  </svg>
                  <span>Authoritative Acclaim</span>
                </div>
                <span className="showcase-col-badge">State &amp; Industry Acclaim</span>
              </div>

              <div className="acclaim-stack">
                {/* Government Endorsement Card */}
                <div className="govt-ias-card">
                  <div className="govt-seal-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Official Government Endorsement</span>
                  </div>
                  <p className="govt-quote-text">
                    "Dr. Indani’s work will substantially help manufacturers, regulators, and clinical researchers navigate medical device development and global regulatory compliance."
                  </p>
                  <div className="govt-sign-row">
                    <div className="govt-ias-avatar">IAS</div>
                    <div>
                      <div className="govt-name">Kritika Sharma, IAS</div>
                      <div className="govt-role">MD &amp; CEO, UP Promote Pharma Council (Govt of UP)</div>
                    </div>
                  </div>
                </div>

                {/* Executive Review 1: Sunil Pandita */}
                <div className="exec-review-card">
                  <div className="exec-stars-row">
                    <div className="exec-stars">★★★★★</div>
                    <span className="exec-verified">Verified Endorsement</span>
                  </div>
                  <p className="exec-quote">
                    "Dr. Indani’s books are enduring resources that strengthen the foundation of medical device research, bridging operational strategy and global policy."
                  </p>
                  <div className="exec-author-row">
                    <div className="exec-avatar">SP</div>
                    <div>
                      <div className="exec-name">Sunil Pandita</div>
                      <div className="exec-role">MedTech Thought Leader &amp; Industry Pioneer</div>
                    </div>
                  </div>
                </div>

                {/* Executive Review 2: Dr. Punit Srivastava */}
                <div className="exec-review-card">
                  <div className="exec-stars-row">
                    <div className="exec-stars">★★★★★</div>
                    <span className="exec-verified">Clinical Authority</span>
                  </div>
                  <p className="exec-quote">
                    "Bridges theoretical concepts with practical applications, making complex subjects accessible... A must-read for every investigator."
                  </p>
                  <div className="exec-author-row">
                    <div className="exec-avatar">PS</div>
                    <div>
                      <div className="exec-name">Dr. Punit Srivastava</div>
                      <div className="exec-role">Director, Mediception Science Pvt. Ltd.</div>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setActiveView('reviews')} className="btn-acclaim-all">
                <span>VIEW ALL EXECUTIVE REVIEWS (6+)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           DIRECT E-COMMERCE STORE SECTION
          ══════════════════════════════════════ */}
      <section className="order-section" id="order" style={{ padding: '6.5rem 2rem', background: '#03080e' }}>
        <div className="store-main-container" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <div className="b-sec-header">
            <div className="eyebrow">OFFICIAL AUTHOR STOREFRONT</div>
            <h2>Direct E-Commerce Store</h2>
            <p>Buy directly from the official store. Choose the flagship 4-Volume Set or purchase individual volumes separately.</p>
          </div>

          {/* Flagship Complete 4-Volume Box Set Card */}
          <div className="flagship-store-card">
            <div className="flagship-badge">FLAGSHIP SET · SAVE 13%</div>
            
            <div style={{ textAlign: 'center' }}>
              <img
                src="/order_books_pedestal_tight.png"
                alt="Essentials of Medical Device Clinical Research Complete 4-Volume Set"
                style={{ maxHeight: '280px', width: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))' }}
              />
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold-main)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                FLAGSHIP REFERENCE COLLECTION
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                Essentials of Medical Device Clinical Research (Complete 4-Volume Set)
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                The definitive multi-volume masterwork set covering Volumes I, II, III &amp; IV. Includes FDA 510(k)/PMA, EU MDR 2017/745, ISO 14155, ISO 14971, SaMD, AI algorithms &amp; biostatistics.
              </p>

              <div className="stock-in-indicator">
                <span className="stock-dot"></span>
                <span>In Stock — Ships Within 24 Hours (Free Express Shipping Across India)</span>
              </div>

              <div className="store-price-row">
                <span className="store-price-current">₹12,999</span>
                <span className="store-price-old">₹14,999</span>
                <span className="store-save-badge">SAVE ₹2,000</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button
                  className="btn-buy-now"
                  style={{ flex: '1.5', minWidth: '220px', fontSize: '0.95rem', padding: '1rem' }}
                  onClick={() => handleBuyNow('bundle')}
                >
                  BUY COMPLETE SET NOW (₹12,999) →
                </button>
                <button
                  className="btn-add-cart"
                  style={{ flex: 1, minWidth: '180px', fontSize: '0.9rem', padding: '1rem' }}
                  onClick={() => addToCart('bundle')}
                >
                  + ADD SET TO CART
                </button>
              </div>
            </div>
          </div>

          {/* Individual Volumes Shop Section */}
          <div style={{ marginTop: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold-main)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                INDIVIDUAL VOLUMES
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#ffffff' }}>
                Purchase Individual Volumes
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Select specific volumes tailored to your research focus area.
              </p>
            </div>

            <div className="store-grid-4">
              
              {/* Vol 1 Product */}
              <div className="store-prod-card">
                <div className="store-prod-img-box">
                  <img src="/v1_nobg.png" alt="Volume I" className="store-prod-img" />
                </div>
                <span className="store-prod-vol">VOLUME I</span>
                <h4 className="store-prod-title">Fundamentals &amp; Regulatory Pathways</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Device classification, intended purpose, US FDA 510(k)/PMA &amp; EU MDR 2017/745.
                </p>
                <div className="store-prod-price">₹3,499</div>
                <button className="btn-buy-now" onClick={() => handleBuyNow('vol1')}>BUY VOL I NOW →</button>
                <button className="btn-add-cart" onClick={() => addToCart('vol1')}>+ ADD TO CART</button>
              </div>

              {/* Vol 2 Product */}
              <div className="store-prod-card">
                <div className="store-prod-img-box">
                  <img src="/v2_nobg.png" alt="Volume II" className="store-prod-img" />
                </div>
                <span className="store-prod-vol">VOLUME II</span>
                <h4 className="store-prod-title">Scientific Core &amp; Risk Management</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  CIP medical writing, ISO 14971 risk analysis, ISO 14155 GCP &amp; CER reports.
                </p>
                <div className="store-prod-price">₹3,499</div>
                <button className="btn-buy-now" onClick={() => handleBuyNow('vol2')}>BUY VOL II NOW →</button>
                <button className="btn-add-cart" onClick={() => addToCart('vol2')}>+ ADD TO CART</button>
              </div>

              {/* Vol 3 Product */}
              <div className="store-prod-card">
                <div className="store-prod-img-box">
                  <img src="/v3_nobg.png" alt="Volume III" className="store-prod-img" />
                </div>
                <span className="store-prod-vol">VOLUME III</span>
                <h4 className="store-prod-title">Data Management &amp; Biostatistics</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  EDC systems, MedDRA &amp; FDA device problem coding, materiovigilance &amp; statistics.
                </p>
                <div className="store-prod-price">₹3,499</div>
                <button className="btn-buy-now" onClick={() => handleBuyNow('vol3')}>BUY VOL III NOW →</button>
                <button className="btn-add-cart" onClick={() => addToCart('vol3')}>+ ADD TO CART</button>
              </div>

              {/* Vol 4 Product */}
              <div className="store-prod-card">
                <div className="store-prod-img-box">
                  <img src="/v4_nobg.png" alt="Volume IV" className="store-prod-img" />
                </div>
                <span className="store-prod-vol">VOLUME IV</span>
                <h4 className="store-prod-title">Software, AI &amp; Post-Market Evidence</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  SaMD, SiMD, ISO 62304 SDLC, diagnostic devices, IVDR &amp; PMCF evidence.
                </p>
                <div className="store-prod-price">₹3,499</div>
                <button className="btn-buy-now" onClick={() => handleBuyNow('vol4')}>BUY VOL IV NOW →</button>
                <button className="btn-add-cart" onClick={() => addToCart('vol4')}>+ ADD TO CART</button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
};
