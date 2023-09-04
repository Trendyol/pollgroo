import React from 'react';
import { Typography } from '../../atoms';
import Image from 'next/image';
import translate from 'translations';

export interface IProps {
  logoUrl: string;
  bannerVoteImage: string;
}

export const AuthBanner = ({ logoUrl, bannerVoteImage }: IProps) => {
  return (
    <div className="bg-lightblue flex flex-col gap-5 px-4 py-10 rounded-b-3xl items-center justify-center lg:flex-1 lg:rounded-3xl lg:items-start lg:justify-start">
      <div className="relative w-56 h-16">
        <Image priority src={logoUrl} alt="Pollgroo" fill />
      </div>
      <Typography className="font-bold text-center lg:text-left" element="h2" size="xxxl">
        {translate('BANNER_HEADER_TEXT')}
      </Typography>
      <Typography className="text-center lg:text-left" element="p" color="silver">
        {translate('BANNER_DESCRIPTION_TEXT')}
      </Typography>
      <div className="relative hidden lg:block w-full h-4/6 mt-6">
        <Image priority src={bannerVoteImage} alt="Pollgroo Banner Vote Image" fill />
      </div>
    </div>
  );
};
