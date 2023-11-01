import React from 'react';
import { IconChevronDown, IconChevronUp, IconPencil } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { useGrooming } from 'contexts';
import classNames from 'classnames';

export interface IProps {
  title: string;
  taskId: string;
  description: string;
  gameId: string;
  disableEdit?: boolean;
  order?: number;
  totalTaskNumber?: number;
  className?: string;
}

export const GroomingTaskCard = ({
  title,
  taskId,
  description,
  gameId,
  disableEdit,
  order,
  totalTaskNumber,
  className,
}: IProps) => {
  const { setSelectedTaskToEdit, setShowEditGroomingTaskModal, groomingData } = useGrooming();
  const [isShowDescription, setIsShowDescription] = React.useState(false);

  const handleClick = () => {
    setSelectedTaskToEdit({ _id: taskId, title, description, gameId });
    setShowEditGroomingTaskModal(true);
  };

  const toggleShowDescription = () => {
    setIsShowDescription(!isShowDescription);
  }

  const renderAccordionIcon = () => {
    const chevronIconProps = {
      className: "text-gray absolute bottom-2 right-2 cursor-pointer",
      onClick: toggleShowDescription,
    };
  
    const IconComponent = isShowDescription ? IconChevronUp : IconChevronDown;
  
    return <IconComponent {...chevronIconProps} />;
  }

  if (groomingData.isScrumPoker) {
    return null;
  }

  return (
    <div
      className={classNames(`relative bg-lightblue py-2 pl-6 pr-6 rounded-2xl flex flex-col gap-y-3 ${className}`)}
    >
      {!!order && !!totalTaskNumber && (
        <Typography element="p" color="silver" size="xxs">
          Task: {order} / {totalTaskNumber}
        </Typography>
      )}
      <Typography element="p" color="textgray" size="xs" weight="semibold">
        {title}
      </Typography>
      {disableEdit && renderAccordionIcon()}
      {disableEdit && isShowDescription && (
        <Typography element="p" color='textgray' size="xxs" weight="semibold" className='py-5 border-t border-lightgray'>
          {description}
        </Typography>
      )}
      {!disableEdit && (
        <IconPencil className="absolute top-2 right-2 text-silver w-5 h-5 lg:cursor-pointer" onClick={handleClick} />
      )}
    </div>
  );
};
