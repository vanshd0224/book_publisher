import React, { useState } from 'react';
import { ActiveView } from '../types';
import { useCart } from '../context/CartContext';

interface AboutViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveView }) => {
  const { addToCart } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleKeynoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="about-page-wrapper">
      {/* ══════════════════════════════════════
           HERO SECTION
          ══════════════════════════════════════ */}
      <section className="a-hero">
        <div className="a-hero-container">
          
          {/* Photo Card */}
          <div className="a-portrait-card">
            <img src="/author_photo_hd.jpg" alt="Dr. Ashish Indani" className="a-portrait-img"/>
            <div className="a-portrait-sign">Ashish Indani</div>
          </div>

          {/* Hero Bio Content */}
          <div className="a-hero-content">
            <div className="a-eyebrow">
              <svg className="a-eyebrow-icon" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
              GLOBAL MEDICAL &amp; REGULATORY VISIONARY
            </div>
            <h1 className="a-main-title">Dr. Ashish Indani</h1>
            <div className="a-tagline">General Manager, Zydus MedTech · Regd. Independent Director · Author · TEDx Speaker</div>
            
            <p className="a-lead-bio">
              For over <strong>25 years</strong>, Dr. Ashish Indani has stood at the paramount intersection of clinical medicine, regulatory science, and modern technology. Currently serving as <strong>General Manager - MedTech at Zydus MedTech</strong>, his career spans leadership roles as <strong>Managing Director at Krishnamugdha Advance ResearchTeck</strong>, <strong>GM of Clinical &amp; Medical Affairs at AMS</strong>, <strong>Senior Manager of Clinical Affairs at Stryker</strong> (where he built the department from scratch and grew the team by 1,700%), and <strong>Principal Scientist &amp; Head of Research &amp; Innovation at Tata Consultancy Services (TCS)</strong>.
            </p>

            <div className="a-chips-grid">
              <div className="a-chip">
                <svg className="a-chip-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                General Manager, Zydus MedTech
              </div>
              <div className="a-chip">
                <svg className="a-chip-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                MD, Krishnamugdha Advance ResearchTeck
              </div>
              <div className="a-chip">
                <svg className="a-chip-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Ex-Stryker Sr. Manager (1700% Team Growth)
              </div>
              <div className="a-chip">
                <svg className="a-chip-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Ex-TCS Head of Research &amp; Innovation (5.5+ Yrs)
              </div>
            </div>

            <div className="a-actions-row">
              <button onClick={() => addToCart('bundle')} className="btn-hero-solid">ORDER THE 4-VOLUME SET →</button>
              <a href="#keynote" className="btn-hero-ghost">BOOK KEYNOTE / ADVISORY</a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           METRICS BAR
          ══════════════════════════════════════ */}
      <section className="a-metrics-section">
        <div className="a-metrics-container">
          <div className="a-metric-card">
            <div className="a-metric-val">25+</div>
            <div className="a-metric-lbl">Years Experience</div>
          </div>
          <div className="a-metric-card">
            <div className="a-metric-val">1700%</div>
            <div className="a-metric-lbl">Stryker Dept Growth</div>
          </div>
          <div className="a-metric-card">
            <div className="a-metric-val">4 Vol</div>
            <div className="a-metric-lbl">Masterwork Collection</div>
          </div>
          <div className="a-metric-card">
            <div className="a-metric-val">30%</div>
            <div className="a-metric-lbl">Revenue Savings Achieved</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           MAIN CONTENT: TIMELINE & GOVT ENDORSEMENT
          ══════════════════════════════════════ */}
      <section className="a-content-section" id="milestones">
        <div className="a-sec-title">
          <div className="eyebrow">EXECUTIVE LEADERSHIP &amp; GOVT RECOGNITION</div>
          <h2>Distinguished Milestones &amp; Endorsement</h2>
        </div>

        <div className="a-two-col">
          
          {/* Executive Timeline */}
          <div className="a-card-box">
            <h3 className="a-box-h3">Career Trajectory &amp; Leadership (Official LinkedIn Profile)</h3>
            <div className="a-tl-list">
              
              <div className="a-tl-row">
                <span className="a-tl-badge active">DEC 2025 – PRES</span>
                <div className="a-tl-info">
                  <strong>General Manager - MedTech</strong>
                  <p>Zydus MedTech (Ahmedabad, Gujarat, India) — Leading medical technology strategy and operations.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge">SEP 2025 – DEC 2025</span>
                <div className="a-tl-info">
                  <strong>Managing Director</strong>
                  <p>Krishnamugdha Advance ResearchTeck Pvt. Ltd. — Executive strategic direction and research governance.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge">JAN 2025 – SEP 2025</span>
                <div className="a-tl-info">
                  <strong>General Manager Clinical and Medical Affairs</strong>
                  <p>Advanced MedTech Solutions (AMS) (Mumbai, India) — Directing global clinical trials, CERs &amp; regulatory submissions.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge">AUG 2021 – JAN 2025</span>
                <div className="a-tl-info">
                  <strong>Senior Manager Clinical Affairs</strong>
                  <p>Stryker (Gurugram, India) — Developed Clinical Research Dept from scratch, grew team to <strong>1700%</strong>, and achieved <strong>~30% revenue savings &amp; efficiency gains</strong>.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge">FEB 2016 – AUG 2021</span>
                <div className="a-tl-info">
                  <strong>Principal Scientist &amp; Head, Research &amp; Innovation</strong>
                  <p>Tata Consultancy Services (TCS) (5 yrs 7 mos) — ADD life sciences platforms, medical devices &amp; AI innovation.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge active">JUL 2024</span>
                <div className="a-tl-info">
                  <strong style={{ color: 'var(--gold-light)' }}>Pioneer Researcher Awardee (BlackBuck Award)</strong>
                  <p style={{ color: 'rgba(255,255,255,0.9)' }}>Honored at the Medical Research Summit for innovations in sensor diagnostics &amp; AI.</p>
                </div>
              </div>

              <div className="a-tl-row">
                <span className="a-tl-badge active">2026</span>
                <div className="a-tl-info">
                  <strong style={{ color: 'var(--gold-light)' }}>Author: Essentials of Medical Device Clinical Research</strong>
                  <p style={{ color: 'rgba(255,255,255,0.9)' }}>Landmark 4-volume reference publication defining global MedTech clinical standards.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Govt Endorsement Card */}
          <div className="a-govt-card">
            <div>
              <div className="a-govt-header">
                <img src="/seal_check.png" alt="Govt Seal" className="a-seal-img"/>
                <div>
                  <div className="a-govt-h4">OFFICIAL LETTER OF RECOMMENDATION</div>
                  <div className="a-govt-sub">Uttar Pradesh Promote Pharma Council (Govt. of UP)</div>
                </div>
              </div>

              <blockquote className="a-govt-quote">
                "Dr. Ashish Indani has assembled a vast body of knowledge... filling a long-standing gap in the industry where medical device clinical research historically depended on retrofitted drug-oriented methodologies."
              </blockquote>
            </div>

            <div className="a-govt-sign">
              <strong>Kritika Sharma (IAS)</strong>
              <span>Managing Director &amp; CEO, UP Promote Pharma Council</span>
              <a href="/DATA/Recommendation letter.pdf" target="_blank" rel="noopener noreferrer" className="a-pdf-btn">VIEW ORIGINAL PDF LETTER →</a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           THE MASTERWORK 4-VOLUME OVERVIEW
          ══════════════════════════════════════ */}
      <section className="a-content-section" id="masterwork" style={{ borderTop: '1px solid rgba(199,154,86,0.15)', background: '#050b13' }}>
        <div className="a-sec-title">
          <div className="eyebrow">THE DEFINITIVE PUBLICATION</div>
          <h2>Essentials of Medical Device Clinical Research</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '720px', margin: '0.75rem auto 0 auto', fontSize: '0.95rem' }}>
            The landmark multi-volume reference set liberating medical device clinical research from conventional pharmaceutical drug trial retrofitting.
          </p>
        </div>

        <div className="a-books-grid">
          <div className="a-book-card">
            <div className="a-book-vol">VOLUME I</div>
            <h3 className="a-book-title">Fundamentals &amp; Regulatory Pathways</h3>
            <p className="a-book-desc">
              Device classification, intended use, US FDA 510(k)/PMA routes, EU MDR 2017/745, and fundamental divergences between drug and device trials.
            </p>
          </div>

          <div className="a-book-card">
            <div className="a-book-vol">VOLUME II</div>
            <h3 className="a-book-title">Scientific &amp; Operational Core</h3>
            <p className="a-book-desc">
              Clinical investigation protocols, medical writing, CER generation, risk management (ISO 14971), and Good Clinical Practice for devices (ISO 14155).
            </p>
          </div>

          <div className="a-book-card">
            <div className="a-book-vol">VOLUME III</div>
            <h3 className="a-book-title">Data Management &amp; Biostatistics</h3>
            <p className="a-book-desc">
              Device data management, MedDRA &amp; FDA Medical Device Problem Codes, safety reporting, materiovigilance, biostatistical analysis, and sample size design.
            </p>
          </div>

          <div className="a-book-card">
            <div className="a-book-vol">VOLUME IV</div>
            <h3 className="a-book-title">Software, AI &amp; Post-Market Evidence</h3>
            <p className="a-book-desc">
              Software as a Medical Device (SaMD), Software in a Medical Device (SiMD), ISO 62304 / ISO 63204 SDLC standards, diagnostic devices, and post-market evidence (PMCF).
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           KEYNOTE & ADVISORY
          ══════════════════════════════════════ */}
      <section className="a-content-section" id="keynote">
        <div className="a-sec-title">
          <div className="eyebrow">VIP ENGAGEMENT</div>
          <h2>Keynote Speaking &amp; Executive Advisory</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0.75rem auto 0 auto', fontSize: '0.95rem' }}>
            Inquire about international keynote speaking engagements, MedTech regulatory consulting, or institutional library orders.
          </p>
        </div>

        <div className="a-keynote-box">
          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--gold-light)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
              <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Inquiry Sent Successfully</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Thank you for reaching out. Dr. Ashish Indani's executive desk will respond shortly.</p>
            </div>
          ) : (
            <form id="aKeynoteForm" onSubmit={handleKeynoteSubmit}>
              <div className="a-form-grid">
                <div>
                  <label className="a-label">Full Name</label>
                  <input type="text" className="a-input" placeholder="e.g. Dr. Robert Vance" required/>
                </div>
                <div>
                  <label className="a-label">Organization / University</label>
                  <input type="text" className="a-input" placeholder="e.g. Stryker / Stanford" required/>
                </div>
                <div>
                  <label className="a-label">Email Address</label>
                  <input type="email" className="a-input" placeholder="name@organization.com" required/>
                </div>
                <div>
                  <label className="a-label">Inquiry Type</label>
                  <select className="a-select">
                    <option>Keynote Speaking Engagement</option>
                    <option>Corporate MedTech Advisory</option>
                    <option>Institutional Library Order</option>
                  </select>
                </div>
                <div className="full">
                  <label className="a-label">Event or Inquiry Details</label>
                  <textarea className="a-textarea" rows={4} placeholder="Please outline scope or event details..."></textarea>
                </div>
                <div className="full" style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button type="submit" className="btn-hero-solid" style={{ width: '100%', maxWidth: '360px' }}>
                    SEND INQUIRY DIRECTLY →
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
