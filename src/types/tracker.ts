/**
 * Types for the Linklaters Global Sustainable Finance Tracker
 */

export type ActType = 'UPCOMING' | 'PAST';

export type JurisdictionCode =
  | 'EU'
  | 'UK'
  | 'US'
  | 'SG'
  | 'HK'
  | 'AU'
  | 'UAE'
  | 'BR'
  | 'ZA'
  | 'INT';

export interface RegulatoryAct {
  id: string;
  title: string;
  actType: ActType;
  topics: string[];
  date: string; // e.g. "30 June 2025" or "Q2 2025"
  dateIso: string; // ISO string for chronological sorting
  jurisdiction: string; // e.g. "European Union", "United Kingdom"
  jurisdictionCode: JurisdictionCode;
  regulator: string; // e.g. "ESMA / European Commission", "FCA", "SEC", "MAS"
  status:
    | 'In Force'
    | 'Final Rule Issued'
    | 'Phased Implementation'
    | 'Consultation Open'
    | 'Draft Legislation'
    | 'Supervisory Review';
  summary: string;
  detailedAnalysis: string;
  affectedSectors: string[];
  keyObligations: string[];
  strategicTakeaways: string[];
  relatedDirectives?: string[];
  lastUpdated: string;
  officialRefUrl?: string;
  impactLevel: 'Critical' | 'High' | 'Moderate';
}

export interface ExpertContact {
  id: string;
  name: string;
  termsOfAddress: string;
  jobTitle: string;
  officeLocation: string;
  email: string;
  phone: string;
  imageSrc: string;
  overview: string;
  experience: string[];
  education: string[];
  publishedWorks?: string[];
}

export interface JurisdictionSummary {
  code: JurisdictionCode;
  name: string;
  flagEmoji: string;
  regulators: string[];
  primaryFrameworks: string[];
  activeActsCount: number;
  upcomingMilestonesCount: number;
  keyTheme: string;
}

export interface FilterState {
  actType: ActType;
  searchTerm: string;
  selectedTopics: string[];
  selectedJurisdictions: string[];
  statusFilter: string[];
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  sortOption:
    | 'date-desc'
    | 'date-asc'
    | 'latest-updated'
    | 'jurisdiction-asc'
    | 'topic-asc';
}

export type ViewMode = 'table' | 'timeline' | 'jurisdictions';
