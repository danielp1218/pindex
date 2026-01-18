export type RelationType =
  | 'IMPLIES'
  | 'CONTRADICTS'
  | 'PARTITION_OF'
  | 'SUBEVENT'
  | 'CONDITIONED_ON'
  | 'WEAK_SIGNAL';

export interface EventInput {
  id: string;
  question?: string;
  resolutionCriteria?: string;
  endDate?: string;
  probabilityYes?: number;
  weight?: number;
}

export interface RelationMetadata {
  correlation?: number;
  epsilon?: number;
  notes?: string;
}

export interface RelationInput {
  relation: RelationType;
  root: EventInput;
  related: EventInput;
  metadata?: RelationMetadata;
}

export type FindingSeverity = 'error' | 'warning' | 'info';

export interface AnalysisFinding {
  code: string;
  severity: FindingSeverity;
  message: string;
}

export type GuidanceType = 'ARBITRAGE' | 'HEDGE' | 'RISK' | 'MANUAL_REVIEW';

export interface TradingGuidance {
  type: GuidanceType;
  message: string;
  targets?: string[];
}

export interface RelationMetrics {
  pRoot?: number;
  pRelated?: number;
  epsilon: number;
  correlation?: number;
  partitionSum?: number;
  partitionExpected?: number;
}

export interface RelationAnalysis {
  relation: RelationType;
  rootId: string;
  relatedId: string;
  findings: AnalysisFinding[];
  guidance: TradingGuidance[];
  metrics?: RelationMetrics;
}

export interface AnalysisOptions {
  epsilon?: number;
  weakSignalMaxCorrelation?: number;
}

export interface RelationsAnalysisResult {
  analyses: RelationAnalysis[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
  };
}

export interface PricingOptions {
  maxIterations?: number;
  tolerance?: number;
  defaultProbability?: number;
  weights?: Record<string, number>;
  epsilon?: number;
}

export type PricingDirection = 'BUY_YES' | 'BUY_NO' | 'NONE';

export interface PricingEdge {
  id: string;
  marketProbability?: number;
  coherentProbability: number;
  edge?: number;
  direction: PricingDirection;
}

export interface PricingWarning {
  code: string;
  message: string;
  ids?: string[];
}

export interface PricingResult {
  probabilities: Record<string, number>;
  edges: PricingEdge[];
  warnings: PricingWarning[];
  iterations: number;
  converged: boolean;
}

export interface KellySizingInput {
  marketProbability: number;
  coherentProbability: number;
  bankroll: number;
  kellyFraction?: number;
  maxFraction?: number;
  epsilon?: number;
}

export interface KellySizingResult {
  side: 'YES' | 'NO' | 'NONE';
  fraction: number;
  stake: number;
  edge: number;
}
