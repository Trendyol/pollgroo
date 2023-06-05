import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../../models/game';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthGameAndTeamMember } from '@/lib/authGameAndTeamMemberMiddleware';
import('../../models/task');
import('../../models/team');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { gameId } = req.query;

  if (req.method === 'PATCH') {
    try {
      await connectToDatabase();

      const { isStarted, currentTaskNumber } = req.body;

      if (isStarted && typeof isStarted !== 'boolean') {
        return res.status(400).json({ message: 'Invalid request body' });
      }

      let game;

      if (isStarted) {
        game = await Game.findByIdAndUpdate(gameId, { isStarted }, { new: true }).lean();
      }

      if (currentTaskNumber) {
        game = await Game.findByIdAndUpdate(gameId, { currentTaskNumber }, { new: true }).lean();
      }

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const game = await Game.findById(gameId).lean();

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }

      const currentTaskNumber = game.currentTaskNumber;

      res.status(200).json({ currentTaskNumber });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthGameAndTeamMember(handler);
