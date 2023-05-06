import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import axios from "axios";

type TeamsContextValuesType = {
  teams: TeamData[];
  setTeams: (value: TeamData[]) => void;
  showCreateTeamModal: boolean;
  setShowCreateTeamModal: (value: boolean) => void;
  postCreateTeamData: (value: string) => void;
  getTeams: () => void;
};

interface TeamData {
  _id: string;
  name: string;
  members: string[];
  tasks: string[];
  games: string[];
  createdAt: string;
  updatedAt: string;
  isMember?: boolean;
  totalMembers?: number;
  badgeMembers?: string[];
}

const TeamsContext = createContext({} as TeamsContextValuesType);

export const TeamsContextProvider: React.FC<{ children: ReactNode; data: TeamData[] }> = ({ children, data }) => {
  const [teams, setTeams] = useState(data);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const postCreateTeamData = async (title: string) => {
    try {
      await axios.post('/api/teams/create-team', {
        name: title,
      });
    } catch (err) {}
  };

  const getTeams = async () => {
    try {
      const res = await axios.get('/api/teams/get-teams');
      setTeams(res.data.teams);
    } catch (err) {}
  };

  const values = useMemo(
    () => ({
      teams,
      setTeams,
      showCreateTeamModal,
      setShowCreateTeamModal,
      getTeams,
      postCreateTeamData
    }),
    [teams, setTeams, showCreateTeamModal, setShowCreateTeamModal]
  );
  return <TeamsContext.Provider value={values}>{children}</TeamsContext.Provider>;
};

export const useTeams = () => useContext(TeamsContext);
