import React from 'react';
import { UserData } from '../../interfaces';
import { ProfileCircle } from '../../molecules';
import { Typography } from '../../atoms';

interface IProps {
  totalMembersNumber: number;
  badgeMembers: UserData[];
}

export const ProfileCirclesBox = ({ totalMembersNumber, badgeMembers }: IProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative flex gap-x-2 w-fit">
        {badgeMembers?.map((badgeMember: UserData, index: number) => (
          <ProfileCircle
            key={badgeMember._id}
            profileCircleBackgroundColor={badgeMember.profileCircleBackgroundColor}
            profileCircleText={badgeMember.profileCircleText}
            profileCircleTextColor={badgeMember.profileCircleTextColor}
            className={`${
              index === 1 && totalMembersNumber !== 2 ? 'absolute inset-0 mx-auto' : ''
            } h-8 w-8 text-sm lg:text-base lg:w-10 lg:h-10`}
          />
        ))}
      </div>
      <Typography element="span" color="gray" weight="medium" size="xs">
        {totalMembersNumber}
      </Typography>
    </div>
  );
};
