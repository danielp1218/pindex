import { getEventIdFromUrl } from './eventStorage';

const GAMMA_API = 'https://gamma-api.polymarket.com';

export interface PolymarketEventInfo {
  slug: string;
  title: string;
  question: string;
  url: string;
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export async function fetchEventInfoFromUrl(url: string): Promise<PolymarketEventInfo | null> {
  const slug = getEventIdFromUrl(url);
  if (!slug) {
    return null;
  }

  const fallbackTitle = titleFromSlug(slug) || 'Market';

  try {
    const response = await fetch(`${GAMMA_API}/events?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) {
      return {
        slug,
        title: fallbackTitle,
        question: fallbackTitle,
        url,
      };
    }

    const events = await response.json();
    const event = Array.isArray(events) ? events[0] : null;
    const question =
      event?.markets?.[0]?.question ||
      event?.title ||
      event?.question ||
      fallbackTitle;

    return {
      slug,
      title: question,
      question,
      url,
    };
  } catch (error) {
    return {
      slug,
      title: fallbackTitle,
      question: fallbackTitle,
      url,
    };
  }
}
