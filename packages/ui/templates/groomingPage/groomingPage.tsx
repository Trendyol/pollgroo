import React, { useEffect } from 'react';
import { NavigationLayout } from '../../layouts';
import { useApp, useGrooming } from 'contexts';
import {
  GroomingTasks,
  GroomingWaitingInfo,
  AddTaskToGroomingModal,
  EditGroomingTaskModal,
  StickyGroomingBottomBox,
} from '../../organisms';
import { Loader } from '../../molecules';
import axios from "axios";
import io from "socket.io-client"

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const { groomingData } = useGrooming();
  const { showLoader } = useApp();

  useEffect(() => {
    const socket = io("https://pollgroo-socket-server.onrender.com");

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('chat message', 'Hello from client');
    });

    socket.on('chat message', (message: string) => {
      console.log('Received message:', message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="pt-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <GroomingWaitingInfo />
        <GroomingTasks />
      </div>
      <AddTaskToGroomingModal />
      <EditGroomingTaskModal />
      <StickyGroomingBottomBox />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
