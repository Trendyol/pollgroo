import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Team from '../models/team';
import { withAuth } from '@/lib/authMiddleware';
import { ExtendedNextApiRequest, ITeam, IUser } from '../interfaces';
import('../models/user');

interface TeamDTO extends ITeam {
  isMember?: boolean;
  totalMembers: number;
  badgeMembers: IUser[]
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const teams: TeamDTO[] = await Team.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'teamMembers',
          },
        },
        {
          $addFields: {
            isMember: {
              $in: [req.userId, { $map: { input: '$teamMembers', as: 'member', in: { $toString: '$$member._id' } } }],
            },
            totalMembers: { $size: '$teamMembers' },
            badgeMembers: {
              $cond: {
                if: { $gte: [{ $size: '$teamMembers' }, 3] },
                then: { $slice: ['$teamMembers', 3] },
                else: '$teamMembers',
              },
            },
          },
        },
        {
          $project: {
            teamMembers: 0,
          },
        },
      ]);

      if (!teams) {
        res.status(404).json({ success: false, message: 'Nothing to show here' });
        return;
      }

      const populatedTeams = await Team.populate(teams, { path: 'members' });

      res.status(200).json({ success: true, teams: populatedTeams });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
