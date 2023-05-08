import React, { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useApp } from './appContext';

type TeamsContextValuesType = {
  teams: TeamData[];
  setTeams: (value: TeamData[]) => void;
  showCreateTeamModal: boolean;
  setShowCreateTeamModal: (value: boolean) => void;
  postCreateTeamData: (value: string) => void;
  getTeams: () => void;
  joinTeam: (teamId: string) => Promise<JoinTeamReturnModel>;
};

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

interface JoinTeamReturnModel {
  success: boolean;
  message: string;
}

interface TeamData {
  _id: string;
  name: string;
  members: UserData[];
  tasks: Task[];
  games: string[];
  createdAt: string;
  updatedAt: string;
  isMember?: boolean;
  totalMembers: number;
  badgeMembers: UserData[];
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

const TeamsContext = createContext({} as TeamsContextValuesType);

export const TeamsContextProvider: React.FC<{ children: ReactNode; data: TeamData[] }> = ({ children, data }) => {
  const [teams, setTeams] = useState(data);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const { setShowLoader } = useApp();

  const postCreateTeamData = useCallback(
    async (title: string) => {
      try {
        await axios.post('/api/teams/create-team', {
          name: title,
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader]
  );

  const getTeams = useCallback(async () => {
    try {
      const res = await axios.get('/api/teams/get-teams');
      setTeams(res.data.teams);
    } catch (err) {
      setShowLoader(false);
    }
  }, [setShowLoader]);

  const joinTeam = useCallback(
    async (teamId: string): Promise<JoinTeamReturnModel> => {
      try {
        const res = await axios.patch<JoinTeamReturnModel>(`/api/teams/${teamId}/join`);
        return res.data;
      } catch (err: any) {
        setShowLoader(false);
        return { success: false, message: err.message };
      }
    },
    [setShowLoader]
  );

  const values = useMemo(
    () => ({
      teams,
      setTeams,
      showCreateTeamModal,
      setShowCreateTeamModal,
      getTeams,
      postCreateTeamData,
      joinTeam,
    }),
    [teams, setTeams, showCreateTeamModal, setShowCreateTeamModal, getTeams, joinTeam, postCreateTeamData]
  );
  return <TeamsContext.Provider value={values}>{children}</TeamsContext.Provider>;
};

export const useTeams = () => useContext(TeamsContext);
