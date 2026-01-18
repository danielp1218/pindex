import 'dotenv/config';
import { initializeTracing, shutdownTracing } from './lib/phoenix';
initializeTracing();   // init tracing first
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { healthRouter } from './routes/health';
import { relationsRouter } from './routes/relations';
import { toolsRouter } from './routes/tools';
import { relatedBetsRouter } from './routes/related-bets';
import { phoenixRouter } from './routes/phoenix';

const app = new Hono();

// CORS middleware
app.use('/*', cors());

// Root route
app.get('/', (c) => {
  return c.json({
    name: 'Polyindex Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      relations: '/api/relations',
      relatedBets: '/api/related-bets',
      phoenix: '/api/phoenix (observability, prompts, experiments)',
      tools: '/tools',
    },
  });
});

app.route('/health', healthRouter);
app.route('/api/relations', relationsRouter);
app.route('/api/related-bets', relatedBetsRouter);
app.route('/api/phoenix', phoenixRouter);
app.route('/tools', toolsRouter);

const port = Number(process.env.PORT) || 8000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`✓ Server running on http://localhost:${port}`);

// Graceful shutdown
const shutdown = async () => {
  console.log('\nShutting down...');
  await shutdownTracing();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
