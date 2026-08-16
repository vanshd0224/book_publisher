import { BookVolume } from '../types';

export const BUNDLE_DATA = {
  id: 'bundle' as const,
  title: 'Complete 4-Volume Master Reference Set',
  subtitle: 'The Definitive Global Handbook for Medical Device Clinical Research',
  tagline: 'Comprehensive 4-Volume Hardcover & Digital Collector Edition',
  image: '/order_books_full.png',
  heroPedestalImage: '/order_books_full.png',
  exactShowcaseImage: '/order_books_full.png',
  totalVolumes: 4,
  totalPages: 1850,
  totalChapters: 68,
  publisher: 'B Jain Publishers (P) Ltd.',
  isbn: '978-93-90558-88-9 (Set)',
  publishYear: '2026',
  priceUSD: 199,
  originalPriceUSD: 279,
  priceINR: 14999,
  originalPriceINR: 19999,
  savingsPercentage: '28% OFF',
  description: 'The master reference for medical device executives, clinical project managers, regulatory scientists, biostatisticians, and biomedical researchers. Contains the end-to-end blueprint from concept to global approval and post-market evidence.',
  includedVolumes: [
    'Volume I: Fundamentals & Global Regulatory Pathways',
    'Volume II: Scientific Core, Clinical Trials & Risk Management',
    'Volume III: Clinical Data Management & Biostatistics',
    'Volume IV: Software (SaMD), AI/ML & Post-Market Surveillance'
  ]
};

export const BOOKS_DATA: BookVolume[] = [
  {
    id: 'vol-1',
    volNum: 1,
    volRoman: 'Volume I',
    title: 'Fundamentals & Global Regulatory Pathways',
    subtitle: 'Device Classification, Pre-Market Approvals & Multi-Region Strategies',
    tagline: 'The foundational master guide to global regulatory architectures',
    image: '/v1_nobg.png',
    pages: 440,
    chapters: 16,
    isbn: '978-93-90558-84-1',
    publishYear: '2026',
    publisher: 'B Jain Publishers',
    priceUSD: 59,
    originalPriceUSD: 75,
    priceINR: 4499,
    originalPriceINR: 5499,
    color: 'from-amber-600 to-yellow-800',
    badge: 'Core Foundation',
    description: 'A deep, systematic breakdown of device classifications, regulatory pathways across FDA (510k, PMA, De Novo), EU MDR 2017/745, Health Canada, PMDA, and CDSCO. Provides clear decision trees and strategic roadmaps for market entry.',
    highlightPoints: [
      'Universal Device Classification Framework across major jurisdictions',
      'FDA 510(k) Substantial Equivalence vs. PMA vs. De Novo selection matrices',
      'EU MDR 2017/745 transition protocols and Notified Body engagement workflows',
      'Strategic early feasibility study (EFS) and IDE roadmap planning'
    ],
    targetAudience: [
      'Regulatory Affairs Specialists & Directors',
      'MedTech Startup Founders & CEOs',
      'Biomedical Product Strategy Leads',
      'Clinical Trial Project Managers'
    ],
    keyTopics: [
      'Medical Device Definition & Class Boundaries',
      'US FDA 21 CFR 812 & 814 Frameworks',
      'EU MDR Essential Requirements & Technical Files',
      'Pre-submission Meeting Strategies (Q-Subs)',
      'Global Harmonization Task Force (GHTF/IMDRF) Standards'
    ],
    tableOfContents: [
      { chapterNumber: 1, title: 'Evolution & Jurisdictional Landscape of Medical Device Regulations', description: 'Historical context, foundational directives, and modern convergence.' },
      { chapterNumber: 2, title: 'Device Classification & Risk Categorization Frameworks', description: 'Class I to Class III rules under FDA, EU MDR, and IMDRF guidelines.' },
      { chapterNumber: 3, title: 'The US FDA Pathway: 510(k), PMA, De Novo & Breakthrough', description: 'Comprehensive guide to selecting and executing US submission strategies.' },
      { chapterNumber: 4, title: 'EU MDR 2017/745: General Safety and Performance Requirements (GSPR)', description: 'Navigating technical documentation and Notified Body audits.' },
      { chapterNumber: 5, title: 'Global Market Access: Health Canada, PMDA Japan & CDSCO India', description: 'Harmonized submission files and country-specific considerations.' }
    ],
    regulatoryCoverage: ['US FDA 21 CFR 812/814', 'EU MDR 2017/745', 'IMDRF Guidelines', 'ISO 13485:2016']
  },
  {
    id: 'vol-2',
    volNum: 2,
    volRoman: 'Volume II',
    title: 'Scientific Core, Clinical Trials & Risk Management',
    subtitle: 'ISO 14155:2020 Compliance, CIP Protocol Architecture & ISO 14971 Integration',
    tagline: 'Designing and conducting rigorous, audit-proof clinical investigations',
    image: '/v2_nobg.png',
    pages: 490,
    chapters: 18,
    isbn: '978-93-90558-85-8',
    publishYear: '2026',
    publisher: 'B Jain Publishers',
    priceUSD: 59,
    originalPriceUSD: 75,
    priceINR: 4499,
    originalPriceINR: 5499,
    color: 'from-emerald-700 to-teal-900',
    badge: 'Clinical Core',
    description: 'Master the design, ethics, and operational execution of clinical investigations under ISO 14155:2020 and GCP. Seamlessly fuses clinical development with ISO 14971 risk management files and safety reporting.',
    highlightPoints: [
      'Step-by-step Clinical Investigation Plan (CIP) protocol drafting templates',
      'ISO 14155:2020 GCP alignment with ethics committee and IRB approvals',
      'Integration of ISO 14971 Device Risk Analysis into clinical endpoints',
      'Investigator Brochure (IB) architecture and First-in-Human trial oversight'
    ],
    targetAudience: [
      'Principal Investigators & Clinical Investigators',
      'Clinical Operations (ClinOps) Managers & CRAs',
      'Quality Assurance & Compliance Auditors',
      'Medical Directors & Safety Monitoring Boards'
    ],
    keyTopics: [
      'ISO 14155:2020 Good Clinical Practice for Devices',
      'Clinical Investigation Plan (CIP) Architecture',
      'Informed Consent in Critical & Emergency Settings',
      'Device Deficiencies & Adverse Event Classifications (ADE, SADE, USADE)',
      'Site Selection, Monitoring & Data Verification Standards'
    ],
    tableOfContents: [
      { chapterNumber: 1, title: 'Principles of ISO 14155:2020 and Device GCP Standards', description: 'Ethical considerations, investigator responsibilities, and quality systems.' },
      { chapterNumber: 2, title: 'Drafting the Clinical Investigation Plan (CIP)', description: 'Primary/secondary endpoints, sample rationale, and study design.' },
      { chapterNumber: 3, title: 'Risk Management Integration: Linking ISO 14971 with Clinical Data', description: 'Hazard identification, risk-benefit evaluations, and mitigation proofs.' },
      { chapterNumber: 4, title: 'Device Accountability, Deficiencies & Safety Reporting', description: 'Reporting timelines, causality assessments, and DSMB governance.' },
      { chapterNumber: 5, title: 'Site Selection, Audits & Inspection Readiness', description: 'Preparing clinical sites for FDA BIMO and EU competent authority audits.' }
    ],
    regulatoryCoverage: ['ISO 14155:2020', 'ISO 14971:2019', 'ICH-GCP E6(R2)', 'FDA 21 CFR 50/56/312']
  },
  {
    id: 'vol-3',
    volNum: 3,
    volRoman: 'Volume III',
    title: 'Clinical Data Management & Biostatistics',
    subtitle: 'Electronic Data Capture, CDISC Standards & Statistical Analysis Plans',
    tagline: 'Transforming clinical trial raw data into rock-solid statistical proof',
    image: '/v3_nobg.png',
    pages: 460,
    chapters: 17,
    isbn: '978-93-90558-86-5',
    publishYear: '2026',
    publisher: 'B Jain Publishers',
    priceUSD: 59,
    originalPriceUSD: 75,
    priceINR: 4499,
    originalPriceINR: 5499,
    color: 'from-blue-700 to-indigo-950',
    badge: 'Data & Analytics',
    description: 'The definitive handbook for biostatisticians and clinical data managers. Covers EDC system validation (21 CFR Part 11), CDISC ODM/SDTM models for devices, sample size calculations, non-inferiority margins, and interim analyses.',
    highlightPoints: [
      'Electronic Data Capture (EDC) design, eCRF specs, and 21 CFR Part 11 validation',
      'CDISC standards tailored specifically for medical device clinical registries',
      'Statistical Analysis Plan (SAP) templates and power calculations for devices',
      'Handling missing data, loss-to-follow-up, and non-inferiority margins'
    ],
    targetAudience: [
      'Biostatisticians & Statistical Programmers',
      'Clinical Data Managers & EDC Architects',
      'Medical Writers & Regulatory Submission Authors',
      'Clinical Database Administrators'
    ],
    keyTopics: [
      '21 CFR Part 11 & Annex 11 Electronic Records Compliance',
      'CDISC Device Domain Standards (DI, DO, DX)',
      'Sample Size Determination for Non-Inferiority & Equivalence',
      'Interim Analysis, Stopping Rules & DSMB Statistical Charters',
      'Audit Trails, Database Lock Procedures & Data Integrity'
    ],
    tableOfContents: [
      { chapterNumber: 1, title: 'Clinical Data Architecture & Electronic Systems Validation', description: '21 CFR Part 11 compliance, cloud EDC, and security frameworks.' },
      { chapterNumber: 2, title: 'eCRF Design & CDISC Standards for Medical Devices', description: 'Standardizing device variables, nomenclature, and tracking codes.' },
      { chapterNumber: 3, title: 'Biostatistical Foundations: Hypotheses, Power & Sample Size', description: 'Formulating robust statistical hypotheses for medical devices.' },
      { chapterNumber: 4, title: 'Advanced Trial Designs: Adaptive, Bayesian & Non-Inferiority', description: 'Applying modern trial methodologies to accelerate device development.' },
      { chapterNumber: 5, title: 'Data Cleaning, Query Resolution & Database Lock Protocols', description: 'Ensuring audit-ready data packages for regulatory submissions.' }
    ],
    regulatoryCoverage: ['21 CFR Part 11', 'CDISC SDTM/CDASH', 'ICH E9 Statistical Principles', 'GAMP 5 Validation']
  },
  {
    id: 'vol-4',
    volNum: 4,
    volRoman: 'Volume IV',
    title: 'Software (SaMD), AI/ML & Post-Market Evidence',
    subtitle: 'Digital Health, IEC 62304, Real-World Evidence & Post-Market Clinical Follow-up',
    tagline: 'The future of MedTech: Software as a Medical Device, AI models & continuous lifecycle evidence',
    image: '/v4_nobg.png',
    pages: 460,
    chapters: 17,
    isbn: '978-93-90558-87-2',
    publishYear: '2026',
    publisher: 'B Jain Publishers',
    priceUSD: 59,
    originalPriceUSD: 75,
    priceINR: 4499,
    originalPriceINR: 5499,
    color: 'from-purple-800 to-slate-900',
    badge: 'AI & Digital Health',
    description: 'Pioneering reference on Software as a Medical Device (SaMD), Artificial Intelligence & Machine Learning validation (Good Machine Learning Practice), IEC 62304 lifecycle management, cybersecurity, and EU MDR Post-Market Clinical Follow-up (PMCF).',
    highlightPoints: [
      'IMDRF SaMD Categorization & FDA Artificial Intelligence Action Plan execution',
      'IEC 62304 Software Lifecycle processes integrated with ISO 14971 risk files',
      'Good Machine Learning Practice (GMLP) for continuous learning algorithms',
      'EU MDR PMCF Plan design, PSUR reports, and Real-World Evidence (RWE) registries'
    ],
    targetAudience: [
      'Digital Health & SaMD Developers / Architects',
      'AI/ML Engineers in Healthcare & Life Sciences',
      'Post-Market Vigilance & Quality Officers',
      'Health Economics & Outcomes Research (HEOR) Specialists'
    ],
    keyTopics: [
      'IMDRF SaMD Framework & FDA Software Guidance',
      'IEC 62304 Software Life-Cycle Processes & Verification',
      'AI/ML Clinical Validation: Bias, Drift, and Generalizability',
      'Post-Market Clinical Follow-Up (PMCF) under EU MDR Article 74',
      'Periodic Safety Update Reports (PSUR) and Trend Analysis'
    ],
    tableOfContents: [
      { chapterNumber: 1, title: 'Software as a Medical Device (SaMD) Classification & Regulatory Matrix', description: 'IMDRF categories, FDA guidance, and EU MDR Rule 11.' },
      { chapterNumber: 2, title: 'IEC 62304 Compliance & Medical Device Cybersecurity', description: 'Architecture verification, software safety classes, and vulnerability management.' },
      { chapterNumber: 3, title: 'Validating AI and Machine Learning Algorithms in Healthcare', description: 'Training vs. test sets, algorithmic fairness, explainability, and drift detection.' },
      { chapterNumber: 4, title: 'EU MDR Post-Market Clinical Follow-Up (PMCF) Strategies', description: 'Proactive data collection, patient surveys, and clinical registries.' },
      { chapterNumber: 5, title: 'Real-World Evidence (RWE) & Lifecycle Vigilance Management', description: 'Utilizing EHRs, claim data, and registries for indication expansions.' }
    ],
    regulatoryCoverage: ['IEC 62304', 'FDA SaMD Action Plan', 'EU MDR Article 74/86 (PMCF/PSUR)', 'ISO 27001 Cybersecurity']
  }
];
