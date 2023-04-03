import React from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import { Typography } from '../../atoms';

export interface IProps {
  subNavigationText: string;
}

export const SubNavigation = ({ subNavigationText }: IProps) => {
  return (
    <div className="py-4 border-b border-lightgray flex items-center lg:rounded-lg lg:border lg:mt-6 lg:mx-20">
      <IconChevronLeft className="absolute ml-2 -z-10 lg:hidden" />
      <Typography element="h3" color="black" size="lg" className="w-full text-center font-semibold lg:text-left lg:ml-5">
        {subNavigationText}
      </Typography>
    </div>
  );
};
