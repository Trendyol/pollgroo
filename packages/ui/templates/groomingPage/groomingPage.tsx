import React, { useEffect } from 'react';
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
  TaskResultForm,
} from '../../organisms';
import { Loader } from '../../molecules';
import { SelectGroomingTasks } from '../../organisms/selectGroomingTasks';
import { ExtendedSession, Participant } from '../../interfaces';
import { useSession } from 'next-auth/react';
import { Button } from '../../atoms';

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const {
    groomingData,
    setParticipants,
    isGameStarted,
    setIsGameStarted,
    currentTaskNumber,
    setTaskResult,
    changeCurrentTaskNumber,
  } = useGrooming();
  const { showLoader } = useApp();
  const socket = useSocket();
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;
  const isLastQuestion = groomingData.tasks.length - 1 === currentTaskNumber;

  useEffect(() => {
    if (!extendedSession || !extendedSession.user) {
      return;
    }

    socket.connect();

    socket.emit('joinRoom', groomingData._id, extendedSession.user);

    socket.on('userVote', (data: Participant) => {
      setParticipants(data);
    });

    socket.on('startGame', (data: boolean) => {
      setIsGameStarted(data);
    });

    const userVote = localStorage.getItem('userVote');

    if (userVote) {
      socket.emit('userVote', {
        groomingId: groomingData._id,
        formData: JSON.parse(userVote),
        userId: extendedSession.user.id,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [groomingData._id, socket, extendedSession, setParticipants, setIsGameStarted]);

  useEffect(() => {
    const storedTaskResult = localStorage.getItem('taskResult');
    if (storedTaskResult) {
      setTaskResult(JSON.parse(storedTaskResult));
    }
  }, [setTaskResult]);

  const changeTask = () => {
    if (!isLastQuestion) {
      socket.emit('changeTask', { groomingId: groomingData._id, taskNumber: currentTaskNumber + 1 });
      const handleTaskChange = async () => {
        const newNumber = currentTaskNumber + 1;
        await changeCurrentTaskNumber(newNumber);
      }
      handleTaskChange();
    }
  };

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="py-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        {isGameStarted && groomingData.isGameMaster && !isLastQuestion && (
          <Button onClick={changeTask} variant="text" className="text-right">
            Next
          </Button>
        )}
        {isGameStarted && groomingData.isGameMaster && isLastQuestion && (
          <Button onClick={changeTask} variant="text" className="text-right">
            Finish Game
          </Button>
        )}
        <SelectGroomingTasks />
        <GroomingWaitingInfo />
        <GroomingTasks />
        <GroomingForm userId={extendedSession?.user.id} />
        <TaskResultForm />
        <ParticipantsContainer />
      </div>
      <AddTaskToGroomingModal />
      <EditGroomingTaskModal />
      <StickyGroomingBottomBox visible={groomingData.isGameMaster} />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
