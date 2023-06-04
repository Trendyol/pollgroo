import React, { useEffect, useState } from 'react';
import { NavigationLayout } from '../../layouts';
import { useApp, useGrooming, useSocket } from 'contexts';
import {
  GroomingTasks,
  GroomingWaitingInfo,
  AddTaskToGroomingModal,
  EditGroomingTaskModal,
  StickyGroomingBottomBox,
  GroomingForm,
  ParticipantsContainer,
} from '../../organisms';
import { Loader } from '../../molecules';
import { SelectGroomingTasks } from '../../organisms/selectGroomingTasks';
import { ExtendedSession, Participant } from '../../interfaces';
import { useSession } from 'next-auth/react';

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const { groomingData, setParticipants } = useGrooming();
  const { showLoader } = useApp();
  const socket = useSocket();
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  useEffect(() => {
    if (!extendedSession || !extendedSession.user) {
      return;
    }

    socket.connect();

    socket.emit('joinRoom', groomingData._id, extendedSession.user);

    socket.on('userVote', (data: Participant) => {
      setParticipants(data);
    });

    const userVote = localStorage.getItem('userVote');

    if (userVote) {
      socket.emit('userVote', { groomingId: groomingData._id, formData: JSON.parse(userVote), userId: extendedSession.user.id });
    }

    return () => {
      socket.disconnect();
    };
  }, [groomingData._id, socket, extendedSession, setParticipants]);

  const changeTask = () => {
    const taskNumber = 1;
    socket.emit('changeTask', { groomingId: groomingData._id, taskNumber });
  };

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="pt-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <button onClick={changeTask}>change</button>
        <SelectGroomingTasks />
        <GroomingWaitingInfo />
        <GroomingTasks />
        <GroomingForm userId={extendedSession?.user.id} />
        <ParticipantsContainer />
      </div>
      <AddTaskToGroomingModal />
      <EditGroomingTaskModal />
      <StickyGroomingBottomBox />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
