// polymarket layer

import type { PolymarketMarket } from '../types';
import { logMessage, type Logger } from './logger';
import { HARDCODED_MARKETS, getDiverseMarkets, type HardcodedMarket } from '../data/hardcoded-markets';

const CLOB_API = 'https://clob.polymarket.com';
const GAMMA_API = 'https://gamma-api.polymarket.com';

// Flag to control whether to use hardcoded markets or API
const USE_HARDCODED_MARKETS = true;

export async function fetchMarkets(
  logger?: Logger,
  limit: number = 1000
): Promise<PolymarketMarket[]> {
  const safeLimit = Math.max(1, Math.min(1000, Math.floor(limit)));
  
  // Use hardcoded markets for consistent variety
  if (USE_HARDCODED_MARKETS) {
    logMessage(logger, 'log', `Using hardcoded markets (${HARDCODED_MARKETS.length} available)`);
    
    // Get diverse subset based on requested limit
    const diverseMarkets = getDiverseMarkets(Math.min(safeLimit, HARDCODED_MARKETS.length));
    
    // Convert hardcoded markets to full PolymarketMarket format
    return diverseMarkets.map((m: HardcodedMarket) => ({
      ...m,
      id: m.id,
      condition_id: m.condition_id,
      question: m.question,
      outcomes: ['Yes', 'No'],
      volume: (Math.random() * 1000000).toFixed(2), // Simulated volume as string
      liquidity: (Math.random() * 500000).toFixed(2), // Simulated liquidity as string
    } as PolymarketMarket));
  }
  
  // Fallback to API (original implementation)
  try {
    const response = await fetch(`${GAMMA_API}/markets?limit=${safeLimit}&closed=false`);
    if (!response.ok) {
      throw new Error(`Failed to fetch markets: ${response.statusText}`);
    }
    const markets = await response.json() as PolymarketMarket[];

    // Normalize the data - Gamma API returns markets directly, not in a data field
    return markets.map(m => ({
      ...m,
      // Ensure we have both id and condition_id fields
      id: m.id || m.condition_id || '',
      condition_id: m.condition_id || m.id,
    }));
  } catch (error) {
    logMessage(logger, 'error', 'API fetch failed, using hardcoded markets as fallback', error);
    
    // Fallback to hardcoded markets on API failure
    const diverseMarkets = getDiverseMarkets(Math.min(safeLimit, HARDCODED_MARKETS.length));
    return diverseMarkets.map((m: HardcodedMarket) => ({
      ...m,
      id: m.id,
      condition_id: m.condition_id,
      question: m.question,
      outcomes: ['Yes', 'No'],
      volume: (Math.random() * 1000000).toFixed(2),
      liquidity: (Math.random() * 500000).toFixed(2),
    } as PolymarketMarket));
  }
}

export async function fetchMarket(
  id: string,
  logger?: Logger
): Promise<PolymarketMarket> {
  // Check hardcoded markets first
  if (USE_HARDCODED_MARKETS) {
    const hardcodedMarket = HARDCODED_MARKETS.find(
      m => m.id === id || m.condition_id === id
    );
    
    if (hardcodedMarket) {
      logMessage(logger, 'log', `Found market ${id} in hardcoded data`);
      return {
        ...hardcodedMarket,
        id: hardcodedMarket.id,
        condition_id: hardcodedMarket.condition_id,
        question: hardcodedMarket.question,
        outcomes: ['Yes', 'No'],
        volume: (Math.random() * 1000000).toFixed(2),
        liquidity: (Math.random() * 500000).toFixed(2),
      } as PolymarketMarket;
    }
  }
  
  // Try API if not found in hardcoded markets
  try {
    // Try Gamma API first (has more current data)
    let response = await fetch(`${GAMMA_API}/markets/${id}`);

    // Fall back to CLOB API if not found in Gamma
    if (!response.ok) {
      response = await fetch(`${CLOB_API}/markets/${id}`);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch market: ${response.statusText}`);
    }

    const data = await response.json() as PolymarketMarket;
    return {
      ...data,
      id: data.id || data.condition_id || '',
      condition_id: data.condition_id || data.id,
    };
  } catch (error) {
    // Final fallback: check hardcoded markets even if USE_HARDCODED_MARKETS is false
    const hardcodedMarket = HARDCODED_MARKETS.find(
      m => m.id === id || m.condition_id === id
    );
    
    if (hardcodedMarket) {
      logMessage(logger, 'log', `API failed, using hardcoded market ${id}`);
      return {
        ...hardcodedMarket,
        id: hardcodedMarket.id,
        condition_id: hardcodedMarket.condition_id,
        question: hardcodedMarket.question,
        outcomes: ['Yes', 'No'],
        volume: (Math.random() * 1000000).toFixed(2),
        liquidity: (Math.random() * 500000).toFixed(2),
      } as PolymarketMarket;
    }
    
    throw error;
  }
}

export async function searchMarkets(
  query: string,
  logger?: Logger
): Promise<PolymarketMarket[]> {
  // Use hardcoded markets for search if enabled
  if (USE_HARDCODED_MARKETS) {
    const searchResults = HARDCODED_MARKETS.filter(m =>
      m.question?.toLowerCase().includes(query.toLowerCase()) ||
      m.description?.toLowerCase().includes(query.toLowerCase()) ||
      m.category?.toLowerCase().includes(query.toLowerCase())
    );
    
    logMessage(logger, 'log', `Found ${searchResults.length} hardcoded markets matching "${query}"`);
    
    return searchResults.map(m => ({
      ...m,
      id: m.id,
      condition_id: m.condition_id,
      question: m.question,
      outcomes: ['Yes', 'No'],
      volume: (Math.random() * 1000000).toFixed(2),
      liquidity: (Math.random() * 500000).toFixed(2),
    } as PolymarketMarket));
  }
  
  // Fallback to API search
  const markets = await fetchMarkets(logger);
  return markets.filter(m =>
    m.question?.toLowerCase().includes(query.toLowerCase())
  );
}

export interface PolymarketEvent {
  id: string;
  slug: string;
  title: string;
  description?: string;
  markets?: any[];
}

export async function searchEventsByKeywords(
  keywords: string,
  logger?: Logger
): Promise<PolymarketEvent[]> {
  try {
    const response = await fetch(
      `${GAMMA_API}/public-search?q=${encodeURIComponent(keywords)}&limit_per_type=20`
    );
    
    if (!response.ok) {
      logMessage(logger, 'error', 'Failed to search events', response.statusText);
      return [];
    }

    const result = await response.json() as { events?: PolymarketEvent[] };
    return result.events || [];
  } catch (error) {
    logMessage(logger, 'error', 'Error searching events by keywords', error);
    return [];
  }
}

export async function searchEventsByCategory(
  category: string,
  logger?: Logger
): Promise<PolymarketEvent[]> {
  // Use category as search term for fallback
  const categoryKeywords: Record<string, string> = {
    'Politics': 'politics election government',
    'Crypto': 'crypto bitcoin ethereum blockchain',
    'Sports': 'sports game league championship',
    'Science': 'science technology research',
    'Entertainment': 'entertainment movie celebrity',
    'Other': 'market prediction'
  };

  const searchTerms = categoryKeywords[category] || category;
  return searchEventsByKeywords(searchTerms, logger);
}

// Tag types and caching
export interface PolymarketTag {
  id: string;
  label: string;
  slug: string;
}

interface TagsCache {
  tags: PolymarketTag[];
  fetchedAt: number;
}

let tagsCache: TagsCache | null = null;
const TAGS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function fetchTags(logger?: Logger): Promise<PolymarketTag[]> {
  // Return cached tags if within TTL
  if (tagsCache && Date.now() - tagsCache.fetchedAt < TAGS_CACHE_TTL_MS) {
    logMessage(logger, 'log', `Using cached tags (${tagsCache.tags.length} tags)`);
    return tagsCache.tags;
  }

  try {
    const response = await fetch(`${GAMMA_API}/tags`);

    if (!response.ok) {
      logMessage(logger, 'error', 'Failed to fetch tags', response.statusText);
      // Return stale cache if available
      if (tagsCache) {
        logMessage(logger, 'log', 'Returning stale cached tags');
        return tagsCache.tags;
      }
      return [];
    }

    const rawTags = (await response.json()) as any[];

    // Filter out forceHide tags and map to our interface
    const tags: PolymarketTag[] = rawTags
      .filter((t: any) => !t.forceHide)
      .map((t: any) => ({
        id: t.id,
        label: t.label,
        slug: t.slug,
      }));

    // Update cache
    tagsCache = {
      tags,
      fetchedAt: Date.now(),
    };

    logMessage(logger, 'log', `Fetched and cached ${tags.length} tags`);
    return tags;
  } catch (error) {
    logMessage(logger, 'error', 'Error fetching tags', error);
    // Return stale cache if available
    if (tagsCache) {
      logMessage(logger, 'log', 'Returning stale cached tags after error');
      return tagsCache.tags;
    }
    return [];
  }
}

export async function fetchEventsByTag(
  tagId: string,
  logger?: Logger
): Promise<PolymarketEvent[]> {
  try {
    const response = await fetch(
      `${GAMMA_API}/events?tag_id=${tagId}&closed=false&limit=50`
    );

    if (!response.ok) {
      logMessage(logger, 'error', `Failed to fetch events for tag ${tagId}`, response.statusText);
      return [];
    }

    const rawEvents = (await response.json()) as any[];

    // Transform to PolymarketEvent format
    const events: PolymarketEvent[] = rawEvents.map((e: any) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      description: e.description,
      markets: e.markets,
    }));

    logMessage(logger, 'log', `Found ${events.length} events for tag ${tagId}`);
    return events;
  } catch (error) {
    logMessage(logger, 'error', `Error fetching events for tag ${tagId}`, error);
    return [];
  }
}
