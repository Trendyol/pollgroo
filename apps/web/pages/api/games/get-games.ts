import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../models/game';
import User from '../models/user';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest, IUser } from '../interfaces';
import('../models/team');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const userId = req.userId;
      const user: IUser | null = await User.findById(userId);

      if(!user?.teams.length) {
        return res.status(403).json({ message: "You don't have any team. Join a team first."})
      }

      const games = await Game.find({ team: { $in: user?.teams }, isFinished: false })
        .sort({ createdAt: -1 })
        .populate('team');

      if (!games) {
        return res.status(404).json({ message: 'No Game Found' });
      }
      
      res.status(200).json(games);
    } catch (error) {
      console.info(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
