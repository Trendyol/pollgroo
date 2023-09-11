import React, { useEffect } from 'react';
import { Button, Typography } from '../../atoms';
import { IconCopy, IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import translate from 'translations';
import { Popup } from '../../molecules';
import { useGrooming } from 'contexts';

export const GroomingInfoBox = () => {
  const { groomingData } = useGrooming();
  const [showGroomingInfoBox, setShowGroomingInfoBox] = React.useState(false);
  const [showInviteLinkPopup, setShowInviteLinkPopup] = React.useState(false);

  const handleOpenInviteLinkPopup = () => {
    setShowInviteLinkPopup(!showInviteLinkPopup);
  };

  const handleCloseGroomingInfoBox = () => {
    localStorage.setItem('showGroomingInfoBox', groomingData._id);
    setShowGroomingInfoBox(!showGroomingInfoBox);
  };

  const getInviteLinkPopupContent = () => {
    let currentUrl: string = '';
    if (typeof window !== 'undefined') {
      currentUrl = window.location.href;
    }
    return (
      <div className="w-full mt-5">
        <Typography element="p" className="mt-2 bg-lightyellow p-1 rounded-lg break-all" color="darkgray" size="xxs">
          {translate('GAME_INVITE_POPUP_WARNING').replace('{0}', groomingData.team.name)}
        </Typography>
        <Typography element="p" className="bg-extralightgray p-2 rounded-lg mt-3 break-all" size="xs">
          {currentUrl}
        </Typography>
      </div>
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageGroomingInfoValue = localStorage.getItem('showGroomingInfoBox');
      if (localStorageGroomingInfoValue !== groomingData._id) {
        setShowGroomingInfoBox(true);
      }
    }
  }, [groomingData._id]);

  if (!showGroomingInfoBox) {
    return null;
  }

  return (
    <div
      className={classNames(
        'lg:w-1/2 lg:mx-auto lg:flex lg:items-center relative lg:p-2 lg:rounded-lg lg:bg-extralightgray'
      )}
    >
      <Button
        className="mx-auto py-1 px-2 flex items-center gap-x-1"
        variant="gray"
        onClick={handleOpenInviteLinkPopup}
      >
        <IconCopy className="w-5 h-5" />
        <Typography element="span" size="xs">
          {translate('Invite Link')}
        </Typography>
      </Button>
      <IconX className="text-gray cursor-pointer absolute right-2" onClick={handleCloseGroomingInfoBox} />
      <Popup show={showInviteLinkPopup} onClose={setShowInviteLinkPopup} title="Invite Link">
        {getInviteLinkPopupContent()}
      </Popup>
    </div>
  );
};
