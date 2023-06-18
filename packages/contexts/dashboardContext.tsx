import React, { createContext, useContext, useMemo, ReactNode } from 'react';

type DashboardContextValuesType = {
  gameCardData: GameCardData[];
};

interface GameCardData {
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

interface Task {
  description: string;
  gameId: string;
  teamId: string;
  metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score: number;
  title: string;
  _id: string;
  storyPoint: number;
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

interface TeamData {
  _id: string;
  name: string;
  members: UserData[];
  tasks: Task[];
  games: string[];
  createdAt: string;
  updatedAt: string;
  totalMembers?: number;
  badgeMembers?: UserData[];
}

const DashboardContext = createContext({} as DashboardContextValuesType);

export const DashboardContextProvider: React.FC<{ children: ReactNode; gameCardData: GameCardData[] }> = ({
  children,
  gameCardData,
}) => {
  const values = useMemo(
    () => ({
      gameCardData,
    }),
    [gameCardData]
  );
  return <DashboardContext.Provider value={values}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => useContext(DashboardContext);
