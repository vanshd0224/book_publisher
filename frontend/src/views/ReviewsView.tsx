import React, { useState } from 'react';
import { ActiveView } from '../types';
import { useCart } from '../context/CartContext';

interface ReviewsViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ setActiveView }) => {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<'all' | 'govt' | 'founders' | 'cro' | 'enterprise'>('all');
  const [selectedDocModal, setSelectedDocModal] = useState<boolean>(false);
  const [selectedImgModal, setSelectedImgModal] = useState<{ src: string; title: string } | null>(null);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const copyQuoteToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(text);
    setTimeout(() => setCopiedQuote(null), 3000);
  };

  const reviews = [
    {
      id: 'govt-ks',
      category: 'govt',
      featured: true,
      initials: 'KS',
      avatarBg: '#0d2137',
      name: 'Kritika Sharma (IAS)',
      role: 'Managing Director & CEO',
      org: 'Uttar Pradesh Promote Pharma Council • Government of Uttar Pradesh',
      badge: 'Official Letter',
      headline: 'A catalyst for informed decision-making and responsible innovation... Publications such as this contribute significantly to creating a culture of scientific excellence and regulatory awareness.',
      body: [
        `"It is with great pleasure and professional pride that I write this letter to recommend the book 'Essentials of Medical Device Clinical Research' authored by Dr. Ashish Indani. The strength of any healthcare system rests on its ability to translate innovation into solutions that are safe, effective, accessible, and trusted. While considerable attention is often given to technological advancement, equal importance must be placed on the scientific evidence, clinical validation, and regulatory rigor that support medical technologies throughout their lifecycle."`,
        `"The depth and scope of this publication reflect a genuine commitment to advancing professional competence and strengthening the foundations of the medical technology ecosystem. I congratulate Dr. Ashish Indani on this noteworthy achievement and am pleased to recommend 'Essentials of Medical Device Clinical Research' without reservation."`
      ],
      tags: ['Govt. of Uttar Pradesh', 'National Skill Building', 'US FDA & EU MDR'],
      actionType: 'doc',
      actionLabel: 'View Signed Letter'
    },
    {
      id: 'cro-sp',
      category: 'cro',
      featured: false,
      initials: 'SP',
      name: 'Sunil Pandita',
      role: 'Medical Technology Thought Leader & Senior Reviewer',
      org: 'Healthcare & MedTech Advisory Spectrum',
      badge: 'Verified Review',
      headline: 'Dr. Indani’s books are more than just publications; they are enduring resources that strengthen the foundation of medical device research and practice.',
      body: [
        `"I have had the privilege of reading Dr. Ashish Indani’s works on medical devices, and I can confidently say that his contributions stand out as both scholarly and practical. His books are not only meticulously researched but also written with clarity that makes complex regulatory and technical concepts accessible to professionals across the healthcare and medical technology spectrum."`,
        `"Dr. Indani’s ability to bridge scientific rigor with real-world application is remarkable. What sets his writing apart is the balance between academic depth and practical guidance. His contributions have empowered professionals to navigate complex challenges with confidence, and his thought leadership continues to inspire excellence in the field."`
      ],
      tags: ['Scholarly Depth', 'Quality Management', 'Pioneer in Domain'],
      actionType: 'quote',
      actionLabel: 'Copy Quote'
    },
    {
      id: 'founders-ks',
      category: 'founders',
      featured: false,
      imgSrc: '/reviews_assets/kamal_shahani_portrait.jpg',
      name: 'Kamal Shahani',
      role: 'Founder & Managing Director',
      org: 'Tenet Health Edutech Pvt. Ltd.',
      badge: 'Verified Endorsement',
      headline: `I asked him how he gets time to complete all this on top of his busy job. He answered – 'I gave up my 4 hours sleep and one of my three meals to save productive time.' That was the level of commitment.`,
      body: [
        `"I am happy to introduce the book 'Essentials of Medical Device Clinical Research', authored by Dr. Ashish Indani and Published by B Jain Publishers. As Dr. Ashish continued writing the book, we were constantly in touch. He explained many times how difficult it was to get the content of the book, particularly from the aspects of regulations. Many countries have no regulations. Some other countries which have regulations, had displayed scanned images of printed regulations in non-English languages."`,
        `"All such regulations had to undergo Optical Character Recognition (OCR), validation of each word and characters, followed by translation by three different tools and cross-back translations to ensure no wrong information is included. This effort was substantial. A part of mountain is already moved. I wish Dr. Ashish all success in launch and completion of this book."`
      ],
      tags: ['Tenet Health', 'Global OCR Synthesis', 'Unprecedented Rigor'],
      actionType: 'quote',
      actionLabel: 'Copy Quote'
    },
    {
      id: 'cro-ps',
      category: 'cro',
      featured: false,
      initials: 'PS',
      name: 'Dr. Punit Srivastava',
      role: 'Director',
      org: 'Mediception Science Pvt. Ltd.',
      badge: 'Verified Review',
      headline: 'Its structured approach and industry-relevant insights will help readers navigate the rapidly evolving medical-device research landscape with greater clarity and confidence.',
      body: [
        `"It is my pleasure to recommend Dr. Ashish Indani’s book on Medical Device Clinical Research. This timely and valuable resource offers a comprehensive understanding of the scientific, regulatory, ethical, and operational aspects of conducting clinical research for medical devices."`,
        `"The book effectively bridges theoretical concepts with practical applications, making complex subjects accessible to researchers, healthcare professionals, medical-device innovators, regulatory teams, and students. I congratulate Dr. Indani on this significant contribution and strongly recommend the book to everyone involved in medical-device development, clinical evaluation, regulatory affairs, and evidence generation."`
      ],
      tags: ['Mediception Science', 'Clinical Evaluation', 'Evidence Generation'],
      actionType: 'quote',
      actionLabel: 'Copy Quote'
    },
    {
      id: 'founders-ad',
      category: 'founders',
      featured: false,
      imgSrc: '/reviews_assets/dr_anish_desai_portrait.jpg',
      name: 'Dr. Anish Desai',
      role: 'Founder & CEO',
      org: 'IntelliMed Healthcare Solutions',
      badge: 'Verified Endorsement',
      headline: 'Achieving superior patient outcomes are at the centre of all that we do and the book helps you to navigate the complexities and achieve your patient centric objectives.',
      body: [
        `"Medical Devices are critical to management of disease state. The medical Device regulations have changed the health care ecosystem. In the current environment, clinical evidence and data are critical."`,
        `"Finally, achieving superior patient outcomes are at the centre of all that we do and the book helps you to navigate the complexities and achieve your patient centric objectives."`
      ],
      tags: ['IntelliMed Healthcare', 'Patient-Centric Care', 'Clinical Evidence'],
      actionType: 'quote',
      actionLabel: 'Copy Quote'
    },
    {
      id: 'enterprise-hr',
      category: 'enterprise',
      featured: false,
      imgSrc: '/reviews_assets/hemant_rehani_portrait.jpg',
      name: 'Hemant Rehani',
      role: 'Co-Founder • Corporate Shrinks • Visual Boxx',
      org: 'Ex-Global Delivery Head Life Sciences (Cognizant) • Ex-VP (IQVIA)',
      badge: 'Verified Endorsement',
      headline: 'Medical devices are an area of great complexity due to its inherent nature of being at the intersection of science, engineering and digital. Ashish’s book helps you understand the breadth and depth.',
      body: [
        `"Innovation in clinical research continues to break new barriers to bring safer and more efficacious treatments to improve quality of human life. With new technologies playing an increasing important role in faster and better drug development, medical devices are an area of great complexity due to its inherent nature of being at the intersection of science, engineering and digital."`,
        `"Ashish’s book helps you understand the breadth and depth of this complex world and makes it easy to find and comprehend the information. His years of efforts to painstakingly put this together will greatly serve the practitioners working on this noble cause."`
      ],
      tags: ['Ex-Cognizant Delivery Head', 'Ex-VP IQVIA', 'Science • Engineering • Digital'],
      actionType: 'quote',
      actionLabel: 'Copy Quote'
    }
  ];

  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.category === activeFilter);

  return (
    <div className="reviews-page-wrapper">
      {/* ══════════════════════════════════════
           1. HERO SECTION
           ══════════════════════════════════════ */}
      <section className="rev-hero" id="hero">
        <div className="rev-hero-bg"></div>
        <div className="rev-hero-glow"></div>

        <div className="rev-container">
          <div className="rev-hero-content">
            <div className="rev-hero-badge">
              <span className="rev-badge-dot"></span>
              <span>PEER PRAISE &amp; ACCLAIM</span>
            </div>

            <h1 className="rev-hero-title serif-title">
              Endorsed by Global Leaders in <br />
              <span className="gold-text">Governance, Science &amp; MedTech</span>
            </h1>

            <p className="rev-hero-subtitle">
              Read how senior government directors, CRO executives, founders, and regulatory thought leaders evaluate Dr. Ashish Indani’s 4-Volume masterwork.
            </p>

            <div className="rev-hero-stats">
              <div className="rev-stat-item">
                <span className="rev-stat-num">100%</span>
                <span className="rev-stat-label">Verified Testimonials</span>
              </div>
              <div className="rev-stat-item">
                <span className="rev-stat-num">IAS</span>
                <span className="rev-stat-label">Government Recommendation</span>
              </div>
              <div className="rev-stat-item">
                <span className="rev-stat-num">25+ Yrs</span>
                <span className="rev-stat-label">Author Experience</span>
              </div>
              <div className="rev-stat-item">
                <span className="rev-stat-num">4 Vol</span>
                <span className="rev-stat-label">Complete Framework</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           2. OFFICIAL GOVERNMENT SPOTLIGHT
           ══════════════════════════════════════ */}
      <section className="govt-spotlight-sec" id="govt-spotlight">
        <div className="rev-container">
          <div className="govt-card">
            
            {/* Left Narrative */}
            <div className="govt-text-col">
              <div className="govt-badge-strip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <span>GOVERNMENT RECOMMENDATION</span>
              </div>

              <h2 className="govt-title">
                Uttar Pradesh Promote Pharma Council
              </h2>

              <blockquote className="govt-lead-quote">
                "The book fills a long-standing gap in the industry, where medical device clinical research has historically depended on retrofitted drug-oriented methodologies rather than a dedicated, well-defined framework of its own."
              </blockquote>

              <p className="govt-body-text">
                In an official commendation, <strong>Kritika Sharma (IAS)</strong>, Managing Director &amp; CEO of the Uttar Pradesh Promote Pharma Council, emphasizes the profound importance of clinical evidence, regulatory rigor, and patient safety in building a trustworthy medical technology ecosystem.
              </p>

              <div className="govt-officer-row">
                <div className="govt-emblem-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                </div>
                <div>
                  <div className="govt-officer-name">Kritika Sharma (IAS)</div>
                  <div className="govt-officer-title">Managing Director &amp; CEO</div>
                  <div className="govt-officer-dept">Uttar Pradesh Promote Pharma Council • Govt. of Uttar Pradesh</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Letter Preview */}
            <div className="govt-doc-col">
              <div className="govt-doc-preview" onClick={() => setSelectedDocModal(true)}>
                <img 
                  src="/reviews_assets/recommendation_letter_doc.png" 
                  alt="Official Recommendation Letter from Kritika Sharma IAS" 
                  className="govt-doc-img"
                />
                <div className="govt-doc-overlay">
                  <span className="govt-doc-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                    <span>Click to Expand Letter</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           3. REVIEWS HUB & FILTERABLE GRID
           ══════════════════════════════════════ */}
      <section className="rev-hub-sec" id="hub">
        <div className="rev-container">
          
          <div className="rev-section-header">
            <span className="rev-eyebrow">ALL ENDORSEMENTS &amp; TESTIMONIALS</span>
            <h2 className="rev-title">What the Industry Says</h2>
            <p className="rev-desc">
              From CRO directors to tech leaders, explore unfiltered perspectives on this essential medical device series.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="rev-filters-wrapper">
            <button 
              className={`rev-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Reviews <span className="rev-count-badge">6</span>
            </button>
            <button 
              className={`rev-filter-btn ${activeFilter === 'govt' ? 'active' : ''}`}
              onClick={() => setActiveFilter('govt')}
            >
              Government &amp; Regulators <span className="rev-count-badge">1</span>
            </button>
            <button 
              className={`rev-filter-btn ${activeFilter === 'founders' ? 'active' : ''}`}
              onClick={() => setActiveFilter('founders')}
            >
              Founders &amp; CEOs <span className="rev-count-badge">2</span>
            </button>
            <button 
              className={`rev-filter-btn ${activeFilter === 'cro' ? 'active' : ''}`}
              onClick={() => setActiveFilter('cro')}
            >
              Clinical Research &amp; CROs <span className="rev-count-badge">2</span>
            </button>
            <button 
              className={`rev-filter-btn ${activeFilter === 'enterprise' ? 'active' : ''}`}
              onClick={() => setActiveFilter('enterprise')}
            >
              Global Delivery &amp; Tech <span className="rev-count-badge">1</span>
            </button>
          </div>

          {/* Grid */}
          <div className="rev-grid">
            {filteredReviews.map((rev) => (
              <article key={rev.id} className={`rev-card ${rev.featured ? 'featured-card' : ''}`}>
                <div className="rev-card-top">
                  <div className="rev-author-meta">
                    <div className="rev-avatar-frame" style={rev.avatarBg ? { background: rev.avatarBg } : undefined}>
                      {rev.imgSrc ? (
                        <img src={rev.imgSrc} alt={rev.name} className="rev-avatar-img" />
                      ) : (
                        <span className="rev-avatar-initials">{rev.initials}</span>
                      )}
                    </div>
                    <div>
                      <div className="rev-author-name">{rev.name}</div>
                      <div className="rev-author-role">{rev.role}</div>
                      <div className="rev-author-org">{rev.org}</div>
                    </div>
                  </div>
                  <span className="rev-verified-pill">
                    {rev.badge}
                  </span>
                </div>

                <div className="rev-quote-icon">“</div>
                <div className="rev-pull-highlight">
                  "{rev.headline}"
                </div>

                <div className="rev-text">
                  {rev.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                <div className="rev-card-bottom">
                  <div className="rev-tags">
                    {rev.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="rev-tag">{tag}</span>
                    ))}
                  </div>
                  {rev.actionType === 'doc' ? (
                    <button className="rev-modal-trigger-btn" onClick={() => setSelectedDocModal(true)}>
                      <span>{rev.actionLabel}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  ) : (
                    <button 
                      className="rev-modal-trigger-btn" 
                      onClick={() => copyQuoteToClipboard(`"${rev.headline}" — ${rev.name}`)}
                    >
                      <span>{copiedQuote === `"${rev.headline}" — ${rev.name}` ? 'Copied!' : 'Copy Quote'}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           4. WHY LEADERS PRAISE THIS WORK (4 PILLARS)
           ══════════════════════════════════════ */}
      <section className="rev-pillars-sec">
        <div className="rev-container">
          <div className="rev-pillars-header">
            <span className="rev-eyebrow">FOUR REASONS WHY</span>
            <h2 className="rev-pillars-title">Why Industry Leaders Praise This Collection</h2>
          </div>

          <div className="rev-pillars-grid">
            <div className="rev-pillar-card">
              <div className="rev-pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="rev-pillar-title">Device-Centric from Day One</h3>
              <p className="rev-pillar-desc">
                Does not adapt pharmaceutical paradigms. Written ground-up for hardware, surgical tools, implants, diagnostics &amp; SaMD.
              </p>
            </div>

            <div className="rev-pillar-card">
              <div className="rev-pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3 className="rev-pillar-title">100+ Jurisdictions Unified</h3>
              <p className="rev-pillar-desc">
                Direct cross-referencing across US FDA, EU MDR, PMDA, NMPA, CDSCO, and TGA regulatory pathways.
              </p>
            </div>

            <div className="rev-pillar-card">
              <div className="rev-pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <h3 className="rev-pillar-title">Ready-to-Use Templates</h3>
              <p className="rev-pillar-desc">
                Includes clinical investigation plans (CIP), CER outlines, risk-benefit matrices, and audit-ready checklists.
              </p>
            </div>

            <div className="rev-pillar-card">
              <div className="rev-pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="rev-pillar-title">25+ Years Author Authority</h3>
              <p className="rev-pillar-desc">
                Authored by Dr. Ashish Indani, combining deep clinical medicine, Stryker leadership, and global regulatory advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           5. INSTITUTIONAL ADOPTION
           ══════════════════════════════════════ */}
      <section className="rev-inst-sec">
        <div className="rev-container">
          <div className="rev-inst-box">
            <div className="rev-inst-content">
              <span className="rev-inst-badge">INSTITUTIONAL &amp; ENTERPRISE</span>
              <h2 className="serif-title" style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                Equip Your Organization with the Reference Standard
              </h2>
              <p style={{ color: '#A0B4C8', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                Join forward-thinking MedTech manufacturers, research institutions, CROs, and university faculties worldwide who have standardized on this 4-Volume reference.
              </p>
              <div className="rev-inst-stats-row">
                <div>
                  <div className="rev-inst-stat-val">100+</div>
                  <div className="rev-inst-stat-lbl">Regulatory Jurisdictions</div>
                </div>
                <div>
                  <div className="rev-inst-stat-val">2500+</div>
                  <div className="rev-inst-stat-lbl">Pages Across 4 Vols</div>
                </div>
                <div>
                  <div className="rev-inst-stat-val">40+</div>
                  <div className="rev-inst-stat-lbl">Chapters &amp; Checklists</div>
                </div>
              </div>
            </div>
            <div className="rev-inst-actions">
              <button onClick={() => setActiveView('books')} className="btn-gold-primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem 1.5rem' }}>
                EXPLORE 4-VOLUME SET →
              </button>
              <button onClick={() => setActiveView('preview')} className="btn-ghost-sec" style={{ width: '100%', padding: '1rem 1.5rem' }}>
                Preview Topics &amp; Chapters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           6. BOTTOM CALL TO ACTION
           ══════════════════════════════════════ */}
      <section className="rev-cta-sec">
        <div className="rev-container">
          <div className="rev-cta-content">
            <span className="rev-eyebrow">THE DEFINITIVE 4-VOLUME REFERENCE</span>
            <h2 className="serif-title" style={{ fontSize: '2.8rem', color: '#FFFFFF', margin: '0.75rem 0 1.25rem 0' }}>
              Elevate Your Clinical &amp; Regulatory Practice
            </h2>
            <p style={{ color: '#A0B4C8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              Available as a complete 4-Volume hardbound collector's set or individual specialized volumes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => addToCart('bundle')} className="btn-gold-primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1rem' }}>
                ORDER THE COMPLETE SET (₹12,999) →
              </button>
              <button onClick={() => setActiveView('preview')} className="btn-ghost-sec" style={{ padding: '1.1rem 2rem' }}>
                Preview Inside Book
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           DOCUMENT EXPAND MODAL (IAS LETTER)
           ══════════════════════════════════════ */}
      {selectedDocModal && (
        <div className="rev-modal-overlay active" onClick={() => setSelectedDocModal(false)}>
          <div className="rev-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="rev-modal-close" onClick={() => setSelectedDocModal(false)}>✕</button>
            <h3 style={{ fontFamily: 'var(--rev-font-serif)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Official Recommendation Letter
            </h3>
            <p style={{ color: '#A0B4C8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Signed by Kritika Sharma (IAS), Managing Director &amp; CEO, UP Promote Pharma Council.
            </p>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', borderRadius: '8px', border: '1px solid var(--rev-gold-border)' }}>
              <img 
                src="/reviews_assets/recommendation_letter_doc.png" 
                alt="Recommendation Letter Document" 
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <a 
                href="/DATA/Recommendation letter.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gold-primary" 
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                Download Original PDF
              </a>
              <button className="btn-ghost-sec" onClick={() => setSelectedDocModal(false)} style={{ padding: '0.65rem 1.25rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
