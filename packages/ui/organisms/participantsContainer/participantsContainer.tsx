import React, { useEffect, useState } from 'react';
import { Typography } from '../../atoms';
import { useApp, useGrooming, useSocket } from 'contexts';
import { Participant } from '../../interfaces';
import { ProfileCircle, Loader } from '../../molecules';
import translate from 'translations';
import { MetricsFilter } from '../metricsFilter';
import { METRIC_POINT_BG_COLORS, METRIC_POINT_COLOR_TYPES, METRIC_POINT_TEXT_COLORS } from './constants';
import { IconCoffee } from '@tabler/icons-react';

export const ParticipantsContainer = () => {
  const { participants, setParticipants, groomingData, isGameStarted, taskResult, currentTaskNumber } = useGrooming();
  const { showLoader, setShowLoader } = useApp();
  const [metric, setMetric] = useState(groomingData.metrics[0].name);
  const socket = useSocket();

  useEffect(() => {
    socket?.on('userJoined', ({ joinedUser, allUsers }: { joinedUser: Participant; allUsers: Participant[] }) => {
      console.log(allUsers);
      setParticipants(allUsers);
    });

    socket?.on(
      'disconnectedUser',
      ({ disconnectedUser, allUsers }: { disconnectedUser: Participant; allUsers: Participant[] }) => {
        setParticipants(allUsers);
      }
    );
  }, [socket, setParticipants]);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 350);
    return () => {
      clearTimeout(timer);
    };
  }, [metric, setShowLoader]);

  if (!participants) {
    return null;
  }

  const metricPointColorHandler = (participantPoint: number, pointColorType: METRIC_POINT_COLOR_TYPES) => {
    switch (pointColorType) {
      case METRIC_POINT_COLOR_TYPES.BG:
        return METRIC_POINT_BG_COLORS[participantPoint as keyof typeof METRIC_POINT_BG_COLORS];
      case METRIC_POINT_COLOR_TYPES.TEXT:
        return METRIC_POINT_TEXT_COLORS[participantPoint as keyof typeof METRIC_POINT_TEXT_COLORS];
    }
  };

  return (
    <>
      <Typography element="h5" color="black" size="md" weight="semibold">
        {translate('PARTICIPANTS')}
      </Typography>
      <Loader active={showLoader} />
      <MetricsFilter
        metrics={groomingData.metrics}
        onChange={setMetric}
        selected={metric}
        visible={isGameStarted && currentTaskNumber === taskResult.currentTaskNumber}
      />
      <ul className="flex flex-col">
        {participants?.map((participant: Participant) => (
          <li
            key={participant.id}
            className="flex justify-between items-center border-b-2 border-bordergray last:border-b-0 py-2"
          >
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
                className={`${metricPointColorHandler(participant.formData[metric], METRIC_POINT_COLOR_TYPES.BG)} ${
                  Number(participant.formData[metric]) !== 3 ? 'bg-opacity-20' : ''
                } rounded-full h-7 w-7 flex items-center justify-center`}
              >
                <Typography
                  element="span"
                  className={metricPointColorHandler(participant.formData[metric], METRIC_POINT_COLOR_TYPES.TEXT)}
                  size="xs"
                  weight="bold"
                >
                  {participant.formData[metric]}
                </Typography>
              </div>
            )}
            {!!participant.formData[metric] && isGameStarted && taskResult.currentTaskNumber !== currentTaskNumber && (
              <div className="text-gray">voted</div>
            )}
            {!participant.formData[metric] && isGameStarted && taskResult.currentTaskNumber !== currentTaskNumber && (
              <div className="text-gray">waiting..</div>
            )}
            {!participant.formData[metric] && isGameStarted && taskResult.currentTaskNumber === currentTaskNumber && (
              <div className="text-gray">
                <IconCoffee />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
