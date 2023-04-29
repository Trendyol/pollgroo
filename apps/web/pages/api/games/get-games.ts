import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../models/game';
import User from '../models/user';
import { getToken } from 'next-auth/jwt';
import { withAuth } from '@/lib/authMiddleware';
import('../models/team');

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: false });
  const userId = token?.sub;

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const user = await User.findById(userId);

      const games = await Game.find({ team: { $in: user.teams } }).populate('team');

      if (!games) {
        return res.status(404).json({ message: 'No Game Found' });
      }
      res.status(200).json(games);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
