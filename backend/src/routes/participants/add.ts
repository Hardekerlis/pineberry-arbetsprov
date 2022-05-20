import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import { Competition, Participant } from '../../models';
import { DocumentNotFoundError } from '../../lib';

const add = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const { competitionId } = req.params;

  const competition = await Competition.findById(competitionId);

  if (!competition) throw new DocumentNotFoundError('Couldnt find competition');

  const newParticipant = Participant.build({
    name: data.name,
    number: data.number,
  });

  await newParticipant.save();

  competition.participants?.push(newParticipant);

  await competition.save();

  res.status(201).json({
    errors: false,
    message: 'Added participant',
  });
};

export default add;
