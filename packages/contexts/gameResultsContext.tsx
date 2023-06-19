import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type GameResultsContextValuesType = {
  gamesResult: GameCardData[];
};

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

interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: Task[];
  team: TeamData;
  createdAt: string;
  updatedAt: string;
}

const GameResultsContext = createContext({} as GameResultsContextValuesType);

export const GameResultsContextProvider: React.FC<{ children: ReactNode; data: GameCardData[] }> = ({
  children,
  data,
}) => {
  const [gamesResult, setGamesResult] = useState(data);
  const values = useMemo(
    () => ({
      gamesResult,
    }),
    [gamesResult]
  );
  return <GameResultsContext.Provider value={values}>{children}</GameResultsContext.Provider>;
};

export const useGamesResult = () => useContext(GameResultsContext);
