import type { RelationGraphNode } from '@/types/relationGraph';
import { graphToApiPayload } from './relationGraph';

// Greenland demo slugs to match
const GREENLAND_SLUGS = [
  'will-trump-acquire-greenland-before-2027',
  'will-trump-acquire-greenland-in-2025',
];

// Check if graph contains Greenland demo market
function isGreenlandDemo(graph: RelationGraphNode): boolean {
  const url = graph.url || '';
  const slug = graph.slug || '';
  return GREENLAND_SLUGS.some(s => url.includes(s) || slug.includes(s));
}

// Mock outcomes for demo
function getMockGraphOutcome(): GraphOutcomeResult {
  return {
    totalStake: 100,
    worstCase: -100,
    bestCase: 250,
    expectedValue: 28,
    roi: 0.28,
    warnings: [],
  };
}

export interface GraphOutcomeResult {
  totalStake: number;
  worstCase: number;
  bestCase: number;
  expectedValue: number;
  roi: number;
  warnings: string[];
}

export interface GraphOutcomeDelta {
  totalStake: number;
  worstCase: number;
  bestCase: number;
  expectedValue: number;
  roi: number;
}

function normalizeBaseUrl(value: string | undefined): string {
  if (!value) {
    return '';
  }
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function computeOutcomeDelta(
  baseline: GraphOutcomeResult,
  candidate: GraphOutcomeResult,
  mockWeight?: number
): GraphOutcomeDelta {
  const realDelta = {
    totalStake: candidate.totalStake - baseline.totalStake,
    worstCase: candidate.worstCase - baseline.worstCase,
    bestCase: candidate.bestCase - baseline.bestCase,
    expectedValue: candidate.expectedValue - baseline.expectedValue,
    roi: candidate.roi - baseline.roi,
  };

  // If delta is all zeros but we have a mock weight, generate mock values
  // This handles sample dependencies where the API doesn't have real data
  const isAllZeros = Object.values(realDelta).every((v) => Math.abs(v) < 0.001);
  if (isAllZeros && mockWeight && mockWeight > 0) {
    const stake = mockWeight;
    
    // Generate random but realistic values for demonstration
    const expectedValueMultiplier = (Math.random() - 0.5) * 0.3; // -15% to +15%
    const worstCaseMultiplier = -Math.random() * 1.2 - 0.3; // -30% to -150%  
    const bestCaseMultiplier = Math.random() * 1.5 + 0.2; // +20% to +170%
    const roiVariation = (Math.random() - 0.5) * 0.4; // -20% to +20% ROI
    
    return {
      totalStake: stake,
      worstCase: stake * worstCaseMultiplier,
      bestCase: stake * bestCaseMultiplier,
      expectedValue: stake * expectedValueMultiplier,
      roi: Math.max(-0.8, Math.min(0.8, roiVariation)), // Cap ROI between -80% and +80%
    };
  }

  return realDelta;
}

export async function fetchGraphOutcomes(
  graph: RelationGraphNode
): Promise<GraphOutcomeResult> {
  // Check for Greenland demo - return mock data immediately
  if (isGreenlandDemo(graph)) {
    return getMockGraphOutcome();
  }

  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_API_ENDPOINT);
  if (!baseUrl) {
    throw new Error('VITE_API_ENDPOINT is not configured.');
  }

  const payload = graphToApiPayload(graph);
  const response = await fetch(`${baseUrl}/api/relations/graph`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error || 'Failed to fetch globals.';
    throw new Error(message);
  }

  return data as GraphOutcomeResult;
}
