import React, { useState } from 'react';
import { useTeam } from 'contexts';
import { NavigationLayout } from '../../layouts';
import { EditTeamModal, MembersModal, TeamSettingsBox, TeamTaskEditModal, TeamTasksBoard } from '../../organisms';

interface IProps {
  logoUrl: string;
}

export const TeamPage = ({ logoUrl }: IProps) => {
  const [showMembersModal, setShowMembersModal] = useState(false);
  const { team } = useTeam();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={team.name}>
      <div className="flex flex-col gap-y-5 px-6 pt-10 lg:px-20">
        <TeamSettingsBox setShowMembersModal={setShowMembersModal} />
        <TeamTasksBoard />
      </div>
      <MembersModal show={showMembersModal} setShow={setShowMembersModal} members={team.members} />
      <TeamTaskEditModal />
      <EditTeamModal />
    </NavigationLayout>
  );
};
