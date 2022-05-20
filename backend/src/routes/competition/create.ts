import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import { Competition } from '../../models';

// Create a new competition
const create = async (req: Request, res: Response) => {
  const data = matchedData(req);

  const competition = Competition.build({
    name: data.name,
    timestamp: data.timestamp,
    sex: data.sex,
  });

  await competition.save();

  res.status(201).json({
    errors: false,
    message: 'Created competition',
    competition,
  });
};

export default create;
