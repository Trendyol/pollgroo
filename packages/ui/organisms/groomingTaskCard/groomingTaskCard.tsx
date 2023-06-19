import React from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { useGrooming } from 'contexts';

export interface IProps {
  title: string;
  taskId: string;
  description: string;
  gameId: string;
  disableEdit?: boolean;
  order?: number;
  totalTaskNumber?: number;
}

export const GroomingTaskCard = ({ title, taskId, description, gameId, disableEdit, order, totalTaskNumber }: IProps) => {
  const { setSelectedTaskToEdit, setShowEditGroomingTaskModal } = useGrooming();

  const handleClick = () => {
    setSelectedTaskToEdit({ _id: taskId, title, description, gameId });
    setShowEditGroomingTaskModal(true);
  };

  return (
    <div className="relative bg-lightblue py-2 pl-6 pr-10 rounded-2xl flex flex-col gap-y-3">
      {
        !!order && !!totalTaskNumber && <Typography element='p' color='silver' size='xxs'>Task: {order} / {totalTaskNumber}</Typography> 
      }
      <Typography element="p" color="textgray" size="xs" weight="semibold">
        {title}
      </Typography>
      {!disableEdit && (
        <IconPencil
          className="absolute top-2 right-2 text-silver w-5 h-5 lg:cursor-pointer"
          onClick={handleClick}
        />
      )}
    </div>
  );
};
