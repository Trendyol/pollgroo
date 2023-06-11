import React from 'react';
import { DialogPopup } from '../dialogPopup';
import { IconPlayerSkipForwardFilled } from '@tabler/icons-react';
import { Button } from '../../atoms';
import translate from 'translations';
import { useGrooming } from 'contexts';

interface IProps {
  show: boolean;
  onClose: () => void;
  changeTask: (value?: boolean) => void;
  taskId: string;
}

export const NextTaskErrorPopup = ({ show, onClose, changeTask, taskId }: IProps) => {
  const { removeGroomingTask } = useGrooming();

  const handleSkip = () => {
    onClose();
    removeGroomingTask(taskId);
    changeTask(false);
  };

  return (
    <DialogPopup
      show={show}
      onClose={onClose}
      renderIcon={<IconPlayerSkipForwardFilled />}
      text={translate('DO_YOU_WANT_TO_SKIP_TEXT')}
      title={translate('DO_YOU_WANT_TO_SKIP_TITLE')}
    >
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <Button variant="secondary" className="h-10" fluid onClick={onClose}>
          {translate('CANCEL')}
        </Button>
        <Button variant="primary" className="h-10" fluid onClick={handleSkip}>
          {translate('SKIP')}
        </Button>
      </div>
    </DialogPopup>
  );
};
