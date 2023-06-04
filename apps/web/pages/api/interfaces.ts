import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  teams: ITeam[];
  profileCircleBackgroundColor?: string,
  profileCircleTextColor?: string,
  profileCircleText?: string
}

export interface ITeam {
  _id: string;
  name: string;
  members: IUser[];
  tasks: string[];
  games: string[];
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  userId?: string | null;
  userType?: "default" | "admin" | null;
}

export interface ExtendedSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    teams?: ITeam[] | null;
    id?: string | null;
    userType?: "default" | "admin" | null;
  };
}

export interface IGroomingTask {
  detail: {
    description: string;
    gameId: string;
    teamId: string;
    metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
    score: number;
    title: string;
    _id: string;
  };
  order: number;
  _id: string;
}
