import React from 'react';
import { Typography } from '../../atoms';
import { useSession } from 'next-auth/react';
import { ExtendedSession } from '../../interfaces';

export const SubNavigationProfileMenu = () => {
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="absolute -z-10 mr-4 right-0 lg:flex lg:items-center lg:justify-center lg:gap-x-2">
      <Typography className="hidden lg:inline-block" element="p" color="darkgray" weight="regular" size="md">
        {extendedSession.user.fullname}
      </Typography>
      <div
        style={{
          backgroundColor: `${extendedSession.user.profileCircleBackgroundColor}`,
          color: `${extendedSession.user.profileCircleTextColor}`,
        }}
        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold`}
      >
        {extendedSession.user.profileCircleText}
      </div>
    </div>
  );
};
