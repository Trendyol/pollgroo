import React, { createContext, useContext, useCallback, useMemo, useState, ReactNode, useRef } from 'react';
import axios from 'axios';
import { useApp } from './appContext';

type GroomingContextValuesType = {
  groomingData: GroomingData;
  tasks: GroomingTask[];
  setTasks: Function
  showAddTaskToGameModal: boolean;
  setShowAddTaskToGameModal: (value: boolean) => void;
  addTaskToTheGrooming: (title: string, description: string, gameId: string) => void;
  getGroomingTasks: () => void;
  showEditGroomingTaskModal: boolean;
  setShowEditGroomingTaskModal: (value: boolean) => void;
  selectedTaskToEdit: EditTaskPayload;
  setSelectedTaskToEdit: (value: EditTaskPayload) => void;
  editGroomingTask: (title: string, description: string) => void;
  removeGroomingTask: (value?: string) => void;
  isSelectSelected: boolean;
  setIsSelectSelected: (value: boolean) => void;
  getGroomingTeamTasks: () => void,
  teamTasks: TeamTask[],
  setTeamTasks: Function;
  updateGroomingTasks: Function;
  voteData: VoteData;
  setVoteData: Function;
  participants: Participant[]
  setParticipants: Function
};

interface EditTaskPayload {
  _id: string;
  title: string;
  description: string;
  gameId: string;
}

interface GroomingData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: GroomingTask[]
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
  metrics: Metric[];
  isGameMaster: boolean;
}

interface Metric {
  _id: string;
  name: string;
  points: number[];
  weight: number;
  title: string;
}

interface GroomingTask {
  detail: {
    description: string;
    gameId: string;
    teamId: string;
    metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
    score: number;
    title: string;
    _id: string;
  };
  order: number;
  _id: string;
}

interface TeamTask {
  description: string;
  gameId: string;
  teamId: string;
  metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score: number;
  title: string;
  _id: string;
}

interface Participant {
  fullname: string;
  email: string;
  id: string;
  profileCircleBackgroundColor: string;
  profileCircleTextColor: string;
  profileCircleText: string;
  groomingId: string;
  formData: FormData;
}

interface FormData {
  [key: string]: string;
}

interface VoteData {
  [key: string]: number;
}

const GroomingContext = createContext({} as GroomingContextValuesType);

export const GroomingContextProvider: React.FC<{ children: ReactNode; data: GroomingData }> = ({ children, data }) => {
  const { setShowLoader } = useApp();
  const [groomingData, setGroomingData] = useState(data);
  const [tasks, setTasks] = useState(data.tasks);
  const [teamTasks, setTeamTasks] = useState([] as TeamTask[]);
  const [showAddTaskToGameModal, setShowAddTaskToGameModal] = useState(false);
  const [showEditGroomingTaskModal, setShowEditGroomingTaskModal] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState({} as EditTaskPayload);
  const [isSelectSelected, setIsSelectSelected] = useState(false);
  const [voteData, setVoteData] = useState({} as VoteData);
  const [participants, setParticipants] = useState([] as Participant[]);

  const addTaskToTheGrooming = useCallback(
    async (title: string, description: string, gameId: string) => {
      try {
        await axios.post(`/api/games/${gameId}/tasks`, {
          title,
          description,
          order: groomingData.tasks.length
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader, groomingData?.tasks?.length]
  );

  const getGroomingTasks = useCallback(
    async () => {
      try {
        const res = await axios.get(`/api/games/${groomingData._id}/tasks`);
        setTasks(res.data);
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader, groomingData._id]
  );

  const editGroomingTask = useCallback(
    async (title: string, description: string) => {
      try {
        await axios.patch(`/api/tasks/${selectedTaskToEdit._id}`, {
          title,
          description,
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [selectedTaskToEdit, setShowLoader]
  );

  const removeGroomingTask = useCallback(
    async (taskId?: string) => {
      try {
        await axios.patch(`/api/games/${groomingData._id}/tasks`, {
          taskId: selectedTaskToEdit._id || taskId,
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [selectedTaskToEdit, setShowLoader, groomingData._id]
  );

  const getGroomingTeamTasks = useCallback(
    async () => {
      try {
        setShowLoader(true);
        const res = await axios.get(`/api/teams/${groomingData.team._id}/tasks`);
        setTeamTasks(res.data.tasks);
      } catch (err) {
        setShowLoader(false);
      } finally {
        setShowLoader(false);
      }
    },
    [setShowLoader, groomingData?.team?._id]
  );

  const updateGroomingTasks = useCallback(async (groomingTasks: GroomingTask[], taskId?: number) => {
    try {
      await axios.patch(`/api/games/${groomingData._id}/select`, {
        groomingTasks,
        taskId
      });
    } catch (err) {}
  },[groomingData._id]);

  const values = useMemo(
    () => ({
      groomingData,
      tasks,
      setTasks,
      showAddTaskToGameModal,
      setShowAddTaskToGameModal,
      addTaskToTheGrooming,
      getGroomingTasks,
      showEditGroomingTaskModal,
      setShowEditGroomingTaskModal,
      selectedTaskToEdit,
      setSelectedTaskToEdit,
      editGroomingTask,
      removeGroomingTask,
      isSelectSelected,
      setIsSelectSelected,
      getGroomingTeamTasks,
      teamTasks,
      setTeamTasks,
      updateGroomingTasks,
      voteData,
      setVoteData,
      participants,
      setParticipants
    }),
    [
      groomingData,
      tasks,
      setTasks,
      showAddTaskToGameModal,
      setShowAddTaskToGameModal,
      setShowEditGroomingTaskModal,
      showEditGroomingTaskModal,
      selectedTaskToEdit,
      setSelectedTaskToEdit,
      editGroomingTask,
      removeGroomingTask,
      addTaskToTheGrooming,
      getGroomingTasks,
      isSelectSelected,
      setIsSelectSelected,
      getGroomingTeamTasks,
      teamTasks,
      setTeamTasks,
      updateGroomingTasks,
      voteData,
      setVoteData,
      participants,
      setParticipants
    ]
  );
  return <GroomingContext.Provider value={values}>{children}</GroomingContext.Provider>;
};

export const useGrooming = () => useContext(GroomingContext);
