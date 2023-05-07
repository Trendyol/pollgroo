import React from 'react';
import { Typography } from '../../atoms';
import { useSession } from 'next-auth/react';
import { ExtendedSession } from '../../interfaces';
import { ProfileCircle } from '../../molecules';

export const SubNavigationProfileMenu = () => {
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  if (!session || !session.user) {
    return null;
  }

  return (
    <>
      <div className="cursor-pointer absolute mr-4 right-0 lg:flex lg:items-center lg:justify-center lg:gap-x-2">
        <Typography className="hidden lg:inline-block" element="p" color="darkgray" weight="regular" size="md">
          {extendedSession.user.fullname}
        </Typography>
        <ProfileCircle
          profileCircleBackgroundColor={extendedSession.user.profileCircleBackgroundColor}
          profileCircleTextColor={extendedSession.user.profileCircleTextColor}
          profileCircleText={extendedSession.user.profileCircleText}
        />
      </div>
    </>
  );
};
