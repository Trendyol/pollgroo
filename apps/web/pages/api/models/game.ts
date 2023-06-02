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
    tasks: [
      {
        detail: { type: Schema.Types.ObjectId, ref: 'Task' },
        order: { type: Number, required: true },
      },
    ],
    metrics: {
      type: [{
        name: {
          type: String,
          required: true
        },
        points: {
          type: [Number],
          required: true
        },
        weight: {
          type: Number,
          required: true
        }
      }],
      default: [
        {
          name: 'Performance',
          points: [1, 2, 3, 4, 5],
          weight: 30
        },
        {
          name: 'Maintenance',
          points: [1, 2, 3, 4, 5],
          weight: 25
        },
        {
          name: 'Security',
          points: [1, 2, 3, 4, 5],
          weight: 10
        },
        {
          name: 'Customer Effect',
          points: [1, 2, 3, 4, 5],
          weight: 10
        },
        {
          name: 'Development Ease',
          points: [1, 2, 3, 4, 5],
          weight: 20
        },
        {
          name: 'StoryPoint',
          points: [1, 2, 3, 4, 5],
          weight: 0
        }
      ]
    },
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
