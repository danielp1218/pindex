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

// Helper function to extract slug from Polymarket URL
function extractSlugFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts[0] === 'event' && pathParts[1]) {
      return pathParts[1];
    }
    return null;
  } catch {
    return null;
  }
}

// Greenland demo slugs to match (root level)
const GREENLAND_ROOT_SLUGS = [
  'will-trump-acquire-greenland-before-2027',
  'will-trump-acquire-greenland-in-2025',
];

// Child slugs for tree structure
const GREENLAND_DEMO_SLUGS = new Set([
  ...GREENLAND_ROOT_SLUGS,
  'will-the-us-invade-greenland-in-2026',
  'trump-x-greenland-deal-signed-by-march-31',
  'greenland-independence-2027',
  'denmark-greenland-tariffs',
]);

// S3 bucket base URL for market images
const S3_BASE_URL = 'https://polymarket-upload.s3.us-east-2.amazonaws.com/';

// Check if URL is part of Greenland demo
function isGreenlandDemoUrl(url: string): boolean {
  const slug = extractSlugFromUrl(url);
  if (!slug) return false;
  return GREENLAND_DEMO_SLUGS.has(slug) || GREENLAND_ROOT_SLUGS.some(s => slug.includes(s));
}

// Get demo data based on which URL is being queried (creates tree structure)
function getGreenlandDemoData(url: string): DependenciesResponse | null {
  const slug = extractSlugFromUrl(url);
  if (!slug) return null;

  // ROOT: Will Trump acquire Greenland?
  // Returns 4 direct children
  if (GREENLAND_ROOT_SLUGS.some(s => slug.includes(s))) {
    return {
      sourceMarket: {
        id: 'greenland-source',
        slug: 'will-trump-acquire-greenland-before-2027',
        question: 'Will Trump acquire Greenland before 2027?',
        yesPercentage: 28,
        noPercentage: 72,
        probability: 0.28,
        weight: 1,
        decision: 'yes',
      },
      dependants: [
        {
          id: 'greenland-invade-2026',
          weight: 0.85,
          decision: 'yes',
          relation: 'IMPLIES',
          explanation: 'A US military invasion of Greenland would constitute a direct territorial takeover, virtually guaranteeing acquisition.',
          question: 'Will the U.S. invade Greenland in 2026?',
          url: 'https://polymarket.com/event/will-the-us-invade-greenland-in-2026',
          probability: 0.12,
          yesPercentage: 12,
          noPercentage: 88,
          imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
        },
        {
          id: 'greenland-deal-march',
          weight: 0.80,
          decision: 'yes',
          relation: 'SUBEVENT',
          explanation: 'A formal agreement between Trump and Greenland/Denmark is a necessary precursor to peaceful acquisition.',
          question: 'Trump x Greenland deal signed by March 31?',
          url: 'https://polymarket.com/event/trump-x-greenland-deal-signed-by-march-31',
          probability: 0.25,
          yesPercentage: 25,
          noPercentage: 75,
          imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
        },
        {
          id: 'greenland-independence-2027',
          weight: 0.75,
          decision: 'yes',
          relation: 'IMPLIES',
          explanation: 'An independent Greenland could negotiate directly with the US without Danish involvement.',
          question: 'Greenland declares independence before 2027?',
          url: 'https://polymarket.com/event/greenland-independence-2027',
          probability: 0.08,
          yesPercentage: 8,
          noPercentage: 92,
          imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
        },
        {
          id: 'nato-article-5-arctic',
          weight: 0.65,
          decision: 'no',
          relation: 'CONTRADICTS',
          explanation: 'NATO intervention would indicate allied opposition to US territorial ambitions, severely impeding acquisition.',
          question: 'NATO Article 5 invoked for Arctic dispute?',
          url: 'https://polymarket.com/event/nato-article-5-arctic',
          probability: 0.05,
          yesPercentage: 5,
          noPercentage: 95,
          imageUrl: `${S3_BASE_URL}russia-x-ukraine-ceasefire-in-2025-w2voYOygx80B.jpg`,
        },
      ],
    };
  }

  // CHILD: US Invade Greenland -> Military base, Trump visit
  if (slug === 'will-the-us-invade-greenland-in-2026') {
    return {
      sourceMarket: {
        id: 'greenland-invade-2026',
        slug: 'will-the-us-invade-greenland-in-2026',
        question: 'Will the U.S. invade Greenland in 2026?',
        yesPercentage: 12,
        noPercentage: 88,
        probability: 0.12,
      },
      dependants: [
        {
          id: 'us-military-base-greenland',
          weight: 0.72,
          decision: 'yes',
          relation: 'CONDITIONED_ON',
          explanation: 'Expanded US military presence establishes strategic infrastructure and de facto American control, a precursor to any military action.',
          question: 'US military base expansion in Greenland?',
          url: 'https://polymarket.com/event/us-military-base-greenland',
          probability: 0.42,
          yesPercentage: 42,
          noPercentage: 58,
          imageUrl: `${S3_BASE_URL}us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg`,
        },
        {
          id: 'trump-visit-greenland-2025',
          weight: 0.50,
          decision: 'yes',
          relation: 'WEAK_SIGNAL',
          explanation: 'A presidential visit would signal serious intent and could precede military planning discussions.',
          question: 'Will Trump visit Greenland in 2025?',
          url: 'https://polymarket.com/event/trump-visit-greenland-2025',
          probability: 0.35,
          yesPercentage: 35,
          noPercentage: 65,
          imageUrl: `${S3_BASE_URL}trump-invokes-the-insurrection-act-before-august-jR3s2WWoaIbY.jpg`,
        },
      ],
    };
  }

  // CHILD: Greenland Deal -> Denmark referendum, Denmark tariffs
  if (slug === 'trump-x-greenland-deal-signed-by-march-31') {
    return {
      sourceMarket: {
        id: 'greenland-deal-march',
        slug: 'trump-x-greenland-deal-signed-by-march-31',
        question: 'Trump x Greenland deal signed by March 31?',
        yesPercentage: 25,
        noPercentage: 75,
        probability: 0.25,
      },
      dependants: [
        {
          id: 'denmark-greenland-referendum',
          weight: 0.70,
          decision: 'yes',
          relation: 'SUBEVENT',
          explanation: 'A Danish referendum on Greenland\'s status would be a critical constitutional step toward any deal.',
          question: 'Will Denmark hold referendum on Greenland?',
          url: 'https://polymarket.com/event/denmark-greenland-referendum',
          probability: 0.18,
          yesPercentage: 18,
          noPercentage: 82,
          imageUrl: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
        },
        {
          id: 'denmark-greenland-tariffs',
          weight: 0.75,
          decision: 'yes',
          relation: 'CONDITIONED_ON',
          explanation: 'Tariffs on Denmark serve as economic coercion to pressure them into negotiating a deal.',
          question: 'Denmark Greenland Tariffs go into effect?',
          url: 'https://polymarket.com/event/denmark-greenland-tariffs',
          probability: 0.38,
          yesPercentage: 38,
          noPercentage: 62,
          imageUrl: `${S3_BASE_URL}jerome+powell+glasses1.png`,
        },
      ],
    };
  }

  // CHILD: Greenland Independence -> Panama Canal
  if (slug === 'greenland-independence-2027') {
    return {
      sourceMarket: {
        id: 'greenland-independence-2027',
        slug: 'greenland-independence-2027',
        question: 'Greenland declares independence before 2027?',
        yesPercentage: 8,
        noPercentage: 92,
        probability: 0.08,
      },
      dependants: [
        {
          id: 'panama-canal-2027',
          weight: 0.60,
          decision: 'yes',
          relation: 'WEAK_SIGNAL',
          explanation: 'Both markets reflect Trump\'s territorial expansion agenda. Success with Panama signals capability for Greenland.',
          question: 'US takes Panama Canal before 2027?',
          url: 'https://polymarket.com/event/us-takes-panama-canal-before-2027',
          probability: 0.16,
          yesPercentage: 16,
          noPercentage: 84,
          imageUrl: `${S3_BASE_URL}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`,
        },
      ],
    };
  }

  // GRANDCHILD: Denmark Tariffs -> Supreme Court tariffs
  if (slug === 'denmark-greenland-tariffs') {
    return {
      sourceMarket: {
        id: 'denmark-greenland-tariffs',
        slug: 'denmark-greenland-tariffs',
        question: 'Denmark Greenland Tariffs go into effect?',
        yesPercentage: 38,
        noPercentage: 62,
        probability: 0.38,
      },
      dependants: [
        {
          id: 'supreme-court-tariffs',
          weight: 0.55,
          decision: 'yes',
          relation: 'CONDITIONED_ON',
          explanation: 'SCOTUS validation of broad tariff authority is needed for Denmark tariffs to survive legal challenges.',
          question: 'Supreme Court rules in favor of Trump\'s tariffs?',
          url: 'https://polymarket.com/event/will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
          probability: 0.50,
          yesPercentage: 50,
          noPercentage: 50,
          imageUrl: `${S3_BASE_URL}who-will-trump-nominate-as-fed-chair-9p19ttRwsbKL.png`,
        },
      ],
    };
  }

  return null;
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
  imageUrl?: string;
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
  // Check for Greenland demo URL - return hardcoded data immediately
  if (isGreenlandDemoUrl(payload.url)) {
    const demoData = getGreenlandDemoData(payload.url);
    if (demoData) {
      return demoData;
    }
  }

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
