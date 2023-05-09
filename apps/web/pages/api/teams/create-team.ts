import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../models/team';
import User from '../models/user';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest } from '../interfaces';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const team = await Team.create({
        name: req.body.name,
        members: [req.userId],
      });

      await User.findByIdAndUpdate(
        req.userId,
        { $push: { teams: team._id } }
      );

      res.status(201).json({ success: true, data: team });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
