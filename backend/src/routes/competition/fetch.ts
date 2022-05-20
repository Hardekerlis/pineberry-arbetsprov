import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Competition } from '../../models';
import { DocumentNotFoundError } from '../../lib';

const fetch = {
  one: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new DocumentNotFoundError('Couldnt find competition');
    }
    const competition = await Competition.findById(id).populate('participants');

    if (!competition) {
      throw new DocumentNotFoundError('Couldnt find competition');
    }

    res.status(200).json({
      errors: false,
      message: 'Found competition',
      competition,
    });
  },
  many: async (req: Request, res: Response) => {
    const competitions = await Competition.find({});

    if (!competitions[0]) {
      throw new DocumentNotFoundError('Couldnt find competition');
    }

    res.status(200).json({
      errors: false,
      message: 'Found competitions',
      competitions,
    });
  },
};

export default fetch;
