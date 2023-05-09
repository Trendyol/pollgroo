import React from 'react';
import { IconSettings } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import { ProfileCirclesBox } from '../profileCirclesBox';
import translate from 'translations';
import { useTeam } from 'contexts';

interface IProps {
  setShowMembersModal: (value: boolean) => void;
}

export const TeamSettingsBox = ({ setShowMembersModal }: IProps) => {
  const { team, setShowEditTeamModal } = useTeam();

  const handleMemberClick = () => {
    setShowMembersModal(true);
  };

  const handleSettingsClick = () => {
    setShowEditTeamModal(true);
  };

  return (
    <div className="p-3 flex justify-between items-center border border-bordergray rounded-lg">
      <div className="flex gap-x-2 items-center lg:cursor-pointer" onClick={handleMemberClick}>
        <Typography element="p" color="black" weight="semibold" size="base">
          {translate('TEAM_MEMBERS')}
        </Typography>
        <ProfileCirclesBox totalMembersNumber={team.totalMembers} badgeMembers={team.badgeMembers} />
      </div>
      <IconSettings className="text-gray w-6 h-6 lg:cursor-pointer" onClick={handleSettingsClick} />
    </div>
  );
};
