import React from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { useTeam } from 'contexts';

export interface IProps {
  title: string;
  taskId: string;
  description: string;
  teamId: string;
  score: number;
  storyPoint: number;
}

export const TeamTaskCard = ({ title, taskId, description, teamId, score, storyPoint }: IProps) => {
  const { setSelectTeamTaskToEdit, setShowEditTeamTaskModal } = useTeam();

  const handleClick = () => {
    setSelectTeamTaskToEdit({ _id: taskId, title, description, teamId });
    setShowEditTeamTaskModal(true);
  };

  return (
    <div className="relative bg-lightblue py-3 pl-6 pr-10 rounded-2xl">
      <Typography className="" element="p" color="textgray" size="xxs" weight="semibold">
        {title}
      </Typography>
      <div className="flex gap-x-2">
        {!!score && (
          <Typography className="" element="p" color="gray" size="xxs" weight="regular">
            Score: {score}
          </Typography>
        )}
        {!!storyPoint && (
          <Typography className="" element="p" color="gray" size="xxs" weight="regular">
            Story Point: {storyPoint}
          </Typography>
        )}
      </div>
      <IconPencil
        className="absolute top-2 right-2 text-silver w-4 h-4 lg:w-5 lg:h-5 lg:cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
