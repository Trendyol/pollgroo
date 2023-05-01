import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  teams: string[] | ITeam[];
}

export interface ITeam {
  _id: string;
  name: string;
  members: string[] | IUser[];
  tasks: string[];
  games: string[];
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  userId?: string | null;
}

export interface ExtendedSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    teams?: ITeam[] | null;
    id?: string | null;
  };
}
