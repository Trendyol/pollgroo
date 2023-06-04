import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ExtendedNextApiRequest, ExtendedSession } from '@/pages/api/interfaces';
import Game from '@/pages/api/models/game';
import { NextApiHandler, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import('@/pages/api/models/team');

export const withAuthGameAndTeamMember =
  (handler: NextApiHandler) => async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      await connectToDatabase();
      const session: ExtendedSession | null = await getServerSession(req, res, authOptions);
      const { gameId } = req.query;

      if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userId = session.user.id;
      const userType = session.user.userType;

      const game = await Game.findById(gameId).populate('team');

      if (!game.team.members.includes(userId)) {
        return res.status(403).json({ message: 'You are not a member of this team' });
      }

      req.userType = userType;
      req.userId = userId;

      return handler(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
