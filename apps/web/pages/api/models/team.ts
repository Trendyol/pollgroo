import { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
    invitationLink: {
      type: String,
      required: false,
    },
    invitationLinkExpirationTime: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Team = models.Team || model('Team', TeamSchema);

export default Team;
