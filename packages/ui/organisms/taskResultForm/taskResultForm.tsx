import React, { useEffect } from 'react';
import { useGrooming, useSocket } from 'contexts';
import { GroomingTaskCard } from '../groomingTaskCard';
import { Typography } from '../../atoms';
import { Metric } from '../../interfaces';

export const TaskResultForm = () => {
  const { getCurrentTaskNumber, tasks, currentTaskNumber, isGameStarted, setTaskResult, taskResult, groomingData } =
    useGrooming();
  const currentTask = tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  useEffect(() => {
    socket.on('calculateTaskResult', (data) => {
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data));
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

  const renderMetricTitle = (key: string) => {
    return groomingData.metrics.find((metric: Metric) => metric.name === key)?.title;
  }

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
      <Typography element="h5" color="black" size="md" weight="semibold">
        Results
      </Typography>
      <ul>
        {Object.keys(taskResult.averages).map((key: string) => (
          <li key={key}>
            {renderMetricTitle(key)}:{taskResult.averages[key]}
          </li>
        ))}
      </ul>
      <div>Score: {taskResult.score}</div>
    </>
  );
};
