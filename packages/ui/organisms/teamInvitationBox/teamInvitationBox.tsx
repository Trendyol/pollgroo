import React from 'react';
import { Button, Typography } from '../../atoms';
import { useTeam } from 'contexts';
import translate from 'translations';
import { TimeRemainingBox } from '../../organisms';

export const TeamInvitationBox = () => {
  const { team, generateInviteLink, remainingNewInvitationLinkTime, inviteLink } = useTeam();

  if (!team.isUserAllowedToInvite) {
    return null;
  }

  const handleInviteClick = () => {
    generateInviteLink();
  };

  return (
    <div className="w-full flex flex-col gap-y-3">
      <Button
        variant="primary"
        className="h-8"
        onClick={handleInviteClick}
        disabled={remainingNewInvitationLinkTime > 0}
        fluid
      >
        {translate('CREATE_INVITATION')}
      </Button>
      {remainingNewInvitationLinkTime > 0 && (
        <>
          <Typography className="border border-lightgray p-2 rounded-lg" element="p" color="black" size="xxs">
            {inviteLink}
          </Typography>
          <TimeRemainingBox
            remainingTime={remainingNewInvitationLinkTime}
          />
        </>
      )}
    </div>
  );
};
