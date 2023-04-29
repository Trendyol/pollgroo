import { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { versionKey: false, timestamps: true }
);

const Team = models.Team || model('Team', TeamSchema);

export default Team;
