export type VolumeId = 'vol-1' | 'vol-2' | 'vol-3' | 'vol-4' | 'vol1' | 'vol2' | 'vol3' | 'vol4' | 'bundle';

export interface BookVolume {
  id: VolumeId;
  volNum: number;
  volRoman: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  pages: number;
  chapters: number;
  isbn: string;
  publishYear: string;
  publisher: string;
  priceUSD: number;
  originalPriceUSD: number;
  priceINR: number;
  originalPriceINR: number;
  color: string;
  badge: string;
  description: string;
  highlightPoints: string[];
  targetAudience: string[];
  keyTopics: string[];
  tableOfContents: {
    chapterNumber: number;
    title: string;
    description: string;
  }[];
  regulatoryCoverage: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  designation: string;
  organization: string;
  organizationType: 'Government & Regulators' | 'Industry & MedTech' | 'CRO & Delivery' | 'Academic & Research';
  avatar?: string;
  rating: number;
  quoteTitle: string;
  fullQuote: string;
  date: string;
  verified: boolean;
  highlightBadge?: string;
  isRecommendationLetter?: boolean;
}

export interface PreviewTopic {
  id: string;
  volumeId: VolumeId;
  volumeLabel: string;
  chapterNumber: number;
  chapterTitle: string;
  topicTitle: string;
  category: 'Regulatory' | 'Clinical Strategy' | 'Data & Biostat' | 'SaMD & AI' | 'Risk & ISO' | 'Post-Market';
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  excerptMarkdown: string;
  sampleChecklist?: string[];
  standardsReferenced: string[];
}

export interface CartItem {
  id: VolumeId;
  title: string;
  subtitle: string;
  image: string;
  priceUSD: number;
  priceINR: number;
  quantity: number;
  isBundle?: boolean;
}

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP';

export type ActiveView = 'home' | 'about' | 'books' | 'preview' | 'reviews' | 'contact';
