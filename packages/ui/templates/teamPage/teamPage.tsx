import React, { useState } from 'react';
import { useApp, useTeam } from 'contexts';
import { NavigationLayout } from '../../layouts';
import { EditTeamModal, MembersModal, TeamSettingsBox, TeamTaskEditModal, TeamTasksBoard } from '../../organisms';
import { Loader } from '../../molecules';
import { Button, Typography } from '../../atoms';
import translate from 'translations';

interface IProps {
  logoUrl: string;
}

export const TeamPage = ({ logoUrl }: IProps) => {
  const [showMembersModal, setShowMembersModal] = useState(false);
  const { team, generateInviteLink, remainingNewInvitationLinkTime, inviteLink } = useTeam();
  const { showLoader } = useApp();

  const handleInviteClick = () => {
    generateInviteLink();
  };

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={team.name}>
      <div className="flex flex-col gap-y-5 px-6 pt-10 lg:px-20">
        {team.isUserAllowedToInvite && (
          <>
            <Button
              variant="primary"
              className="h-8"
              onClick={handleInviteClick}
              disabled={remainingNewInvitationLinkTime > 0}
            >
              {translate('CREATE_INVITATION')}
            </Button>
            <Typography element="p" color="black" size="xxs">
              {inviteLink}
            </Typography>
          </>
        )}
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
