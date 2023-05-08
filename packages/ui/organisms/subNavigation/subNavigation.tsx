import React from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { SubNavigationProfileMenu } from '../../organisms';

export interface IProps {
  subNavigationText: string;
}

export const SubNavigation = ({ subNavigationText }: IProps) => {
  return (
    <div className="py-4 border-b border-lightgray flex items-center lg:rounded-lg lg:border lg:mt-6 lg:mx-20 lg:relative">
      <IconChevronLeft className="absolute ml-2 -z-10 lg:hidden" />
      <div className='w-full flex items-center justify-center'>
      <Typography
        element="h3"
        color="black"
        size="lg"
        className="text-center font-semibold lg:text-left lg:ml-5 w-48 lg:w-full truncate"
      >
        {subNavigationText}
      </Typography>
      </div>
      <SubNavigationProfileMenu />
    </div>
  );
};
