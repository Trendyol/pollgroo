import React, { createContext, useContext, useCallback, useMemo, useState, ReactNode, useRef } from 'react';
import axios from 'axios';
import { useApp } from './appContext';

type GroomingContextValuesType = {
  groomingData: GroomingData;
  tasks: GroomingTask[];
  setTasks: Function;
  showAddTaskToGameModal: boolean;
  setShowAddTaskToGameModal: (value: boolean) => void;
  addTaskToTheGrooming: (title: string, description: string, gameId: string) => void;
  getGroomingTasks: Function;
  showEditGroomingTaskModal: boolean;
  setShowEditGroomingTaskModal: (value: boolean) => void;
  selectedTaskToEdit: EditTaskPayload;
  setSelectedTaskToEdit: (value: EditTaskPayload) => void;
  editGroomingTask: (title: string, description: string) => void;
  removeGroomingTask: (value?: string) => void;
  isSelectSelected: boolean;
  setIsSelectSelected: (value: boolean) => void;
  getGroomingTeamTasks: () => void;
  teamTasks: TeamTask[];
  setTeamTasks: Function;
  updateGroomingTasks: Function;
  participants: Participant[];
  setParticipants: Function;
  isGameStarted: boolean;
  setIsGameStarted: Function;
  startGrooming: Function;
  currentTaskNumber: number;
  setCurrentTaskNumber: Function;
  changeCurrentTaskNumber: Function;
  getCurrentTaskNumber: Function;
  taskResult: TaskResult;
  setTaskResult: Function;
  finishGrooming: Function;
  updateGroomingTaskScore: Function;
  isEditMetricPointClicked: boolean;
  setIsEditMetricPointClicked: Function;
  viewOnlyMode: boolean;
  setViewOnlyMode: Function;
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
  isFinished: boolean;
  tasks: GroomingTask[];
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
  currentTaskNumber: number;
}

interface Metric {
  _id: string;
  name: string;
  points: number[];
  weight: number;
  title: string;
  description: string;
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
    storyPoint: number;
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
  storyPoint: number;
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
  userType: 'default' | 'admin';
}

interface FormData {
  [key: string]: number;
}

interface TaskResult {
  averages: FormData;
  score: number;
  currentTaskNumber: number;
  taskId: string;
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
  const [participants, setParticipants] = useState([] as Participant[]);
  const [isGameStarted, setIsGameStarted] = useState(data.isStarted);
  const [taskResult, setTaskResult] = useState({} as TaskResult);
  const [currentTaskNumber, setCurrentTaskNumber] = useState(data.currentTaskNumber);
  const [isEditMetricPointClicked, setIsEditMetricPointClicked] = useState(false);
  const [viewOnlyMode, setViewOnlyMode] = useState(false);

  const addTaskToTheGrooming = useCallback(
    async (title: string, description: string, gameId: string) => {
      try {
        await axios.post(`/api/games/${gameId}/tasks`, {
          title,
          description,
          order: groomingData.tasks.length,
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader, groomingData?.tasks?.length]
  );

  const getGroomingTasks = useCallback(async () => {
    try {
      const res = await axios.get(`/api/games/${groomingData._id}/tasks`);
      setTasks(res.data);
      return res.data;
    } catch (err) {
      setShowLoader(false);
    }
  }, [setShowLoader, groomingData._id]);

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

  const getGroomingTeamTasks = useCallback(async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`/api/teams/${groomingData.team._id}/tasks`);
      setTeamTasks(res.data.tasks);
    } catch (err) {
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  }, [setShowLoader, groomingData?.team?._id]);

  const updateGroomingTasks = useCallback(
    async (groomingTasks: GroomingTask[], taskId?: number) => {
      try {
        await axios.patch(`/api/games/${groomingData._id}/select`, {
          groomingTasks,
          taskId,
        });
      } catch (err) {}
    },
    [groomingData._id]
  );

  const startGrooming = useCallback(async () => {
    try {
      await axios.patch(`/api/games/${groomingData._id}/status`, {
        isStarted: true,
      });
    } catch (err) {}
  }, [groomingData._id]);

  const finishGrooming = useCallback(async () => {
    try {
      await axios.patch(`/api/games/${groomingData._id}/status`, {
        isFinished: true,
      });
    } catch (err) {}
  }, [groomingData._id]);

  const changeCurrentTaskNumber = useCallback(
    async (newTaskNumber: number) => {
      try {
        await axios.patch(`/api/games/${groomingData._id}/status`, {
          currentTaskNumber: newTaskNumber,
        });
      } catch (err) {}
    },
    [groomingData._id]
  );

  const getCurrentTaskNumber = useCallback(async () => {
    try {
      const res: { data: { currentTaskNumber: number } } = await axios.get(`/api/games/${groomingData._id}/status`);
      setCurrentTaskNumber(res.data.currentTaskNumber);
    } catch (err) {}
  }, [groomingData._id]);

  const updateGroomingTaskScore = useCallback(
    async (score: number, storyPoint: number) => {
      if (!score || !storyPoint) {
        return;
      }
      try {
        await axios.patch(`/api/tasks/${tasks[currentTaskNumber].detail._id}`, {
          score,
          storyPoint,
        });
      } catch (err) {
        setShowLoader(false);
      }
    },
    [setShowLoader, tasks, currentTaskNumber]
  );

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
      participants,
      setParticipants,
      isGameStarted,
      setIsGameStarted,
      startGrooming,
      taskResult,
      setTaskResult,
      currentTaskNumber,
      setCurrentTaskNumber,
      changeCurrentTaskNumber,
      getCurrentTaskNumber,
      finishGrooming,
      updateGroomingTaskScore,
      isEditMetricPointClicked, 
      setIsEditMetricPointClicked,
      viewOnlyMode,
      setViewOnlyMode
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
      participants,
      setParticipants,
      isGameStarted,
      setIsGameStarted,
      startGrooming,
      taskResult,
      setTaskResult,
      currentTaskNumber,
      setCurrentTaskNumber,
      changeCurrentTaskNumber,
      getCurrentTaskNumber,
      finishGrooming,
      updateGroomingTaskScore,
      isEditMetricPointClicked, 
      setIsEditMetricPointClicked,
      viewOnlyMode,
      setViewOnlyMode
    ]
  );
  return <GroomingContext.Provider value={values}>{children}</GroomingContext.Provider>;
};

export const useGrooming = () => useContext(GroomingContext);
