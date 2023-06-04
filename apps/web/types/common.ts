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
}

interface Task {
  description: string;
  gameId: string;
  teamId: string;
  metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score: number;
  title: string;
  _id: string;
}

interface GroomingTask {
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

interface UserData {
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
  createdAt: string;
  updatedAt: string;
  totalMembers: number;
  badgeMembers: UserData[];
}

interface Metric {
  _id: string;
  name: string;
  points: number[];
  weight: number;
  title: string;
}
