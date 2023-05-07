import React from 'react';
import { Button, Typography } from '../../atoms';
import translate from 'translations';
import { DIVIDER } from './constants';
import { GroomingTaskCard } from '../groomingTaskCard';
import { useGrooming } from 'contexts';
import { Task } from '../../interfaces';

export const GroomingTasks = () => {
  const { tasks, setShowAddTaskToGameModal } = useGrooming();

  const handleAddClick = () => {
    setShowAddTaskToGameModal(true);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Typography element="h5" color="black" size="md" weight="semibold">
        {translate('GROOMING_TASKS')}
      </Typography>
      <div className="flex justify-end gap-x-1">
        <Button variant="text" onClick={handleAddClick}>
          {translate('ADD')}
        </Button>
        <span className="text-primary font-semibold">{DIVIDER}</span>
        <Button variant="text">{translate('SELECT')}</Button>
      </div>
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
        {tasks?.map((task: Task) => (
          <GroomingTaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            taskId={task._id}
            gameId={task.gameId}
          />
        ))}
      </div>
    </div>
  );
};
