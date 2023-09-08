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
    isScrumPoker: {
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
          title: {
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
          description: {
            type: String,
            required: true,
          },
        },
      ],
      default: [
        {
          name: 'performance',
          title: 'Performance',
          points: [1, 2, 3, 4, 5, 0],
          weight: 30,
          description: "Contribution to performance 1 - very bad, 5 - very good",
        },
        {
          name: 'maintenance',
          title: 'Maintenance',
          points: [1, 2, 3, 4, 5, 0],
          weight: 25,
          description: "How developer-friendly the post-development process is (after the product is released) 1 - very bad, 5 - very good",
        },
        {
          name: 'security',
          title: 'Security',
          points: [1, 2, 3, 4, 5, 0],
          weight: 10,
          description: "Impact on web security 1 - very bad, 5 - very good",
        },
        {
          name: 'customerEffect',
          title: 'Customer Effect',
          points: [1, 2, 3, 4, 5, 0],
          weight: 10,
          description: "Impact on the customer 1 - very bad, 5 - very good",
        },
        {
          name: 'developmentEase',
          title: 'Development Ease',
          points: [1, 2, 3, 4, 5, 0],
          weight: 20,
          description: "Complexity and time taken by the developer when preparing a product at the time of development. 1 - very complex, 5 - not that complex",
        },
        {
          name: 'storyPoint',
          title: 'StoryPoint',
          points: [1, 2, 3, 5, 8, 0],
          weight: 0,
          description: "Story point of task",
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
