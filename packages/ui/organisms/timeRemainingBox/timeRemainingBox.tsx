import React, { useEffect } from 'react';
import { useCountDown } from 'hooks';
import translate from 'translations';
import { Typography } from '../../atoms';
import { useTeam } from 'contexts';

interface IProps {
  remainingTime: number;
}

export const TimeRemainingBox = ({ remainingTime }: IProps) => {
  const time = useCountDown(remainingTime);
  const { setRemainingNewInvitationLinkTime } = useTeam();

  useEffect(() => {
    if (time.hours === '00' && time.minutes === '00' && time.seconds === '00') {
      setRemainingNewInvitationLinkTime(0);
    }
  }, [time.hours, time.minutes, time.seconds]);

  if (!remainingTime) {
    return null;
  }

  return (
    <div className="flex items-center w-full gap-x-3">
      <Typography element="p" color="black" size="xxs" weight="medium">
        {translate('TIME_REMAINING_BOX_TEXT')}
      </Typography>
      <div className="flex gap-x-3">
        <div className="bg-silver text-white rounded-lg p-2 w-6 h-6 lg:w-10 lg:h-10 flex items-center justify-center text-xs lg:text-lg">
          {time.hours}
        </div>
        <div className="bg-silver text-white rounded-lg p-2 w-6 h-6 lg:w-10 lg:h-10 flex items-center justify-center text-xs lg:text-lg">
          {time.minutes}
        </div>
        <div className="bg-silver text-white rounded-lg p-2 w-6 h-6 lg:w-10 lg:h-10 flex items-center justify-center text-xs lg:text-lg">
          {time.seconds}
        </div>
      </div>
    </div>
  );
};
