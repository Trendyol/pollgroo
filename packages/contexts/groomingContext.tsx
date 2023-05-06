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
  selectedTaskToEdit: Task;
  setSelectedTaskToEdit: (value: Task) => void;
  editGroomingTask: (title: string, description: string) => void;
};

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
  gameId?: string;
  metrics?: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score?: number;
  title: string;
  _id: string;
}

const GroomingContext = createContext({} as GroomingContextValuesType);

export const GroomingContextProvider: React.FC<{ children: ReactNode; data: GroomingData }> = ({ children, data }) => {
  const [groomingData, setGroomingData] = useState(data);
  const [tasks, setTasks] = useState(data.tasks);
  const [showAddTaskToGameModal, setShowAddTaskToGameModal] = useState(false);
  const [showEditGroomingTaskModal, setShowEditGroomingTaskModal] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState({} as Task);

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

  const editGroomingTask = useCallback(async (title: string, description: string) => {
    try {
      const res = await axios.patch(`/api/tasks/${selectedTaskToEdit._id}`, {
        title,
        description,
      });
      const theTaskBeforeEdit = tasks.find((task: Task) => task._id === selectedTaskToEdit._id);
      const theTaskIndexBeforeEdit = tasks.findIndex((task: Task) => task._id === selectedTaskToEdit._id);
      if (theTaskBeforeEdit) {
        theTaskBeforeEdit.title = res.data.title;
        theTaskBeforeEdit.description = res.data.description;
        tasks[theTaskIndexBeforeEdit] = theTaskBeforeEdit;
      }

      setTasks(tasks);
    } catch (err) {}
  }, [tasks, selectedTaskToEdit]);

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
    ]
  );
  return <GroomingContext.Provider value={values}>{children}</GroomingContext.Provider>;
};

export const useGrooming = () => useContext(GroomingContext);
