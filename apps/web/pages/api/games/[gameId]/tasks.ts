import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../../models/game';
import Task from '../../models/task';
import Team from '../../models/team';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthGameAndTeamMember } from '@/lib/authGameAndTeamMemberMiddleware';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { gameId } = req.query;

  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const game = await Game.findById(gameId);
      const team = await Team.findById(game.team._id);

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      const { title, description, metrics, order } = req.body;

      const newTask = new Task({
        teamId: team._id,
        gameId,
        title,
        description,
        metrics,
      });

      const savedTask = await newTask.save();

      game.tasks.push({ detail: savedTask._id, order});
      team.tasks.push(savedTask._id);

      await game.save();
      await team.save();

      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const game = await Game.findById(gameId).populate(['tasks.detail', 'team']);

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      res.status(200).json(game.tasks);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      await connectToDatabase();
      const { taskId } = req.body;

      await Game.findByIdAndUpdate(gameId, { $pull: { tasks: { detail: taskId } } }, { new: true });
      await Task.findByIdAndUpdate(taskId, { gameId: null }, { new: true });

      return res.status(200).json({ message: 'Task removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthGameAndTeamMember(handler);
