import React, { useState } from 'react';
import { useApp, useTeam } from 'contexts';
import { NavigationLayout } from '../../layouts';
import { EditTeamModal, MembersModal, TeamInvitationBox, TeamSettingsBox, TeamTaskEditModal, TeamTasksBoard } from '../../organisms';
import { Loader } from '../../molecules';

interface IProps {
  logoUrl: string;
}

export const TeamPage = ({ logoUrl }: IProps) => {
  const [showMembersModal, setShowMembersModal] = useState(false);
  const { team } = useTeam();
  const { showLoader } = useApp();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={team.name}>
      <div className="flex flex-col gap-y-5 px-6 pt-10 lg:px-20">
        <TeamInvitationBox />
        <TeamSettingsBox setShowMembersModal={setShowMembersModal} />
        <TeamTasksBoard />
      </div>
      <MembersModal show={showMembersModal} setShow={setShowMembersModal} members={team.members} />
      <TeamTaskEditModal />
      <EditTeamModal />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
