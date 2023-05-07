import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../../models/team';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthAndTeamMember } from '@/lib/authAndTeamMemberMiddleware';
import('../../models/user');
import('../../models/task');

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { teamId } = req.query;
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const team = await Team.findById(teamId).populate('tasks').lean().exec();

      if (!team) {
        res.status(404).json({ success: false, message: 'Nothing to show here' });
        return;
      }

      res.status(200).json({ success: true, tasks: team.tasks });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthAndTeamMember(handler);
