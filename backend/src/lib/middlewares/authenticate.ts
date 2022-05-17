import { Request, Response, NextFunction } from 'express';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: Implement authenticate

  next();
};
