import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ExtendedNextApiRequest, ExtendedSession } from '@/pages/api/interfaces';
import { NextApiHandler, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import Team from '@/pages/api/models/team';
import('@/pages/api/models/user');

export const withAuthAndTeamMember =
  (handler: NextApiHandler) => async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      await connectToDatabase();
      const session: ExtendedSession | null = await getServerSession(req, res, authOptions);
      const { teamId } = req.query;

      if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userId = session.user.id;
      const team = await Team.findOne({
        _id: teamId,
        members: {
          $in: [userId],
        },
      }).exec();

      if (!team) {
        return res.status(403).json({ message: 'You are not a member of this team' });
      }

      req.userId = userId;
      return handler(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
