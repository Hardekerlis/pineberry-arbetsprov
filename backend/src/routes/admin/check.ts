import { Request, Response } from 'express';

const check = async (req: Request, res: Response) => {
  res.status(200).json({
    errors: false,
    message: 'User is authenticated',
  });
};

export default check;
