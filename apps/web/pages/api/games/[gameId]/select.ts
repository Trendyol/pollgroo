import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../../models/game';
import Task from '../../models/task';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthGameAndTeamMember } from '@/lib/authGameAndTeamMemberMiddleware';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { gameId } = req.query;

  if (req.method === 'PATCH') {
    try {
      await connectToDatabase();
      const game = await Game.findById(gameId);

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      const { groomingTasks, taskId } = req.body;

      if (taskId) {
        const task = await Task.findById(taskId);
        task.gameId = gameId;
        await task.save();
      }
      
      game.tasks = groomingTasks;
      await game.save();

      res.status(201).json({ message: 'Tasks updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthGameAndTeamMember(handler);
