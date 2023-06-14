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
    isFinished: {
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
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          points: {
            type: [Number],
            required: true,
          },
          weight: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [
        {
          name: 'performance',
          title: 'Performance',
          points: [1, 2, 3, 4, 5],
          weight: 30,
        },
        {
          name: 'maintenance',
          title: 'Maintenance',
          points: [1, 2, 3, 4, 5],
          weight: 25,
        },
        {
          name: 'security',
          title: 'Security',
          points: [1, 2, 3, 4, 5],
          weight: 10,
        },
        {
          name: 'customerEffect',
          title: 'Customer Effect',
          points: [1, 2, 3, 4, 5],
          weight: 10,
        },
        {
          name: 'developmentEase',
          title: 'Development Ease',
          points: [1, 2, 3, 4, 5],
          weight: 20,
        },
        {
          name: 'storyPoint',
          title: 'StoryPoint',
          points: [1, 2, 3, 5, 8],
          weight: 0,
        },
      ],
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    participants: {
      type: [
        {
          userId: {
            type: String,
            required: true,
          },
          fullName: {
            type: String,
            required: true,
          },
        },
      ],
    },
    gameMaster: {
      type: String,
      required: true
    },
    currentTaskNumber: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { versionKey: false, timestamps: true }
);

const Game = models.Game || model('Game', GameSchema);

export default Game;
