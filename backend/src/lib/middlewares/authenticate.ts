import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { NotAuthorizedError } from '../errors';
import { UserPayload } from '../interfaces';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  console.log(token);

  if (!token) {
    throw new NotAuthorizedError();
  }

  const payload = jwt.verify(
    token,
    process.env.JWT_KEY as string,
  ) as UserPayload;

  req.currentUser = {
    username: payload.username,
    userId: payload.userId,
  };

  next();
};

export { authenticate };
