import { Application } from 'express';
import express from 'express';
import { appRouter } from './app.router';
import { appLogger } from './common/logger/logger.config';
import { Server } from 'http';

export const app: Application = express();

app.use(express.json());
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
