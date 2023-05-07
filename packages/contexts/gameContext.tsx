import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type GameContextValuesType = {
  showCreateGameModal: boolean;
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  gameCardData: GameCardData[];
  getGameCardData: Function;
  postCreateGameData: (title: string, teamId: string) => void;
  teamData: TeamData[];
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

const GameContext = createContext({} as GameContextValuesType);

export const GameContextProvider: React.FC<{ children: ReactNode; data: GameCardData[] }> = ({ children, data }) => {
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [gameCardData, setGameCardData] = useState(data);
  const [teamData, setTeamData] = useState([] as TeamData[]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get('api/teams/user-teams');
        setTeamData(res.data.teams);
      } catch (err) {}
    };
    if (showCreateGameModal && !Object.keys(teamData).length) {
      getTeamData();
    }
  }, [showCreateGameModal, teamData]);

  const postCreateGameData = async (title: string, teamId: string) => {
    try {
      await axios.post('api/games/create-game', {
        teamId,
        title,
      });
    } catch (err) {}
  };

  const getGameCardData = async () => {
    try {
      const res = await axios.get('api/games/get-games');
      setGameCardData(res.data);
    } catch (err) {}
  };

  const values = useMemo(
    () => ({
      showCreateGameModal,
      setShowCreateGameModal,
      gameCardData,
      getGameCardData,
      postCreateGameData,
      teamData,
    }),
    [showCreateGameModal, setShowCreateGameModal, gameCardData, teamData]
  );
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
