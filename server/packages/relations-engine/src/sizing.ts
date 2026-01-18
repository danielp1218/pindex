import type { KellySizingInput, KellySizingResult } from './types';

const DEFAULT_EPSILON = 0.01;
const DEFAULT_KELLY_FRACTION = 0.25;
const DEFAULT_MAX_FRACTION = 0.02;

export function calculateKellySizing(input: KellySizingInput): KellySizingResult {
  const { marketProbability, coherentProbability, bankroll } = input;
  const epsilon = input.epsilon ?? DEFAULT_EPSILON;
  const edge = coherentProbability - marketProbability;

  if (!Number.isFinite(bankroll) || bankroll <= 0) {
    return { side: 'NONE', fraction: 0, stake: 0, edge };
  }

  if (
    !Number.isFinite(marketProbability) ||
    !Number.isFinite(coherentProbability) ||
    marketProbability <= 0 ||
    marketProbability >= 1
  ) {
    return { side: 'NONE', fraction: 0, stake: 0, edge };
  }

  if (Math.abs(edge) <= epsilon) {
    return { side: 'NONE', fraction: 0, stake: 0, edge };
  }

  let side: KellySizingResult['side'] = 'NONE';
  let kelly = 0;

  if (edge > 0) {
    side = 'YES';
    kelly = (coherentProbability - marketProbability) / (1 - marketProbability);
  } else if (edge < 0) {
    side = 'NO';
    kelly = (marketProbability - coherentProbability) / marketProbability;
  }

  if (!Number.isFinite(kelly) || kelly <= 0) {
    return { side: 'NONE', fraction: 0, stake: 0, edge };
  }

  const kellyFraction = input.kellyFraction ?? DEFAULT_KELLY_FRACTION;
  const maxFraction = input.maxFraction ?? DEFAULT_MAX_FRACTION;
  const fraction = Math.max(0, Math.min(kellyFraction * kelly, maxFraction));
  const stake = Math.max(0, bankroll * fraction);

  return {
    side,
    fraction,
    stake,
    edge,
  };
}
