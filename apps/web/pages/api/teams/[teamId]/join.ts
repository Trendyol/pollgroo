import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../../models/team';
import User from '../../models/user';
import { ExtendedNextApiRequest, ITeam, IUser } from '../../interfaces';
import { withAuth } from '@/lib/authMiddleware';
import('../../models/user');
import('../../models/task');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { teamId } = req.query;
  const { userId } = req;
  if (req.method === 'PATCH') {
    try {
      await connectToDatabase();

      const team = await Team.findById(teamId);

      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }

      const user = await User.findByIdAndUpdate(userId, { $addToSet: { teams: teamId } }, { new: true });

      team.members.addToSet(user._id);
      await team.save();

      res.status(200).json({ success: true, message: 'User joined the team successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default withAuth(handler);
