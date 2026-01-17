import { Hono } from 'hono';
import { dependencyQueue } from '../core/queue';

export const healthRouter = new Hono();

healthRouter.get('/', (c) => {
  return c.json({
    status: 'ok',
    queue: dependencyQueue.getAll().length,
    processing: dependencyQueue.isProcessing(),
  });
});
