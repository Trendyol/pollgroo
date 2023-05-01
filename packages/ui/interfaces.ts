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
}

export interface TeamData {
  _id: string;
  name: string;
  members: string[] | UserData[];
  tasks: string[];
  games: string[];
}

export interface ExtendedSession extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    teams: TeamData[];
    id: string;
  };
}
