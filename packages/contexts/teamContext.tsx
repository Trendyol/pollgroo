import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type TeamContextValuesType = {
  team: TeamData;
  setTeam: (value: TeamData) => void;
};

interface TeamData {
  _id: string;
  name: string;
  members: string[];
  tasks: string[];
  games: string[];
  createdAt: string;
  updatedAt: string;
  badgeMembers?: string[];
}

const TeamContext = createContext({} as TeamContextValuesType);

export const TeamContextProvider: React.FC<{ children: ReactNode; data: TeamData }> = ({ children, data }) => {
  const [team, setTeam] = useState(data);

  const values = useMemo(
    () => ({
      team,
      setTeam,
    }),
    [team, setTeam]
  );
  return <TeamContext.Provider value={values}>{children}</TeamContext.Provider>;
};

export const useTeam = () => useContext(TeamContext);
