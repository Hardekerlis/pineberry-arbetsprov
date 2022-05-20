import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import { Participant } from '../../models';

const results = async (req: Request, res: Response) => {
  const data = matchedData(req);

  const participants = [];

  for (const participantId of data.userIds) {
    const participant = await Participant.findById(participantId);
    participant!.events = [];
    participants.push(participant);
  }

  for (const value of data.values) {
    const participant = participants.find((user) => {
      if (user!.id === value.userId) return user;
    });

    participant!.events!.push({
      result: value.value,
      name: value.event,
    });
  }

  for (const participant of participants) {
    await participant!.save();
  }

  res.status(200).json({
    errors: false,
    message: 'Results recorded',
  });
};

export default results;
