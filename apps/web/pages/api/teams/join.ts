import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../models/team';
import User from '../models/user';
import { ExtendedNextApiRequest } from '../interfaces';
import { withAuth } from '@/lib/authMiddleware';
import('../models/user');
import('../models/task');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { joinLink } = req.body;
  const { userId } = req;

  if (req.method === 'PATCH') {
    try {
      await connectToDatabase();

      const team = await Team.findOne({ invitationLink: joinLink });

      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }

      const remainingTime = Math.max(team.invitationLinkExpirationTime - Math.floor(Date.now() / 1000), 0);
      if (Number(remainingTime) <= 0) {
        res.status(404).json({ errorMessage: "Invitation link not found" });
        return;
      }

      const isUserExist = team.members.includes(req.userId);

      if (isUserExist) {
        return res.status(409).json({ message: 'User already exist' });
      }

      const user = await User.findByIdAndUpdate(userId, { $addToSet: { teams: team._id } }, { new: true });

      team.members.addToSet(user._id);
      await team.save();

      res.status(200).json({ success: true, message: 'User joined the team successfully', teamId: team._id });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default withAuth(handler);
