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
  members: string[];
  tasks: string[];
  games: string[];
  createdAt: string;
  updatedAt: string;
}

interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: string[];
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
        const res = await axios.get('api/teams/get-teams');
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
