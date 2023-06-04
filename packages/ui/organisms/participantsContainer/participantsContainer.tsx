import React, { useEffect, useState } from 'react';
import { Typography } from '../../atoms';
import { useGrooming, useSocket } from 'contexts';
import { Participant } from '../../interfaces';
import { ProfileCircle } from '../../molecules';
import translate from 'translations';
import { MetricsFilter } from '../metricsFilter';

export const ParticipantsContainer = () => {
  const { participants, setParticipants, groomingData } = useGrooming();
  const [metric, setMetric] = useState(groomingData.metrics[0].name);
  const socket = useSocket();

  useEffect(() => {
    socket.on('userJoined', ({ joinedUser, allUsers }: { joinedUser: Participant; allUsers: Participant[] }) => {
      setParticipants(allUsers);
      console.log('User Joined:', joinedUser);
    });

    socket.on(
      'disconnectedUser',
      ({ disconnectedUser, allUsers }: { disconnectedUser: Participant; allUsers: Participant[] }) => {
        setParticipants(allUsers);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [socket, setParticipants]);

  return (
    <>
      <Typography element="h5" color="black" size="md" weight="semibold">
        {translate('PARTICIPANTS')}
      </Typography>
      <MetricsFilter metrics={groomingData.metrics} onChange={setMetric} selected={metric} />
      <ul className="flex flex-col gap-y-3">
        {participants.map((participant: Participant) => (
          <li key={participant.id}>
            <div className="flex items-center gap-x-3">
              <ProfileCircle
                profileCircleBackgroundColor={participant.profileCircleBackgroundColor}
                profileCircleText={participant.profileCircleText}
                profileCircleTextColor={participant.profileCircleTextColor}
              />
              <Typography element="span" color="black" size="xs" weight="medium">
                {participant.fullname}
              </Typography>
            </div>
            {participant.formData[metric] && groomingData.isStarted && <div>{participant.formData[metric]}</div>}
          </li>
        ))}
      </ul>
    </>
  );
};
