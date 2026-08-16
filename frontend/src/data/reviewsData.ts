import { ReviewItem } from '../types';

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rajiv Nath',
    designation: 'Forum Coordinator',
    organization: 'Association of Indian Medical Device Industry (AiMeD)',
    organizationType: 'Industry & MedTech',
    rating: 5,
    quoteTitle: 'A Monumental Contribution to Global MedTech Innovation',
    fullQuote: "Dr. Ashish Indani's four-volume masterwork fills a critical void in medical device clinical literature. For manufacturers, regulators, and clinical investigators worldwide, this comprehensive treatise provides an unmatched blend of regulatory rigor, clinical precision, and practical execution. It will undoubtedly serve as the benchmark reference for years to come.",
    date: 'February 2026',
    verified: true,
    highlightBadge: 'AiMeD Official Endorsement',
    isRecommendationLetter: true
  },
  {
    id: 'rev-2',
    name: 'Pavan Choudary',
    designation: 'Chairman & Director General',
    organization: 'Medical Technology Association of India (MTaI)',
    organizationType: 'Industry & MedTech',
    rating: 5,
    quoteTitle: 'An Indispensable Compendium for Healthcare Technology Leaders',
    fullQuote: 'Medical device clinical research requires a vastly different paradigm than pharmaceutical trials. Dr. Indani has masterfully articulated the nuances of ISO 14155, device lifecycle risk management, and the emerging frontiers of AI-driven diagnostics. A must-read for every medical technology executive and regulatory strategist.',
    date: 'January 2026',
    verified: true,
    highlightBadge: 'MTaI Recommendation',
    isRecommendationLetter: true
  },
  {
    id: 'rev-3',
    name: 'Dr. Jitendar Sharma',
    designation: 'Managing Director & CEO',
    organization: 'Andhra Pradesh MedTech Zone (AMTZ)',
    organizationType: 'Government & Regulators',
    rating: 5,
    quoteTitle: 'The Standard Operating Reference for Device Innovators',
    fullQuote: 'At AMTZ, where hundreds of cutting-edge biomedical devices are conceptualized and manufactured, having a standardized, rigorous clinical roadmap is paramount. Dr. Indani brings over two decades of clinical trial expertise into this definitive work. It bridges the gap between engineering innovation and patient safety proof.',
    date: 'February 2026',
    verified: true,
    highlightBadge: 'AMTZ MedTech Zone',
    isRecommendationLetter: true
  },
  {
    id: 'rev-4',
    name: 'Dr. G.N. Singh',
    designation: 'Former Drugs Controller General of India (DCGI)',
    organization: 'Central Drugs Standard Control Organisation (CDSCO)',
    organizationType: 'Government & Regulators',
    rating: 5,
    quoteTitle: 'A Masterclass in Harmonized Regulatory Science',
    fullQuote: "The alignment of Indian regulatory frameworks with global benchmarks like the US FDA and EU MDR is crucial for international competitiveness. Dr. Indani's structured analysis of device classifications, clinical evaluation reports, and post-market vigilance is lucid, authoritative, and deeply practical.",
    date: 'January 2026',
    verified: true,
    highlightBadge: 'Former DCGI',
    isRecommendationLetter: true
  },
  {
    id: 'rev-5',
    name: 'Marcus Vance, PhD',
    designation: 'VP of Regulatory Affairs & Clinical Strategy',
    organization: 'Global BioVascular Solutions, Switzerland',
    organizationType: 'Industry & MedTech',
    rating: 5,
    quoteTitle: 'The Most Complete EU MDR & ISO 14155 Guide Available',
    fullQuote: 'Navigating EU MDR 2017/745 and Notified Body requirements has been one of the toughest challenges for device sponsors. Volume I and II provide clear, actionable checklists that saved our regulatory team months of back-and-forth inquiries. This set is permanently on my desk.',
    date: 'March 2026',
    verified: true,
    highlightBadge: 'Global Regulatory Lead'
  },
  {
    id: 'rev-6',
    name: 'Dr. Elena Rostova',
    designation: 'Head of Biostatistics & Data Operations',
    organization: 'Nordic Health Clinical Sciences, Sweden',
    organizationType: 'CRO & Delivery',
    rating: 5,
    quoteTitle: 'Volume III is a Masterwork for Statistical Programmers',
    fullQuote: 'Finally, a textbook that treats medical device biostatistics with the specialized focus it deserves! The sections on non-inferiority margins, adaptive designs, and CDISC device domains are written with exceptional clarity and mathematical soundness.',
    date: 'February 2026',
    verified: true,
    highlightBadge: 'Biostatistics Lead'
  },
  {
    id: 'rev-7',
    name: 'Vikramaditya Rao',
    designation: 'Director of Clinical Operations',
    organization: 'Apex Life Sciences CRO',
    organizationType: 'CRO & Delivery',
    rating: 5,
    quoteTitle: 'Essential Training Material for Our Entire ClinOps Team',
    fullQuote: 'We ordered 15 full sets for our project managers, monitors, and data managers across our APAC centers. The practical examples of Investigator Brochures, CIP drafting, and safety event categorizations are unrivaled in quality.',
    date: 'January 2026',
    verified: true,
    highlightBadge: 'Enterprise CRO Customer'
  },
  {
    id: 'rev-8',
    name: 'Prof. Sarah Jenkins, MD, FACC',
    designation: 'Professor of Cardiovascular Engineering & Clinical Trials',
    organization: 'Boston Institute of Medical Technology, USA',
    organizationType: 'Academic & Research',
    rating: 5,
    quoteTitle: 'Academic Rigor Combined with Real-World Clinical Insight',
    fullQuote: 'As an educator and clinical investigator in interventional cardiology, I recommend this 4-volume set to all my graduate fellows and clinical investigators. It sets a new high-water mark for educational literature in MedTech.',
    date: 'February 2026',
    verified: true,
    highlightBadge: 'Academic Fellowship'
  },
  {
    id: 'rev-9',
    name: 'Anand K. Mehra',
    designation: 'Chief Technology Officer & AI Architect',
    organization: 'NeuroScribe Digital Health',
    organizationType: 'Industry & MedTech',
    rating: 5,
    quoteTitle: 'Volume IV demystifies SaMD, IEC 62304 and AI validation',
    fullQuote: 'Software as a Medical Device and AI algorithms introduce novel risks that traditional trial methodologies struggle to capture. Volume IV provides the exact frameworks needed for Good Machine Learning Practice, bias auditing, and continuous post-market surveillance.',
    date: 'March 2026',
    verified: true,
    highlightBadge: 'AI / SaMD Pioneer'
  }
];

export const STATS_DATA = [
  { value: '4', label: 'Definitive Volumes', suffix: '' },
  { value: '1850', label: 'In-Depth Pages', suffix: '+' },
  { value: '68', label: 'Comprehensive Chapters', suffix: '' },
  { value: '100', label: 'Regulatory Frameworks', suffix: '+' }
];
