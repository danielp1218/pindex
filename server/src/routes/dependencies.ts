import { Hono } from 'hono';
import { dependencyQueue } from '../core/queue';

export const dependenciesRouter = new Hono();

// Get all dependencies (related bets)
dependenciesRouter.get('/', (c) => {
  return c.json(dependencyQueue.getAll());
});

// Get specific dependency
dependenciesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const dependency = dependencyQueue.get(id);

  if (!dependency) {
    return c.json({ error: 'Dependency not found' }, 404);
  }

  return c.json(dependency);
});