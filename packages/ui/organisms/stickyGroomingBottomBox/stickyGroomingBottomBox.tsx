import React from 'react';
import { Button } from '../../atoms';
import translate from 'translations';
import { ProfileCirclesBox } from '../profileCirclesBox';
import { useGrooming, useSocket } from 'contexts';

interface IProps {
  visible: boolean;
}

export const StickyGroomingBottomBox = ({ visible }: IProps) => {
  const { participants, startGrooming, setIsGameStarted, isGameStarted, groomingData, currentTaskNumber } = useGrooming();
  const socket = useSocket();

  if (!visible) {
    return null;
  }

  const handleGroomingStart = () => {
    startGrooming().then(() => {
      setIsGameStarted(true);
      socket.emit('startGame', { groomingId: groomingData._id, isGameStarted: true });
    });
  };

  const handleShowTaskResult = () => {
    socket.emit('calculateTaskResult', { groomingId: groomingData._id, metrics: groomingData.metrics, currentTaskNumber });
  };

  return (
    <>
      <div className="fixed bottom-0 bg-white w-full shadow-2xl lg:pr-72 z-10">
        <div className="p-7 h-20 flex justify-between items-center lg:justify-end lg:gap-x-5">
          <ProfileCirclesBox badgeMembers={participants} totalMembersNumber={participants.length} />
          {!isGameStarted ? (
            <Button variant="primary" className="px-10 py-3" onClick={handleGroomingStart}>
              {translate('START')}
            </Button>
          ) : (
            <Button variant="primary" className="px-10 py-3" onClick={handleShowTaskResult}>
              {translate('SHOW')}
            </Button>
          )}
        </div>
      </div>
      <div className="h-20 mt-5"></div>
    </>
  );
};
