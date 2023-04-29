import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../models/game';
import Team from '../models/team';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { title, teamId } = req.body;

      const newGame = new Game({
        title,
        team: teamId
      });

      await Team.findByIdAndUpdate(
        teamId,
        { $push: { teams: newGame._id } }
      );

      const game = await newGame.save();

      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
