import mongoose from 'mongoose';

import { ParticipantDoc } from './participant';

enum Sexes {
  Male = 'male',
  Female = 'female',
}

interface CompetitionAttributes {
  participants?: ParticipantDoc[];
  name: string;
  timestamp: string;
  finished?: boolean;
  sex: Sexes;
}

interface CompetitionModel extends mongoose.Model<CompetitionDoc> {
  build(attributes: CompetitionAttributes): CompetitionDoc;
}

export interface CompetitionDoc extends mongoose.Document {
  participants?: ParticipantDoc[];
  name: string;
  timestamp: string;
  finished?: boolean;
  sex: Sexes;
}

const competitionSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'participants',
      },
    ],
    name: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    sex: {
      type: String,
      enum: Sexes,
      required: true,
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

competitionSchema.statics.build = (attributes: CompetitionAttributes) => {
  return new Competition(attributes);
};

const Competition = mongoose.model<CompetitionDoc, CompetitionModel>(
  'competitions',
  competitionSchema,
);

export { Competition };
