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

// Polymarket CDN for additional images
const PM_CDN = 'https://polymarket-upload.s3.us-east-2.amazonaws.com/';

// Image URLs for diverse markets
const IMAGES = {
  greenland: `${S3_BASE_URL}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
  election: `${S3_BASE_URL}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`,
  powell: `${S3_BASE_URL}jerome+powell+glasses1.png`,
  fedChair: `${S3_BASE_URL}who-will-trump-nominate-as-fed-chair-9p19ttRwsbKL.png`,
  insurrection: `${S3_BASE_URL}trump-invokes-the-insurrection-act-before-august-jR3s2WWoaIbY.jpg`,
  iran: `${S3_BASE_URL}us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg`,
  ukraine: `${S3_BASE_URL}russia-x-ukraine-ceasefire-in-2025-w2voYOygx80B.jpg`,
  ai: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/will-ai-replace-50-of-jobs-by-2030-oQd9EHfQRbgL.png',
  openai: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/openai-valuation-2025-sIuXbqFmQdwL.png',
  bitcoin: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/bitcoin-100k-2024-vRtbPqWsZxYm.png',
  eth: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/ethereum-10k-2025-aKlMnOpQrStU.png',
  spacex: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/spacex-starship-success-2025-bLmNoPqRsTuV.png',
  tesla: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/tesla-stock-500-2025-cMnOpQrStUvW.png',
  china: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/china-taiwan-2027-dNoPqRsTuVwX.png',
  recession: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/us-recession-2025-eOpQrStUvWxY.png',
};

// Hardcoded demo data for Greenland market - 50 diverse dependencies
const GREENLAND_DEMO_DATA: RelatedBetsResponse = {
  sourceMarket: {
    id: 'greenland-source',
    question: 'Will Trump acquire Greenland before 2027?',
    slug: 'will-trump-acquire-greenland-before-2027',
  },
  relatedBets: [
    // === DIRECT GREENLAND CLUSTER (8 bets) - High connectivity ===
    {
      marketId: 'greenland-invade-2026',
      question: 'Will the U.S. invade Greenland in 2026?',
      slug: 'will-the-us-invade-greenland-in-2026',
      url: 'https://polymarket.com/event/will-the-us-invade-greenland-in-2026',
      relationship: 'IMPLIES',
      reasoning: 'Military invasion guarantees territorial acquisition. Historical precedent shows occupation leads to permanent control.',
      yesPercentage: 12,
      noPercentage: 88,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'greenland-deal-march',
      question: 'Trump x Greenland deal signed by March 31?',
      slug: 'trump-x-greenland-deal-signed-by-march-31',
      url: 'https://polymarket.com/event/trump-x-greenland-deal-signed-by-march-31',
      relationship: 'SUBEVENT',
      reasoning: 'A formal deal is a necessary precursor to peaceful acquisition.',
      yesPercentage: 25,
      noPercentage: 75,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'denmark-greenland-referendum',
      question: 'Will Denmark hold referendum on Greenland?',
      slug: 'denmark-greenland-referendum',
      url: 'https://polymarket.com/event/denmark-greenland-referendum',
      relationship: 'SUBEVENT',
      reasoning: 'Democratic approval in Denmark is required for any sovereignty transfer.',
      yesPercentage: 18,
      noPercentage: 82,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'greenland-independence-2027',
      question: 'Greenland declares independence before 2027?',
      slug: 'greenland-independence-2027',
      url: 'https://polymarket.com/event/greenland-independence-2027',
      relationship: 'IMPLIES',
      reasoning: 'Independence would enable direct US-Greenland negotiations.',
      yesPercentage: 8,
      noPercentage: 92,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'trump-visit-greenland-2025',
      question: 'Will Trump visit Greenland in 2025?',
      slug: 'trump-visit-greenland-2025',
      url: 'https://polymarket.com/event/trump-visit-greenland-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Presidential visit signals serious intent and could catalyze negotiations.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.insurrection,
    },
    {
      marketId: 'us-military-base-greenland',
      question: 'US military base expansion in Greenland?',
      slug: 'us-military-base-greenland',
      url: 'https://polymarket.com/event/us-military-base-greenland',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Military presence establishes de facto control preceding formal arrangements.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'greenland-nato-membership',
      question: 'Greenland applies for separate NATO membership?',
      slug: 'greenland-nato-membership',
      url: 'https://polymarket.com/event/greenland-nato-membership',
      relationship: 'CONTRADICTS',
      reasoning: 'Separate NATO membership would complicate US territorial ambitions.',
      yesPercentage: 7,
      noPercentage: 93,
      imageUrl: IMAGES.ukraine,
    },
    {
      marketId: 'greenland-china-deal',
      question: 'China signs economic deal with Greenland?',
      slug: 'greenland-china-deal',
      url: 'https://polymarket.com/event/greenland-china-deal',
      relationship: 'CONTRADICTS',
      reasoning: 'Chinese economic involvement would block US acquisition.',
      yesPercentage: 15,
      noPercentage: 85,
      imageUrl: IMAGES.china,
    },

    // === TARIFFS & TRADE CLUSTER (7 bets) - Medium connectivity ===
    {
      marketId: 'denmark-greenland-tariffs',
      question: 'Denmark Greenland Tariffs go into effect?',
      slug: 'denmark-greenland-tariffs',
      url: 'https://polymarket.com/event/denmark-greenland-tariffs',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Tariffs serve as economic coercion in Greenland negotiations.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: IMAGES.powell,
    },
    {
      marketId: 'supreme-court-tariffs',
      question: 'Supreme Court rules in favor of Trump\'s tariffs?',
      slug: 'will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      url: 'https://polymarket.com/event/will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'SCOTUS validation strengthens leverage in territorial negotiations.',
      yesPercentage: 50,
      noPercentage: 50,
      imageUrl: IMAGES.fedChair,
    },
    {
      marketId: 'eu-retaliatory-tariffs',
      question: 'EU imposes retaliatory tariffs on US?',
      slug: 'eu-retaliatory-tariffs-2025',
      url: 'https://polymarket.com/event/eu-retaliatory-tariffs-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Trade war escalation complicates diplomatic negotiations.',
      yesPercentage: 62,
      noPercentage: 38,
      imageUrl: IMAGES.recession,
    },
    {
      marketId: 'us-canada-trade-war',
      question: 'US-Canada trade war escalates in 2025?',
      slug: 'us-canada-trade-war-2025',
      url: 'https://polymarket.com/event/us-canada-trade-war-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'North American trade tensions affect Arctic negotiations.',
      yesPercentage: 45,
      noPercentage: 55,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'wto-ruling-tariffs',
      question: 'WTO rules against US tariffs?',
      slug: 'wto-ruling-us-tariffs',
      url: 'https://polymarket.com/event/wto-ruling-us-tariffs',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'International trade rulings affect negotiation leverage.',
      yesPercentage: 58,
      noPercentage: 42,
      imageUrl: IMAGES.powell,
    },
    {
      marketId: 'trump-tariff-expansion',
      question: 'Trump expands tariffs to 50+ countries?',
      slug: 'trump-tariff-expansion-2025',
      url: 'https://polymarket.com/event/trump-tariff-expansion-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Broad tariff strategy signals willingness to use economic pressure.',
      yesPercentage: 40,
      noPercentage: 60,
      imageUrl: IMAGES.insurrection,
    },
    {
      marketId: 'nordic-trade-bloc',
      question: 'Nordic countries form unified trade bloc?',
      slug: 'nordic-trade-bloc-2025',
      url: 'https://polymarket.com/event/nordic-trade-bloc-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Nordic unity complicates bilateral Denmark negotiations.',
      yesPercentage: 22,
      noPercentage: 78,
      imageUrl: IMAGES.ukraine,
    },

    // === GEOPOLITICAL CLUSTER (8 bets) - High connectivity ===
    {
      marketId: 'panama-canal-2027',
      question: 'US takes Panama Canal before 2027?',
      slug: 'us-takes-panama-canal-before-2027',
      url: 'https://polymarket.com/event/us-takes-panama-canal-before-2027',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Success in Panama demonstrates capability for territorial expansion.',
      yesPercentage: 16,
      noPercentage: 84,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'nato-article-5-arctic',
      question: 'NATO Article 5 invoked for Arctic dispute?',
      slug: 'nato-article-5-arctic',
      url: 'https://polymarket.com/event/nato-article-5-arctic',
      relationship: 'CONTRADICTS',
      reasoning: 'NATO intervention would severely impede acquisition attempt.',
      yesPercentage: 5,
      noPercentage: 95,
      imageUrl: IMAGES.ukraine,
    },
    {
      marketId: 'russia-arctic-aggression',
      question: 'Russia increases Arctic military presence?',
      slug: 'russia-arctic-aggression-2025',
      url: 'https://polymarket.com/event/russia-arctic-aggression-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Russian pressure may accelerate US Arctic strategy.',
      yesPercentage: 72,
      noPercentage: 28,
      imageUrl: IMAGES.ukraine,
    },
    {
      marketId: 'china-arctic-claim',
      question: 'China expands Arctic territorial claims?',
      slug: 'china-arctic-claim-2025',
      url: 'https://polymarket.com/event/china-arctic-claim-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Chinese Arctic ambitions may accelerate US action.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.china,
    },
    {
      marketId: 'arctic-shipping-route',
      question: 'Northern Sea Route becomes commercially viable?',
      slug: 'arctic-shipping-route-2026',
      url: 'https://polymarket.com/event/arctic-shipping-route-2026',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Commercial viability increases strategic value of Greenland.',
      yesPercentage: 48,
      noPercentage: 52,
      imageUrl: IMAGES.tesla,
    },
    {
      marketId: 'us-iceland-defense',
      question: 'US expands Iceland defense agreement?',
      slug: 'us-iceland-defense-2025',
      url: 'https://polymarket.com/event/us-iceland-defense-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'North Atlantic defense expansion signals Arctic strategy.',
      yesPercentage: 55,
      noPercentage: 45,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'un-arctic-resolution',
      question: 'UN passes Arctic sovereignty resolution?',
      slug: 'un-arctic-resolution-2025',
      url: 'https://polymarket.com/event/un-arctic-resolution-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'International framework would constrain unilateral action.',
      yesPercentage: 20,
      noPercentage: 80,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'arctic-council-dispute',
      question: 'US withdraws from Arctic Council?',
      slug: 'us-arctic-council-withdrawal',
      url: 'https://polymarket.com/event/us-arctic-council-withdrawal',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Withdrawal signals unilateral approach to Arctic.',
      yesPercentage: 18,
      noPercentage: 82,
      imageUrl: IMAGES.insurrection,
    },

    // === ECONOMIC CLUSTER (6 bets) - Medium connectivity ===
    {
      marketId: 'fed-rate-cut-2025',
      question: 'Fed cuts rates below 3% in 2025?',
      slug: 'fed-rate-cut-2025',
      url: 'https://polymarket.com/event/fed-rate-cut-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Lower rates enable more aggressive fiscal spending on acquisitions.',
      yesPercentage: 32,
      noPercentage: 68,
      imageUrl: IMAGES.powell,
    },
    {
      marketId: 'us-recession-2025',
      question: 'US enters recession in 2025?',
      slug: 'us-recession-2025',
      url: 'https://polymarket.com/event/us-recession-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Recession would reduce political appetite for territorial spending.',
      yesPercentage: 28,
      noPercentage: 72,
      imageUrl: IMAGES.recession,
    },
    {
      marketId: 'dollar-strengthens-2025',
      question: 'Dollar index above 110 in 2025?',
      slug: 'dollar-index-110-2025',
      url: 'https://polymarket.com/event/dollar-index-110-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Strong dollar increases US purchasing power for acquisitions.',
      yesPercentage: 45,
      noPercentage: 55,
      imageUrl: IMAGES.fedChair,
    },
    {
      marketId: 'rare-earth-prices',
      question: 'Rare earth prices double in 2025?',
      slug: 'rare-earth-prices-2025',
      url: 'https://polymarket.com/event/rare-earth-prices-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Greenland\'s rare earth deposits become more valuable.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: IMAGES.bitcoin,
    },
    {
      marketId: 'denmark-debt-crisis',
      question: 'Denmark faces sovereign debt crisis?',
      slug: 'denmark-debt-crisis-2025',
      url: 'https://polymarket.com/event/denmark-debt-crisis-2025',
      relationship: 'IMPLIES',
      reasoning: 'Financial pressure could force Denmark to negotiate.',
      yesPercentage: 8,
      noPercentage: 92,
      imageUrl: IMAGES.recession,
    },
    {
      marketId: 'greenland-gdp-growth',
      question: 'Greenland GDP grows over 5% in 2025?',
      slug: 'greenland-gdp-growth-2025',
      url: 'https://polymarket.com/event/greenland-gdp-growth-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Strong economy reduces Greenland\'s incentive to join US.',
      yesPercentage: 22,
      noPercentage: 78,
      imageUrl: IMAGES.greenland,
    },

    // === TECH & RESOURCES CLUSTER (6 bets) - Medium connectivity ===
    {
      marketId: 'ai-breakthrough-2025',
      question: 'Major AI breakthrough announced in 2025?',
      slug: 'ai-breakthrough-2025',
      url: 'https://polymarket.com/event/ai-breakthrough-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'AI advances increase strategic value of Greenland data centers.',
      yesPercentage: 65,
      noPercentage: 35,
      imageUrl: IMAGES.ai,
    },
    {
      marketId: 'openai-ipo-2025',
      question: 'OpenAI IPO in 2025?',
      slug: 'openai-ipo-2025',
      url: 'https://polymarket.com/event/openai-ipo-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'AI industry growth increases Arctic data center demand.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: IMAGES.openai,
    },
    {
      marketId: 'bitcoin-150k-2025',
      question: 'Bitcoin reaches $150k in 2025?',
      slug: 'bitcoin-150k-2025',
      url: 'https://polymarket.com/event/bitcoin-150k-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Crypto mining increases Arctic energy demand.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.bitcoin,
    },
    {
      marketId: 'arctic-oil-discovery',
      question: 'Major oil discovery in Arctic in 2025?',
      slug: 'arctic-oil-discovery-2025',
      url: 'https://polymarket.com/event/arctic-oil-discovery-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Oil discovery dramatically increases Greenland\'s value.',
      yesPercentage: 28,
      noPercentage: 72,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'greenland-mining-permit',
      question: 'Greenland approves major US mining permit?',
      slug: 'greenland-mining-permit-2025',
      url: 'https://polymarket.com/event/greenland-mining-permit-2025',
      relationship: 'SUBEVENT',
      reasoning: 'Mining agreements precede broader territorial arrangements.',
      yesPercentage: 45,
      noPercentage: 55,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'spacex-arctic-launch',
      question: 'SpaceX announces Arctic launch facility?',
      slug: 'spacex-arctic-launch-2025',
      url: 'https://polymarket.com/event/spacex-arctic-launch-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Private sector interest signals strategic value.',
      yesPercentage: 18,
      noPercentage: 82,
      imageUrl: IMAGES.spacex,
    },

    // === POLITICAL CLUSTER (8 bets) - High connectivity ===
    {
      marketId: 'trump-approval-50',
      question: 'Trump approval rating above 50% in 2025?',
      slug: 'trump-approval-50-2025',
      url: 'https://polymarket.com/event/trump-approval-50-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'High approval gives political capital for bold moves.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'republicans-house-2026',
      question: 'Republicans keep House in 2026?',
      slug: 'republicans-house-2026',
      url: 'https://polymarket.com/event/republicans-house-2026',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Congressional support needed for acquisition funding.',
      yesPercentage: 52,
      noPercentage: 48,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'trump-impeachment-2025',
      question: 'Trump faces impeachment in 2025?',
      slug: 'trump-impeachment-2025',
      url: 'https://polymarket.com/event/trump-impeachment-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Political crisis would derail foreign policy initiatives.',
      yesPercentage: 15,
      noPercentage: 85,
      imageUrl: IMAGES.insurrection,
    },
    {
      marketId: 'biden-returns-politics',
      question: 'Biden returns to active politics in 2025?',
      slug: 'biden-returns-2025',
      url: 'https://polymarket.com/event/biden-returns-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Democratic opposition could slow initiatives.',
      yesPercentage: 12,
      noPercentage: 88,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'rubio-secretary-state',
      question: 'Rubio remains Secretary of State through 2025?',
      slug: 'rubio-secretary-state-2025',
      url: 'https://polymarket.com/event/rubio-secretary-state-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Diplomatic continuity aids complex negotiations.',
      yesPercentage: 78,
      noPercentage: 22,
      imageUrl: IMAGES.fedChair,
    },
    {
      marketId: 'congress-greenland-funding',
      question: 'Congress approves Greenland acquisition funding?',
      slug: 'congress-greenland-funding',
      url: 'https://polymarket.com/event/congress-greenland-funding',
      relationship: 'SUBEVENT',
      reasoning: 'Funding approval is a prerequisite for any purchase.',
      yesPercentage: 25,
      noPercentage: 75,
      imageUrl: IMAGES.election,
    },
    {
      marketId: 'denmark-election-2025',
      question: 'Danish government changes in 2025?',
      slug: 'denmark-election-2025',
      url: 'https://polymarket.com/event/denmark-election-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'New government might have different negotiating stance.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.ukraine,
    },
    {
      marketId: 'greenland-premier-change',
      question: 'Greenland Premier changes before 2027?',
      slug: 'greenland-premier-change',
      url: 'https://polymarket.com/event/greenland-premier-change',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Leadership change could shift local stance on US relations.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: IMAGES.greenland,
    },

    // === MILITARY & DEFENSE CLUSTER (7 bets) - High connectivity ===
    {
      marketId: 'us-defense-budget-increase',
      question: 'US defense budget increases 10%+ in 2025?',
      slug: 'us-defense-budget-2025',
      url: 'https://polymarket.com/event/us-defense-budget-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Higher defense spending enables Arctic military expansion.',
      yesPercentage: 55,
      noPercentage: 45,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'us-icebreaker-fleet',
      question: 'US commissions new icebreaker fleet?',
      slug: 'us-icebreaker-fleet-2025',
      url: 'https://polymarket.com/event/us-icebreaker-fleet-2025',
      relationship: 'SUBEVENT',
      reasoning: 'Icebreakers are essential for Arctic operations.',
      yesPercentage: 48,
      noPercentage: 52,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'us-nuclear-sub-arctic',
      question: 'US deploys nuclear subs to Arctic permanently?',
      slug: 'us-nuclear-sub-arctic-2025',
      url: 'https://polymarket.com/event/us-nuclear-sub-arctic-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Nuclear presence signals commitment to Arctic dominance.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.iran,
    },
    {
      marketId: 'thule-base-expansion',
      question: 'Thule Air Base major expansion announced?',
      slug: 'thule-base-expansion-2025',
      url: 'https://polymarket.com/event/thule-base-expansion-2025',
      relationship: 'SUBEVENT',
      reasoning: 'Base expansion is concrete step toward acquisition.',
      yesPercentage: 52,
      noPercentage: 48,
      imageUrl: IMAGES.greenland,
    },
    {
      marketId: 'us-space-force-arctic',
      question: 'Space Force establishes Arctic command?',
      slug: 'space-force-arctic-2025',
      url: 'https://polymarket.com/event/space-force-arctic-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Military reorganization signals Arctic prioritization.',
      yesPercentage: 28,
      noPercentage: 72,
      imageUrl: IMAGES.spacex,
    },
    {
      marketId: 'nato-arctic-exercise',
      question: 'Largest NATO Arctic exercise in 2025?',
      slug: 'nato-arctic-exercise-2025',
      url: 'https://polymarket.com/event/nato-arctic-exercise-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Allied exercises demonstrate collective Arctic interest.',
      yesPercentage: 62,
      noPercentage: 38,
      imageUrl: IMAGES.ukraine,
    },
    {
      marketId: 'arctic-cyber-attack',
      question: 'Major cyber attack on Arctic infrastructure?',
      slug: 'arctic-cyber-attack-2025',
      url: 'https://polymarket.com/event/arctic-cyber-attack-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Cyber threats may accelerate security arrangements.',
      yesPercentage: 32,
      noPercentage: 68,
      imageUrl: IMAGES.ai,
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
