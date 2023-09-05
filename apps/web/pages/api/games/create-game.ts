import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../models/game';
import Team from '../models/team';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest } from '../interfaces';
import { gameTypes } from '../constants';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { title, teamId, gameType } = req.body;

      const metrics = gameTypes[gameType as keyof typeof gameTypes];

      const newGame = new Game({
        title,
        team: teamId,
        gameMaster: req.userId,
        metrics
      });

      await Team.findByIdAndUpdate(teamId, { $push: { games: newGame._id } });

      const game = await newGame.save();

      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
