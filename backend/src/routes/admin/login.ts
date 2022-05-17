import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../../models';
import { NotAuthorizedError, Password } from '../../lib';

const login = async (req: Request, res: Response) => {
  const data = matchedData(req);

  const user = await User.findOne({
    username: data.username,
  });

  if (!user) {
    throw new NotAuthorizedError();
  }

  if (!(await Password.compare(user.password, data.password))) {
    throw new NotAuthorizedError();
  }

  const token = jwt.sign(
    {
      username: user.username,
      userId: user.id,
    },
    process.env.JWT_KEY as string,
  );

  res.cookie('token', token, {
    signed: true,
    secure: true,
    httpOnly: true,
    maxAge: 86400000,
  });

  res.status(200).json({
    errors: false,
    message: 'Login successful',
  });
};

export default login;
