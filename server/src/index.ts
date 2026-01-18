import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { setupTracing } from './lib/phoenix';
import { healthRouter } from './routes/health';
import { relationsRouter } from './routes/relations';
import { relatedBetsRouter } from './routes/related-bets';
import { dependenciesRouter } from './routes/dependencies';

// Define your environment variables type
type Bindings = {
  PHOENIX_ENDPOINT?: string;
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Setup tracing
setupTracing();

// CORS middleware
app.use('/*', cors());

// Root route
app.get('/', (c) => {
  return c.json({
    name: 'Pindex Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      relations: '/api/relations',
      relationsPricing: '/api/relations/price',
      relationsGraph: '/api/relations/graph',
      relationsGraphPricing: '/api/relations/graph/price',
      relatedBets: '/api/related-bets',
      dependencies: '/api/dependencies',
      tools: '/tools',
    },
  });
});

app.route('/health', healthRouter);
app.route('/api/relations', relationsRouter);
app.route('/api/related-bets', relatedBetsRouter);
app.route('/api/dependencies', dependenciesRouter);

export default app;
