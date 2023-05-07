import React from 'react';
import { Button, Typography } from '../../atoms';
import { useRouter } from 'next/router';
import translate from 'translations';
import { useTeams } from 'contexts';
import { ProfileCirclesBox } from '../profileCirclesBox';
import { UserData } from '../../interfaces';

interface IProps {
  isMember?: boolean;
  teamId: string;
  name: string;
  totalMembers: number;
  badgeMembers: UserData[];
  isMyTeamsActive?: boolean;
}

export const TeamCard = ({ isMember, teamId, name, badgeMembers, totalMembers, isMyTeamsActive }: IProps) => {
  const router = useRouter();
  const { joinTeam } = useTeams();

  const handleViewClick = () => {
    router.push(`/team/${teamId}`);
  };

  const handleJoinClick = async () => {
    if (isMember) {
      router.push(`/team/${teamId}`);
    }
    const res = await joinTeam(teamId);
    if (res.success) {
      router.push(`/team/${teamId}`);
    }
  };

  console.log(isMyTeamsActive, isMember)

  if (!isMember && isMyTeamsActive) {
    return null;
  }

  return (
    <div className="border border-lightgray rounded-lg flex flex-col gap-y-3 py-3 px-4">
      <ProfileCirclesBox totalMembersNumber={totalMembers} badgeMembers={badgeMembers} />
      <Typography element="p" color="black" weight="semibold" size="xs">
        {name}
      </Typography>
      <div className="flex justify-end">
        {isMember ? (
          <Button className="px-5 py-2" variant="secondary" onClick={handleViewClick}>
            {translate('VIEW')}
          </Button>
        ) : (
          <Button className="px-5 py-2" variant="primary" onClick={handleJoinClick}>
            {translate('JOIN')}
          </Button>
        )}
      </div>
    </div>
  );
};
