import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import 'express-async-errors';
import { nanoid } from 'nanoid';
import cookieParser, { CookieParseOptions } from 'cookie-parser';

import { NotFoundError, errorHandler } from './lib';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

app.use(urlencoded({ extended: false }));
app.use(
  json({
    limit: '5mb',
  }),
);

process.env.JWT_KEY = process.env.DEV ? 'testing' : nanoid();

app.use(
  cookieParser(
    process.env.JWT_KEY as string,
    {
      signed: true,
      secure: true,
      httpOnly: true,
      maxAge: 86400000,
    } as CookieParseOptions,
  ),
);

import router from './routes';
app.use('/api', router);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
