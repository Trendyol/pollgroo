import connectToDatabase from '@/lib/db';
import { ExtendedNextApiRequest, ExtendedSession } from '../../interfaces';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { v4 as uuidv4 } from 'uuid';
import { withAuthAndTeamMember } from '@/lib/authAndTeamMemberMiddleware';
import Team from '../../models/team';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const FIVE_MINUTES = 5 * 60;

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const session: ExtendedSession | null = await getServerSession(req, res, authOptions);

  if (!session || session.user?.userType !== 'admin') {
    res.status(403).json({ error: 'You are not allowed to do that' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { teamId } = req.query;

  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);

    if (!team) {
      res.status(404).json({ error: 'No team found' });
      return;
    }

    const remainingTime = Math.max(team.invitationLinkExpirationTime - Math.floor(Date.now() / 1000), 0);
    if (Number(remainingTime) > 0) {
      res.status(200).json({ remainingTime });
      return;
    }

    // Generate a unique token or identifier for the link
    const invitationLink = generateLinkToken();

    // Calculate the expiration time (5 minutes from now)
    const invitationLinkExpirationTime = Math.floor((Date.now() + FIVE_MINUTES_IN_MS) / 1000);

    // Store the team link in the database
    await Team.updateOne(
      { _id: teamId },
      {
        $set: {
          invitationLink,
          invitationLinkExpirationTime,
        },
      }
    );

    const inviteLink = `${req.headers.origin}/join-team/${invitationLink}`;

    res.status(200).json({ inviteLink, remainingTime: FIVE_MINUTES });
  } catch (error) {
    console.error('Error generating team link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function generateLinkToken() {
  return uuidv4();
}

export default withAuthAndTeamMember(handler);
