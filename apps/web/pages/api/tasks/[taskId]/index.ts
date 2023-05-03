import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Task from '../../models/task';
import Game from '../../models/game';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;

  if (req.method === 'DELETE') {
    try {
      await connectToDatabase();
      const deletedTask = await Task.findByIdAndDelete(taskId);

      await Game.findByIdAndUpdate(deletedTask.gameId, { $pull: { tasks: taskId } }, { new: true });

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
