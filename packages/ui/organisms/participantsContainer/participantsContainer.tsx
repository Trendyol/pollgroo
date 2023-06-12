import React, { useEffect, useState } from 'react';
import { Typography } from '../../atoms';
import { useGrooming, useSocket } from 'contexts';
import { Participant } from '../../interfaces';
import { ProfileCircle } from '../../molecules';
import translate from 'translations';
import { MetricsFilter } from '../metricsFilter';
import { METRIC_POINT_BG_COLORS, METRIC_POINT_COLOR_TYPES, METRIC_POINT_TEXT_COLORS } from './constants';

export const ParticipantsContainer = () => {
  const { participants, setParticipants, groomingData, isGameStarted, taskResult, currentTaskNumber } = useGrooming();
  const [metric, setMetric] = useState(groomingData.metrics[0].name);
  const socket = useSocket();

  useEffect(() => {
    socket.on('userJoined', ({ joinedUser, allUsers }: { joinedUser: Participant; allUsers: Participant[] }) => {
      setParticipants(allUsers);
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

  if (!participants) {
    return null;
  }

  const metricPointColorHandler = (participantPoint: number, pointColorType: METRIC_POINT_COLOR_TYPES) => {
    switch (pointColorType) {
      case METRIC_POINT_COLOR_TYPES.BG:
        return METRIC_POINT_BG_COLORS[participantPoint as keyof typeof METRIC_POINT_BG_COLORS]
      case METRIC_POINT_COLOR_TYPES.TEXT:
        return METRIC_POINT_TEXT_COLORS[participantPoint as keyof typeof METRIC_POINT_TEXT_COLORS]
    }
  }
  
  return (
    <>
      <Typography element="h5" color="black" size="md" weight="semibold">
        {translate('PARTICIPANTS')}
      </Typography>
      <MetricsFilter metrics={groomingData.metrics} onChange={setMetric} selected={metric} visible={isGameStarted} />
      <ul className="flex flex-col gap-y-3">
        {participants?.map((participant: Participant) => (
          <li key={participant.id} className="flex justify-between items-center">
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
            {!!participant.formData[metric] && isGameStarted && taskResult.currentTaskNumber === currentTaskNumber && (
              <div
                className={`${metricPointColorHandler(participant.formData[metric], METRIC_POINT_COLOR_TYPES.BG)} ${Number(participant.formData[metric]) !== 3 ? "bg-opacity-20" : ""} rounded-full h-7 w-7 flex items-center justify-center`}
              >
                <Typography element="span" className={metricPointColorHandler(participant.formData[metric], METRIC_POINT_COLOR_TYPES.TEXT)} size="xs" weight="bold">
                  {participant.formData[metric]}
                </Typography>
              </div>
            )}
            {!!participant.formData[metric] && isGameStarted && taskResult.currentTaskNumber !== currentTaskNumber && (
              <div className="text-gray">voted</div>
            )}
            {!participant.formData[metric] && isGameStarted && <div className="text-gray">waiting..</div>}
          </li>
        ))}
      </ul>
    </>
  );
};
