import mongoose from 'mongoose';
import faker from 'faker';
import request from 'supertest';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import { sign } from 'cookie-signature';

import app from '../app';
app; // Load env variables in app

import { User, UserDoc } from '../models/user';

interface CreateUserParams {
  password?: string;
}

interface CreateUserData {
  cookie: string;
  user: UserDoc;
  password: string;
}

declare global {
  namespace NodeJS {
    interface Global {
      createUser(params: CreateUserParams): Promise<CreateUserData>;
    }
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
    await mongoose.connect(`${process.env.MONGO_URI}/test`);
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

// TODO: Implement this:
global.createUser = async (
  params: CreateUserParams,
): Promise<CreateUserData> => {
  const password =
    params && params.password ? params.password : faker.internet.password();

  const user = User.build({
    username: faker.internet.userName(),
    password,
  });

  await user.save();

  const payload = {
    userId: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY as string);
  const cookie = `s:${sign(token, process.env.JWT_KEY as string)}`;

  return { cookie: `token=${cookie}; path=/`, password, user };
};
