import cors from 'cors';
import express from 'express';

import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requireJson } from './middleware/requireJson.js';
import todoRouter from './routes/todoRoutes.js';

export function createServer({ clientOrigin }) {
  const app = express();

  app.use(
    cors({
      origin: clientOrigin,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    })
  );

  app.use(express.json());
  app.use(requireJson);

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/todos', todoRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
