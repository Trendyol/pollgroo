import React from 'react';
import { Typography } from '../../atoms';
import Image from 'next/image';

export interface IProps {
  logoUrl: string;
}

export const AuthBanner = ({ logoUrl }: IProps) => {
  return (
    <div className="bg-lightblue flex flex-col gap-5 px-4 py-10 rounded-b-3xl items-center justify-center lg:flex-1 lg:rounded-3xl lg:items-start lg:justify-start">
      <Image priority className="h-auto" src={logoUrl} alt="Pollgroo" width={200} height={100} />
      <Typography className="font-bold text-center lg:text-left" element="h2" size="xl">
        Is the team indecisive? Vote it go!
      </Typography>
      <Typography className="text-center lg:text-left" element="p" color="silver">
        Blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla.
      </Typography>
    </div>
  );
};
