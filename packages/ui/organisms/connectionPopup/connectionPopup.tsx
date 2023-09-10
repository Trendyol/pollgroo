import React from 'react';
import { Popup } from '../../molecules';
import { useGrooming, useSocket } from 'contexts';
import translate from 'translations';
import { Typography } from '../../atoms';

export const ConnectionPopup = () => {
  const socket = useSocket();
  const { participants } = useGrooming();
  const showPopupCondition = !Boolean(socket?.connected) || socket?.disconnected || !(Boolean(participants.length));
  return (
    <Popup
      show={showPopupCondition}
      title="Waiting for connection do not leave !"
      onClose={() => {}}
      showCloseButton={false}
    >
      <Typography className="mt-2" element="p">
        {translate('GROOMING_SOCKET_CONNECTION_TEXT')}
      </Typography>
      <Typography className="bg-lightred rounded-lg p-3 mt-4" element="p">
        {translate('GROOMING_SOCKET_CONNECTION_WARNING_TEXT')}
      </Typography>
    </Popup>
  );
};
