
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

/**
 * Interface for qSOFA (Quick SOFA) inputs
 * Used for screening sepsis outside of ICU settings
 */
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
