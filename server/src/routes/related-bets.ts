import { Hono } from 'hono';
import { relatedBetsQueue } from '../core/related-bets-queue';
import { broadcast } from '../core/sse';

export const relatedBetsRouter = new Hono();

// TAKES FULL URL FROM CLIENT
relatedBetsRouter.post('/', async (c) => {
  const { url } = await c.req.json<{ url: string }>();

  if (!url) {
    return c.json({ error: 'url required' }, 400);
  }

  try {
    // Only accept full HTTPS URLs in the form: https://polymarket.com/event/*
    const pattern = /^https:\/\/polymarket\.com\/event\/([a-zA-Z0-9-]+)$/;
    const match = url.trim().match(pattern);

    if (!match) {
      throw new Error('Invalid Polymarket URL. Expected format: https://polymarket.com/event/[market-slug]');
    }

    const marketId = match[1];

    // Create job
    const job = relatedBetsQueue.add(marketId);

    // Broadcast to SSE clients
    broadcast({ type: 'related-bets-job-added', job });

    return c.json(job);
  } catch (error) {
    return c.json({
      error: 'Failed to parse Polymarket URL',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, 400);
  }
});

// Get all jobs
relatedBetsRouter.get('/', (c) => {
  return c.json(relatedBetsQueue.getAll());
});

// Get specific job
relatedBetsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const job = relatedBetsQueue.get(id);

  if (!job) {
    return c.json({ error: 'Job not found' }, 404);
  }

  return c.json(job);
});