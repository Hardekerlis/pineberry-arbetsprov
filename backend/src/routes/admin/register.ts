import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import { User } from '../../models';

import { BadRequestError } from '../../lib';

const register = async (req: Request, res: Response) => {
  const data = matchedData(req);

  const isUsernameTaken = !!(await User.findOne({ username: data.username }));

  if (isUsernameTaken) {
    throw new BadRequestError('A user with that username already exists');
  }

  const user = User.build({
    username: data.username,
    password: data.password,
  });

  await user.save();

  res.status(201).json({
    errors: false,
    message: 'Created account',
  });
};

export default register;
