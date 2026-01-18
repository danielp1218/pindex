import type { RelationGraphNode } from '@/types/relationGraph';
import { graphToApiPayload } from './relationGraph';

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
  candidate: GraphOutcomeResult
): GraphOutcomeDelta {
  return {
    totalStake: candidate.totalStake - baseline.totalStake,
    worstCase: candidate.worstCase - baseline.worstCase,
    bestCase: candidate.bestCase - baseline.bestCase,
    expectedValue: candidate.expectedValue - baseline.expectedValue,
    roi: candidate.roi - baseline.roi,
  };
}

export async function fetchGraphOutcomes(
  graph: RelationGraphNode
): Promise<GraphOutcomeResult> {
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
