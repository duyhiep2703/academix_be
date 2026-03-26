import type { IncomingMessage, ServerResponse } from 'http';
import { createNestApp } from './main';

let cachedServer: (req: IncomingMessage, res: ServerResponse) => void;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!cachedServer) {
    const app = await createNestApp();
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer(req, res);
}
