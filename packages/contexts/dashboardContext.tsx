import React, { createContext, useContext, useMemo, ReactNode } from 'react';

type DashboardContextValuesType = {
  gameCardData: GameCardData[];
};

interface GameCardData {
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
