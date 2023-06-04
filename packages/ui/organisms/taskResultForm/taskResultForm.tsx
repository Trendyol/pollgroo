import React, { useEffect } from 'react';
import { useGrooming, useSocket } from 'contexts';
import { GroomingTaskCard } from '../groomingTaskCard';

export const TaskResultForm = () => {
  const { getCurrentTaskNumber, groomingData, currentTaskNumber, isGameStarted, setTaskResult, taskResult } = useGrooming();
  const currentTask = groomingData.tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  useEffect(() => {
    socket.on('calculateTaskResult', (data) => {
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data))
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setTaskResult, taskResult]);

  useEffect(() => {
    const fetchCurrentTaskNumber = async () => {
      await getCurrentTaskNumber();
    };
    fetchCurrentTaskNumber();
  }, [getCurrentTaskNumber]);

  if (!isGameStarted || taskResult.currentTaskNumber !== currentTaskNumber) {
    return null;
  }

  return (
    <>
      <GroomingTaskCard
        key={currentTask?._id}
        title={currentTask?.title}
        description={currentTask?.description}
        taskId={currentTask?._id}
        gameId={currentTask?.gameId}
        disableEdit
      />
    </>
  );
};
