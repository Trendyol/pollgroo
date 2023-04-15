import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/db';
import User from '@/pages/api/models/user';
import { hash } from 'bcryptjs';
import { IUser } from '../interfaces';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.body) return res.status(400).json({ error: 'Body is missing' });

  const { email, fullname, password } = req.body;

  if (!email || !fullname || !password) {
    return res.status(400).json({ message: 'Email, full name, and password are required' });
  }

  try {
    await connectToDatabase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'User Already exists' });
    }

    if (password.length < 8) return res.status(409).json({ error: 'Password should be more than 8 characters long' });

    const hashedPassword = await hash(password, 12);
    await User.create({ email, fullname, password: hashedPassword })
      .then((user: IUser) => {
        const userDto = {
          userId: user._id,
          email: user.email,
          fullname: user.fullname,
        };

        res.status(201).json({ user: userDto });
      })
      .catch((error: unknown) => {
        if (error && error instanceof mongoose.Error.ValidationError) {
          for (let field in error.errors) {
            const msg = error.errors[field].message;
            return res.status(409).json({ error: msg });
          }
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
