import { Session } from 'next-auth';

export interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: string[];
  team: {
    _id: string;
    name: string;
    members: string[];
    tasks: string[];
    games: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  teams: string[] | TeamData[];
  profileCircleBackgroundColor?: string;
  profileCircleTextColor?: string;
  profileCircleText?: string;
}

export interface TeamData {
  _id: string;
  name: string;
  members: string[] | UserData[];
  tasks: string[];
  games: string[];
  isMember?: boolean;
  totalMembers?: number;
  badgeMembers?: string[] | UserData[];
}

export interface ExtendedSession extends Session {
  user: {
    fullname: string;
    email: string;
    id: string;
    profileCircleBackgroundColor?: string;
    profileCircleTextColor?: string;
    profileCircleText?: string;
  };
}

export interface Task {
  description: string;
  gameId?: string;
  metrics?: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score?: number;
  title: string;
  _id: string;
}
