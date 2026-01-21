import { BetRelationship } from '@/types/graph';

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'https://server.danielpu2007.workers.dev';

// Helper function to extract slug from Polymarket URL
function extractSlugFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    // URL format: /event/{slug} or /event/{slug}/{market-id}
    if (pathParts[0] === 'event' && pathParts[1]) {
      return pathParts[1];
    }
    return null;
  } catch {
    return null;
  }
}

export interface SourceMarket {
  id: string;
  question: string;
  slug: string;
}

export interface RelatedBet {
  marketId: string;
  question: string;
  slug: string;
  url: string;
  relationship: BetRelationship;
  reasoning: string;
  yesPercentage: number;
  noPercentage: number;
  imageUrl?: string;
}

export interface RelatedBetsResponse {
  sourceMarket: SourceMarket;
  relatedBets: RelatedBet[];
}

export interface StreamProgress {
  message: string;
  timestamp: number;
}

export interface FetchRelatedBetsOptions {
  url: string;
  signal?: AbortSignal;
  onProgress?: (progress: StreamProgress) => void;
}

// Greenland demo slugs to match
const GREENLAND_SLUGS = [
  'will-trump-acquire-greenland-before-2027',
  'will-trump-acquire-greenland-in-2025',
];

// S3 bucket base URL for market images
const S3_BASE_URL = 'https://polymarket-upload.s3.us-east-2.amazonaws.com/';

// Hardcoded demo data for Greenland market
const GREENLAND_DEMO_DATA: RelatedBetsResponse = {
  sourceMarket: {
    id: 'greenland-source',
    question: 'Will Trump acquire Greenland before 2027?',
    slug: 'will-trump-acquire-greenland-before-2027',
  },
  relatedBets: [
    {
      marketId: 'greenland-invade-2026',
      question: 'Will the U.S. invade Greenland in 2026?',
      slug: 'will-the-us-invade-greenland-in-2026',
      url: 'https://polymarket.com/event/will-the-us-invade-greenland-in-2026',
      relationship: 'IMPLIES',
      reasoning: 'A US military invasion of Greenland would constitute a direct territorial takeover, virtually guaranteeing acquisition. Historical precedent shows military occupation leads to permanent control, making this the strongest implication relationship.',
      yesPercentage: 12,
      noPercentage: 88,
      imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
    },
    {
      marketId: 'greenland-deal-march',
      question: 'Trump x Greenland deal signed by March 31?',
      slug: 'trump-x-greenland-deal-signed-by-march-31',
      url: 'https://polymarket.com/event/trump-x-greenland-deal-signed-by-march-31',
      relationship: 'SUBEVENT',
      reasoning: 'A formal agreement between Trump and Greenland/Denmark is a necessary precursor to peaceful acquisition. This market tracks a specific milestone within the broader acquisition timeline—without a deal, diplomatic acquisition cannot proceed.',
      yesPercentage: 25,
      noPercentage: 75,
      imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
    },
    {
      marketId: 'panama-canal-2027',
      question: 'US takes Panama Canal before 2027?',
      slug: 'us-takes-panama-canal-before-2027',
      url: 'https://polymarket.com/event/us-takes-panama-canal-before-2027',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Both markets reflect Trump\'s stated territorial expansion agenda. Success in acquiring Panama Canal control would demonstrate political will, establish international precedent, and signal capability for similar territorial acquisitions.',
      yesPercentage: 16,
      noPercentage: 84,
      imageUrl: `${S3_BASE_URL}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`,
    },
    {
      marketId: 'denmark-greenland-tariffs',
      question: 'Denmark Greenland Tariffs go into effect?',
      slug: 'denmark-greenland-tariffs',
      url: 'https://polymarket.com/event/denmark-greenland-tariffs',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Tariffs on Denmark serve as economic coercion in Greenland negotiations. Their implementation signals escalating pressure tactics designed to force Denmark to the negotiating table, directly conditioning the acquisition probability.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: `${S3_BASE_URL}jerome+powell+glasses1.png`,
    },
    {
      marketId: 'supreme-court-tariffs',
      question: 'Supreme Court rules in favor of Trump\'s tariffs?',
      slug: 'will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      url: 'https://polymarket.com/event/will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'SCOTUS validation of broad tariff authority would strengthen Trump\'s leverage in territorial negotiations. A favorable ruling removes legal obstacles to economic pressure campaigns that are central to the acquisition strategy.',
      yesPercentage: 50,
      noPercentage: 50,
      imageUrl: `${S3_BASE_URL}who-will-trump-nominate-as-fed-chair-9p19ttRwsbKL.png`,
    },
    {
      marketId: 'denmark-greenland-referendum',
      question: 'Will Denmark hold referendum on Greenland?',
      slug: 'denmark-greenland-referendum',
      url: 'https://polymarket.com/event/denmark-greenland-referendum',
      relationship: 'SUBEVENT',
      reasoning: 'A Danish referendum on Greenland\'s status would be a critical constitutional step toward any transfer of sovereignty. Without democratic approval in Denmark, acquisition through diplomatic means faces insurmountable legal barriers.',
      yesPercentage: 18,
      noPercentage: 82,
      imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
    },
    {
      marketId: 'greenland-independence-2027',
      question: 'Greenland declares independence before 2027?',
      slug: 'greenland-independence-2027',
      url: 'https://polymarket.com/event/greenland-independence-2027',
      relationship: 'IMPLIES',
      reasoning: 'An independent Greenland could negotiate directly with the US without Danish involvement. Independence would remove the primary legal barrier to acquisition, enabling bilateral negotiations and likely accelerating US territorial claims.',
      yesPercentage: 8,
      noPercentage: 92,
      imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
    },
    {
      marketId: 'trump-visit-greenland-2025',
      question: 'Will Trump visit Greenland in 2025?',
      slug: 'trump-visit-greenland-2025',
      url: 'https://polymarket.com/event/trump-visit-greenland-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'A presidential visit would signal serious intent and could catalyze negotiations. High-profile diplomatic engagement by a sitting president often precedes major territorial agreements and demonstrates political commitment.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: `${S3_BASE_URL}trump-invokes-the-insurrection-act-before-august-jR3s2WWoaIbY.jpg`,
    },
    {
      marketId: 'us-military-base-greenland',
      question: 'US military base expansion in Greenland?',
      slug: 'us-military-base-greenland',
      url: 'https://polymarket.com/event/us-military-base-greenland',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Expanded US military presence establishes strategic infrastructure and de facto American control. Military base agreements historically precede formal territorial arrangements, creating conditions favorable to acquisition.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: `${S3_BASE_URL}us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg`,
    },
    {
      marketId: 'nato-article-5-arctic',
      question: 'NATO Article 5 invoked for Arctic dispute?',
      slug: 'nato-article-5-arctic',
      url: 'https://polymarket.com/event/nato-article-5-arctic',
      relationship: 'CONTRADICTS',
      reasoning: 'NATO intervention in an Arctic dispute would indicate allied opposition to US territorial ambitions in Greenland. Article 5 invocation would create a direct military and diplomatic conflict that severely impedes any acquisition attempt.',
      yesPercentage: 5,
      noPercentage: 95,
      imageUrl: `${S3_BASE_URL}russia-x-ukraine-ceasefire-in-2025-w2voYOygx80B.jpg`,
    },
  ],
};

export async function fetchRelatedBets({
  url,
  signal,
  onProgress,
}: FetchRelatedBetsOptions): Promise<RelatedBetsResponse> {
  // Check for Greenland demo URL - return hardcoded data immediately
  const slug = extractSlugFromUrl(url);
  if (slug && GREENLAND_SLUGS.some(s => slug.includes(s))) {
    onProgress?.({
      message: 'Loading demo data for Greenland market...',
      timestamp: Date.now(),
    });
    return GREENLAND_DEMO_DATA;
  }

  const response = await fetch(`${API_BASE_URL}/api/related-bets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');

  // Handle SSE streaming response
  if (contentType?.includes('text/event-stream')) {
    return parseSSEStream(response, onProgress);
  }

  // Handle regular JSON response
  return response.json();
}

// Parse prefixed SSE data format: "log - {...}" or "final - {...}"
function parseSSEData(data: string): { type: 'log' | 'final' | 'unknown'; payload: any } {
  // Handle "log - {...}" format
  if (data.startsWith('log - ')) {
    try {
      const jsonPart = data.slice(6); // Remove "log - " prefix
      const parsed = JSON.parse(jsonPart);
      return { type: 'log', payload: parsed };
    } catch (e) {
      console.warn('Failed to parse log SSE data:', data);
      return { type: 'unknown', payload: null };
    }
  }

  // Handle "final - {...}" format
  if (data.startsWith('final - ')) {
    try {
      const jsonPart = data.slice(8); // Remove "final - " prefix
      const parsed = JSON.parse(jsonPart);
      return { type: 'final', payload: parsed };
    } catch (e) {
      console.warn('Failed to parse final SSE data:', data);
      return { type: 'unknown', payload: null };
    }
  }

  // Try parsing as raw JSON (fallback for direct JSON responses)
  try {
    const parsed = JSON.parse(data);
    // Check if it looks like a final result
    if (parsed.sourceMarket && parsed.relatedBets) {
      return { type: 'final', payload: parsed };
    }
    if (parsed.type === 'log' && parsed.message) {
      return { type: 'log', payload: parsed };
    }
    if (parsed.type === 'final' && parsed.data) {
      return { type: 'final', payload: parsed.data };
    }
    return { type: 'unknown', payload: parsed };
  } catch (e) {
    return { type: 'unknown', payload: null };
  }
}

async function parseSSEStream(
  response: Response,
  onProgress?: (progress: StreamProgress) => void
): Promise<RelatedBetsResponse> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';
  let finalResult: RelatedBetsResponse | null = null;
  let errorResult: string | null = null;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Parse SSE events from buffer
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; // Keep incomplete line in buffer

    for (const line of lines) {
      if (line.startsWith('event:')) {
        continue;
      }

      if (line.startsWith('data:')) {
        const data = line.slice(5).trim();

        if (!data) continue;

        const { type, payload } = parseSSEData(data);

        if (type === 'log' && payload?.message) {
          onProgress?.({
            message: payload.message,
            timestamp: Date.now(),
          });
        }

        if (type === 'final' && payload) {
          // Check if the final payload is an error
          if (payload.error) {
            errorResult = payload.error;
          } else if (payload.sourceMarket && payload.relatedBets) {
            finalResult = payload;
          }
        }
      }
    }
  }

  if (errorResult) {
    throw new Error(errorResult);
  }

  if (!finalResult) {
    throw new Error('No final result received from SSE stream');
  }

  return finalResult;
}
