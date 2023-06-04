import { NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Game from '../../models/game';
import { ExtendedNextApiRequest } from '../../interfaces';
import { withAuthGameAndTeamMember } from '@/lib/authGameAndTeamMemberMiddleware';
import('../../models/task');
import('../../models/team');
import { permissions, userAction } from 'permissions';

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { gameId } = req.query;
  const userType = req.userType;

  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const game = await Game.findById(gameId)
        .populate({
          path: 'tasks.detail',
          model: 'Task',
        })
        .populate('team')
        .lean()

      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      
      game.infoText = "Waiting admin to start the game...";
      game.buttonText = "Ready";

      if(userType && permissions[userType]?.includes(userAction.START_GAME)){
        game.infoText = "Players waiting you to start the game...";
        game.buttonText = "Start"
      }

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuthGameAndTeamMember(handler);
