// Hardcoded markets data matching server structure
export interface Market {
  id: string;
  question: string;
  category?: string;
  value?: string;
  positive?: boolean;
  icon?: string;
  iconBg?: string;
  logo?: string;
}

// Category icons and colors
export const CATEGORY_STYLES: Record<string, { icon: string; iconBg: string }> = {
  'Politics': { icon: '🗳️', iconBg: 'bg-blue-600' },
  'Crypto': { icon: '₿', iconBg: 'bg-orange-500' },
  'Sports': { icon: '⚽', iconBg: 'bg-green-600' },
  'Entertainment': { icon: '🎬', iconBg: 'bg-purple-600' },
  'Science': { icon: '🔬', iconBg: 'bg-cyan-600' },
  'Finance': { icon: '📈', iconBg: 'bg-emerald-600' },
  'Gaming': { icon: '🎮', iconBg: 'bg-indigo-600' },
  'World Events': { icon: '🌍', iconBg: 'bg-red-600' },
};

// 100 diverse markets matching server data
export const MARKETS: Market[] = [
  // Politics
  { id: "0x001", question: "Will Donald Trump win the 2028 presidential election?", category: "Politics" },
  { id: "0x013", question: "Will Kamala Harris run for president in 2028?", category: "Politics" },
  { id: "0x016", question: "Will Gavin Newsom win the California recall election?", category: "Politics" },
  { id: "0x017", question: "Will the UK rejoin the EU by 2030?", category: "Politics" },
  { id: "0x018", question: "Will Ron DeSantis win the 2028 GOP nomination?", category: "Politics" },
  { id: "0x063", question: "Will AOC run for president in 2028?", category: "Politics" },
  { id: "0x064", question: "Will Texas turn blue in 2028?", category: "Politics" },
  { id: "0x065", question: "Will the Supreme Court expand beyond 9 justices?", category: "Politics" },
  { id: "0x066", question: "Will Tucker Carlson run for office by 2028?", category: "Politics" },
  { id: "0x082", question: "Will TikTok be banned in the US?", category: "Politics" },
  { id: "0x094", question: "Will cannabis be federally legal in US by 2028?", category: "Politics" },
  { id: "0x095", question: "Will any US president be convicted of a crime?", category: "Politics" },

  // Crypto
  { id: "0x002", question: "Will Bitcoin reach $150,000 in 2026?", category: "Crypto" },
  { id: "0x008", question: "Will Ethereum flip Bitcoin market cap in 2026?", category: "Crypto" },
  { id: "0x019", question: "Will Solana price exceed $500 in 2026?", category: "Crypto" },
  { id: "0x020", question: "Will a spot XRP ETF be approved by 2026?", category: "Crypto" },
  { id: "0x021", question: "Will Coinbase stock hit $400 in 2026?", category: "Crypto" },
  { id: "0x047", question: "Will USDT maintain its peg through 2026?", category: "Crypto" },
  { id: "0x048", question: "Will Cardano reach $5 in 2026?", category: "Crypto" },
  { id: "0x049", question: "Will Binance face criminal charges in 2026?", category: "Crypto" },
  { id: "0x050", question: "Will DeFi TVL exceed $500B by 2027?", category: "Crypto" },

  // Sports
  { id: "0x003", question: "Will the Kansas City Chiefs win Super Bowl LIX?", category: "Sports" },
  { id: "0x011", question: "Will the Lakers make the NBA Finals in 2026?", category: "Sports" },
  { id: "0x022", question: "Will Lionel Messi retire from football by 2027?", category: "Sports" },
  { id: "0x023", question: "Will the Yankees win the 2026 World Series?", category: "Sports" },
  { id: "0x024", question: "Will Max Verstappen win his 6th F1 championship?", category: "Sports" },
  { id: "0x025", question: "Will Manchester City win the Champions League 2026?", category: "Sports" },
  { id: "0x026", question: "Will Tiger Woods win another major?", category: "Sports" },
  { id: "0x051", question: "Will Novak Djokovic win 25 Grand Slams?", category: "Sports" },
  { id: "0x052", question: "Will the Cowboys win a playoff game in 2026?", category: "Sports" },
  { id: "0x053", question: "Will LeBron James play until age 42?", category: "Sports" },
  { id: "0x054", question: "Will the Olympics add esports by 2032?", category: "Sports" },

  // Entertainment
  { id: "0x006", question: "Will Oppenheimer win Best Picture at the 2026 Oscars?", category: "Entertainment" },
  { id: "0x027", question: "Will Marvel release 5+ movies in 2026?", category: "Entertainment" },
  { id: "0x028", question: "Will Netflix stock exceed $800 in 2026?", category: "Entertainment" },
  { id: "0x029", question: "Will The Winds of Winter be published by 2027?", category: "Entertainment" },
  { id: "0x030", question: "Will Taylor Swift win Album of the Year 2026?", category: "Entertainment" },
  { id: "0x055", question: "Will Avatar 3 gross $2B worldwide?", category: "Entertainment" },
  { id: "0x056", question: "Will Disney+ surpass Netflix subscribers by 2027?", category: "Entertainment" },
  { id: "0x057", question: "Will a K-pop group win a Grammy in 2026?", category: "Entertainment" },
  { id: "0x058", question: "Will Joe Rogan's podcast be acquired?", category: "Entertainment" },
  { id: "0x096", question: "Will the Met Gala be cancelled before 2030?", category: "Entertainment" },
  { id: "0x097", question: "Will Gen Z fashion bring back 90s trends?", category: "Entertainment" },

  // Science & Technology
  { id: "0x004", question: "Will SpaceX successfully land humans on Mars by 2030?", category: "Science" },
  { id: "0x012", question: "Will Apple release a car by 2027?", category: "Science" },
  { id: "0x031", question: "Will AGI be achieved by 2030?", category: "Science" },
  { id: "0x032", question: "Will Neuralink begin human trials in 2026?", category: "Science" },
  { id: "0x033", question: "Will quantum computers break RSA encryption by 2030?", category: "Science" },
  { id: "0x034", question: "Will Blue Origin reach orbit in 2026?", category: "Science" },
  { id: "0x059", question: "Will a room-temperature superconductor be confirmed by 2028?", category: "Science" },
  { id: "0x060", question: "Will Tesla FSD reach Level 5 autonomy by 2027?", category: "Science" },
  { id: "0x061", question: "Will CRISPR cure a major disease by 2028?", category: "Science" },
  { id: "0x062", question: "Will fusion power be commercialized by 2035?", category: "Science" },
  { id: "0x079", question: "Will 2026 be the hottest year on record?", category: "Science" },
  { id: "0x080", question: "Will EVs exceed 50% of new car sales by 2030?", category: "Science" },
  { id: "0x081", question: "Will X (Twitter) be sold by 2027?", category: "Science" },
  { id: "0x084", question: "Will Ozempic be approved for addiction treatment?", category: "Science" },
  { id: "0x085", question: "Will life expectancy reach 85 in a developed nation by 2030?", category: "Science" },
  { id: "0x087", question: "Will online degrees become majority by 2030?", category: "Science" },
  { id: "0x088", question: "Will commercial flying cars operate by 2030?", category: "Science" },
  { id: "0x089", question: "Will Hyperloop be operational by 2030?", category: "Science" },
  { id: "0x092", question: "Will lab-grown meat reach 10% market share by 2030?", category: "Science" },
  { id: "0x100", question: "Will humans return to the Moon by 2028?", category: "Science" },

  // Finance
  { id: "0x005", question: "Will the Fed cut rates in March 2026?", category: "Finance" },
  { id: "0x015", question: "Will inflation stay below 3% in 2026?", category: "Finance" },
  { id: "0x035", question: "Will US unemployment exceed 5% in 2026?", category: "Finance" },
  { id: "0x036", question: "Will the S&P 500 reach 7000 in 2026?", category: "Finance" },
  { id: "0x037", question: "Will gold price exceed $3000/oz in 2026?", category: "Finance" },
  { id: "0x038", question: "Will there be a US recession in 2026?", category: "Finance" },
  { id: "0x067", question: "Will Apple hit $4 trillion market cap?", category: "Finance" },
  { id: "0x068", question: "Will oil price exceed $120/barrel in 2026?", category: "Finance" },
  { id: "0x069", question: "Will the US debt exceed $40T by 2028?", category: "Finance" },
  { id: "0x070", question: "Will JPMorgan acquire another major bank by 2027?", category: "Finance" },
  { id: "0x083", question: "Will Meta stock reach $600 in 2026?", category: "Finance" },
  { id: "0x086", question: "Will Harvard's endowment exceed $60B by 2027?", category: "Finance" },
  { id: "0x090", question: "Will US home prices decline 20% from peak?", category: "Finance" },
  { id: "0x091", question: "Will Manhattan real estate average $2500/sqft?", category: "Finance" },
  { id: "0x098", question: "Will Amazon split into separate companies?", category: "Finance" },

  // Gaming
  { id: "0x009", question: "Will Team Liquid win The International 2026?", category: "Gaming" },
  { id: "0x014", question: "Will GTA 6 release in 2025?", category: "Gaming" },
  { id: "0x039", question: "Will Faker win another Worlds championship?", category: "Gaming" },
  { id: "0x040", question: "Will Valorant surpass CS:GO in viewership?", category: "Gaming" },
  { id: "0x041", question: "Will Nintendo release Switch 2 in 2025?", category: "Gaming" },
  { id: "0x042", question: "Will FaZe Clan win a CS2 Major in 2026?", category: "Gaming" },
  { id: "0x071", question: "Will Half-Life 3 be announced by 2028?", category: "Gaming" },
  { id: "0x072", question: "Will Call of Duty remain on PlayStation?", category: "Gaming" },
  { id: "0x073", question: "Will Steam Deck 2 release by 2026?", category: "Gaming" },
  { id: "0x074", question: "Will Minecraft remain the best-selling game?", category: "Gaming" },

  // World Events
  { id: "0x007", question: "Will Ukraine regain all territory by end of 2026?", category: "World Events" },
  { id: "0x010", question: "Will China invade Taiwan by 2028?", category: "World Events" },
  { id: "0x043", question: "Will North Korea test another nuke by 2027?", category: "World Events" },
  { id: "0x044", question: "Will the UN recognize Palestine by 2028?", category: "World Events" },
  { id: "0x045", question: "Will India become the 3rd largest economy by 2027?", category: "World Events" },
  { id: "0x046", question: "Will there be a major terrorist attack in Europe in 2026?", category: "World Events" },
  { id: "0x075", question: "Will Scotland vote for independence by 2030?", category: "World Events" },
  { id: "0x076", question: "Will Iran develop nuclear weapons by 2028?", category: "World Events" },
  { id: "0x077", question: "Will the EU add a new member by 2028?", category: "World Events" },
  { id: "0x078", question: "Will global population reach 9 billion by 2035?", category: "World Events" },
  { id: "0x093", question: "Will a major food shortage occur by 2028?", category: "World Events" },
  { id: "0x099", question: "Will a new COVID variant cause lockdowns in 2026?", category: "World Events" }
];

// Function to get random markets with diverse categories
export function getRandomMarkets(count: number = 10): Market[] {
  const shuffled = [...MARKETS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  // Add random values and positive/negative status
  return selected.map(market => {
    const value = Math.floor(Math.random() * 10000);
    const positive = Math.random() > 0.5;
    const formattedValue = positive 
      ? `+$${value.toLocaleString()}.00`
      : `-$${value.toLocaleString()}.00`;
    
    const categoryStyle = CATEGORY_STYLES[market.category || 'World Events'];
    
    return {
      ...market,
      value: formattedValue,
      positive,
      icon: categoryStyle.icon,
      iconBg: categoryStyle.iconBg
    };
  });
}

// Function to get markets by category
export function getMarketsByCategory(category: string, count: number = 5): Market[] {
  const categoryMarkets = MARKETS.filter(m => m.category === category);
  const shuffled = [...categoryMarkets].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(market => {
    const value = Math.floor(Math.random() * 10000);
    const positive = Math.random() > 0.5;
    const formattedValue = positive 
      ? `+$${value.toLocaleString()}.00`
      : `-$${value.toLocaleString()}.00`;
    
    const categoryStyle = CATEGORY_STYLES[market.category || 'World Events'];
    
    return {
      ...market,
      value: formattedValue,
      positive,
      icon: categoryStyle.icon,
      iconBg: categoryStyle.iconBg
    };
  });
}

// Function to get diverse markets (ensures variety)
export function getDiverseMarkets(count: number = 10): Market[] {
  const categories = Object.keys(CATEGORY_STYLES);
  const perCategory = Math.ceil(count / categories.length);
  const diverse: Market[] = [];
  
  categories.forEach(category => {
    const categoryMarkets = getMarketsByCategory(category, perCategory);
    diverse.push(...categoryMarkets);
  });
  
  // Shuffle and limit to requested count
  return diverse.sort(() => Math.random() - 0.5).slice(0, count);
}