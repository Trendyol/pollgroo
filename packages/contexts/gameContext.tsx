import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useApp } from './appContext';

type GameContextValuesType = {
  showCreateGameModal: boolean;
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  gameCardData: GameCardData[];
  getGameCardData: Function;
  postCreateGameData: (title: string, teamId: string, gameType: string) => void;
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

const GameContext = createContext({} as GameContextValuesType);

export const GameContextProvider: React.FC<{ children: ReactNode; data: GameCardData[] }> = ({ children, data }) => {
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [gameCardData, setGameCardData] = useState(data);
  const [teamData, setTeamData] = useState([] as TeamData[]);
  const { setShowLoader } = useApp();

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get('api/teams/user-teams');
        setTeamData(res.data.teams);
      } catch (err) {
        setShowLoader(false);
      }
    };
    if (showCreateGameModal && !Object.keys(teamData).length) {
      getTeamData();
    }
  }, [showCreateGameModal, teamData, setShowLoader]);

  const postCreateGameData = useCallback(
    async (title: string, teamId: string, gameType: string) => {
      try {
        await axios.post('api/games/create-game', {
          teamId,
          title,
          gameType
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader]
  );

  const getGameCardData = useCallback(async () => {
    try {
      const res = await axios.get('api/games/get-games');
      setGameCardData(res.data);
    } catch (err) {
      setShowLoader(false);
    }
  }, [setShowLoader]);

  const values = useMemo(
    () => ({
      showCreateGameModal,
      setShowCreateGameModal,
      gameCardData,
      getGameCardData,
      postCreateGameData,
      teamData,
    }),
    [showCreateGameModal, setShowCreateGameModal, gameCardData, teamData, getGameCardData, postCreateGameData]
  );
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
