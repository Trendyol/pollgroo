import React, { useEffect } from 'react';
import { useGrooming } from 'contexts';
import { GroomingTaskCard } from '../groomingTaskCard';
import { Typography } from '../../atoms';
import { Metric } from '../../interfaces';

export const TaskResultForm = () => {
  const { getCurrentTaskNumber, tasks, currentTaskNumber, isGameStarted, taskResult, groomingData } =
    useGrooming();
  const currentTask = tasks[currentTaskNumber]?.detail;

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
