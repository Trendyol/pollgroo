import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../../models/game';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthGameAndTeamMember } from '@/lib/authGameAndTeamMemberMiddleware';
import('../../models/task');
import('../../models/team');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { gameId } = req.query;

  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const game = await Game.findById(gameId)
        .populate({
          path: 'tasks.detail',
          model: 'Task',
        })
        .populate('team')
        .lean();

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      game.isGameMaster = req.userId === game.gameMaster;

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthGameAndTeamMember(handler);
