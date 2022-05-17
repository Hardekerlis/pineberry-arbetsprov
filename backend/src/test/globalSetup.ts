import mongoose from 'mongoose';

import app from '../app';
app;

import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  namespace NodeJS {
    interface Global {
      _MONGOINSTANCE: MongoMemoryServer;
    }
  }
}

export = async function globalSetup() {
  try {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();

    global._MONGOINSTANCE = instance;

    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));

    await mongoose.connect(`${process.env.MONGO_URI}/test`);
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  } catch (err) {
    console.error(err, 'globalSetup');
  }
};
