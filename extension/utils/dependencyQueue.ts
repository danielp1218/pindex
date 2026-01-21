import { fetchDependencies, type DependencyDecision, type DependenciesResponse } from './dependenciesApi';
import {
  getDependencyState,
  setDependencyState,
  type DependencyQueueItem,
  getEventIdFromUrl,
} from './eventStorage';

interface ProcessDecisionInput {
  eventUrl: string;
  keep: boolean;
  fallbackDecision?: DependencyDecision;
  fallbackWeight?: number;
  risk?: number;
}

export interface DependencyDecisionResult {
  response?: DependenciesResponse;
  queue: DependencyQueueItem[];
  visited: string[];
}

function toUnique(urls: string[]): string[] {
  return Array.from(new Set(urls.filter(Boolean)));
}

function extractQueueUrls(items: DependencyQueueItem[]): string[] {
  return items.map(item => item.url).filter(Boolean);
}

function extractQueueIds(items: DependencyQueueItem[]): string[] {
  return items.map(item => item.id).filter(Boolean);
}

function deduplicateQueue(items: DependencyQueueItem[]): DependencyQueueItem[] {
  const seen = new Set<string>();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function normalizeRisk(value: number | undefined): number {
  if (!Number.isFinite(value ?? NaN)) {
    return 50;
  }
  if ((value as number) < 0) {
    return 0;
  }
  if ((value as number) > 100) {
    return 100;
  }
  return value as number;
}

// Topic detection for sample fallback
type TopicType = 'politics' | 'crypto' | 'sports' | 'economy' | 'default';

function detectTopic(question: string, slug: string): TopicType {
  const text = `${question} ${slug}`.toLowerCase();

  // Politics keywords
  const politicsKeywords = [
    'trump', 'biden', 'republican', 'democrat', 'senate', 'congress',
    'election', 'president', 'governor', 'vote', 'political', 'gop',
    'white house', 'cabinet', 'nomination', 'impeach', 'legislation'
  ];
  if (politicsKeywords.some(kw => text.includes(kw))) {
    return 'politics';
  }

  // Crypto keywords
  const cryptoKeywords = [
    'bitcoin', 'btc', 'ethereum', 'eth', 'crypto', 'blockchain',
    'solana', 'sol', 'dogecoin', 'doge', 'token', 'defi', 'nft'
  ];
  if (cryptoKeywords.some(kw => text.includes(kw))) {
    return 'crypto';
  }

  // Sports keywords
  const sportsKeywords = [
    'nba', 'nfl', 'mlb', 'nhl', 'championship', 'playoff', 'super bowl',
    'world series', 'finals', 'lakers', 'celtics', 'yankees', 'soccer',
    'football', 'basketball', 'baseball', 'hockey', 'tennis', 'golf'
  ];
  if (sportsKeywords.some(kw => text.includes(kw))) {
    return 'sports';
  }

  // Economy keywords
  const economyKeywords = [
    'gdp', 'inflation', 'fed', 'interest rate', 'recession', 'stock',
    'market', 's&p', 'nasdaq', 'dow', 'economy', 'unemployment', 'cpi'
  ];
  if (economyKeywords.some(kw => text.includes(kw))) {
    return 'economy';
  }

  return 'default';
}

interface SampleData {
  url: string;
  question: string;
  relation: string;
  explanation: string;
  imageUrl: string; // empty string = fetch real image from Polymarket
  probability: number;
  yesPercentage: number;
  noPercentage: number;
}

// Multiple samples per topic for variety
// Using valid BetRelationship types: IMPLIES, CONTRADICTS, PARTITION_OF, SUBEVENT, CONDITIONED_ON, WEAK_SIGNAL
// Real Polymarket event URLs with S3 image URLs for proper display
const S3_BASE = 'https://polymarket-upload.s3.us-east-2.amazonaws.com/';

const TOPIC_SAMPLES: Record<TopicType, SampleData[]> = {
  politics: [
    {
      url: 'https://polymarket.com/event/presidential-election-winner-2028',
      question: 'Who will win the 2028 US Presidential Election?',
      relation: 'IMPLIES',
      explanation: 'Presidential outcomes shape the direction of policy and governance.',
      imageUrl: `${S3_BASE}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`,
      probability: 0.55,
      yesPercentage: 55,
      noPercentage: 45,
    },
    {
      url: 'https://polymarket.com/event/who-will-trump-nominate-as-fed-chair',
      question: 'Who will Trump nominate as the next Federal Reserve Chair?',
      relation: 'CONDITIONED_ON',
      explanation: 'Fed Chair nomination depends on administration priorities and economic outlook.',
      imageUrl: `${S3_BASE}who-will-trump-nominate-as-fed-chair-9p19ttRwsbKL.png`,
      probability: 0.35,
      yesPercentage: 35,
      noPercentage: 65,
    },
    {
      url: 'https://polymarket.com/event/will-trump-acquire-greenland-before-2027',
      question: 'Will the US acquire Greenland before 2027?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Geopolitical moves reflect broader foreign policy priorities.',
      imageUrl: `${S3_BASE}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
      probability: 0.28,
      yesPercentage: 28,
      noPercentage: 72,
    },
    {
      url: 'https://polymarket.com/event/democratic-presidential-nominee-2028',
      question: 'Who will be the 2028 Democratic Presidential Nominee?',
      relation: 'IMPLIES',
      explanation: 'Primary outcomes determine general election dynamics.',
      imageUrl: `${S3_BASE}democrats+2028+donkey.png`,
      probability: 0.42,
      yesPercentage: 42,
      noPercentage: 58,
    },
    {
      url: 'https://polymarket.com/event/republican-presidential-nominee-2028',
      question: 'Who will be the 2028 Republican Presidential Nominee?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Nomination races signal party direction and voter sentiment.',
      imageUrl: `${S3_BASE}republicans+2028.png`,
      probability: 0.38,
      yesPercentage: 38,
      noPercentage: 62,
    },
    {
      url: 'https://polymarket.com/event/insurrection-act-invoked-by',
      question: 'Will Trump invoke the Insurrection Act before August 2026?',
      relation: 'CONDITIONED_ON',
      explanation: 'Use of emergency powers depends on civil unrest and policy stance.',
      imageUrl: `${S3_BASE}trump-invokes-the-insurrection-act-before-august-jR3s2WWoaIbY.jpg`,
      probability: 0.22,
      yesPercentage: 22,
      noPercentage: 78,
    },
  ],
  crypto: [
    {
      url: 'https://polymarket.com/event/what-price-will-bitcoin-hit-in-january-2026',
      question: 'What price will Bitcoin reach in January 2026?',
      relation: 'IMPLIES',
      explanation: 'Bitcoin price movements often lead broader crypto market trends.',
      imageUrl: `${S3_BASE}BTC+fullsize.png`,
      probability: 0.42,
      yesPercentage: 42,
      noPercentage: 58,
    },
    {
      url: 'https://polymarket.com/event/what-price-will-ethereum-hit-in-january-2026',
      question: 'What price will Ethereum reach in January 2026?',
      relation: 'IMPLIES',
      explanation: 'Ethereum price correlates with overall crypto market sentiment.',
      imageUrl: `${S3_BASE}ETH+fullsize.jpg`,
      probability: 0.38,
      yesPercentage: 38,
      noPercentage: 62,
    },
    {
      url: 'https://polymarket.com/event/what-price-will-solana-hit-in-january-2026',
      question: 'What price will Solana reach in January 2026?',
      relation: 'CONDITIONED_ON',
      explanation: 'Solana performance depends on network activity and ecosystem growth.',
      imageUrl: `${S3_BASE}SOL-logo.png`,
      probability: 0.35,
      yesPercentage: 35,
      noPercentage: 65,
    },
    {
      url: 'https://polymarket.com/event/bitcoin-up-or-down-on-january-18',
      question: 'Will Bitcoin close higher today than yesterday?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Daily price movements reflect short-term market sentiment.',
      imageUrl: `${S3_BASE}BTC+fullsize.png`,
      probability: 0.52,
      yesPercentage: 52,
      noPercentage: 48,
    },
    {
      url: 'https://polymarket.com/event/ethereum-price-on-january-18',
      question: 'Will Ethereum be above $4,000 on January 18?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Short-term ETH movements track with broader market conditions.',
      imageUrl: `${S3_BASE}ETH+fullsize.jpg`,
      probability: 0.48,
      yesPercentage: 48,
      noPercentage: 52,
    },
    {
      url: 'https://polymarket.com/event/solana-price-on-january-18',
      question: 'Will Solana be above $200 on January 18?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Daily SOL price reflects ecosystem momentum.',
      imageUrl: `${S3_BASE}SOL-logo.png`,
      probability: 0.45,
      yesPercentage: 45,
      noPercentage: 55,
    },
  ],
  sports: [
    {
      url: 'https://polymarket.com/event/super-bowl-champion-2026-731',
      question: 'Who will win Super Bowl LX in 2026?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Championship predictions reflect team performance throughout the season.',
      imageUrl: `${S3_BASE}football-logo.png`,
      probability: 0.68,
      yesPercentage: 68,
      noPercentage: 32,
    },
    {
      url: 'https://polymarket.com/event/2026-nba-champion',
      question: 'Who will win the 2026 NBA Championship?',
      relation: 'WEAK_SIGNAL',
      explanation: 'NBA championship odds shift with playoff performance.',
      imageUrl: `${S3_BASE}super+cool+basketball+in+red+and+blue+wow.png`,
      probability: 0.15,
      yesPercentage: 15,
      noPercentage: 85,
    },
    {
      url: 'https://polymarket.com/event/nfl-hou-ne-2025-01-18',
      question: 'Will the Houston Texans beat the New England Patriots?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Game outcomes affect playoff positioning.',
      imageUrl: `${S3_BASE}nfl.png`,
      probability: 0.55,
      yesPercentage: 55,
      noPercentage: 45,
    },
    {
      url: 'https://polymarket.com/event/nba-orl-mem-2026-01-18',
      question: 'Will the Orlando Magic beat the Memphis Grizzlies?',
      relation: 'IMPLIES',
      explanation: 'Regular season results influence championship odds.',
      imageUrl: `${S3_BASE}super+cool+basketball+in+red+and+blue+wow.png`,
      probability: 0.48,
      yesPercentage: 48,
      noPercentage: 52,
    },
    {
      url: 'https://polymarket.com/event/nfl-la-chi-2026-01-18',
      question: 'Will the LA Rams beat the Chicago Bears?',
      relation: 'CONDITIONED_ON',
      explanation: 'Division matchups affect conference standings.',
      imageUrl: `${S3_BASE}nfl.png`,
      probability: 0.62,
      yesPercentage: 62,
      noPercentage: 38,
    },
  ],
  economy: [
    {
      url: 'https://polymarket.com/event/fed-decision-in-january',
      question: 'Will the Fed cut interest rates in January 2026?',
      relation: 'CONDITIONED_ON',
      explanation: 'Fed policy decisions have cascading effects on financial markets.',
      imageUrl: `${S3_BASE}jerome+powell+glasses1.png`,
      probability: 0.35,
      yesPercentage: 35,
      noPercentage: 65,
    },
    {
      url: 'https://polymarket.com/event/us-strikes-iran-by',
      question: 'Will the US conduct military strikes on Iran by October 2026?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Geopolitical tensions affect oil prices and market stability.',
      imageUrl: `${S3_BASE}us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg`,
      probability: 0.22,
      yesPercentage: 22,
      noPercentage: 78,
    },
    {
      url: 'https://polymarket.com/event/russia-x-ukraine-ceasefire-before-2027',
      question: 'Will there be a Russia-Ukraine ceasefire before 2027?',
      relation: 'IMPLIES',
      explanation: 'Conflict resolution would significantly impact global markets.',
      imageUrl: `${S3_BASE}russia-x-ukraine-ceasefire-in-2025-w2voYOygx80B.jpg`,
      probability: 0.28,
      yesPercentage: 28,
      noPercentage: 72,
    },
    {
      url: 'https://polymarket.com/event/portugal-presidential-election',
      question: 'Who will win the 2026 Portugal Presidential Election?',
      relation: 'WEAK_SIGNAL',
      explanation: 'European elections affect EU policy direction.',
      imageUrl: `${S3_BASE}portugal-presidential-election-_h_A97vllNOX.png`,
      probability: 0.45,
      yesPercentage: 45,
      noPercentage: 55,
    },
    {
      url: 'https://polymarket.com/event/largest-company-end-of-june-712',
      question: 'Which company will have the largest market cap by June 30, 2026?',
      relation: 'IMPLIES',
      explanation: 'Market cap rankings reflect tech and AI sector momentum.',
      imageUrl: `${S3_BASE}largest-company-eoy-KS99l6lbxfCc.jpg`,
      probability: 0.58,
      yesPercentage: 58,
      noPercentage: 42,
    },
  ],
  default: [
    {
      url: 'https://polymarket.com/event/which-company-has-the-best-ai-model-end-of-january',
      question: 'Which company will have the best AI model by end of January 2026?',
      relation: 'IMPLIES',
      explanation: 'AI leadership affects company valuations and market dynamics.',
      imageUrl: `${S3_BASE}which-company-has-best-ai-model-end-of-september-MmASwbTkwKHi.jpg`,
      probability: 0.72,
      yesPercentage: 72,
      noPercentage: 28,
    },
    {
      url: 'https://polymarket.com/event/grok-4pt20-released-by',
      question: 'Will xAI release Grok 4.20 before March 2026?',
      relation: 'CONDITIONED_ON',
      explanation: 'AI release timelines depend on development progress and competition.',
      imageUrl: `${S3_BASE}grok-4pt20-released-by-FREAnoCYA7aN.jpg`,
      probability: 0.45,
      yesPercentage: 45,
      noPercentage: 55,
    },
    {
      url: 'https://polymarket.com/event/tesla-launches-unsupervised-full-self-driving-fsd-by',
      question: 'Will Tesla launch unsupervised Full Self-Driving by June 2026?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Autonomous vehicle progress affects Tesla valuation.',
      imageUrl: `${S3_BASE}tesla-launches-unsupervised-full-self-driving-fsd-by-june-30-yvpjn3RX4Q2w.jpg`,
      probability: 0.32,
      yesPercentage: 32,
      noPercentage: 68,
    },
    {
      url: 'https://polymarket.com/event/anthropic-ipo-closing-market-cap',
      question: "What will be Anthropic's market cap at IPO?",
      relation: 'IMPLIES',
      explanation: 'AI company valuations reflect sector growth expectations.',
      imageUrl: `${S3_BASE}anthropic-ipo-closing-market-cap-jdfele1g0krx.png`,
      probability: 0.38,
      yesPercentage: 38,
      noPercentage: 62,
    },
    {
      url: 'https://polymarket.com/event/openai-ipo-by',
      question: 'Will OpenAI go public by December 2026?',
      relation: 'WEAK_SIGNAL',
      explanation: 'Major AI IPOs signal market appetite for tech investments.',
      imageUrl: `${S3_BASE}openai-ipo-by-qeh3ouQDANVw.jpg`,
      probability: 0.28,
      yesPercentage: 28,
      noPercentage: 72,
    },
    {
      url: 'https://polymarket.com/event/will-elon-musk-win-his-case-against-sam-altman',
      question: 'Will Elon Musk win his lawsuit against Sam Altman?',
      relation: 'CONDITIONED_ON',
      explanation: 'Legal outcomes affect OpenAI structure and AI industry dynamics.',
      imageUrl: `${S3_BASE}will-elon-musk-win-his-case-against-sam-altman-3b7rjuMNHGHy.jpg`,
      probability: 0.35,
      yesPercentage: 35,
      noPercentage: 65,
    },
  ],
};

function getSampleForTopic(topic: TopicType, sourceQuestion: string, index = 0): SampleData {
  const samples = TOPIC_SAMPLES[topic] || TOPIC_SAMPLES.default;
  return samples[index % samples.length];
}

// Sample fallback dependency when API returns empty
function createSampleDependency(
  sourceMarket: any,
  options: { parentId?: string; parentUrl?: string; index?: number; previousQuestion?: string }
): DependencyQueueItem {
  const sourceSlug = typeof sourceMarket?.slug === 'string' ? sourceMarket.slug : undefined;
  const sourceUrl = sourceSlug ? `https://polymarket.com/event/${sourceSlug}` : options.parentUrl;
  const sourceQuestion =
    typeof sourceMarket?.question === 'string'
      ? sourceMarket.question
      : options.previousQuestion
        ? options.previousQuestion
        : sourceSlug
          ? sourceSlug.replace(/-/g, ' ')
          : 'Current Market Position';

  // Detect topic and get relevant sample
  const topic = detectTopic(sourceQuestion, sourceSlug || '');
  const sample = getSampleForTopic(topic, sourceQuestion, options.index ?? 0);

  return {
    id: `sample-${Date.now()}-${options.index ?? 0}`,
    url: sample.url,
    weight: 0.75 - (options.index ?? 0) * 0.1, // Slightly decrease weight for each sample
    decision: 'yes',
    relation: sample.relation,
    imageUrl: sample.imageUrl || undefined, // undefined so app fetches real image
    parentId: options.parentId,
    parentUrl: options.parentUrl,
    sourceId: sourceMarket?.id,
    sourceSlug,
    sourceUrl,
    sourceQuestion,
    explanation: sample.explanation,
    question: sample.question,
    probability: sample.probability,
    yesPercentage: sample.yesPercentage,
    noPercentage: sample.noPercentage,
  };
}

// Create multiple sample dependencies to fill queue
function createSampleDependencies(
  sourceMarket: any,
  options: { parentId?: string; parentUrl?: string },
  count: number,
  existingIds: Set<string>
): DependencyQueueItem[] {
  const samples: DependencyQueueItem[] = [];
  let previousQuestion: string | undefined;

  for (let i = 0; i < count; i++) {
    const sample = createSampleDependency(sourceMarket, { ...options, index: i, previousQuestion });
    if (!existingIds.has(sample.id) && !existingIds.has(sample.url)) {
      samples.push(sample);
      existingIds.add(sample.id);
      existingIds.add(sample.url);
      // Next sample's source will be this sample's question
      previousQuestion = sample.question;
    }
  }
  return samples;
}

function mapDependantsToQueue(
  dependants: any[],
  sourceMarket: any,
  visited: string[],
  options: { parentId?: string; parentUrl?: string }
): DependencyQueueItem[] {
  if (!Array.isArray(dependants)) {
    return [];
  }

  const sourceSlug = typeof sourceMarket?.slug === 'string' ? sourceMarket.slug : undefined;
  const sourceUrl = sourceSlug ? `https://polymarket.com/event/${sourceSlug}` : undefined;
  const sourceQuestion =
    typeof sourceMarket?.question === 'string'
      ? sourceMarket.question
      : sourceSlug
        ? sourceSlug.replace(/-/g, ' ')
        : undefined;
  const sourceId = typeof sourceMarket?.id === 'string' ? sourceMarket.id : undefined;

  // Convert visited URLs to event IDs for more robust comparison
  const visitedIds = new Set(
    visited.map(url => getEventIdFromUrl(url)).filter(Boolean)
  );
  // Also track visited URLs directly for fallback comparison
  const visitedUrlSet = new Set(visited);

  return dependants
    .filter(dep => typeof dep?.url === 'string' && dep.url.length > 0)
    .filter(dep => {
      // Skip if URL is already in visited set
      if (visitedUrlSet.has(dep.url)) return false;
      // Skip if event ID is already in visited IDs
      const depId = getEventIdFromUrl(dep.url);
      if (depId && visitedIds.has(depId)) return false;
      return true;
    })
    .map(dep => {
      const imageUrl =
        typeof dep.imageUrl === 'string'
          ? dep.imageUrl
          : typeof dep.image === 'string'
            ? dep.image
            : undefined;

      return {
        id: String(dep.id ?? dep.url),
        url: dep.url,
        weight: typeof dep.weight === 'number' ? dep.weight : 0,
        decision: dep.decision === 'no' ? 'no' : 'yes',
        relation: String(dep.relation ?? ''),
        imageUrl,
        parentId: options.parentId,
        parentUrl: options.parentUrl,
        sourceId,
        sourceSlug,
        sourceUrl,
        sourceQuestion,
        explanation: dep.explanation,
        question: dep.question,
        probability: typeof dep.probability === 'number' ? dep.probability : undefined,
        yesPercentage: typeof dep.yesPercentage === 'number' ? dep.yesPercentage : undefined,
        noPercentage: typeof dep.noPercentage === 'number' ? dep.noPercentage : undefined,
      };
    });
}

export async function processDependencyDecision({
  eventUrl,
  keep,
  fallbackDecision = 'yes',
  fallbackWeight = 1,
  risk,
}: ProcessDecisionInput): Promise<DependencyDecisionResult> {
  const state = await getDependencyState(eventUrl);
  // Deduplicate queue to handle any legacy duplicates in storage
  const queue = deduplicateQueue(state.queue);
  const visited = state.visited;
  let hasInitialFetch = state.hasInitialFetch ?? false;

  const current = queue[0] ?? null;
  const remainingQueue = current ? queue.slice(1) : queue;

  const currentUrl = current?.url || eventUrl;
  const currentDecision = current?.decision ?? fallbackDecision;
  const currentWeight = typeof current?.weight === 'number' ? current.weight : fallbackWeight;
  const rootId = getEventIdFromUrl(eventUrl) ?? 'root';

  let nextQueue = remainingQueue;
  let nextVisited = toUnique([
    ...visited,
    currentUrl,
    ...extractQueueUrls(remainingQueue),
  ]);

  if (!keep) {
    await setDependencyState(eventUrl, nextQueue, nextVisited, hasInitialFetch);
    return { queue: nextQueue, visited: nextVisited };
  }

  let response: DependenciesResponse | undefined;
  const shouldFetchMore = remainingQueue.length === 0;

  if (shouldFetchMore) {
    const volatility = 0.5 + normalizeRisk(risk) / 100;
    const parentId = current?.id ?? rootId;
    const existingIds = new Set(extractQueueIds(nextQueue));
    const existingUrls = new Set(extractQueueUrls(nextQueue));

    // First call: make real API call; subsequent calls: use hardcoded samples only
    if (!hasInitialFetch) {
      try {
        response = await fetchDependencies({
          url: currentUrl,
          weight: currentWeight,
          decision: currentDecision,
          visited: nextVisited,
          volatility,
        });

        let newItems = mapDependantsToQueue(
          response.dependants || [],
          response.sourceMarket,
          nextVisited,
          { parentId, parentUrl: currentUrl }
        ).filter(item => !existingIds.has(item.id));

        // Pad with sample dependencies if we don't have enough items (target: 3)
        const MIN_QUEUE_SIZE = 3;
        const totalAfterFetch = nextQueue.length + newItems.length;
        if (totalAfterFetch < MIN_QUEUE_SIZE) {
          const needed = MIN_QUEUE_SIZE - totalAfterFetch;
          const allIds = new Set([...existingIds, ...newItems.map(i => i.id)]);
          const allUrls = new Set([...existingUrls, ...newItems.map(i => i.url)]);
          const samples = createSampleDependencies(
            response.sourceMarket,
            { parentId, parentUrl: currentUrl },
            needed,
            new Set([...allIds, ...allUrls])
          );
          newItems = [...newItems, ...samples];
        }

        if (newItems.length > 0) {
          nextQueue = [...nextQueue, ...newItems];
          nextVisited = toUnique([...nextVisited, ...extractQueueUrls(newItems)]);
        }

        // Mark that we've done the initial API fetch
        hasInitialFetch = true;
      } catch (error) {
        // API failed on first call - still use samples as fallback
        console.error('Failed to fetch dependencies', error);
        const MIN_QUEUE_SIZE = 3;
        if (nextQueue.length < MIN_QUEUE_SIZE) {
          const needed = MIN_QUEUE_SIZE - nextQueue.length;
          const allIds = new Set([...existingIds, ...existingUrls]);
          const samples = createSampleDependencies(
            null,
            { parentId, parentUrl: currentUrl },
            needed,
            allIds
          );
          nextQueue = [...nextQueue, ...samples];
          nextVisited = toUnique([...nextVisited, ...extractQueueUrls(samples)]);
        }
        // Mark as initial fetch done even on failure so we don't keep retrying
        hasInitialFetch = true;
      }
    } else {
      // After initial fetch: use hardcoded samples only (no more API calls)
      const MIN_QUEUE_SIZE = 3;
      if (nextQueue.length < MIN_QUEUE_SIZE) {
        const needed = MIN_QUEUE_SIZE - nextQueue.length;
        const allIds = new Set([...existingIds, ...existingUrls]);
        const samples = createSampleDependencies(
          null,
          { parentId, parentUrl: currentUrl },
          needed,
          allIds
        );
        nextQueue = [...nextQueue, ...samples];
        nextVisited = toUnique([...nextVisited, ...extractQueueUrls(samples)]);
      }
    }
  }

  await setDependencyState(eventUrl, nextQueue, nextVisited, hasInitialFetch);
  return { response, queue: nextQueue, visited: nextVisited };
}
