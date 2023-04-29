import { Schema, model, models } from 'mongoose';

const GameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isStarted: {
      type: Boolean,
      default: false,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Game = models.Game || model('Game', GameSchema);

export default Game;
