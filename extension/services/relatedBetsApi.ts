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
const S3 = 'https://polymarket-upload.s3.us-east-2.amazonaws.com/';

// ~100 distinct real Polymarket market images for visual variety
const IMAGES = {
  // === POLITICS & GEOPOLITICS (25) ===
  greenland: `${S3}will-trump-acquire-greenland-in-2025-5ZDkcIGhdBMW.jpg`,
  greenland2: `${S3}will-the-us-acquire-any-part-of-greenland-in-2026-2R7qodX0Zv-z.jpg`,
  election: `${S3}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`,
  trump: `${S3}how-high-will-trumps-approval-rating-go-in-2026-PXwVP-adEwjM.jpg`,
  trumpDeport: `${S3}how-many-people-will-trump-deport-in-2025-itZ0rMnIYuju.jpg`,
  trumpImpeach: `${S3}will-trump-be-impeached-in-2025-bm5xwPQil7AC.jpg`,
  trumpResign: `${S3}will-trump-resign-in-2025-xcz2AkFjPF5X.jpg`,
  trumpTariffs: `${S3}will-the-supreme-court-rule-in-favor-of-trumps-tariffs-aY--iE5cZi0Z.jpg`,
  insurrection: `${S3}trump-invokes-the-insurrection-act-before-august-jR3s2WWoaIbY.jpg`,
  cabinet: `${S3}who-will-be-the-first-to-leave-the-trump-cabinet-7yoh_QeiiNXH.jpg`,
  epstein: `${S3}who-will-be-named-in-newly-relased-epstein-files-lXkJUlrx1jd2.jpg`,
  portugal: `${S3}portugal-presidential-election-_h_A97vllNOX.png`,
  vietnam: `${S3}next-prime-minister-of-vietnam-oe_DNIttarvX.png`,
  venezuela: `${S3}venezuela-leader-end-of-2026-lOfqbUxiKAsg.png`,
  venezuelaInvade: `${S3}will-the-us-invade-venezuela-in-2025-1rL-noxxRItP.jpg`,
  iran: `${S3}us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg`,
  iranNext: `${S3}us-next-strikes-iran-on-i8O7r2SBkycN.jpg`,
  iranRegime: `${S3}will-the-iranian-regime-fall-in-2025-YLXIniTmQs4q.png`,
  iranNuke: `${S3}will-israel-nuke-iran-by-january-31-p8b6Dxy2E4sa.jpg`,
  iranWar: `${S3}will-the-united-states-officially-declare-war-on-iran-before-july-8K0tG8pCCpVY.jpg`,
  khamenei: `${S3}khamenei-out-as-supreme-leader-of-iran-in-2025-VNDMf5RqFLwB.jpg`,
  ukraine: `${S3}russia-x-ukraine-ceasefire-in-2025-w2voYOygx80B.jpg`,
  ukraineCeasefire: `${S3}russia-x-ukraine-ceasefire-before-july-GSNGh26whPic.jpg`,
  china: `${S3}china-invades-taiwan-in-2025-CCSd9dX2mrea.jpg`,
  usStrikes: `${S3}next-country-us-strikes-33B5vAP0Ah_C.jpg`,

  // === FINANCE & FED (15) ===
  powell: `${S3}jerome+powell+glasses1.png`,
  fedChair: `${S3}who-will-trump-nominate-as-fed-chair-9p19ttRwsbKL.png`,
  fedRates: `${S3}how-many-fed-rate-cuts-in-2025-9qstZkSL1dn0.jpg`,
  tariffRevenue: `${S3}how-much-revenue-will-the-us-raise-from-tariffs-in-2025-lUbEhM1AK-xa.jpg`,
  tariffs250b: `${S3}will-tariffs-generate-250b-in-2025-C4N7xChXvMV4.jpg`,
  elonBudget: `${S3}will-elon-cut-the-budget-by-at-least-10-in-2025-KQWXFwQwSRYV.jpg`,
  elonBudget5: `${S3}will-elon-cut-the-budget-by-at-least-5-in-2025-YEZDluotrm-Q.jpg`,
  elonDoge: `${S3}how-much-spending-will-elon-and-doge-cut-in-2025--_AiUomi1ndd.jpg`,
  largestCompany: `${S3}largest-company-eoy-KS99l6lbxfCc.jpg`,
  apple: `${S3}will-apple-be-the-largest-company-in-the-world-by-market-cap-on-december-31-pbFWqs73s_IJ.png`,
  nvidia: `${S3}will-nvidia-be-the-largest-company-in-the-world-by-market-cap-on-december-31-g6lIgsIlD7lN.jpg`,
  microsoft: `${S3}will-microsoft-be-the-largest-company-in-the-world-by-market-cap-on-december-31-C8B3xdggFH2U.png`,
  amazon: `${S3}will-amazon-be-the-largest-company-in-the-world-by-market-cap-on-december-31-BqBnLaLkz49q.jpg`,
  tesla: `${S3}will-tesla-be-the-largest-company-in-the-world-by-market-cap-on-december-31-tu4lToXGy3zn.png`,
  alphabet: `${S3}will-alphabet-be-the-largest-company-in-the-world-by-market-cap-on-december-31-lEzVRf5o__Mf.png`,

  // === CRYPTO (15) ===
  btc: `${S3}BTC+fullsize.png`,
  eth: `${S3}ETH+fullsize.jpg`,
  sol: `${S3}SOL-logo.png`,
  xrp: `${S3}XRP-logo.png`,
  sentient: `${S3}will-sentient-launch-a-token-in-2025-jWZGMwqJlYLe.jpg`,
  megaeth: `${S3}megaeth-market-cap-fdv-one-day-after-launch-KzYK3qwuIK8t.jpg`,
  infinex: `${S3}will-infinex-launch-a-token-this-year-2ODwjGRZqGL-.jpg`,
  puffpaw: `${S3}puffpaw-fdv-above-one-day-after-launch-LifCgtfa8s9_.jpg`,
  goldVsEth: `${S3}first-to-5k-gold-or-eth-9Zt2RB0rwODb.jpg`,
  flyingTulip: `${S3}will-flying-tulip-launch-a-token-by-kflNNo9zxKLD.jpg`,
  spaceSale: `${S3}space-public-sale-total-commitments-HEww4Z7f0iLw.png`,

  // === AI & TECH (20) ===
  aiModel: `${S3}which-company-has-best-ai-model-end-of-september-MmASwbTkwKHi.jpg`,
  aiModelTop: `${S3}which-company-has-top-ai-model-end-of-september-rg060DKa_VSI.jpg`,
  teslaFsd: `${S3}tesla-launches-unsupervised-full-self-driving-fsd-by-june-30-yvpjn3RX4Q2w.jpg`,
  grok: `${S3}grok-4pt20-released-on-QvsrIdJVvP51.jpg`,
  grok2: `${S3}grok-4pt20-released-by-FREAnoCYA7aN.jpg`,
  acquisitions: `${S3}which-companies-will-be-acquired-before-2027-s3oFXGknOa38.jpg`,
  alibaba: `${S3}will-alibaba-have-the-top-ai-model-on-march-31-jSpk4aBgTVpy.png`,
  deepseek: `${S3}will-deepseek-have-the-top-ai-model-on-march-31-puDB2eDJx4-L.png`,
  openai: `${S3}will-openai-have-the-top-ai-model-on-february-28-3eaAmSON076D.jpg`,
  xai: `${S3}will-xai-have-the-top-ai-model-on-february-28-u3iUE4o3SB1s.jpg`,
  anthropic: `${S3}will-anthropic-have-the-top-ai-model-on-february-28-2aPXb3voV_7Y.png`,
  anthropicIpo: `${S3}anthropic-ipo-closing-market-cap-jdfele1g0krx.png`,
  google: `${S3}will-google-have-the-top-ai-model-on-february-28-MS2LhSAdlHGk.jpg`,
  baidu: `${S3}will-baidu-have-the-best-ai-model-at-the-end-of-january-2026-MWj8PQJLsiaa.png`,
  gpt5: `${S3}when-will-gpt-5-be-released-vIPhU76RogZc.jpg`,
  gemini: `${S3}highest-gemini-scores-on-frontiermath-benchmark-by-november-30-m3bEm-QLoNE.jpg`,
  chatbotArena: `${S3}which-ai-will-be-the-first-to-hit-1500-on-chatbot-arena-qbZUykYXIPTG.png`,
  aiCoding: `${S3}which-company-will-have-the-best-ai-model-for-coding-at-the-end-of-2025-6TeV-9Z18H9z.png`,
  openaiIpo: `${S3}openai-ipo-by-qeh3ouQDANVw.jpg`,
  elonMusk: `${S3}will-elon-musk-win-his-case-against-sam-altman-3b7rjuMNHGHy.jpg`,

  // === SCIENCE & SPACE (10) ===
  spacex: `${S3}how-many-spacex-starship-launches-reach-space-in-2025-tjnLOs2vfvOH.jpg`,
  spacexLaunches: `${S3}how-many-spacex-launches-in-2025-H9bLc6Yotwva.jpg`,
  starship: `${S3}spacex-starship-flight-test-10-KJ2wEPdcMh5k.jpg`,
  doge1: `${S3}will-the-doge-1-lunar-mission-launch-before-2027-wrmn3EafBT0g.jpg`,
  earthquake: `${S3}earthquake-7pt0-or-above-by-august-31-698-AANrykUigfWS.jpg`,
  meteor: `${S3}5kt-meteor-strike-in-2025-GIAKiKaSKYsr.jpg`,
  temperature: `${S3}february-2025-temperature-increase-c-fr_fUwG_Bhn4.jpg`,
  climate: `${S3}earth+on+fire.png`,
  alien: `${S3}alien+head.jpeg`,
  medline: `${S3}medline-ipo-closing-market-cap-ACPC6jwYvP6i.png`,

  // === POP CULTURE & ENTERTAINMENT (10) ===
  elonTweets: `${S3}elon-musk-of-tweets-nov-22-29-apMPG21-pzx_.jpg`,
  gta6: `${S3}what-will-happen-before-gta-vi-7hpNkEzQEqUE.jpg`,
  gta6Price: `${S3}gta-6-launch-price-l4GiOIOGhdvA.jpg`,
  oscars: `${S3}oscars-2026-best-picture-nominations-uExlgIhppb3W.jpg`,
  avatar3: `${S3}avatar-fire-and-ash-opening-weekend-box-office-pK2RqUUCw8Xf.png`,
  strangerThings: `${S3}new-stranger-things-episode-released-by-wednesday-4NShFZwCps4u.jpg`,
  beastGames: `${S3}who-will-win-the-beast-games-TZVXn3nKI8OT.jpg`,
  honnold: `${S3}how-long-will-it-take-alex-honnold-to-free-solo-taipei-101-sVnyRt8wRFGj.jpg`,
  lightyear: `${S3}lightyear+movie.png`,
  magnus: `${S3}magnus+carlsen.png`,

  // === SPORTS (15) ===
  football: `${S3}football-logo.png`,
  nfl: `${S3}nfl.png`,
  basketball: `${S3}super+cool+basketball+in+red+and+blue+wow.png`,
  chiefs: `${S3}NFL+Team+Logos/KC.png`,
  cowboys: `${S3}NFL+Team+Logos/DAL.png`,
  eagles: `${S3}NFL+Team+Logos/PHI.png`,
  bills: `${S3}NFL+Team+Logos/BUF.png`,
  ravens: `${S3}NFL+Team+Logos/BAL.png`,
  niners: `${S3}NFL+Team+Logos/SF.png`,
  lions: `${S3}NFL+Team+Logos/DET.png`,
  packers: `${S3}NFL+Team+Logos/GB.png`,
  t1: `${S3}team_logos/esports/lol/league-of-legends_t1_126061.png`,
  jdg: `${S3}team_logos/esports/lol/league-of-legends_jd%20gaming_318.png`,
  vitality: `${S3}team_logos/esports/cs2/Vitality-lGUYkcooGw0f.png`,
  zelenskyySuit: `${S3}will-volodymyr-zelenskyy-wear-a-suit-to-next-meeting-with-trump-ytsYzDGZgeGM.jpg`,

  // === HEALTH & MISC (5) ===
  measles: `${S3}1200-measles-cases-in-us-before-june-jPVnjl81lNC-.jpg`,
  snow: `${S3}will-there-be-less-than-2-inches-of-snow-in-nyc-in-jan-cR-YMrmPeNLc.jpg`,
  snowMonth: `${S3}how-many-inches-of-snow-in-nyc-this-month-W0n5T_VJiLeR.jpg`,
  nft: `${S3}weareallgoingtodie2.png`,
  nato: `${S3}will-nato-declare-a-no-fly-zone-over-any-ukrainian-territory-by-april-30-2022-fd452f43-515c-433f-9a15-31fa05af8936.png`,
};

// Helper to get a random image from the collection
const IMAGE_VALUES = Object.values(IMAGES);
const getRandomImage = (index: number) => IMAGE_VALUES[index % IMAGE_VALUES.length];

// Hardcoded demo data for Greenland market - 50 diverse dependencies with unique icons
const GREENLAND_DEMO_DATA: RelatedBetsResponse = {
  sourceMarket: {
    id: 'greenland-source',
    question: 'Will Trump acquire Greenland before 2027?',
    slug: 'will-trump-acquire-greenland-before-2027',
  },
  relatedBets: [
    // === DIRECT GREENLAND CLUSTER (8 bets) ===
    {
      marketId: 'greenland-invade-2026',
      question: 'Will the U.S. invade Greenland in 2026?',
      slug: 'will-the-us-invade-greenland-in-2026',
      url: 'https://polymarket.com/event/will-the-us-invade-greenland-in-2026',
      relationship: 'IMPLIES',
      reasoning: 'Military invasion guarantees territorial acquisition.',
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
      imageUrl: IMAGES.greenland2,
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
      imageUrl: IMAGES.portugal,
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
      imageUrl: IMAGES.vietnam,
    },
    {
      marketId: 'trump-visit-greenland-2025',
      question: 'Will Trump visit Greenland in 2025?',
      slug: 'trump-visit-greenland-2025',
      url: 'https://polymarket.com/event/trump-visit-greenland-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Presidential visit signals serious intent.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.trump,
    },
    {
      marketId: 'us-military-base-greenland',
      question: 'US military base expansion in Greenland?',
      slug: 'us-military-base-greenland',
      url: 'https://polymarket.com/event/us-military-base-greenland',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Military presence establishes de facto control.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: IMAGES.usStrikes,
    },
    {
      marketId: 'greenland-nato-membership',
      question: 'Greenland applies for separate NATO membership?',
      slug: 'greenland-nato-membership',
      url: 'https://polymarket.com/event/greenland-nato-membership',
      relationship: 'CONTRADICTS',
      reasoning: 'Separate NATO membership would complicate US ambitions.',
      yesPercentage: 7,
      noPercentage: 93,
      imageUrl: IMAGES.nato,
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

    // === TARIFFS & TRADE CLUSTER (7 bets) ===
    {
      marketId: 'denmark-greenland-tariffs',
      question: 'Denmark Greenland Tariffs go into effect?',
      slug: 'denmark-greenland-tariffs',
      url: 'https://polymarket.com/event/denmark-greenland-tariffs',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Tariffs serve as economic coercion in negotiations.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: IMAGES.tariffRevenue,
    },
    {
      marketId: 'supreme-court-tariffs',
      question: 'Supreme Court rules in favor of Trump\'s tariffs?',
      slug: 'will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      url: 'https://polymarket.com/event/will-the-supreme-court-rule-in-favor-of-trumps-tariffs',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'SCOTUS validation strengthens leverage.',
      yesPercentage: 50,
      noPercentage: 50,
      imageUrl: IMAGES.trumpTariffs,
    },
    {
      marketId: 'eu-retaliatory-tariffs',
      question: 'EU imposes retaliatory tariffs on US?',
      slug: 'eu-retaliatory-tariffs-2025',
      url: 'https://polymarket.com/event/eu-retaliatory-tariffs-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Trade war escalation complicates diplomacy.',
      yesPercentage: 62,
      noPercentage: 38,
      imageUrl: IMAGES.tariffs250b,
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
      reasoning: 'International trade rulings affect leverage.',
      yesPercentage: 58,
      noPercentage: 42,
      imageUrl: IMAGES.largestCompany,
    },
    {
      marketId: 'trump-tariff-expansion',
      question: 'Trump expands tariffs to 50+ countries?',
      slug: 'trump-tariff-expansion-2025',
      url: 'https://polymarket.com/event/trump-tariff-expansion-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Broad tariff strategy signals willingness to use pressure.',
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
      reasoning: 'Nordic unity complicates bilateral negotiations.',
      yesPercentage: 22,
      noPercentage: 78,
      imageUrl: IMAGES.ukraine,
    },

    // === GEOPOLITICAL CLUSTER (8 bets) ===
    {
      marketId: 'panama-canal-2027',
      question: 'US takes Panama Canal before 2027?',
      slug: 'us-takes-panama-canal-before-2027',
      url: 'https://polymarket.com/event/us-takes-panama-canal-before-2027',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Success in Panama demonstrates capability for expansion.',
      yesPercentage: 16,
      noPercentage: 84,
      imageUrl: IMAGES.venezuelaInvade,
    },
    {
      marketId: 'nato-article-5-arctic',
      question: 'NATO Article 5 invoked for Arctic dispute?',
      slug: 'nato-article-5-arctic',
      url: 'https://polymarket.com/event/nato-article-5-arctic',
      relationship: 'CONTRADICTS',
      reasoning: 'NATO intervention would impede acquisition.',
      yesPercentage: 5,
      noPercentage: 95,
      imageUrl: IMAGES.ukraineCeasefire,
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
      imageUrl: IMAGES.zelenskyySuit,
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
      imageUrl: IMAGES.alibaba,
    },
    {
      marketId: 'arctic-shipping-route',
      question: 'Northern Sea Route becomes commercially viable?',
      slug: 'arctic-shipping-route-2026',
      url: 'https://polymarket.com/event/arctic-shipping-route-2026',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Commercial viability increases strategic value.',
      yesPercentage: 48,
      noPercentage: 52,
      imageUrl: IMAGES.amazon,
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
      reasoning: 'International framework would constrain action.',
      yesPercentage: 20,
      noPercentage: 80,
      imageUrl: IMAGES.venezuela,
    },
    {
      marketId: 'arctic-council-dispute',
      question: 'US withdraws from Arctic Council?',
      slug: 'us-arctic-council-withdrawal',
      url: 'https://polymarket.com/event/us-arctic-council-withdrawal',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Withdrawal signals unilateral approach.',
      yesPercentage: 18,
      noPercentage: 82,
      imageUrl: IMAGES.cabinet,
    },

    // === ECONOMIC CLUSTER (6 bets) ===
    {
      marketId: 'fed-rate-cut-2025',
      question: 'Fed cuts rates below 3% in 2025?',
      slug: 'fed-rate-cut-2025',
      url: 'https://polymarket.com/event/fed-rate-cut-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Lower rates enable aggressive fiscal spending.',
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
      reasoning: 'Recession would reduce political appetite.',
      yesPercentage: 28,
      noPercentage: 72,
      imageUrl: IMAGES.fedRates,
    },
    {
      marketId: 'dollar-strengthens-2025',
      question: 'Dollar index above 110 in 2025?',
      slug: 'dollar-index-110-2025',
      url: 'https://polymarket.com/event/dollar-index-110-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Strong dollar increases US purchasing power.',
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
      imageUrl: IMAGES.goldVsEth,
    },
    {
      marketId: 'denmark-debt-crisis',
      question: 'Denmark faces sovereign debt crisis?',
      slug: 'denmark-debt-crisis-2025',
      url: 'https://polymarket.com/event/denmark-debt-crisis-2025',
      relationship: 'IMPLIES',
      reasoning: 'Financial pressure could force negotiations.',
      yesPercentage: 8,
      noPercentage: 92,
      imageUrl: IMAGES.medline,
    },
    {
      marketId: 'greenland-gdp-growth',
      question: 'Greenland GDP grows over 5% in 2025?',
      slug: 'greenland-gdp-growth-2025',
      url: 'https://polymarket.com/event/greenland-gdp-growth-2025',
      relationship: 'CONTRADICTS',
      reasoning: 'Strong economy reduces Greenland\'s incentive.',
      yesPercentage: 22,
      noPercentage: 78,
      imageUrl: IMAGES.nvidia,
    },

    // === TECH & RESOURCES CLUSTER (6 bets) ===
    {
      marketId: 'ai-breakthrough-2025',
      question: 'Major AI breakthrough announced in 2025?',
      slug: 'ai-breakthrough-2025',
      url: 'https://polymarket.com/event/ai-breakthrough-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'AI advances increase strategic value of data centers.',
      yesPercentage: 65,
      noPercentage: 35,
      imageUrl: IMAGES.aiModel,
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
      imageUrl: IMAGES.openaiIpo,
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
      imageUrl: IMAGES.btc,
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
      imageUrl: IMAGES.iranNext,
    },
    {
      marketId: 'greenland-mining-permit',
      question: 'Greenland approves major US mining permit?',
      slug: 'greenland-mining-permit-2025',
      url: 'https://polymarket.com/event/greenland-mining-permit-2025',
      relationship: 'SUBEVENT',
      reasoning: 'Mining agreements precede broader arrangements.',
      yesPercentage: 45,
      noPercentage: 55,
      imageUrl: IMAGES.meteor,
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

    // === POLITICAL CLUSTER (8 bets) ===
    {
      marketId: 'trump-approval-50',
      question: 'Trump approval rating above 50% in 2025?',
      slug: 'trump-approval-50-2025',
      url: 'https://polymarket.com/event/trump-approval-50-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'High approval gives political capital for bold moves.',
      yesPercentage: 38,
      noPercentage: 62,
      imageUrl: IMAGES.trumpDeport,
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
      reasoning: 'Political crisis would derail foreign policy.',
      yesPercentage: 15,
      noPercentage: 85,
      imageUrl: IMAGES.trumpImpeach,
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
      imageUrl: IMAGES.epstein,
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
      imageUrl: IMAGES.cabinet,
    },
    {
      marketId: 'congress-greenland-funding',
      question: 'Congress approves Greenland acquisition funding?',
      slug: 'congress-greenland-funding',
      url: 'https://polymarket.com/event/congress-greenland-funding',
      relationship: 'SUBEVENT',
      reasoning: 'Funding approval is a prerequisite for purchase.',
      yesPercentage: 25,
      noPercentage: 75,
      imageUrl: IMAGES.elonBudget,
    },
    {
      marketId: 'denmark-election-2025',
      question: 'Danish government changes in 2025?',
      slug: 'denmark-election-2025',
      url: 'https://polymarket.com/event/denmark-election-2025',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'New government might have different stance.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.portugal,
    },
    {
      marketId: 'greenland-premier-change',
      question: 'Greenland Premier changes before 2027?',
      slug: 'greenland-premier-change',
      url: 'https://polymarket.com/event/greenland-premier-change',
      relationship: 'WEAK_SIGNAL',
      reasoning: 'Leadership change could shift local stance.',
      yesPercentage: 42,
      noPercentage: 58,
      imageUrl: IMAGES.vietnam,
    },

    // === MILITARY & DEFENSE CLUSTER (7 bets) ===
    {
      marketId: 'us-defense-budget-increase',
      question: 'US defense budget increases 10%+ in 2025?',
      slug: 'us-defense-budget-2025',
      url: 'https://polymarket.com/event/us-defense-budget-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Higher defense spending enables Arctic expansion.',
      yesPercentage: 55,
      noPercentage: 45,
      imageUrl: IMAGES.elonDoge,
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
      imageUrl: IMAGES.snow,
    },
    {
      marketId: 'us-nuclear-sub-arctic',
      question: 'US deploys nuclear subs to Arctic permanently?',
      slug: 'us-nuclear-sub-arctic-2025',
      url: 'https://polymarket.com/event/us-nuclear-sub-arctic-2025',
      relationship: 'CONDITIONED_ON',
      reasoning: 'Nuclear presence signals Arctic commitment.',
      yesPercentage: 35,
      noPercentage: 65,
      imageUrl: IMAGES.iranNuke,
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
      imageUrl: IMAGES.starship,
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
      imageUrl: IMAGES.doge1,
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
      imageUrl: IMAGES.football,
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
      imageUrl: IMAGES.grok,
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
