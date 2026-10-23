export type Language = 'es' | 'fr' | 'en';

export type Currency = 'EUR' | 'XOF';

export interface ServiceItem {
  id: string;
  categoryNumber: string;
  title: string;
  shortDesc: string;
  problem: string;
  benefits: string[];
  targetAudience: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  conceptBadge: string;
  description: string;
  image: string;
  technologies: string[];
  scope: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceEUR: string;
  priceXOF: string;
  billingPeriod?: string;
  features: string[];
  highlight?: boolean;
  ctaText: string;
}

export interface WorkProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BusinessSolutionPoint {
  id: string;
  title: string;
  description: string;
  impact: string;
}

export interface InquiryData {
  id: string;
  date: string;
  fullName: string;
  email: string;
  company?: string;
  serviceId: string;
  budgetRange: string;
  message: string;
  language: Language;
}

export interface AgencyContactConfig {
  email: string;
  phoneWhatsapp: string;
  whatsappFormatted: string;
  city: string;
  operatingHours: string;
  calendarBookingUrl?: string;
}
