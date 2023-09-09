import React from 'react';
import { Button } from '../../atoms';
import translate from 'translations';
import { ProfileCirclesBox } from '../profileCirclesBox';
import { useGrooming, useSocket } from 'contexts';
import classNames from 'classnames';
import { useApp } from 'contexts';

interface IProps {
  visible: boolean;
}

export const StickyGroomingBottomBox = ({ visible }: IProps) => {
  const {
    participants,
    startGrooming,
    setIsGameStarted,
    isGameStarted,
    groomingData,
    currentTaskNumber,
    tasks,
    taskResult
  } = useGrooming();
  const currentTask = tasks && tasks[currentTaskNumber];
  const socket = useSocket();
  const isShowButtonDisabled = taskResult.currentTaskNumber === currentTaskNumber;
  const { isReducedNavbar } = useApp();

  if (!visible) {
    return null;
  }

  const handleGroomingStart = () => {
    startGrooming().then(() => {
      setIsGameStarted(true);
      socket?.emit('startGame', { groomingId: groomingData._id, isGameStarted: true });
    });
  };

  const handleShowTaskResult = () => {
    socket?.emit('calculateTaskResult', {
      groomingId: groomingData._id,
      metrics: groomingData.metrics,
      currentTaskNumber,
      taskId: currentTask?.detail?._id,
    });
  };

  const handleResetEstimates = () => {
    socket?.emit('resetEstimates');
  };

  const getButtons = () => {
    if (!isGameStarted && !groomingData.isScrumPoker && groomingData.isGameMaster) {
      return (
        <Button variant="primary" className="px-10 py-3 mx-auto w-48" onClick={handleGroomingStart}>
          {translate('START')}
        </Button>
      );
    }
    if (groomingData.isGameMaster && (isGameStarted || groomingData.isScrumPoker)) {
      return (
        <div className="flex items-center gap-x-3 ml-auto">
          {groomingData.isScrumPoker && (
            <Button variant="secondary" className="px-10 py-3 hover:bg-extralightgray" onClick={handleResetEstimates}>
              Reset Estimates
            </Button>
          )}
          <Button
            variant="primary"
            className={`px-10 py-3 ${isShowButtonDisabled ? 'opacity-25' : ''}`}
            onClick={handleShowTaskResult}
            disabled={isShowButtonDisabled}
          >
            {translate('SHOW')}
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={classNames('fixed bottom-0 bg-white w-full shadow-2xl lg:pr-72 z-10', {
          'lg:pr-24': isReducedNavbar,
        })}
      >
        <div className="p-7 h-20 flex justify-between items-center lg:gap-x-5">
          <div className='absolute'>
            <ProfileCirclesBox badgeMembers={participants} totalMembersNumber={participants.length} />
          </div>
          {getButtons()}
        </div>
      </div>
      <div className="h-20 mt-5"></div>
    </>
  );
};
