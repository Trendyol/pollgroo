import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../../models/team';
import { ExtendedNextApiRequest, ITeam, IUser } from '../../interfaces';
import { withAuthAndTeamMember } from '@/lib/authAndTeamMemberMiddleware';
import Game from '../../models/game';
import Task from '../../models/task';
import User from '../../models/user';
import('../../models/user');
import('../../models/task');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { teamId } = req.query;
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const team = await Team.findById(teamId).populate('members').populate('tasks').lean().exec();

      if (!team) {
        res.status(404).json({ success: false, message: 'Nothing to show here' });
        return;
      }

      team.badgeMembers = team.members.slice(0, 3);
      team.totalMembers = team.members.length;

      res.status(200).json({ success: true, team });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    await connectToDatabase();
    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    await Task.deleteMany({ teamId });
    await Game.deleteMany({ team: teamId });
    await User.updateMany({ _id: { $in: deletedTeam.members } }, { $pull: { teams: teamId } });

    return res.status(200).json({ message: 'Team deleted successfully' });
  } else if (req.method === 'PATCH') {
    await connectToDatabase();

    const updatedTeam = await Team.findByIdAndUpdate(teamId, req.body, { new: true });

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.status(200).json({ message: 'Team updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthAndTeamMember(handler);
