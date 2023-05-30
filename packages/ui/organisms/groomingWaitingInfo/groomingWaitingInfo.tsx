import React from 'react';
import { Typography } from '../../atoms';
import { useGrooming } from 'contexts';
import translate from 'translations';
import { IconClock } from '@tabler/icons-react';

export const GroomingWaitingInfo = () => {
  const { groomingData } = useGrooming();
  const { team } = groomingData;

  return (
    <div className="flex flex-col items-center justify-center py-7 gap-y-5">
      <Typography element="h4" color="gray" size="xxl" weight="semibold" className="text-center">
        {team?.name}
      </Typography>
      <IconClock className="text-primary w-7 h-7 lg:w-14 lg:h-14" />
      <Typography element="p" color="silver" size="xl" weight="bold">
        {translate('GAME_NOT_STARTED')}
      </Typography>
      <Typography className="text-center" element="p" color="silver" size="md">
        {groomingData.infoText}
      </Typography>
    </div>
  );
};
