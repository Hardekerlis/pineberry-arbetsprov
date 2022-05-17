import { app } from './app';

import mongoose from 'mongoose';
import Logger from 'frictionless-logger';

const logger = new Logger();

const initializeServer = async () => {
  const { env } = process;

  if (env.DEV) {
    logger.warn(
      'Application is in dev mode. If this is a production environment please change dev to false in config',
    );
  }

  if (!env.MONGO_URL) {
    throw new Error('MONGO_URL must be defined');
  }

  logger.debug('Connecting to MongoDB');
  await mongoose.connect(env.MONGO_URL);
  logger.debug('MongoDB connection established');

  if (!env.PORT) {
    throw new Error('PORT must be defined');
  }

  app.listen(env.PORT, () => {
    logger.info(`Server listening on *:${env.PORT}`);
  });
};

initializeServer();
