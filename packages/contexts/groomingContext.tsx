import React, { createContext, useContext, useCallback, useMemo, useState, ReactNode } from 'react';
import axios from 'axios';

type GroomingContextValuesType = {
  groomingData: GroomingData;
  tasks: Task[];
  showAddTaskToGameModal: boolean;
  setShowAddTaskToGameModal: (value: boolean) => void;
  addTaskToTheGrooming: (title: string, description: string, gameId: string) => void;
  getGroomingTasks: (gameId: string) => void;
  showEditGroomingTaskModal: boolean;
  setShowEditGroomingTaskModal: (value: boolean) => void;
  selectedTaskToEdit: EditTaskPayload;
  setSelectedTaskToEdit: (value: EditTaskPayload) => void;
  editGroomingTask: (title: string, description: string) => void;
  removeGroomingTask: (value: string) => void;
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
  tasks: Task[];
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

interface Task {
  description: string;
  gameId: string;
  teamId: string;
  metrics: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score: number;
  title: string;
  _id: string;
}

const GroomingContext = createContext({} as GroomingContextValuesType);

export const GroomingContextProvider: React.FC<{ children: ReactNode; data: GroomingData }> = ({ children, data }) => {
  const [groomingData, setGroomingData] = useState(data);
  const [tasks, setTasks] = useState(data.tasks);
  const [showAddTaskToGameModal, setShowAddTaskToGameModal] = useState(false);
  const [showEditGroomingTaskModal, setShowEditGroomingTaskModal] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState({} as EditTaskPayload);

  const addTaskToTheGrooming = async (title: string, description: string, gameId: string) => {
    try {
      await axios.post(`/api/games/${gameId}/tasks`, {
        title,
        description,
      });
    } catch (err) {}
  };

  const getGroomingTasks = async (gameId: string) => {
    try {
      const res = await axios.get(`/api/games/${gameId}/tasks`);
      setTasks(res.data);
    } catch (err) {}
  };

  const editGroomingTask = useCallback(
    async (title: string, description: string) => {
      try {
        await axios.patch(`/api/tasks/${selectedTaskToEdit._id}`, {
          title,
          description,
        });
      } catch (err) {}
    },
    [selectedTaskToEdit]
  );

  const removeGroomingTask = useCallback(
    async (gameId: string) => {
      try {
        await axios.patch(`/api/games/${gameId}/tasks`, {
          taskId: selectedTaskToEdit._id,
        });
      } catch (err) {}
    },
    [selectedTaskToEdit]
  );

  const values = useMemo(
    () => ({
      groomingData,
      tasks,
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
    }),
    [
      groomingData,
      tasks,
      showAddTaskToGameModal,
      setShowAddTaskToGameModal,
      setShowEditGroomingTaskModal,
      showEditGroomingTaskModal,
      selectedTaskToEdit,
      setSelectedTaskToEdit,
      editGroomingTask,
      removeGroomingTask,
    ]
  );
  return <GroomingContext.Provider value={values}>{children}</GroomingContext.Provider>;
};

export const useGrooming = () => useContext(GroomingContext);
