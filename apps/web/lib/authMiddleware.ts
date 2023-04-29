import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !(session as any).user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    (req as any).userId = (session as any).user.id;
    return handler(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
