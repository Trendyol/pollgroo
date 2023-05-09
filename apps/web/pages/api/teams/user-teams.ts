import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest } from '../interfaces';
import User from '../models/user';
import('../models/team');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const user = await User.findOne({ _id: req.userId }).populate('teams');

      if (!user) {
        res.status(404).json({ success: false, message: 'Nothing to show here' });
        return;
      }

      res.status(200).json({ success: true, teams: user.teams });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
