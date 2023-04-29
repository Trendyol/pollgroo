import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../models/team';
import User from '../models/user';
import { getToken } from 'next-auth/jwt';
import { withAuth } from '@/lib/authMiddleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  const userId = token?.sub;
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const team = await Team.create({
        name: req.body.name,
        members: [userId],
      });

      await User.findByIdAndUpdate(
        userId,
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
