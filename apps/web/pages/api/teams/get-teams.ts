import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import User from '../models/user';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest } from '../interfaces';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const userId = req.userId;
      const user = await User.findById(userId).populate('teams');
        
      res.status(200).json({ success: true, data: user?.teams });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);