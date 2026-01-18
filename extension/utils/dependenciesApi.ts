export type DependencyDecision = 'yes' | 'no';

export interface DependenciesRequest {
  url: string;
  weight: number;
  decision?: DependencyDecision;
  volatility?: number;
  visited?: string[];
  options?: {
    epsilon?: number;
  };
}

export interface DependenciesDependant {
  id: string;
  weight: number;
  decision: DependencyDecision;
  relation: string;
  explanation?: string;
  question?: string;
  url?: string;
  probability?: number;
  yesPercentage?: number;
  noPercentage?: number;
}

export interface DependenciesSourceMarket {
  id: string;
  slug?: string;
  question?: string;
  yesPercentage?: number;
  noPercentage?: number;
  probability?: number;
  weight?: number;
  decision?: DependencyDecision;
}

export interface DependenciesResponse {
  sourceMarket?: DependenciesSourceMarket;
  dependants?: DependenciesDependant[];
  warnings?: string[];
  error?: string;
}

function normalizeBaseUrl(value: string | undefined): string {
  if (!value) {
    return '';
  }
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export async function fetchDependencies(
  payload: DependenciesRequest
): Promise<DependenciesResponse> {
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_API_ENDPOINT);
  if (!baseUrl) {
    throw new Error('VITE_API_ENDPOINT is not configured.');
  }

  const response = await fetch(`${baseUrl}/api/dependencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(payload),
  });

  if (!response.body) {
    throw new Error('No response body from /api/dependencies');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalPayload: DependenciesResponse | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() || '';

    for (const part of parts) {
      const line = part.split('\n').find(segment => segment.startsWith('data:'));
      if (!line) {
        continue;
      }

      const data = line.slice(5).trim();
      if (data.startsWith('final - ')) {
        const payloadText = data.slice(8);
        try {
          finalPayload = JSON.parse(payloadText) as DependenciesResponse;
        } catch (error) {
          throw new Error('Failed to parse dependencies response.');
        }
      }
    }
  }

  if (!finalPayload) {
    throw new Error('Missing final payload from /api/dependencies');
  }

  if (finalPayload.error) {
    throw new Error(finalPayload.error);
  }

  return finalPayload;
}
