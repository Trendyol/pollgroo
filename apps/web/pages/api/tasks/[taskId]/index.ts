import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Task from '../../models/task';
import Game from '../../models/game';
import Team from '../../models/team';
import { withAuth } from '@/lib/authMiddleware';
import { ITask } from '../../interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;

  if (req.method === 'DELETE') {
    try {
      await connectToDatabase();
      const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await Game.findByIdAndUpdate(deletedTask.gameId, { $pull: { tasks: { detail: taskId } } }, { new: true });
      await Team.findByIdAndUpdate(deletedTask.teamId, { $pull: { tasks: taskId } }, { new: true });

      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      await connectToDatabase();
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json(updatedTask);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default withAuth(handler);
