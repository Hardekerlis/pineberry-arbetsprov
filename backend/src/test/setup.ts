import mongoose from 'mongoose';
import faker from 'faker';
import request from 'supertest';
import { nanoid } from 'nanoid';

import app from '../app';
app; // Load env variables in app

process.env.JWT_KEY = 'jasdkjlsadkljgdsfakljsfakjlsaf';

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

jest.setTimeout(600000);

beforeAll(async () => {
  process.env.MONGOMS_DOWNLOAD_URL =
    'https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz';
  process.env.MONGOMS_VERSION = '4.2.8';
  process.env.STRIPE_SECRET_KEY =
    'sk_test_51K1FuOBkwIduIotVrW6mf2btytLgudruiqgHHAxYaIYe9gF5nAbwu9d5ClApRzRen4WN8vJJkBfu3XcP6rp68PgU00Z3q59tqm';

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${config.mongodb.name}`);
  } catch (err) {
    console.error(err, 41);
  }
});

beforeEach(async () => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (err) {
    console.error(err, 48);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  } catch (err) {
    console.log(err, 58);
  }
});
