import { Session } from 'next-auth';

export interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: Task[];
  team: {
    _id: string;
    name: string;
    members: UserData[];
    tasks: Task[];
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
  teams: TeamData[];
  profileCircleBackgroundColor: string;
  profileCircleTextColor: string;
  profileCircleText: string;
}

export interface TeamData {
  _id: string;
  name: string;
  members: UserData[];
  tasks: Task[];
  games: string[];
  isMember?: boolean;
}

export interface ExtendedSession extends Session {
  user: IUser;
}

export interface Task {
  description: string;
  gameId: string;
  teamId: string;
  metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score: number;
  title: string;
  _id: string;
  storyPoint: number;
}

export interface GroomingTask {
  detail: {
    description: string;
    gameId: string;
    teamId: string;
    metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
    score: number;
    storyPoint: number;
    title: string;
    _id: string;
  };
  order: number;
  _id: string;
}

export interface IUser {
  fullname: string;
  email: string;
  id: string;
  profileCircleBackgroundColor: string;
  profileCircleTextColor: string;
  profileCircleText: string;
  userType: 'default' | 'admin';
}

export interface Participant extends IUser {
  groomingId: string;
  formData: FormData;
}

export interface Metric {
  _id: string;
  name: string;
  title: string;
  points: number[];
  weight: number;
}

interface FormData {
  [key: string]: number;
}

export interface GroomingData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: GroomingTask[];
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
  metrics: Metric[];
  isGameMaster: boolean;
  currentTaskNumber: number;
  isFinished: boolean;
}

export interface GroomingResultData {
  title: string;
  isGameMaster: boolean;
  tasks: GroomingTask[];
  storyPoint: number;
}
