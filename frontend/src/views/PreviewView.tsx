import React, { useState, useMemo } from 'react';
import { ActiveView } from '../types';
import { useCart } from '../context/CartContext';

interface PreviewViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ setActiveView }) => {
  const { addToCart } = useCart();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVol, setSelectedVol] = useState<'all' | '1' | '2' | '3' | '4'>('all');
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'regulatory' | 'clinical' | 'risk' | 'biostats' | 'digital'>('all');
  
  // Reader Excerpt Tab State
  const [activeSample, setActiveSample] = useState<'paradigm' | 'risk' | 'samd' | 'cer'>('paradigm');

  const topics = [
    {
      id: 1,
      vol: '1',
      volNum: 'Volume I • Chapter 1',
      domain: 'regulatory',
      importance: 'Critical Foundation',
      badgeClass: 'critical',
      title: 'Convergences & Diversities: Drug vs. Device Clinical Science',
      desc: 'Examines the fundamental divergence in clinical philosophy between pharmaceuticals and medical devices. Eliminates retrofitted drug methodologies and builds device-specific clinical thinking.',
      standards: ['CDISC Medical Device', 'ISO 14155:2020', 'IMDRF Principles'],
      takeaway: 'Establishes clear protocol objectives that avoid inappropriate pharma endpoint modeling.',
      keywords: 'drug device divergence difference clinical trial concepts cdash fda'
    },
    {
      id: 2,
      vol: '1',
      volNum: 'Volume I • Chapter 2',
      domain: 'regulatory',
      importance: 'Critical Regulatory',
      badgeClass: 'critical',
      title: 'Global Regulatory Pathways & Market Authorization',
      desc: 'Comprehensive breakdown of risk-based classification systems: US FDA 510(k), De Novo, and PMA pathways compared to EU MDR 2017/745 Annex VIII classification rules and global market entry.',
      standards: ['US FDA 21 CFR 860', 'EU MDR 2017/745', 'IMDRF / CDSCO'],
      takeaway: 'Ensures exact regulatory classification before committing capital to clinical investigations.',
      keywords: 'fda 510k pma de novo eu mdr class i iia iib iii classification pathways'
    },
    {
      id: 3,
      vol: '1',
      volNum: 'Volume I • Chapter 3',
      domain: 'regulatory',
      importance: 'Foundational QMS',
      badgeClass: 'foundational',
      title: 'Quality Management Systems (QMS) & Design Controls',
      desc: 'Bridging ISO 13485:2016 quality management requirements with clinical research operations, investigational device accountability, and technical documentation file assembly.',
      standards: ['ISO 13485:2016', 'FDA 21 CFR 820 (QMSR)', 'Design Controls'],
      takeaway: 'Aligns clinical investigation device lots with full QMS traceability and batch records.',
      keywords: 'iso 13485 quality management qms design controls audit compliance'
    },
    {
      id: 4,
      vol: '2',
      volNum: 'Volume II • Chapter 1',
      domain: 'risk',
      importance: 'Critical Safety',
      badgeClass: 'critical',
      title: 'ISO 14971 Medical Device Risk Management',
      desc: 'In-depth implementation of ISO 14971:2019. Links hazard identification, Failure Mode and Effects Analysis (FMEA), and risk mitigations directly with clinical trial safety data.',
      standards: ['ISO 14971:2019', 'ISO/TR 24971', 'Benefit-Risk Analysis'],
      takeaway: 'Transforms risk management from a static file into an active, continuous clinical lifecycle driver.',
      keywords: 'iso 14971 risk management fmea hazard mitigation patient safety benefit risk'
    },
    {
      id: 5,
      vol: '2',
      volNum: 'Volume II • Chapter 2',
      domain: 'clinical',
      importance: 'High Precision',
      badgeClass: 'high',
      title: 'Clinical Investigation Planning (CIP) & Protocol Design',
      desc: 'Step-by-step methodology for drafting a Clinical Investigation Plan under ISO 14155:2020. Addresses investigator selection, surgical technique standardization, and primary/secondary endpoints.',
      standards: ['ISO 14155:2020', 'GCP for Devices', 'MDR Article 62'],
      takeaway: 'Prevents protocol amendments by engineering robust inclusion criteria and surgical controls.',
      keywords: 'cip protocol design clinical investigation plan iso 14155 study endpoints'
    },
    {
      id: 6,
      vol: '2',
      volNum: 'Volume II • Chapter 3',
      domain: 'regulatory',
      importance: 'Critical Regulatory',
      badgeClass: 'critical',
      title: 'Clinical Evaluation Reports (CER) & State of the Art (SOTA)',
      desc: 'Mastering the 4-stage CER synthesis under EU MDR Annex XIV and MEDDEV 2.7/1 Rev 4. Demonstrating clinical equivalence, assessing State of the Art, and structuring benefit-risk ratios.',
      standards: ['EU MDR Annex XIV', 'MEDDEV 2.7/1 Rev 4', 'MDCG 2020-6'],
      takeaway: 'Constructs audit-proof CER dossiers that satisfy strict Notified Body scrutiny.',
      keywords: 'cer clinical evaluation report state of the art sota meddev mdr equivalence'
    },
    {
      id: 7,
      vol: '3',
      volNum: 'Volume III • Chapter 1',
      domain: 'biostats',
      importance: 'High Precision',
      badgeClass: 'high',
      title: 'Electronic Data Capture (EDC) & CDASH Standards',
      desc: 'Configuring modern EDC systems for device investigations. Implementing CDISC CDASH for medical devices, handling multi-component tracking, and imaging core lab data flows.',
      standards: ['CDISC CDASH', '21 CFR Part 11', 'Good Clinical Data Practice'],
      takeaway: 'Streamlines data capture while ensuring strict electronic signature and audit trail compliance.',
      keywords: 'edc cdash cdisc 21 cfr part 11 electronic data capture data management'
    },
    {
      id: 8,
      vol: '3',
      volNum: 'Volume III • Chapter 2',
      domain: 'biostats',
      importance: 'Critical Biostats',
      badgeClass: 'critical',
      title: 'Medical Device Coding & Terminology Architecture',
      desc: 'Dual-coding systems using MedDRA for adverse events and FDA / IMDRF Annex E/F/G codes for device problems, malfunctions, and evaluation results.',
      standards: ['MedDRA Terminology', 'IMDRF Device Problem Codes', 'FDA Adverse Event Codes'],
      takeaway: 'Eliminates ambiguities between physiological patient symptoms and hardware malfunctions.',
      keywords: 'meddra device problem codes imdrf coding adverse event malfunction'
    },
    {
      id: 9,
      vol: '3',
      volNum: 'Volume III • Chapter 3',
      domain: 'biostats',
      importance: 'High Precision',
      badgeClass: 'high',
      title: 'Biostatistics for Medical Devices: OPC & Registries',
      desc: 'Statistical methodologies tailored for medical devices: Objective Performance Criteria (OPC), Objective Performance Goals (OPG), Bayesian adaptive trials, and real-world evidence (RWE).',
      standards: ['FDA OPC/OPG Guidance', 'Bayesian Statistics', 'ISO 14155 Annex A'],
      takeaway: 'Enables defensible sample-size calculations when placebo blinding is ethically unfeasible.',
      keywords: 'biostatistics sample size opc opg bayesian statistics rwe registry'
    },
    {
      id: 10,
      vol: '4',
      volNum: 'Volume IV • Chapter 1',
      domain: 'digital',
      importance: 'Frontier Tech',
      badgeClass: 'frontier',
      title: 'Software as a Medical Device (SaMD) & IEC 62304',
      desc: 'Navigating software lifecycle processes under IEC 62304 and IEC 82304-1. Software safety classification, agile medical SDLC, cybersecurity threat modeling, and interoperability validation.',
      standards: ['IEC 62304 SDLC', 'FDA SaMD Guidance', 'IMDRF SaMD Framework'],
      takeaway: 'Integrates regulatory compliance into agile software development sprints seamlessly.',
      keywords: 'samd software as a medical device iec 62304 cybersecurity digital health sdlc'
    },
    {
      id: 11,
      vol: '4',
      volNum: 'Volume IV • Chapter 2',
      domain: 'digital',
      importance: 'Frontier Tech',
      badgeClass: 'frontier',
      title: 'AI/ML Validation & Good Machine Learning Practice (GMLP)',
      desc: 'Clinical evidence generation for artificial intelligence and machine learning algorithms. Predetermined Change Control Plans (PCCP), dataset provenance, bias mitigation, and post-market algorithmic drift.',
      standards: ['GMLP Principles', 'FDA PCCP Framework', 'EU AI Act Alignment'],
      takeaway: 'Prepares adaptive ML diagnostic software for transparent, auditable regulatory review.',
      keywords: 'ai ml machine learning gmlp pccp algorithm drift artificial intelligence'
    },
    {
      id: 12,
      vol: '4',
      volNum: 'Volume IV • Chapter 3',
      domain: 'clinical',
      importance: 'Critical Safety',
      badgeClass: 'critical',
      title: 'Post-Market Clinical Follow-up (PMCF) & Real-World Evidence',
      desc: 'Structuring mandatory PMCF plans under EU MDR Annex XIV Part B. Designing post-market registries, conducting active user surveys, and updating Risk Management and CER files dynamically.',
      standards: ['EU MDR Annex XIV Part B', 'MDCG 2020-7 / 8', 'ISO 20416 Surveillance'],
      takeaway: 'Protects commercial CE mark validity through continuous, proactive clinical data collection.',
      keywords: 'pmcf post market clinical follow up pms real world evidence mdcg'
    }
  ];

  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchVol = selectedVol === 'all' || t.vol === selectedVol;
      const matchDomain = selectedDomain === 'all' || t.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.keywords.toLowerCase().includes(q) ||
        t.standards.some(s => s.toLowerCase().includes(q));
      return matchVol && matchDomain && matchQuery;
    });
  }, [topics, selectedVol, selectedDomain, searchQuery]);

  return (
    <div className="preview-main-page">
      {/* ══════════════════════════════════════
           1. PREVIEW HERO SECTION
          ══════════════════════════════════════ */}
      <section className="preview-hero">
        <div className="preview-hero-container">
          <div className="preview-hero-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>THE COMPLETE 4-VOLUME KNOWLEDGE REPOSITORY</span>
          </div>
          
          <h1 className="preview-hero-title">
            Inside the Masterwork: <br />
            <span className="t-gold-grad">Every Topic, Regulatory Standard &amp; Clinical Blueprint</span>
          </h1>
          
          <p className="preview-hero-subtitle">
            A systematic, precision catalog of all four interconnected volumes authored by Dr. Ashish Indani. Designed to transform complex medical device engineering and clinical questions into globally accepted evidence and regulatory confidence.
          </p>

          {/* Stat Highlights */}
          <div className="preview-hero-stats">
            <div className="preview-stat-unit">
              <div className="preview-stat-value">4</div>
              <div className="preview-stat-desc">Comprehensive Volumes</div>
            </div>
            <div className="preview-stat-unit">
              <div className="preview-stat-value">18+</div>
              <div className="preview-stat-desc">Core Disciplines</div>
            </div>
            <div className="preview-stat-unit">
              <div className="preview-stat-value">60+</div>
              <div className="preview-stat-desc">Detailed Topics &amp; Frameworks</div>
            </div>
            <div className="preview-stat-unit">
              <div className="preview-stat-value">100%</div>
              <div className="preview-stat-desc">Device-Specific Science</div>
            </div>
          </div>

          {/* CTA Anchor Buttons */}
          <div className="preview-hero-cta-group">
            <a href="#explorer" className="btn-hero-solid">
              <span>Explore Topic Matrix</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <a href="#reader" className="btn-hero-ghost">
              <span>Open Sample Book Reader</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </a>
            <button onClick={() => setActiveView('reviews')} className="btn-hero-ghost">
              <span>Government &amp; IAS Endorsement</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           2. STRATEGIC FOUNDATION: DRUG VS DEVICE COMPARATIVE SCIENCE
          ══════════════════════════════════════ */}
      <section className="preview-divergence-sec" id="divergence">
        <div className="b-container">
          <div className="divergence-grid">
            <div className="divergence-content">
              <span className="divergence-pill">CRITICAL INDUSTRY REALITY</span>
              <h2>Why Medical Device Research Demands Its Own Distinct Science</h2>
              <p>
                For decades, medical device clinical studies have suffered from conventional retrofitting—borrowing drug-oriented methodologies that fail to account for device complexity, iterative engineering cycles, surgical operator learning curves, and device-tissue physical interactions.
              </p>
              <p>
                Dr. Ashish Indani’s work represents the first end-to-end framework specifically built from the ground up for medical technologies, establishing distinct operational, statistical, and regulatory paradigms.
              </p>
              
              <ul className="divergence-highlights">
                <li>
                  <svg className="divergence-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Mode of Action:</strong> Physical, mechanical, or electrical interaction rather than systemic metabolic/pharmacological kinetics.</span>
                </li>
                <li>
                  <svg className="divergence-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Trial Controls &amp; Blinding:</strong> Sham surgery ethics, physician technique variability, and non-inferiority margins.</span>
                </li>
                <li>
                  <svg className="divergence-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Software &amp; AI Agility:</strong> Continuous iteration, cybersecurity, and GMLP vs. static molecule manufacturing.</span>
                </li>
              </ul>
            </div>

            {/* Comparative Matrix Card */}
            <div className="comparison-card">
              <div className="comparison-card-header">
                <div className="comparison-card-title">Comparative Framework: Pharmaceuticals vs. Medical Devices</div>
                <span className="comparison-badge">Vol I Core Theme</span>
              </div>
              <div className="comparison-table-wrap">
                <table className="comp-table" aria-label="Pharmaceuticals versus Medical Devices Clinical Science Comparison">
                  <thead>
                    <tr>
                      <th>Scientific Dimension</th>
                      <th>Pharmaceutical Model</th>
                      <th>Medical Device Paradigm (This Book)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Primary Mechanism</strong></td>
                      <td>Systemic chemical absorption, metabolism, receptor binding</td>
                      <td className="highlight-device">Local physical, mechanical, optical, or electrical interaction</td>
                    </tr>
                    <tr>
                      <td><strong>Study Design &amp; Blinding</strong></td>
                      <td>Double-blind, placebo-controlled randomized trials (Phase I-IV)</td>
                      <td className="highlight-device">Active comparative, prospective registries, objective performance criteria (OPC)</td>
                    </tr>
                    <tr>
                      <td><strong>Operator Influence</strong></td>
                      <td>Minimal (patient ingests or receives formulation)</td>
                      <td className="highlight-device">Critical operator learning curve, surgeon technique &amp; human factors</td>
                    </tr>
                    <tr>
                      <td><strong>Lifecycle &amp; Iteration</strong></td>
                      <td>Chemical entity remains fixed for 10–20 years</td>
                      <td className="highlight-device">Rapid incremental iterations, hardware updates, software patches</td>
                    </tr>
                    <tr>
                      <td><strong>Risk Framework</strong></td>
                      <td>Toxicology, pharmacovigilance, adverse reaction indexing</td>
                      <td className="highlight-device">ISO 14971 Risk Management, hazard mitigation &amp; Materiovigilance</td>
                    </tr>
                    <tr>
                      <td><strong>Post-Market Focus</strong></td>
                      <td>Periodic safety update reports (PSUR), passive spontaneous reporting</td>
                      <td className="highlight-device">Proactive PMCF studies, implant registries, real-world clinical evidence (RWE)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           3. INTERACTIVE TOPIC EXPLORER & SEARCH SUITE
          ══════════════════════════════════════ */}
      <section className="preview-explorer-sec" id="explorer">
        <div className="b-container">
          <div className="explorer-header-wrap">
            <span className="b-hero-eyebrow">PRECISION TOPIC DIRECTORY</span>
            <h2>Master Matrix of Chapters &amp; Topics</h2>
            <p>
              Search and filter through all four volumes. Every topic is categorized with its clinical importance, core regulatory standard, and direct industry application.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="explorer-controls-card">
            <div className="search-input-group">
              <svg className="search-icon-inside" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="topic-search-field"
                placeholder="Search topics by keyword (e.g. 'FDA', 'ISO 14971', 'Biostatistics', 'SaMD', 'CER', 'Materiovigilance')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search topics across all volumes"
              />
            </div>

            {/* Volume Selector Tabs */}
            <div className="volume-tabs-bar" role="tablist" aria-label="Volume Filter Tabs">
              <button className={`vol-tab-btn ${selectedVol === 'all' ? 'active' : ''}`} onClick={() => setSelectedVol('all')}>All Volumes (Full Catalog)</button>
              <button className={`vol-tab-btn ${selectedVol === '1' ? 'active' : ''}`} onClick={() => setSelectedVol('1')}>Vol I: Regulatory &amp; Divergence</button>
              <button className={`vol-tab-btn ${selectedVol === '2' ? 'active' : ''}`} onClick={() => setSelectedVol('2')}>Vol II: Scientific Core &amp; Risk</button>
              <button className={`vol-tab-btn ${selectedVol === '3' ? 'active' : ''}`} onClick={() => setSelectedVol('3')}>Vol III: Operations &amp; Biostatistics</button>
              <button className={`vol-tab-btn ${selectedVol === '4' ? 'active' : ''}`} onClick={() => setSelectedVol('4')}>Vol IV: SaMD, AI &amp; Post-Market</button>
            </div>

            {/* Domain Category Filter Pills */}
            <div className="domain-pills-bar">
              <span className="domain-pill-label">Filter by Domain:</span>
              <button className={`domain-pill-btn ${selectedDomain === 'all' ? 'active' : ''}`} onClick={() => setSelectedDomain('all')}>All Domains</button>
              <button className={`domain-pill-btn ${selectedDomain === 'regulatory' ? 'active' : ''}`} onClick={() => setSelectedDomain('regulatory')}>Regulatory Affairs &amp; Standards</button>
              <button className={`domain-pill-btn ${selectedDomain === 'clinical' ? 'active' : ''}`} onClick={() => setSelectedDomain('clinical')}>Clinical Trials &amp; Operations</button>
              <button className={`domain-pill-btn ${selectedDomain === 'risk' ? 'active' : ''}`} onClick={() => setSelectedDomain('risk')}>Risk &amp; Patient Safety</button>
              <button className={`domain-pill-btn ${selectedDomain === 'biostats' ? 'active' : ''}`} onClick={() => setSelectedDomain('biostats')}>Data, Biostatistics &amp; Writing</button>
              <button className={`domain-pill-btn ${selectedDomain === 'digital' ? 'active' : ''}`} onClick={() => setSelectedDomain('digital')}>Software, SaMD &amp; AI</button>
            </div>
          </div>

          {/* Active Topics Count Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#8C9EAF', fontSize: '0.88rem' }}>
            <span>Showing <strong>{filteredTopics.length}</strong> topics</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>Interactive Live Search Active</span>
          </div>

          {/* Topics Grid */}
          <div className="topic-cards-container">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="topic-detail-card">
                <div className="topic-card-top-row">
                  <span className="topic-vol-badge">{topic.volNum}</span>
                  <span className={`topic-importance-badge ${topic.badgeClass}`}>{topic.importance}</span>
                </div>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-description">{topic.desc}</p>
                <div className="topic-standards-list">
                  {topic.standards.map((st, i) => (
                    <span key={i} className="standard-tag">{st}</span>
                  ))}
                </div>
                <div className="topic-footer-takeaway">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{topic.takeaway}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
           4. "LOOK INSIDE" INTERACTIVE SAMPLE READER
          ══════════════════════════════════════ */}
      <section className="look-inside-sec" id="reader">
        <div className="b-container">
          <div className="look-inside-header">
            <span className="b-hero-eyebrow">HIGH-FIDELITY SAMPLE EXCERPTS</span>
            <h2>Look Inside the Master Reference</h2>
            <p>
              Experience the depth, layout clarity, and practical scientific frameworks included across the volumes. Select an excerpt below to examine live manuscript pages.
            </p>
          </div>

          {/* Simulator Reader Container */}
          <div className="reader-simulator-card">
            <div className="reader-toolbar">
              <div className="reader-tabs" role="tablist" aria-label="Book Excerpt Tabs">
                <button 
                  className={`reader-tab-btn ${activeSample === 'paradigm' ? 'active' : ''}`}
                  onClick={() => setActiveSample('paradigm')}
                  role="tab"
                  aria-selected={activeSample === 'paradigm'}
                >
                  1. Drug vs Device Divergence
                </button>
                <button 
                  className={`reader-tab-btn ${activeSample === 'risk' ? 'active' : ''}`}
                  onClick={() => setActiveSample('risk')}
                  role="tab"
                  aria-selected={activeSample === 'risk'}
                >
                  2. ISO 14971 Risk Matrix
                </button>
                <button 
                  className={`reader-tab-btn ${activeSample === 'samd' ? 'active' : ''}`}
                  onClick={() => setActiveSample('samd')}
                  role="tab"
                  aria-selected={activeSample === 'samd'}
                >
                  3. SaMD &amp; AI Validation
                </button>
                <button 
                  className={`reader-tab-btn ${activeSample === 'cer' ? 'active' : ''}`}
                  onClick={() => setActiveSample('cer')}
                  role="tab"
                  aria-selected={activeSample === 'cer'}
                >
                  4. 4-Stage CER Lifecycle
                </button>
              </div>
              <div className="reader-zoom-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                <span>Authentic Manuscript Layout Preview</span>
              </div>
            </div>

            {/* Spread Content Area */}
            <div className="book-spread-container" id="bookSpreadViewer">
              {(() => {
                const cur = (
                  activeSample === 'risk' ? {
                    leftHeader: ['VOLUME II: SCIENTIFIC CORE & RISK', 'CHAPTER 4'],
                    leftSection: 'Section 4.1 — ISO 14971 Integration',
                    leftTitle: '4.1 Risk Management in Clinical Investigation Design',
                    leftP1: 'ISO 14971:2019 defines risk as the combination of the probability of occurrence of harm and the severity of that harm. In clinical trials, risk analysis cannot remain an isolated engineering exercise.',
                    leftP2: 'Each clinical hazard identified during pre-clinical bench testing and Failure Mode and Effects Analysis (FMEA) must be directly addressed in the Clinical Investigation Plan (CIP) through proactive mitigation controls.',
                    leftBoxStrong: 'Risk-Mitigation Hierarchy:',
                    leftBoxText: '1. Inherent safety by design (geometry, biocompatible material selection)\n2. Protective measures in the device or manufacturing (sterile barrier, fail-safe cutoffs)\n3. Information for safety (Instructions for Use IFU, surgeon warning labels)',
                    leftBoxCap: 'Figure 4.2 — ISO 14971 Risk Mitigation Priority Ladder',
                    leftFooter: ['Essentials of Medical Device Clinical Research', 'Page 148'],
                    rightHeader: ['DR. ASHISH INDANI', 'PART II: RISK & EVIDENCE'],
                    rightSection: 'Section 4.3 — Benefit-Risk Determination',
                    rightTitle: '4.3 Quantitative Clinical Benefit-Risk Ratio',
                    rightP1: 'Under EU MDR Annex I (GSPR 1) and US FDA PMA requirements, medical technologies must demonstrate that clinical benefits to the target patient population outweigh all known and foreseeable residual risks.',
                    rightP2: 'Clinical endpoints in the trial protocol must be chosen specifically to quantify these clinical benefits against state-of-the-art alternative therapeutic standards:',
                    rightBoxStrong: 'Residual Risk Acceptability Formula:',
                    rightBoxText: 'Residual Risk Acceptable ⇔ Total Measurable Benefit > (Baseline Medical Risk + Device Specific Hazard Probabilities)',
                    rightP3: 'Safety reporting must classify all device deficiencies and unanticipated serious adverse device effects (USADE) in accordance with ISO 14155:2020 Clause 9.',
                    rightFooter: ['Patient Safety & Risk Control', 'Page 149']
                  } : activeSample === 'samd' ? {
                    leftHeader: ['VOLUME IV: SAMD, AI & EMERGING TECH', 'CHAPTER 10'],
                    leftSection: 'Section 10.1 — Software as a Medical Device',
                    leftTitle: '10.1 SaMD Architecture & IEC 62304 SDLC',
                    leftP1: 'Software intended to be used for one or more medical purposes without being part of a hardware medical device is classified as Software as a Medical Device (SaMD) under IMDRF guidelines.',
                    leftP2: 'Unlike physical devices with wear-and-tear degradation, software risks arise from systematic errors, algorithmic edge cases, and cybersecurity vulnerabilities.',
                    leftBoxStrong: 'IEC 62304 Software Safety Classification:',
                    leftBoxText: '• Class A: No injury or damage to health possible\n• Class B: Non-serious injury possible\n• Class C: Death or serious injury possible (Requires formal verification)',
                    leftBoxCap: 'Table 10.1 — Safety Class Stratification & Verification Rigor',
                    leftFooter: ['Essentials of Medical Device Clinical Research', 'Page 286'],
                    rightHeader: ['DR. ASHISH INDANI', 'PART IV: AI & DIGITAL HEALTH'],
                    rightSection: 'Section 10.4 — Artificial Intelligence Validation',
                    rightTitle: '10.4 Clinical Validation of Machine Learning Models',
                    rightP1: 'Generating acceptable clinical evidence for AI/ML diagnostic and prognostic algorithms requires adherence to Good Machine Learning Practice (GMLP) principles:',
                    rightP2: '1. Dataset Independence: Absolute separation between training, tuning, and locked testing datasets to prevent data leakage.\n2. Demographic Generalizability: Multi-center clinical validation across diverse patient cohorts, scanner hardware, and operator skill levels.',
                    rightBoxStrong: 'Predetermined Change Control Plan (PCCP):',
                    rightBoxText: 'For adaptive algorithms, manufacturers must specify in advance the types of anticipated modifications, validation methodology, and re-testing criteria to maintain regulatory clearance.',
                    rightP3: 'Periodic post-market performance monitoring ensures algorithmic drift is detected and corrected proactively.',
                    rightFooter: ['Machine Learning Clinical Evaluation', 'Page 287']
                  } : activeSample === 'cer' ? {
                    leftHeader: ['VOLUME II: SCIENTIFIC CORE', 'CHAPTER 6'],
                    leftSection: 'Section 6.1 — Clinical Evaluation Framework',
                    leftTitle: '6.1 The 4-Stage CER Lifecycle Architecture',
                    leftP1: 'Under EU MDR 2017/745 Article 61 and MEDDEV 2.7/1 Rev 4, clinical evaluation is a continuous, documented method to assess clinical data for a medical device:',
                    leftP2: 'Stage 0 (Scoping): Define the Clinical Evaluation Plan (CEP), intended purpose, clinical claims, and state-of-the-art (SOTA) benchmarks.\nStage 1 (Identification): Systematic literature search across MEDLINE/PubMed, EMBASE, and Cochrane databases, alongside device registry files.',
                    leftBoxStrong: 'Systematic Search Quality Gate:',
                    leftBoxText: 'Every bibliographic search must be accompanied by explicit Boolean search syntax, inclusion/exclusion filters, and a PRISMA flowchart.',
                    leftBoxCap: 'Figure 6.2 — Methodological Search Audit Standard',
                    leftFooter: ['Essentials of Medical Device Clinical Research', 'Page 194'],
                    rightHeader: ['DR. ASHISH INDANI', 'PART II: CLINICAL EVALUATION'],
                    rightSection: 'Section 6.3 — Appraisal & Synthesis',
                    rightTitle: '6.3 Data Appraisal & Demonstrating Equivalence',
                    rightP1: 'Stage 2 (Appraisal): Evaluate each data source for methodological quality, scientific relevance, and weight of evidence (scoring from Level 1 randomized trials to Level 4 retrospective case series).',
                    rightP2: 'Stage 3 (Synthesis & Conclusion): Synthesize all appraisal outputs to prove that clinical performance meets clinical safety objectives without unmitigated hazards.',
                    rightBoxStrong: 'MDR Equivalence Triple Test:',
                    rightBoxText: 'To claim clinical equivalence with a predicate device, manufacturers must demonstrate equivalence across Technical, Biological, and Clinical characteristics simultaneously.',
                    rightP3: 'The final CER forms an integral part of the Technical File and is updated annually for Class III and implantable devices.',
                    rightFooter: ['Regulatory Compliance & Notified Body Audit', 'Page 195']
                  } : {
                    leftHeader: ['VOLUME I: FUNDAMENTALS & DIVERGENCES', 'CHAPTER 1'],
                    leftSection: 'Section 1.2 — The Methodological Problem',
                    leftTitle: '1.2 The Failure of Drug Retrofitting in Medical Devices',
                    leftP1: 'Medical devices do not simply move from an engineering concept to a patient’s bedside. Between innovation and clinical adoption lies a demanding journey of scientific evaluation, clinical investigation, ethical oversight, regulatory scrutiny, and continuous post-market learning.',
                    leftP2: 'Historically, medical device clinical studies continued to depend upon conventional retrofitting from drugs-oriented systems and methods. However, the drug and device differ in clinical science from various aspects—which are not only operational but deeply pragmatic.',
                    leftBoxStrong: 'Key Divergence Principle:',
                    leftBoxText: 'Unlike pharmaceuticals whose active ingredient acts primarily through systemic metabolic or pharmacological pathways, a medical device exerts its primary intended action through physical, mechanical, optical, thermal, or electrical means.',
                    leftBoxCap: 'Figure 1.1 — Fundamental Interaction Taxonomy (Indani et al.)',
                    leftFooter: ['Essentials of Medical Device Clinical Research', 'Page 24'],
                    rightHeader: ['DR. ASHISH INDANI', 'PART I: FOUNDATIONS'],
                    rightSection: 'Section 1.3 — The Device Evidence Ecosystem',
                    rightTitle: '1.3 The Integrated Lifecycle Evidence Ecosystem',
                    rightP1: 'Rather than treating clinical research, regulation, operations, and technology as isolated subjects, the device evidence ecosystem functions as an interdependent continuum:',
                    rightP2: 'A clinical protocol directly shapes the quality of data collected; that data directly determines the validity of the Clinical Evaluation Report (CER); the CER establishes regulatory confidence for market approval; and post-market clinical follow-up (PMCF) continually feeds back into the device risk management file.',
                    rightBoxStrong: 'Practical Rule for Investigators:',
                    rightBoxText: 'In medical device trials, the surgeon or operator is an inherent co-factor of clinical efficacy. Trial protocols must account for user training, device handling ergonomics, and surgical learning curves as controlled variables.',
                    rightP3: 'Without this device-first orientation, trials risk false-negative conclusions stemming from operator error rather than device inadequacy.',
                    rightFooter: ['Regulatory Science & Operational Strategy', 'Page 25']
                  }
                );

                return (
                  <>
                    {/* Page Left */}
                    <div className="book-page-sheet" id="spreadPageLeft">
                      <div className="page-header-strip">
                        <span>{cur.leftHeader[0]}</span>
                        <span>{cur.leftHeader[1]}</span>
                      </div>
                      <div className="page-content-body">
                        <div className="page-chapter-label">{cur.leftSection}</div>
                        <h3>{cur.leftTitle}</h3>
                        <p>{cur.leftP1}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{cur.leftP2}</p>
                        <div className="page-diagram-box">
                          <strong>{cur.leftBoxStrong}</strong>
                          <div style={{ whiteSpace: 'pre-line', marginTop: '0.35rem' }}>{cur.leftBoxText}</div>
                          {cur.leftBoxCap && <div className="diagram-caption">{cur.leftBoxCap}</div>}
                        </div>
                      </div>
                      <div className="page-footer-num">
                        <span>{cur.leftFooter[0]}</span>
                        <span>{cur.leftFooter[1]}</span>
                      </div>
                    </div>

                    {/* Page Right */}
                    <div className="book-page-sheet" id="spreadPageRight">
                      <div className="page-header-strip">
                        <span>{cur.rightHeader[0]}</span>
                        <span>{cur.rightHeader[1]}</span>
                      </div>
                      <div className="page-content-body">
                        <div className="page-chapter-label">{cur.rightSection}</div>
                        <h3>{cur.rightTitle}</h3>
                        <p>{cur.rightP1}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{cur.rightP2}</p>
                        <div className="page-diagram-box" style={{ borderLeft: '3px solid var(--gold-main)', background: '#FAF5EA' }}>
                          <strong>{cur.rightBoxStrong}</strong>
                          <div style={{ whiteSpace: 'pre-line', marginTop: '0.35rem' }}>{cur.rightBoxText}</div>
                        </div>
                        {cur.rightP3 && <p>{cur.rightP3}</p>}
                      </div>
                      <div className="page-footer-num">
                        <span>{cur.rightFooter[0]}</span>
                        <span>{cur.rightFooter[1]}</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           5. OFFICIAL ENDORSEMENTS & IAS RECOMMENDATION
          ══════════════════════════════════════ */}
      <section className="endorsement-ias-sec" id="endorsement">
        <div className="b-container">
          <div className="endorsement-ias-card">
            <div className="ias-header-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>OFFICIAL GOVERNMENT OF UTTAR PRADESH RECOMMENDATION</span>
            </div>

            <div className="ias-letter-quote">
              “Dr. Ashish Indani’s comprehensive work fills a long-standing gap in the industry, where medical device clinical research has historically depended on retrofitted drug-oriented methodologies rather than a dedicated, well-defined framework of its own. I recommend this masterwork without reservation.”
            </div>

            <div className="ias-letter-body">
              <p>
                “The strength of any healthcare system rests on its ability to translate innovation into solutions that are safe, effective, accessible, and trusted. While considerable attention is often given to technological advancement, equal importance must be placed on the scientific evidence, clinical validation, and regulatory rigor that support medical technologies throughout their lifecycle.
              </p>
              <p style={{ marginTop: '0.85rem' }}>
                From the perspective of industrial development, knowledge-driven growth remains one of the most important enablers of global competitiveness. Publications such as this contribute significantly to creating a culture of scientific excellence and regulatory awareness, which are critical for strengthening our position in the global healthcare and medical technology marketplace.”
              </p>
            </div>

            <div className="ias-signoff-row">
              <div className="ias-officer-info">
                <div className="ias-emblem-box">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <circle cx="12" cy="11" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="ias-officer-name">Kritika Sharma (IAS)</div>
                  <div className="ias-officer-title">Managing Director &amp; CEO</div>
                  <div className="ias-officer-dept">Uttar Pradesh Promote Pharma Council • Government of Uttar Pradesh</div>
                </div>
              </div>

              <div className="ias-date-badge">
                <span>Official Recommendation • Bio-Tech Park, Lucknow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           6. INSTITUTIONAL ADOPTION & ROLE BLUEPRINTS
          ══════════════════════════════════════ */}
      <section className="institutional-sec" id="audiences">
        <div className="b-container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            <span className="b-hero-eyebrow">WHO BENEFITS</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '1rem' }}>
              Essential Knowledge Infrastructure for MedTech Leaders
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Designed to serve as a vital operational handbook across corporate enterprises, research hospitals, academic institutions, and regulatory bodies.
            </p>
          </div>

          <div className="inst-grid">
            <div className="inst-card">
              <div className="inst-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h4>Clinical Affairs Teams</h4>
              <p>Master protocol writing (CIP), monitoring, investigator training, and adverse event coding tailored specifically for surgical and diagnostic devices.</p>
            </div>

            <div className="inst-card">
              <div className="inst-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              </div>
              <h4>Regulatory Affairs &amp; QA</h4>
              <p>Navigate US FDA 510(k)/PMA submissions, EU MDR 2017/745 Article 61 CERs, and ISO 14971/14155 harmonized standards with zero ambiguity.</p>
            </div>

            <div className="inst-card">
              <div className="inst-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h4>Biomedical Engineers</h4>
              <p>Understand the exact clinical data and verification evidence required to transform an engineering prototype into an approved medical technology.</p>
            </div>

            <div className="inst-card">
              <div className="inst-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <h4>University Libraries</h4>
              <p>The definitive reference text for postgraduate programmes in biomedical engineering, clinical research, health technology, and pharmacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           7. PURCHASE & COMMERCE ACTIONS
          ══════════════════════════════════════ */}
      <section className="preview-purchase-sec" id="purchase">
        <div className="b-container">
          <div className="preview-purchase-header">
            <span className="b-hero-eyebrow">INVEST IN CLINICAL MASTERY</span>
            <h2>Acquire the Definitive Reference</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Order the complete 4-volume set with a built-in publisher discount, or choose individual volumes for specialized focus.
            </p>
          </div>

          <div className="preview-purchase-grid">
            
            {/* Complete Set Bundle Card */}
            <div className="preview-master-bundle-card">
              <div className="bundle-best-badge">BEST VALUE • 13% OFF</div>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>MASTERWORK BUNDLE</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', margin: '0.5rem 0 1rem 0' }}>
                  Complete 4-Volume Collector’s Set
                </h3>
                <p style={{ color: '#A9B9CA', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Includes all 4 volumes: Foundations &amp; Regulatory, Scientific Core &amp; Risk, Operations &amp; Biostatistics, and SaMD/AI &amp; Post-Market Evidence. Over 2,500 pages of actionable clinical methodologies.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', fontSize: '0.88rem', color: '#D5E2F0' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Full 4-Volume physical publication set</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Complete case studies &amp; regulatory submission templates</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-main)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Free expedited domestic &amp; institutional delivery</span>
                  </li>
                </ul>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 700, color: '#FFFFFF' }}>₹12,999</span>
                    <span style={{ fontSize: '0.95rem', color: '#7F90A2', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹14,999</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600 }}>Save ₹2,000</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-card-gold" style={{ flex: 1 }} onClick={() => addToCart('bundle')}>
                    ADD SET TO CART
                  </button>
                  <button className="btn-hero-solid" style={{ padding: '0.8rem 1.25rem' }} onClick={() => addToCart('bundle')}>
                    BUY NOW →
                  </button>
                </div>
              </div>
            </div>

            {/* Single Volumes List Selector Card */}
            <div className="preview-single-vols-card">
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-main)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>SPECIALIZED MODULES</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', margin: '0.5rem 0 0.75rem 0' }}>
                  Purchase Individual Volumes
                </h3>
                <p style={{ color: '#A9B9CA', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Target specific functional areas tailored to your current project or departmental focus.
                </p>

                <div className="vols-selector-list">
                  {/* Vol 1 */}
                  <div className="vol-select-item">
                    <div>
                      <div className="vol-select-name">Volume I: Regulatory &amp; Divergence</div>
                      <div style={{ fontSize: '0.75rem', color: '#8C9EAF' }}>FDA 510(k), PMA, MDR, QMS</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="vol-select-price">₹3,499</div>
                      <button className="btn-vol-mini-add" onClick={() => addToCart('vol1')}>+ Add</button>
                    </div>
                  </div>

                  {/* Vol 2 */}
                  <div className="vol-select-item">
                    <div>
                      <div className="vol-select-name">Volume II: Scientific Core &amp; Risk</div>
                      <div style={{ fontSize: '0.75rem', color: '#8C9EAF' }}>ISO 14971, CIP Protocol, CER</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="vol-select-price">₹3,499</div>
                      <button className="btn-vol-mini-add" onClick={() => addToCart('vol2')}>+ Add</button>
                    </div>
                  </div>

                  {/* Vol 3 */}
                  <div className="vol-select-item">
                    <div>
                      <div className="vol-select-name">Volume III: Biostatistics &amp; Ops</div>
                      <div style={{ fontSize: '0.75rem', color: '#8C9EAF' }}>CDISC, eCRF, Materiovigilance</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="vol-select-price">₹3,499</div>
                      <button className="btn-vol-mini-add" onClick={() => addToCart('vol3')}>+ Add</button>
                    </div>
                  </div>

                  {/* Vol 4 */}
                  <div className="vol-select-item">
                    <div>
                      <div className="vol-select-name">Volume IV: SaMD, AI &amp; Post-Market</div>
                      <div style={{ fontSize: '0.75rem', color: '#8C9EAF' }}>IEC 62304, GMLP, IVD, PMCF</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="vol-select-price">₹3,499</div>
                      <button className="btn-vol-mini-add" onClick={() => addToCart('vol4')}>+ Add</button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(3, 8, 14, 0.5)', border: '1px dashed rgba(199, 154, 86, 0.3)', borderRadius: '10px', padding: '1rem', textAlign: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#A9B8CA' }}>Ordering for an entire team or university library?</span><br/>
                <button onClick={() => setActiveView('books')} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.25rem' }}>
                  Inquire for Institutional Bulk Purchase Pricing →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
