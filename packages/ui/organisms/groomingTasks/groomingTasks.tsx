import React from 'react';
import { Button, Typography } from '../../atoms';
import translate from 'translations';
import { GroomingTaskCard } from '../groomingTaskCard';
import { useGrooming } from 'contexts';
import { GroomingTask } from '../../interfaces';

export const GroomingTasks = () => {
  const { tasks, setIsSelectSelected, isSelectSelected, groomingData } = useGrooming();
  const { isStarted } = groomingData;

  if (isStarted || isSelectSelected) {
    return null;
  }

  const handleSelectClick = () => {
    setIsSelectSelected(true);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Typography element="h5" color="black" size="md" weight="semibold">
        {translate('GROOMING_TASKS')}
      </Typography>
      <div className="flex justify-end gap-x-1">
        <Button variant="text" onClick={handleSelectClick}>
          {translate('SELECT')}
        </Button>
      </div>
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
        {tasks?.map((task: GroomingTask) => (
          <GroomingTaskCard
            key={task.detail?._id}
            title={task.detail?.title}
            description={task.detail?.description}
            taskId={task.detail?._id}
            gameId={task.detail?.gameId}
          />
        ))}
      </div>
    </div>
  );
};
