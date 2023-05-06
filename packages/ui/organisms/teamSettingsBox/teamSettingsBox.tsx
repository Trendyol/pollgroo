import React from 'react';
import { IconSettings } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import translate from 'translations';

export const TeamSettingsBox = () => {
  return (
    <div className="p-3 flex justify-between items-center border border-bordergray rounded-lg">
      <Typography element="p" color="black" weight="semibold" size="base">
        {translate('TEAM_MEMBERS')}
      </Typography>
      <IconSettings className='text-gray w-6 h-6 lg:cursor-pointer'/>
    </div>
  );
};
