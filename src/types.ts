export type LanguageMode = 'en' | 'ur' | 'roman_ur';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface GovService {
  id: string;
  title: {
    en: string;
    ur: string;
  };
  category: 'nadra' | 'passport' | 'tax' | 'license' | 'domicile' | 'certificates' | 'jobs' | 'social';
  department: string;
  shortDesc: {
    en: string;
    ur: string;
  };
  eligibility: {
    en: string[];
    ur: string[];
  };
  requiredDocuments: {
    en: string[];
    ur: string[];
  };
  steps: {
    en: string[];
    ur: string[];
  };
  feeStructure: {
    en: string;
    ur: string;
  };
  processingTime: {
    en: string;
    ur: string;
  };
  officialUrl?: string;
  helpline?: string;
}

export interface EmergencyContact {
  id: string;
  title: {
    en: string;
    ur: string;
  };
  number: string;
  department: string;
  category: 'medical' | 'police' | 'fire' | 'women' | 'cyber' | 'child' | 'disaster';
  description: {
    en: string;
    ur: string;
  };
}

export interface SampleDocument {
  id: string;
  title: {
    en: string;
    ur: string;
  };
  category: string;
  sampleText: string;
  description: string;
}

export interface TariffSlab {
  minUnits: number;
  maxUnits: number;
  ratePerUnit: number;
  category: 'protected' | 'unprotected';
}
