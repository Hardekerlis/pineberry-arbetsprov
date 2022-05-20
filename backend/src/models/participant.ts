import mongoose from 'mongoose';

interface Event {
  result: string;
  name: string;
}

interface ParticipantAttributes {
  name: string;
  number: number;
  events?: Event[];
}

interface ParticipantModel extends mongoose.Model<ParticipantDoc> {
  build(attributes: ParticipantAttributes): ParticipantDoc;
}

export interface ParticipantDoc extends mongoose.Document {
  name: string;
  number: number;
  events?: Event[];
}

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    events: [
      {
        result: String,
        string: String,
      },
    ],
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

participantSchema.statics.build = (attributes: ParticipantAttributes) => {
  return new Participant(attributes);
};

const Participant = mongoose.model<ParticipantDoc, ParticipantModel>(
  'participants',
  participantSchema,
);

export { Participant };
