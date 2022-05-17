import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });

    res.status(400).json({
      errors: [
        {
          message: 'Unexepected error',
          err: err,
        },
      ],
    });
  }
};
