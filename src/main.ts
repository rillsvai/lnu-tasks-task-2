import { Application } from 'express';
import express from 'express';
import { appRouter } from './app.router';
import { appLogger } from './common/logger/logger.config';
import { Server } from 'http';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

export const apiLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1000,
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const app: Application = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(apiLimiter);
app.use(appRouter);

appLogger.info(`starting server on port: ${8080} `);

export const server: Server = app
  .listen(8080, () => {
    appLogger.info(`service listening on port: ${8080}`);
  })
  .on('error', (error) => {
    appLogger.error(`server launching has failed: ${error}`);
    process.exit(1);
  })
  .on('close', async () => {
    appLogger.info('closing application...');
  });
