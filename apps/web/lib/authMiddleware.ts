import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ExtendedNextApiRequest, ExtendedSession } from '@/pages/api/interfaces';
import { NextApiHandler, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export const withAuth = (handler: NextApiHandler) => async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  try {
    const session: ExtendedSession | null = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = session.user.id;
    return handler(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
