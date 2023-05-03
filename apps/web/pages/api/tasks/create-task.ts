import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import Task from '../models/task';
import Team from '../models/team';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { title, description, metrics, teamId } = req.body;

      const newTask = new Task({
        title,
        description,
        metrics,
        teamId
      });

      const task = await newTask.save();
      const team = await Team.findById(teamId);

      team.tasks.push(newTask._id);

      team.save();

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
