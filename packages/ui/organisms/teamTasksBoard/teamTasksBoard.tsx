import React from 'react';
import translate from 'translations';
import { Typography } from '../../atoms';
import { useTeam } from 'contexts';
import { Task } from '../../interfaces';
import { TeamTaskCard } from '../teamTaskCard';

export const TeamTasksBoard = () => {
  const { tasks } = useTeam();
  return (
    <div className="p-3 flex flex-col gap-y-5 border border-bordergray rounded-lg">
      <Typography element="h5" color="black" size="base" weight="semibold">
        {translate('Backlog')}
      </Typography>
      <div className="flex flex-col gap-y-5">
        {tasks?.map((task: Task) => (
          <TeamTaskCard
            key={task._id}
            title={task.title}
            taskId={task._id}
            description={task.description}
            teamId={task.teamId}
            score={task.score}
            storyPoint={task.storyPoint}
          />
        ))}
      </div>
    </div>
  );
};
