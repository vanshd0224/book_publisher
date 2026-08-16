import { PreviewTopic } from '../types';

export const PREVIEW_TOPICS: PreviewTopic[] = [
  {
    id: 'top-1',
    volumeId: 'vol-1',
    volumeLabel: 'Volume I: Fundamentals & Regulatory Pathways',
    chapterNumber: 2,
    chapterTitle: 'Device Classification & Risk Categorization Frameworks',
    topicTitle: 'Universal Device Classification: FDA vs. EU MDR vs. IMDRF Rules',
    category: 'Regulatory',
    readTime: '8 min read',
    summary: 'A definitive comparative guide outlining how physical invasiveness, duration of human contact, and systemic effects determine medical device risk classification across global regulatory agencies.',
    keyTakeaways: [
      'Classification decision matrix across FDA 21 CFR 860 and EU MDR Annex VIII',
      'Rules 1 to 22 under EU MDR 2017/745 with actionable edge-case interpretations',
      'The critical boundary between Class IIa and Class IIb active therapeutic devices',
      'Strategies for borderline products combining drug-device constituent parts'
    ],
    excerptMarkdown: `1. The Core Philosophy of Risk-Based Classification

Medical device classification is anchored in the potential severity of harm to the patient or operator and the clinical invasiveness of the technology.

Risk Severity = f(Invasiveness, Contact Duration, Energy Delivered)

Key Comparison:
• Class I / Low Risk: General controls; mostly exempt from 510(k) or Notified Body intervention (e.g., surgical scalpels, manual wheelchairs).
• Class IIa / Moderate Risk: Special controls, performance standards, mandatory Notified Body review under EU MDR (e.g., infusion sets, hearing aids).
• Class IIb / High-Moderate Risk: Stringent conformity assessments, clinical evaluation dossier review (e.g., surgical lasers, lung ventilators).
• Class III / High Risk: Premarket Approval (PMA) / Full conformity assessment of design dossier (e.g., coronary stents, implantable cardiac pacemakers).

"A misclassification at inception can delay clinical trials by 18 to 36 months. Early jurisdictional mapping is essential." — Dr. Ashish Indani`,
    sampleChecklist: [
      'Confirm if device delivers ionizing vs non-ionizing radiation',
      'Determine continuous contact duration (<60 min, 30 days, or >30 days permanent)',
      'Assess software contribution to clinical decision making (SaMD Rule 11)',
      'Draft formal Intended Use and Indications for Use (IFU) statement'
    ],
    standardsReferenced: ['IMDRF/GRRP WG/N47', 'EU MDR 2017/745 Annex VIII', 'US FDA 21 CFR 860']
  },
  {
    id: 'top-2',
    volumeId: 'vol-1',
    volumeLabel: 'Volume I: Fundamentals & Regulatory Pathways',
    chapterNumber: 3,
    chapterTitle: 'The US FDA Pathway: 510(k), PMA, De Novo & Breakthrough',
    topicTitle: 'Substantial Equivalence & 510(k) Predicate Device Selection',
    category: 'Regulatory',
    readTime: '10 min read',
    summary: 'Mastering the 510(k) premarket notification process: algorithmic predicate search, technological difference justification, and split predicate prohibitions.',
    keyTakeaways: [
      'Criteria for establishing substantial equivalence without clinical trial requirements',
      'When bench testing and biocompatibility (ISO 10993) suffice vs. human trial triggers',
      'Navigating the FDA Q-Submission (Pre-Sub) program to lock down testing expectations',
      'Strategies for Breakthrough Device Designation and STeP programs'
    ],
    excerptMarkdown: `2. Navigating the 510(k) Predicate Decision Tree

Under Section 510(k) of the Food, Drug, and Cosmetic Act, a device is substantially equivalent if it has the same intended use as the predicate device AND:
1. It has the same technological characteristics; OR
2. It has different technological characteristics, but the data submitted demonstrates that the device is as safe and effective as the legally marketed device, and does not raise different questions of safety and effectiveness.

Pitfalls to Avoid:
• Split Predicates: Utilizing one predicate for intended use and another for technological features is prohibited.
• Reference Devices: Can only be used to support scientific methodology, not predicate status.`,
    sampleChecklist: [
      'Verify predicate device status in FDA 510(k) database',
      'Conduct side-by-side comparative table of physical & operational specs',
      'Perform ISO 10993-1 biological evaluation risk assessment',
      'Evaluate cybersecurity risks under Section 524B of the FD&C Act'
    ],
    standardsReferenced: ['FDA 21 CFR 807', 'FDA Guidance on 510(k) Substantial Equivalence', 'ISO 10993-1']
  },
  {
    id: 'top-3',
    volumeId: 'vol-2',
    volumeLabel: 'Volume II: Scientific Core, Clinical Trials & Risk Management',
    chapterNumber: 2,
    chapterTitle: 'Drafting the Clinical Investigation Plan (CIP)',
    topicTitle: 'ISO 14155:2020 CIP Architecture: Endpoints, Hypotheses & Safety Rules',
    category: 'Clinical Strategy',
    readTime: '12 min read',
    summary: 'A complete architectural blueprint for writing an audit-proof Clinical Investigation Plan under ISO 14155:2020, bridging scientific rigor with patient safety.',
    keyTakeaways: [
      'Structuring Primary and Secondary Performance Endpoints',
      'Device Deficiencies reporting: malfunctions vs user errors vs design flaws',
      'Safety reporting timelines: Adverse Device Effects (ADE) and Serious ADEs (SADE)',
      'Data Monitoring Committee (DMC) and Clinical Event Committee (CEC) charters'
    ],
    excerptMarkdown: `3. ISO 14155:2020 Standard Operating Requirements

The Clinical Investigation Plan (CIP) serves as the legal and scientific foundation for clinical trials of medical devices.

Key CIP Components:
• Clinical Rationale: Why clinical data is required instead of bench/pre-clinical testing alone.
• Hypothesis Formulation: Clear statistical null (H0) and alternative (H1) hypotheses.
• Device Traceability: Batch tracking, serialization, and storage control protocols.
• Adverse Event Escalation: UADE reporting to FDA within 10 working days; SADE reporting to EU competent authorities within 7 days for death/life-threatening events.`,
    sampleChecklist: [
      'Formulate primary composite safety & efficacy endpoint',
      'Define clear stop-study stopping rules and interim look criteria',
      'Establish blinding and masking procedures for sham-controlled trials',
      'Draft emergency unblinding SOP for investigational sites'
    ],
    standardsReferenced: ['ISO 14155:2020 Clause 5.4', 'MDCG 2021-6', 'ICH-GCP E6(R2)']
  },
  {
    id: 'top-4',
    volumeId: 'vol-2',
    volumeLabel: 'Volume II: Scientific Core, Clinical Trials & Risk Management',
    chapterNumber: 3,
    chapterTitle: 'Risk Management Integration: Linking ISO 14971 with Clinical Data',
    topicTitle: 'ISO 14971:2019 Risk-Benefit Analysis & Clinical Feedback Loops',
    category: 'Risk & ISO',
    readTime: '9 min read',
    summary: 'How to continuously synchronize the Device Risk Management File (RMF) with ongoing clinical trial safety signals and human factors observations.',
    keyTakeaways: [
      'Hazard Identification, Sequence of Events, and Hazardous Situations',
      'Quantifying Probability of Occurrence of Harm (P1 × P2)',
      'Risk Reduction Order of Precedence: Inherently Safe Design > Protective Measures > User Information',
      'Residual Risk Evaluation and Overall Benefit-Risk Ratio determination'
    ],
    excerptMarkdown: `4. Dynamic Risk Analysis During Clinical Investigations

ISO 14971:2019 requires manufacturers to continuously validate that residual risks are outweighed by expected clinical benefits.

Risk = Severity × Probability = Severity × (P1 × P2)

Where:
• P1: Probability of a hazardous situation occurring.
• P2: Probability of a hazardous situation leading to harm.

When an unexpected adverse device effect (UADE) occurs during a trial, the risk management file must be immediately updated to re-evaluate P1 and P2.`,
    sampleChecklist: [
      'Construct Risk Management Plan (RMP) linked to the CIP',
      'Map usability engineering risks under IEC 62366-1',
      'Execute Failure Mode and Effects Analysis (FMEA / FMECA)',
      'Compile Risk Management Report (RMR) for regulatory submission'
    ],
    standardsReferenced: ['ISO 14971:2019', 'ISO/TR 24971:2020', 'IEC 62366-1:2015']
  },
  {
    id: 'top-5',
    volumeId: 'vol-3',
    volumeLabel: 'Volume III: Clinical Data Management & Biostatistics',
    chapterNumber: 3,
    chapterTitle: 'Biostatistical Foundations: Hypotheses, Power & Sample Size',
    topicTitle: 'Sample Size Calculations for Non-Inferiority & Superiority Device Trials',
    category: 'Data & Biostat',
    readTime: '11 min read',
    summary: 'Mathematical formulations, non-inferiority margin (delta) justification, and statistical power considerations customized for device trials with active controls.',
    keyTakeaways: [
      'Non-inferiority margin justification using historical control data (FDA 95-95 rule)',
      'Sample size adjustment for attrition, non-compliance, and cross-over in surgical trials',
      'Type I (alpha) and Type II (beta) error allocation across co-primary endpoints',
      'Bayesian prior elicitation in pediatric and rare disease device investigations'
    ],
    excerptMarkdown: `5. Non-Inferiority Sample Size Formulation

For a binary primary endpoint with proportions pT (test device) and pC (control device), testing the non-inferiority hypothesis:

H0: pT - pC <= -delta   vs.   H1: pT - pC > -delta

Margin Justification Principle:
The margin delta must preserve at least 50% of the established effect of the active comparator against historical placebo.`,
    sampleChecklist: [
      'Define Type I error rate (alpha = 0.025 one-sided or 0.05 two-sided)',
      'Set target statistical power (1 - beta >= 80% or 90%)',
      'Account for anticipated loss-to-follow-up (typically 10% to 15%)',
      'Document sensitivity analyses for variable attrition rates'
    ],
    standardsReferenced: ['ICH E9 Statistical Principles for Clinical Trials', 'FDA Guidance on Non-Inferiority Studies', 'CDISC SDTM v3.3']
  },
  {
    id: 'top-6',
    volumeId: 'vol-4',
    volumeLabel: 'Volume IV: Software (SaMD), AI/ML & Post-Market Evidence',
    chapterNumber: 3,
    chapterTitle: 'Validating AI and Machine Learning Algorithms in Healthcare',
    topicTitle: 'Good Machine Learning Practice (GMLP) & Clinical AI Drift Monitoring',
    category: 'SaMD & AI',
    readTime: '14 min read',
    summary: 'Regulatory frameworks for locked vs adaptive AI algorithms, dataset provenance, ground truth validation, demographic bias mitigation, and post-market algorithmic drift detection.',
    keyTakeaways: [
      'The 10 Guiding Principles for Good Machine Learning Practice (FDA, Health Canada, MHRA)',
      'Establishing gold standard reference ground truth in radiological & pathological AI',
      'Predetermined Change Control Plans (PCCP) for continuously learning algorithms',
      'Measuring AUROC, Sensitivity, Specificity, and Positive Predictive Value in real-world clinical workflows'
    ],
    excerptMarkdown: `6. Clinical Validation of AI/ML-Enabled Medical Devices

Unlike static hardware devices, AI algorithms depend heavily on the statistical distribution of training data vs inference data.

Training Data Distribution (P_train) ---> [ Algorithm ] ---> High Accuracy
                                              |
Real-World Clinical Setting (P_deploy) --------> Algorithmic Drift & Performance Drop!

Predetermined Change Control Plan (PCCP):
Under the FDA Food and Drug Omnibus Reform Act (FDORA), sponsors can specify pre-authorized algorithmic retraining modifications in the original 510(k) or PMA, bypassing supplemental filings.`,
    sampleChecklist: [
      'Partition data into strictly independent Train, Validation, and Test cohorts',
      'Audit datasets for demographic, geographic, and scanner hardware bias',
      'Formulate Predetermined Change Control Plan (PCCP) protocols',
      'Implement real-time inference drift detection telemetry'
    ],
    standardsReferenced: ['FDA/Health Canada/MHRA GMLP 10 Principles', 'IMDRF SaMD N41', 'IEC 62304:2006+AMD1:2015']
  }
];
