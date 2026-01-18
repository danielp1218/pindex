import { Hono } from 'hono';
import { readFile } from 'node:fs/promises';

export const toolsRouter = new Hono();

toolsRouter.get('/', async (c) => {
  const fileUrl = new URL('../../test-routes.html', import.meta.url);
  const html = await readFile(fileUrl, 'utf-8');
  return c.html(html);
});
