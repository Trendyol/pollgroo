import React from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { useGrooming } from 'contexts';

export interface IProps {
  title: string;
  taskId: string;
  description: string;
  gameId: string;
}

export const GroomingTaskCard = ({ title, taskId, description, gameId }: IProps) => {
  const { setSelectedTaskToEdit, setShowEditGroomingTaskModal } = useGrooming();

  const handleClick = () => {
    setSelectedTaskToEdit({_id: taskId, title, description, gameId});
    setShowEditGroomingTaskModal(true);
  }

  return (
    <div className="relative bg-lightblue py-4 pl-6 pr-10 rounded-2xl">
      <Typography className="" element="p" color="textgray" size="md" weight="semibold">
        {title}
      </Typography>
      <IconPencil className="absolute top-2 right-2 text-silver w-5 h-5 lg:w-7 lg:h-7 lg:cursor-pointer" onClick={handleClick} />
    </div>
  );
};
