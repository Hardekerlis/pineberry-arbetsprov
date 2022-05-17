import { MongoMemoryServer } from 'mongodb-memory-server';

import { config } from '../lib';

export = async function globalTeardown() {
  try {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = global._MONGOINSTANCE;
    await instance.stop();
  } catch (err) {
    console.error(err, 'globalTeardown');
  }
};
