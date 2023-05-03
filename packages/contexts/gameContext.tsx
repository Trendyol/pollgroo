import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import axios from 'axios';

type GameContextValuesType = {
  showCreateGameModal: boolean;
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  gameCardData: GameCardData[];
  getGameCardData: Function;
  postCreateGameData: (title: string, teamId: string) => void;
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

const GameContext = createContext({} as GameContextValuesType);

export const GameContextProvider: React.FC<{ children: ReactNode; data: GameCardData[] }> = ({ children, data }) => {
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [gameCardData, setGameCardData] = useState(data);

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
    }),
    [showCreateGameModal, setShowCreateGameModal, gameCardData]
  );
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
