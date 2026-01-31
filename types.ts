
export type TabType = 'TISS' | 'SOFA' | 'SOFA2';

export interface ScoreResult {
  score: number;
  interpretation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SofaInputs {
  respiration: number;
  coagulation: number;
  liver: number;
  cardiovascular: number;
  cns: number;
  renal: number;
}

export interface Sofa2Inputs extends SofaInputs {}

// Added missing QSofaInputs interface to fix import error in QSofaCalculator.tsx
export interface QSofaInputs {
  respiratoryRate: boolean;
  alteredMentality: boolean;
  systolicBP: boolean;
}

export interface TissItem {
  id: string;
  label: string;
  description: string;
  points: number;
  category: string;
}
