import type { PolymarketMarket } from '../types';

export interface HardcodedMarket extends Partial<PolymarketMarket> {
  id: string;
  condition_id: string;
  question: string;
  market_slug?: string;
  event_slug?: string;
  description?: string;
  category?: string;
  outcomePrices?: number[];
}

// Diverse set of ~100 hardcoded Polymarket markets
// Categories: Politics, Crypto, Sports, Entertainment, Science, Finance, Gaming, World Events
export const HARDCODED_MARKETS: HardcodedMarket[] = [
  // === HIGH PROFILE MARKETS (First 15) ===
  {
    id: "0x001",
    condition_id: "0x001",
    question: "Will Donald Trump win the 2028 presidential election?",
    market_slug: "trump-2028-presidential-election",
    event_slug: "2028-presidential-election",
    description: "Will Donald Trump win the 2028 US Presidential Election",
    category: "Politics",
    outcomePrices: [42, 58]
  },
  {
    id: "0x002",
    condition_id: "0x002",
    question: "Will Bitcoin reach $150,000 in 2026?",
    market_slug: "bitcoin-150k-2026",
    event_slug: "bitcoin-price-2026",
    description: "Will Bitcoin price reach $150,000 USD at any point in 2026",
    category: "Crypto",
    outcomePrices: [35, 65]
  },
  {
    id: "0x003",
    condition_id: "0x003",
    question: "Will the Kansas City Chiefs win Super Bowl LIX?",
    market_slug: "chiefs-super-bowl-lix",
    event_slug: "super-bowl-lix-winner",
    description: "Will the Kansas City Chiefs win Super Bowl LIX in 2025",
    category: "Sports",
    outcomePrices: [28, 72]
  },
  {
    id: "0x004",
    condition_id: "0x004",
    question: "Will SpaceX successfully land humans on Mars by 2030?",
    market_slug: "spacex-mars-landing-2030",
    event_slug: "mars-landing-2030",
    description: "Will SpaceX successfully land humans on Mars before December 31, 2030",
    category: "Science",
    outcomePrices: [22, 78]
  },
  {
    id: "0x005",
    condition_id: "0x005",
    question: "Will the Fed cut rates in March 2026?",
    market_slug: "fed-rate-cut-march-2026",
    event_slug: "fed-decisions-2026",
    description: "Will the Federal Reserve cut interest rates at their March 2026 meeting",
    category: "Finance",
    outcomePrices: [61, 39]
  },
  {
    id: "0x006",
    condition_id: "0x006",
    question: "Will Oppenheimer win Best Picture at the 2026 Oscars?",
    market_slug: "oppenheimer-best-picture-2026",
    event_slug: "oscars-2026",
    description: "Will Oppenheimer win the Academy Award for Best Picture in 2026",
    category: "Entertainment",
    outcomePrices: [15, 85]
  },
  {
    id: "0x007",
    condition_id: "0x007",
    question: "Will Ukraine regain all territory by end of 2026?",
    market_slug: "ukraine-territory-2026",
    event_slug: "ukraine-russia-conflict",
    description: "Will Ukraine regain all pre-2014 territory by December 31, 2026",
    category: "World Events",
    outcomePrices: [18, 82]
  },
  {
    id: "0x008",
    condition_id: "0x008",
    question: "Will Ethereum flip Bitcoin market cap in 2026?",
    market_slug: "ethereum-flip-bitcoin-2026",
    event_slug: "crypto-flippening-2026",
    description: "Will Ethereum's market cap exceed Bitcoin's at any point in 2026",
    category: "Crypto",
    outcomePrices: [24, 76]
  },
  {
    id: "0x009",
    condition_id: "0x009",
    question: "Will Team Liquid win The International 2026?",
    market_slug: "team-liquid-ti-2026",
    event_slug: "the-international-2026",
    description: "Will Team Liquid win The International Dota 2 championship in 2026",
    category: "Gaming",
    outcomePrices: [12, 88]
  },
  {
    id: "0x010",
    condition_id: "0x010",
    question: "Will China invade Taiwan by 2028?",
    market_slug: "china-taiwan-invasion-2028",
    event_slug: "china-taiwan-relations",
    description: "Will China launch a military invasion of Taiwan before December 31, 2028",
    category: "World Events",
    outcomePrices: [31, 69]
  },
  {
    id: "0x011",
    condition_id: "0x011",
    question: "Will the Lakers make the NBA Finals in 2026?",
    market_slug: "lakers-nba-finals-2026",
    event_slug: "nba-finals-2026",
    description: "Will the Los Angeles Lakers reach the NBA Finals in 2026",
    category: "Sports",
    outcomePrices: [26, 74]
  },
  {
    id: "0x012",
    condition_id: "0x012",
    question: "Will Apple release a car by 2027?",
    market_slug: "apple-car-release-2027",
    event_slug: "apple-car",
    description: "Will Apple release a consumer automobile before December 31, 2027",
    category: "Science",
    outcomePrices: [19, 81]
  },
  {
    id: "0x013",
    condition_id: "0x013",
    question: "Will Kamala Harris run for president in 2028?",
    market_slug: "kamala-harris-2028-run",
    event_slug: "2028-presidential-candidates",
    description: "Will Kamala Harris announce a presidential campaign for 2028",
    category: "Politics",
    outcomePrices: [67, 33]
  },
  {
    id: "0x014",
    condition_id: "0x014",
    question: "Will GTA 6 release in 2025?",
    market_slug: "gta-6-release-2025",
    event_slug: "gta-6-release",
    description: "Will Grand Theft Auto 6 be released in 2025",
    category: "Gaming",
    outcomePrices: [73, 27]
  },
  {
    id: "0x015",
    condition_id: "0x015",
    question: "Will inflation stay below 3% in 2026?",
    market_slug: "inflation-below-3-percent-2026",
    event_slug: "us-inflation-2026",
    description: "Will US CPI inflation remain below 3% throughout 2026",
    category: "Finance",
    outcomePrices: [54, 46]
  },

  // === DIVERSE MARKETS (16-100) ===
  
  // Politics & Government
  {
    id: "0x016",
    condition_id: "0x016",
    question: "Will Gavin Newsom win the California recall election?",
    market_slug: "newsom-california-recall",
    event_slug: "california-politics",
    description: "Will Gavin Newsom survive a recall election if one occurs",
    category: "Politics",
    outcomePrices: [82, 18]
  },
  {
    id: "0x017",
    condition_id: "0x017",
    question: "Will the UK rejoin the EU by 2030?",
    market_slug: "uk-rejoin-eu-2030",
    event_slug: "brexit-reversal",
    description: "Will the United Kingdom rejoin the European Union by 2030",
    category: "Politics",
    outcomePrices: [14, 86]
  },
  {
    id: "0x018",
    condition_id: "0x018",
    question: "Will Ron DeSantis win the 2028 GOP nomination?",
    market_slug: "desantis-gop-nomination-2028",
    event_slug: "gop-primary-2028",
    description: "Will Ron DeSantis win the Republican presidential nomination in 2028",
    category: "Politics",
    outcomePrices: [37, 63]
  },
  
  // Crypto & Web3
  {
    id: "0x019",
    condition_id: "0x019",
    question: "Will Solana price exceed $500 in 2026?",
    market_slug: "solana-500-2026",
    event_slug: "solana-price-2026",
    description: "Will SOL token price exceed $500 at any point in 2026",
    category: "Crypto",
    outcomePrices: [29, 71]
  },
  {
    id: "0x020",
    condition_id: "0x020",
    question: "Will a spot XRP ETF be approved by 2026?",
    market_slug: "xrp-etf-approval-2026",
    event_slug: "crypto-etf-approvals",
    description: "Will the SEC approve a spot XRP ETF before December 31, 2026",
    category: "Crypto",
    outcomePrices: [41, 59]
  },
  {
    id: "0x021",
    condition_id: "0x021",
    question: "Will Coinbase stock hit $400 in 2026?",
    market_slug: "coinbase-400-2026",
    event_slug: "crypto-stocks-2026",
    description: "Will COIN stock price reach $400 at any point in 2026",
    category: "Crypto",
    outcomePrices: [33, 67]
  },
  
  // Sports
  {
    id: "0x022",
    condition_id: "0x022",
    question: "Will Lionel Messi retire from football by 2027?",
    market_slug: "messi-retirement-2027",
    event_slug: "football-retirements",
    description: "Will Lionel Messi officially retire from professional football by 2027",
    category: "Sports",
    outcomePrices: [76, 24]
  },
  {
    id: "0x023",
    condition_id: "0x023",
    question: "Will the Yankees win the 2026 World Series?",
    market_slug: "yankees-world-series-2026",
    event_slug: "mlb-world-series-2026",
    description: "Will the New York Yankees win the 2026 MLB World Series",
    category: "Sports",
    outcomePrices: [21, 79]
  },
  {
    id: "0x024",
    condition_id: "0x024",
    question: "Will Max Verstappen win his 6th F1 championship?",
    market_slug: "verstappen-6th-championship",
    event_slug: "f1-championships",
    description: "Will Max Verstappen win his 6th Formula 1 World Championship",
    category: "Sports",
    outcomePrices: [64, 36]
  },
  {
    id: "0x025",
    condition_id: "0x025",
    question: "Will Manchester City win the Champions League 2026?",
    market_slug: "man-city-champions-league-2026",
    event_slug: "champions-league-2026",
    description: "Will Manchester City win the UEFA Champions League in 2026",
    category: "Sports",
    outcomePrices: [31, 69]
  },
  {
    id: "0x026",
    condition_id: "0x026",
    question: "Will Tiger Woods win another major?",
    market_slug: "tiger-woods-major-win",
    event_slug: "golf-majors",
    description: "Will Tiger Woods win another major golf championship",
    category: "Sports",
    outcomePrices: [8, 92]
  },
  
  // Entertainment & Media
  {
    id: "0x027",
    condition_id: "0x027",
    question: "Will Marvel release 5+ movies in 2026?",
    market_slug: "marvel-5-movies-2026",
    event_slug: "marvel-releases-2026",
    description: "Will Marvel Studios release 5 or more theatrical movies in 2026",
    category: "Entertainment",
    outcomePrices: [43, 57]
  },
  {
    id: "0x028",
    condition_id: "0x028",
    question: "Will Netflix stock exceed $800 in 2026?",
    market_slug: "netflix-800-2026",
    event_slug: "streaming-stocks-2026",
    description: "Will NFLX stock price exceed $800 at any point in 2026",
    category: "Entertainment",
    outcomePrices: [38, 62]
  },
  {
    id: "0x029",
    condition_id: "0x029",
    question: "Will The Winds of Winter be published by 2027?",
    market_slug: "winds-of-winter-2027",
    event_slug: "book-releases",
    description: "Will George R.R. Martin's The Winds of Winter be published by 2027",
    category: "Entertainment",
    outcomePrices: [25, 75]
  },
  {
    id: "0x030",
    condition_id: "0x030",
    question: "Will Taylor Swift win Album of the Year 2026?",
    market_slug: "taylor-swift-album-year-2026",
    event_slug: "grammys-2026",
    description: "Will Taylor Swift win the Grammy for Album of the Year in 2026",
    category: "Entertainment",
    outcomePrices: [46, 54]
  },
  
  // Science & Technology
  {
    id: "0x031",
    condition_id: "0x031",
    question: "Will AGI be achieved by 2030?",
    market_slug: "agi-achieved-2030",
    event_slug: "artificial-general-intelligence",
    description: "Will Artificial General Intelligence be achieved before 2030",
    category: "Science",
    outcomePrices: [16, 84]
  },
  {
    id: "0x032",
    condition_id: "0x032",
    question: "Will Neuralink begin human trials in 2026?",
    market_slug: "neuralink-human-trials-2026",
    event_slug: "neuralink-progress",
    description: "Will Neuralink conduct human brain implant trials in 2026",
    category: "Science",
    outcomePrices: [71, 29]
  },
  {
    id: "0x033",
    condition_id: "0x033",
    question: "Will quantum computers break RSA encryption by 2030?",
    market_slug: "quantum-break-rsa-2030",
    event_slug: "quantum-computing",
    description: "Will quantum computers successfully break RSA encryption by 2030",
    category: "Science",
    outcomePrices: [23, 77]
  },
  {
    id: "0x034",
    condition_id: "0x034",
    question: "Will Blue Origin reach orbit in 2026?",
    market_slug: "blue-origin-orbit-2026",
    event_slug: "space-race-2026",
    description: "Will Blue Origin successfully reach orbit with New Glenn in 2026",
    category: "Science",
    outcomePrices: [58, 42]
  },
  
  // Finance & Economy
  {
    id: "0x035",
    condition_id: "0x035",
    question: "Will US unemployment exceed 5% in 2026?",
    market_slug: "us-unemployment-5-percent-2026",
    event_slug: "us-economy-2026",
    description: "Will US unemployment rate exceed 5% at any point in 2026",
    category: "Finance",
    outcomePrices: [39, 61]
  },
  {
    id: "0x036",
    condition_id: "0x036",
    question: "Will the S&P 500 reach 7000 in 2026?",
    market_slug: "sp500-7000-2026",
    event_slug: "stock-market-2026",
    description: "Will the S&P 500 index reach 7000 at any point in 2026",
    category: "Finance",
    outcomePrices: [52, 48]
  },
  {
    id: "0x037",
    condition_id: "0x037",
    question: "Will gold price exceed $3000/oz in 2026?",
    market_slug: "gold-3000-2026",
    event_slug: "commodity-prices-2026",
    description: "Will gold price exceed $3000 per ounce at any point in 2026",
    category: "Finance",
    outcomePrices: [34, 66]
  },
  {
    id: "0x038",
    condition_id: "0x038",
    question: "Will there be a US recession in 2026?",
    market_slug: "us-recession-2026",
    event_slug: "economic-outlook-2026",
    description: "Will the US enter an official recession in 2026",
    category: "Finance",
    outcomePrices: [45, 55]
  },
  
  // Gaming & Esports
  {
    id: "0x039",
    condition_id: "0x039",
    question: "Will Faker win another Worlds championship?",
    market_slug: "faker-worlds-championship",
    event_slug: "lol-worlds",
    description: "Will Faker win another League of Legends World Championship",
    category: "Gaming",
    outcomePrices: [27, 73]
  },
  {
    id: "0x040",
    condition_id: "0x040",
    question: "Will Valorant surpass CS:GO in viewership?",
    market_slug: "valorant-surpass-csgo",
    event_slug: "esports-viewership",
    description: "Will Valorant surpass CS:GO in average tournament viewership",
    category: "Gaming",
    outcomePrices: [56, 44]
  },
  {
    id: "0x041",
    condition_id: "0x041",
    question: "Will Nintendo release Switch 2 in 2025?",
    market_slug: "nintendo-switch-2-2025",
    event_slug: "console-releases",
    description: "Will Nintendo release the Switch 2 console in 2025",
    category: "Gaming",
    outcomePrices: [68, 32]
  },
  {
    id: "0x042",
    condition_id: "0x042",
    question: "Will FaZe Clan win a CS2 Major in 2026?",
    market_slug: "faze-cs2-major-2026",
    event_slug: "cs2-majors-2026",
    description: "Will FaZe Clan win a Counter-Strike 2 Major tournament in 2026",
    category: "Gaming",
    outcomePrices: [20, 80]
  },
  
  // World Events & Geopolitics
  {
    id: "0x043",
    condition_id: "0x043",
    question: "Will North Korea test another nuke by 2027?",
    market_slug: "north-korea-nuclear-test-2027",
    event_slug: "north-korea-nuclear",
    description: "Will North Korea conduct a nuclear test before 2027",
    category: "World Events",
    outcomePrices: [63, 37]
  },
  {
    id: "0x044",
    condition_id: "0x044",
    question: "Will the UN recognize Palestine by 2028?",
    market_slug: "un-palestine-recognition-2028",
    event_slug: "palestine-statehood",
    description: "Will Palestine gain full UN membership by 2028",
    category: "World Events",
    outcomePrices: [30, 70]
  },
  {
    id: "0x045",
    condition_id: "0x045",
    question: "Will India become the 3rd largest economy by 2027?",
    market_slug: "india-3rd-economy-2027",
    event_slug: "global-economy-rankings",
    description: "Will India surpass Japan as the world's 3rd largest economy by 2027",
    category: "World Events",
    outcomePrices: [72, 28]
  },
  {
    id: "0x046",
    condition_id: "0x046",
    question: "Will there be a major terrorist attack in Europe in 2026?",
    market_slug: "europe-terrorist-attack-2026",
    event_slug: "global-security-2026",
    description: "Will there be a terrorist attack with 50+ casualties in Europe in 2026",
    category: "World Events",
    outcomePrices: [17, 83]
  },
  
  // More Crypto/DeFi
  {
    id: "0x047",
    condition_id: "0x047",
    question: "Will USDT maintain its peg through 2026?",
    market_slug: "usdt-peg-2026",
    event_slug: "stablecoin-stability",
    description: "Will Tether (USDT) maintain its dollar peg throughout 2026",
    category: "Crypto",
    outcomePrices: [89, 11]
  },
  {
    id: "0x048",
    condition_id: "0x048",
    question: "Will Cardano reach $5 in 2026?",
    market_slug: "cardano-5-2026",
    event_slug: "altcoin-prices-2026",
    description: "Will ADA reach $5 at any point in 2026",
    category: "Crypto",
    outcomePrices: [26, 74]
  },
  {
    id: "0x049",
    condition_id: "0x049",
    question: "Will Binance face criminal charges in 2026?",
    market_slug: "binance-criminal-charges-2026",
    event_slug: "crypto-regulation-2026",
    description: "Will Binance or CZ face new criminal charges in 2026",
    category: "Crypto",
    outcomePrices: [35, 65]
  },
  {
    id: "0x050",
    condition_id: "0x050",
    question: "Will DeFi TVL exceed $500B by 2027?",
    market_slug: "defi-tvl-500b-2027",
    event_slug: "defi-growth",
    description: "Will total DeFi TVL exceed $500 billion by 2027",
    category: "Crypto",
    outcomePrices: [48, 52]
  },
  
  // More Sports
  {
    id: "0x051",
    condition_id: "0x051",
    question: "Will Novak Djokovic win 25 Grand Slams?",
    market_slug: "djokovic-25-grand-slams",
    event_slug: "tennis-records",
    description: "Will Novak Djokovic reach 25 Grand Slam singles titles",
    category: "Sports",
    outcomePrices: [40, 60]
  },
  {
    id: "0x052",
    condition_id: "0x052",
    question: "Will the Cowboys win a playoff game in 2026?",
    market_slug: "cowboys-playoff-win-2026",
    event_slug: "nfl-playoffs-2026",
    description: "Will the Dallas Cowboys win a playoff game in the 2026 season",
    category: "Sports",
    outcomePrices: [57, 43]
  },
  {
    id: "0x053",
    condition_id: "0x053",
    question: "Will LeBron James play until age 42?",
    market_slug: "lebron-play-until-42",
    event_slug: "nba-retirements",
    description: "Will LeBron James still be playing in the NBA at age 42",
    category: "Sports",
    outcomePrices: [22, 78]
  },
  {
    id: "0x054",
    condition_id: "0x054",
    question: "Will the Olympics add esports by 2032?",
    market_slug: "olympics-esports-2032",
    event_slug: "olympic-sports",
    description: "Will esports be an official Olympic sport by 2032",
    category: "Sports",
    outcomePrices: [36, 64]
  },
  
  // More Entertainment
  {
    id: "0x055",
    condition_id: "0x055",
    question: "Will Avatar 3 gross $2B worldwide?",
    market_slug: "avatar-3-2b-gross",
    event_slug: "box-office-2026",
    description: "Will Avatar 3 gross over $2 billion worldwide",
    category: "Entertainment",
    outcomePrices: [69, 31]
  },
  {
    id: "0x056",
    condition_id: "0x056",
    question: "Will Disney+ surpass Netflix subscribers by 2027?",
    market_slug: "disney-surpass-netflix-2027",
    event_slug: "streaming-wars",
    description: "Will Disney+ have more subscribers than Netflix by 2027",
    category: "Entertainment",
    outcomePrices: [19, 81]
  },
  {
    id: "0x057",
    condition_id: "0x057",
    question: "Will a K-pop group win a Grammy in 2026?",
    market_slug: "kpop-grammy-2026",
    event_slug: "grammys-2026",
    description: "Will a K-pop group win a Grammy Award in 2026",
    category: "Entertainment",
    outcomePrices: [44, 56]
  },
  {
    id: "0x058",
    condition_id: "0x058",
    question: "Will Joe Rogan's podcast be acquired?",
    market_slug: "joe-rogan-podcast-acquisition",
    event_slug: "media-acquisitions",
    description: "Will The Joe Rogan Experience be acquired by a major platform",
    category: "Entertainment",
    outcomePrices: [13, 87]
  },
  
  // More Science & Tech
  {
    id: "0x059",
    condition_id: "0x059",
    question: "Will a room-temperature superconductor be confirmed by 2028?",
    market_slug: "room-temp-superconductor-2028",
    event_slug: "scientific-breakthroughs",
    description: "Will a room-temperature superconductor be independently confirmed by 2028",
    category: "Science",
    outcomePrices: [11, 89]
  },
  {
    id: "0x060",
    condition_id: "0x060",
    question: "Will Tesla FSD reach Level 5 autonomy by 2027?",
    market_slug: "tesla-level-5-2027",
    event_slug: "autonomous-vehicles",
    description: "Will Tesla achieve Level 5 full self-driving by 2027",
    category: "Science",
    outcomePrices: [24, 76]
  },
  {
    id: "0x061",
    condition_id: "0x061",
    question: "Will CRISPR cure a major disease by 2028?",
    market_slug: "crispr-cure-disease-2028",
    event_slug: "medical-breakthroughs",
    description: "Will CRISPR gene editing cure a major disease by 2028",
    category: "Science",
    outcomePrices: [51, 49]
  },
  {
    id: "0x062",
    condition_id: "0x062",
    question: "Will fusion power be commercialized by 2035?",
    market_slug: "fusion-power-2035",
    event_slug: "energy-innovation",
    description: "Will commercial fusion power plants be operational by 2035",
    category: "Science",
    outcomePrices: [28, 72]
  },
  
  // More Politics
  {
    id: "0x063",
    condition_id: "0x063",
    question: "Will AOC run for president in 2028?",
    market_slug: "aoc-president-2028",
    event_slug: "2028-presidential-race",
    description: "Will Alexandria Ocasio-Cortez run for president in 2028",
    category: "Politics",
    outcomePrices: [62, 38]
  },
  {
    id: "0x064",
    condition_id: "0x064",
    question: "Will Texas turn blue in 2028?",
    market_slug: "texas-blue-2028",
    event_slug: "2028-electoral-map",
    description: "Will Texas vote Democratic in the 2028 presidential election",
    category: "Politics",
    outcomePrices: [25, 75]
  },
  {
    id: "0x065",
    condition_id: "0x065",
    question: "Will the Supreme Court expand beyond 9 justices?",
    market_slug: "supreme-court-expansion",
    event_slug: "judicial-reform",
    description: "Will the US Supreme Court be expanded beyond 9 justices",
    category: "Politics",
    outcomePrices: [15, 85]
  },
  {
    id: "0x066",
    condition_id: "0x066",
    question: "Will Tucker Carlson run for office by 2028?",
    market_slug: "tucker-carlson-run-2028",
    event_slug: "political-newcomers",
    description: "Will Tucker Carlson run for political office by 2028",
    category: "Politics",
    outcomePrices: [33, 67]
  },
  
  // More Finance
  {
    id: "0x067",
    condition_id: "0x067",
    question: "Will Apple hit $4 trillion market cap?",
    market_slug: "apple-4-trillion",
    event_slug: "mega-cap-stocks",
    description: "Will Apple reach a $4 trillion market capitalization",
    category: "Finance",
    outcomePrices: [47, 53]
  },
  {
    id: "0x068",
    condition_id: "0x068",
    question: "Will oil price exceed $120/barrel in 2026?",
    market_slug: "oil-120-2026",
    event_slug: "energy-prices-2026",
    description: "Will WTI crude oil exceed $120 per barrel in 2026",
    category: "Finance",
    outcomePrices: [29, 71]
  },
  {
    id: "0x069",
    condition_id: "0x069",
    question: "Will the US debt exceed $40T by 2028?",
    market_slug: "us-debt-40t-2028",
    event_slug: "national-debt",
    description: "Will US national debt exceed $40 trillion by 2028",
    category: "Finance",
    outcomePrices: [76, 24]
  },
  {
    id: "0x070",
    condition_id: "0x070",
    question: "Will JPMorgan acquire another major bank by 2027?",
    market_slug: "jpmorgan-acquisition-2027",
    event_slug: "bank-consolidation",
    description: "Will JPMorgan Chase acquire another top-20 US bank by 2027",
    category: "Finance",
    outcomePrices: [21, 79]
  },
  
  // More Gaming
  {
    id: "0x071",
    condition_id: "0x071",
    question: "Will Half-Life 3 be announced by 2028?",
    market_slug: "half-life-3-announcement-2028",
    event_slug: "game-announcements",
    description: "Will Valve announce Half-Life 3 by 2028",
    category: "Gaming",
    outcomePrices: [18, 82]
  },
  {
    id: "0x072",
    condition_id: "0x072",
    question: "Will Call of Duty remain on PlayStation?",
    market_slug: "cod-playstation",
    event_slug: "gaming-exclusivity",
    description: "Will Call of Duty continue releasing on PlayStation through 2028",
    category: "Gaming",
    outcomePrices: [91, 9]
  },
  {
    id: "0x073",
    condition_id: "0x073",
    question: "Will Steam Deck 2 release by 2026?",
    market_slug: "steam-deck-2-2026",
    event_slug: "handheld-gaming",
    description: "Will Valve release Steam Deck 2 by 2026",
    category: "Gaming",
    outcomePrices: [55, 45]
  },
  {
    id: "0x074",
    condition_id: "0x074",
    question: "Will Minecraft remain the best-selling game?",
    market_slug: "minecraft-best-selling",
    event_slug: "gaming-records",
    description: "Will Minecraft remain the best-selling video game of all time through 2027",
    category: "Gaming",
    outcomePrices: [84, 16]
  },
  
  // More World Events
  {
    id: "0x075",
    condition_id: "0x075",
    question: "Will Scotland vote for independence by 2030?",
    market_slug: "scotland-independence-2030",
    event_slug: "uk-politics",
    description: "Will Scotland hold and pass an independence referendum by 2030",
    category: "World Events",
    outcomePrices: [23, 77]
  },
  {
    id: "0x076",
    condition_id: "0x076",
    question: "Will Iran develop nuclear weapons by 2028?",
    market_slug: "iran-nuclear-weapons-2028",
    event_slug: "nuclear-proliferation",
    description: "Will Iran successfully develop nuclear weapons by 2028",
    category: "World Events",
    outcomePrices: [37, 63]
  },
  {
    id: "0x077",
    condition_id: "0x077",
    question: "Will the EU add a new member by 2028?",
    market_slug: "eu-new-member-2028",
    event_slug: "eu-expansion",
    description: "Will the European Union admit a new member state by 2028",
    category: "World Events",
    outcomePrices: [59, 41]
  },
  {
    id: "0x078",
    condition_id: "0x078",
    question: "Will global population reach 9 billion by 2035?",
    market_slug: "global-population-9b-2035",
    event_slug: "demographics",
    description: "Will world population reach 9 billion by 2035",
    category: "World Events",
    outcomePrices: [66, 34]
  },
  
  // Climate & Environment
  {
    id: "0x079",
    condition_id: "0x079",
    question: "Will 2026 be the hottest year on record?",
    market_slug: "2026-hottest-year",
    event_slug: "climate-records",
    description: "Will 2026 break the global temperature record",
    category: "Science",
    outcomePrices: [42, 58]
  },
  {
    id: "0x080",
    condition_id: "0x080",
    question: "Will EVs exceed 50% of new car sales by 2030?",
    market_slug: "ev-50-percent-2030",
    event_slug: "electric-vehicles",
    description: "Will electric vehicles exceed 50% of new car sales globally by 2030",
    category: "Science",
    outcomePrices: [53, 47]
  },
  
  // Social Media & Internet
  {
    id: "0x081",
    condition_id: "0x081",
    question: "Will X (Twitter) be sold by 2027?",
    market_slug: "x-twitter-sold-2027",
    event_slug: "tech-acquisitions",
    description: "Will X (formerly Twitter) be sold to new ownership by 2027",
    category: "Science",
    outcomePrices: [31, 69]
  },
  {
    id: "0x082",
    condition_id: "0x082",
    question: "Will TikTok be banned in the US?",
    market_slug: "tiktok-us-ban",
    event_slug: "social-media-regulation",
    description: "Will TikTok be banned in the United States",
    category: "Politics",
    outcomePrices: [46, 54]
  },
  {
    id: "0x083",
    condition_id: "0x083",
    question: "Will Meta stock reach $600 in 2026?",
    market_slug: "meta-600-2026",
    event_slug: "tech-stocks-2026",
    description: "Will META stock price reach $600 in 2026",
    category: "Finance",
    outcomePrices: [60, 40]
  },
  
  // Health & Medicine
  {
    id: "0x084",
    condition_id: "0x084",
    question: "Will Ozempic be approved for addiction treatment?",
    market_slug: "ozempic-addiction-treatment",
    event_slug: "drug-approvals",
    description: "Will Ozempic/semaglutide be FDA approved for addiction treatment",
    category: "Science",
    outcomePrices: [34, 66]
  },
  {
    id: "0x085",
    condition_id: "0x085",
    question: "Will life expectancy reach 85 in a developed nation by 2030?",
    market_slug: "life-expectancy-85-2030",
    event_slug: "health-metrics",
    description: "Will any developed nation achieve 85+ years life expectancy by 2030",
    category: "Science",
    outcomePrices: [71, 29]
  },
  
  // Education
  {
    id: "0x086",
    condition_id: "0x086",
    question: "Will Harvard's endowment exceed $60B by 2027?",
    market_slug: "harvard-endowment-60b-2027",
    event_slug: "university-finances",
    description: "Will Harvard University's endowment exceed $60 billion by 2027",
    category: "Finance",
    outcomePrices: [49, 51]
  },
  {
    id: "0x087",
    condition_id: "0x087",
    question: "Will online degrees become majority by 2030?",
    market_slug: "online-degrees-majority-2030",
    event_slug: "education-trends",
    description: "Will online degrees exceed traditional degrees by 2030",
    category: "Science",
    outcomePrices: [27, 73]
  },
  
  // Transportation
  {
    id: "0x088",
    condition_id: "0x088",
    question: "Will commercial flying cars operate by 2030?",
    market_slug: "flying-cars-2030",
    event_slug: "future-transport",
    description: "Will commercial flying car services operate in any major city by 2030",
    category: "Science",
    outcomePrices: [12, 88]
  },
  {
    id: "0x089",
    condition_id: "0x089",
    question: "Will Hyperloop be operational by 2030?",
    market_slug: "hyperloop-operational-2030",
    event_slug: "transportation-innovation",
    description: "Will a commercial Hyperloop system be operational by 2030",
    category: "Science",
    outcomePrices: [9, 91]
  },
  
  // Real Estate
  {
    id: "0x090",
    condition_id: "0x090",
    question: "Will US home prices decline 20% from peak?",
    market_slug: "us-home-prices-decline-20",
    event_slug: "housing-market",
    description: "Will US median home prices decline 20% from their peak",
    category: "Finance",
    outcomePrices: [26, 74]
  },
  {
    id: "0x091",
    condition_id: "0x091",
    question: "Will Manhattan real estate average $2500/sqft?",
    market_slug: "manhattan-2500-sqft",
    event_slug: "nyc-real-estate",
    description: "Will Manhattan average real estate price reach $2500 per square foot",
    category: "Finance",
    outcomePrices: [38, 62]
  },
  
  // Food & Agriculture
  {
    id: "0x092",
    condition_id: "0x092",
    question: "Will lab-grown meat reach 10% market share by 2030?",
    market_slug: "lab-meat-10-percent-2030",
    event_slug: "food-innovation",
    description: "Will lab-grown meat achieve 10% market share by 2030",
    category: "Science",
    outcomePrices: [20, 80]
  },
  {
    id: "0x093",
    condition_id: "0x093",
    question: "Will a major food shortage occur by 2028?",
    market_slug: "food-shortage-2028",
    event_slug: "global-food-security",
    description: "Will a major food shortage affect 100M+ people by 2028",
    category: "World Events",
    outcomePrices: [32, 68]
  },
  
  // Legal & Justice
  {
    id: "0x094",
    condition_id: "0x094",
    question: "Will cannabis be federally legal in US by 2028?",
    market_slug: "cannabis-federal-legal-2028",
    event_slug: "drug-legalization",
    description: "Will cannabis be federally legalized in the United States by 2028",
    category: "Politics",
    outcomePrices: [65, 35]
  },
  {
    id: "0x095",
    condition_id: "0x095",
    question: "Will any US president be convicted of a crime?",
    market_slug: "president-convicted-crime",
    event_slug: "presidential-legal",
    description: "Will any US president (current or former) be convicted of a crime",
    category: "Politics",
    outcomePrices: [41, 59]
  },
  
  // Fashion & Culture
  {
    id: "0x096",
    condition_id: "0x096",
    question: "Will the Met Gala be cancelled before 2030?",
    market_slug: "met-gala-cancelled-2030",
    event_slug: "fashion-events",
    description: "Will the Met Gala be cancelled or indefinitely postponed before 2030",
    category: "Entertainment",
    outcomePrices: [14, 86]
  },
  {
    id: "0x097",
    condition_id: "0x097",
    question: "Will Gen Z fashion bring back 90s trends?",
    market_slug: "gen-z-90s-fashion",
    event_slug: "fashion-trends",
    description: "Will 90s fashion become mainstream again by 2027",
    category: "Entertainment",
    outcomePrices: [77, 23]
  },
  
  // Final Markets
  {
    id: "0x098",
    condition_id: "0x098",
    question: "Will Amazon split into separate companies?",
    market_slug: "amazon-split",
    event_slug: "tech-antitrust",
    description: "Will Amazon be split into separate companies due to antitrust",
    category: "Finance",
    outcomePrices: [17, 83]
  },
  {
    id: "0x099",
    condition_id: "0x099",
    question: "Will a new COVID variant cause lockdowns in 2026?",
    market_slug: "covid-variant-lockdowns-2026",
    event_slug: "pandemic-response",
    description: "Will a new COVID variant cause major lockdowns in 2026",
    category: "World Events",
    outcomePrices: [10, 90]
  },
  {
    id: "0x100",
    condition_id: "0x100",
    question: "Will humans return to the Moon by 2028?",
    market_slug: "moon-return-2028",
    event_slug: "space-exploration",
    description: "Will humans successfully land on the Moon again by 2028",
    category: "Science",
    outcomePrices: [75, 25]
  }
];

// Helper function to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to get diverse subset
export function getDiverseMarkets(count: number = 10): HardcodedMarket[] {
  // Always include first 10 high-profile markets
  const highProfile = HARDCODED_MARKETS.slice(0, 15);
  
  if (count <= 15) {
    return shuffleArray(highProfile).slice(0, count);
  }
  
  // For larger requests, include high-profile + random selection from the rest
  const remaining = HARDCODED_MARKETS.slice(15);
  const shuffledRemaining = shuffleArray(remaining);
  const additionalNeeded = count - 15;
  
  return [
    ...highProfile,
    ...shuffledRemaining.slice(0, additionalNeeded)
  ];
}