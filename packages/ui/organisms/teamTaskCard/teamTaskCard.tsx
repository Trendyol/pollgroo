import React from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { useTeam } from 'contexts';

export interface IProps {
  title: string;
  taskId: string;
  description: string;
  teamId: string;
}

export const TeamTaskCard = ({ title, taskId, description, teamId }: IProps) => {
  const { setSelectTeamTaskToEdit, setShowEditTeamTaskModal } = useTeam();

  const handleClick = () => {
    setSelectTeamTaskToEdit({ _id: taskId, title, description, teamId });
    setShowEditTeamTaskModal(true);
  };

  return (
    <div className="relative bg-lightblue py-4 pl-6 pr-10 rounded-2xl">
      <Typography className="" element="p" color="textgray" size="md" weight="semibold">
        {title}
      </Typography>
      <IconPencil
        className="absolute top-2 right-2 text-silver w-5 h-5 lg:w-7 lg:h-7 lg:cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
