import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metrics: [
      {
        name: {
          type: String,
          required: true,
        },
        minPoint: {
          type: Number,
          required: true,
        },
        maxPoint: {
          type: Number,
          required: true,
        },
      },
    ],
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { versionKey: false }
);

const Task = models.Task || model('Task', TaskSchema);

export default Task;
