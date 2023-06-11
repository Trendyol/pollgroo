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
  TaskResultForm,
  NextTaskErrorPopup,
} from '../../organisms';
import { Loader } from '../../molecules';
import { SelectGroomingTasks } from '../../organisms/selectGroomingTasks';
import { ExtendedSession, Participant } from '../../interfaces';
import { useSession } from 'next-auth/react';
import { Button } from '../../atoms';
import { useRouter } from 'next/router';
import translate from 'translations';

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const [showNextTaskErrorPopup, setShowNextTaskErrorPopup] = useState(false);
  const router = useRouter();
  const {
    groomingData,
    setParticipants,
    isGameStarted,
    setIsGameStarted,
    currentTaskNumber,
    setTaskResult,
    changeCurrentTaskNumber,
    tasks,
    setTasks,
    finishGrooming,
    updateGroomingTaskScore,
    taskResult,
  } = useGrooming();
  const { showLoader } = useApp();
  const socket = useSocket();
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;
  const isLastQuestion = tasks.length - 1 === currentTaskNumber;
  const currentTask = tasks[currentTaskNumber];

  useEffect(() => {
    if (groomingData.isFinished) {
      router.push(`/grooming/${groomingData._id}/result`);
    }
    if (!extendedSession || !extendedSession.user || groomingData.isFinished) {
      return;
    }

    if (!socket.connected) {
      socket.connect();

      socket.emit('joinRoom', groomingData._id, extendedSession.user);
    }

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

    socket.on('calculateTaskResult', (data) => {
      console.log(data);
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data));
    });

    socket.on('updateTaskResult', (data) => {
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data));
    });

    socket.on('taskSelection', (data) => {
      setTasks(data);
    });

    socket.on('finishGrooming', () => {
      router.push(`/grooming/${groomingData._id}/result`);
    });

    return () => {
      socket.disconnect();
    };
  }, [
    groomingData._id,
    groomingData.isGameMaster,
    socket,
    extendedSession,
    setParticipants,
    setIsGameStarted,
    setTaskResult,
    setTasks,
    groomingData.isFinished,
    router,
    updateGroomingTaskScore,
  ]);

  useEffect(() => {
    const storedTaskResult = localStorage.getItem('taskResult');
    if (storedTaskResult) {
      const parsedTaskResult = JSON.parse(storedTaskResult);
      if (parsedTaskResult.taskId === currentTask.detail._id) {
        setTaskResult(JSON.parse(storedTaskResult));
      }
    }
  }, [setTaskResult, currentTask?.detail._id]);

  const changeTask = (showPopup?: boolean) => {
    if (taskResult.currentTaskNumber !== currentTaskNumber && showPopup) {
      setShowNextTaskErrorPopup(true);
      return;
    }
    socket.emit('changeTask', { groomingId: groomingData._id, taskNumber: currentTaskNumber + 1 });
    const handleTaskChange = async () => {
      const newNumber = currentTaskNumber + 1;
      await changeCurrentTaskNumber(newNumber);
    };
    handleTaskChange();
  };

  const handleFinishGrooming = () => {
    finishGrooming().then(() => {
      router.push(`/grooming/${groomingData._id}/result`);
      socket.emit('finishGrooming', groomingData._id);
    });
  };

  if (groomingData.isFinished) {
    return null;
  }

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="py-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        {isGameStarted && groomingData.isGameMaster && !isLastQuestion && (
          <Button onClick={changeTask} variant="text" className="ml-auto">
            {translate('NEXT')}
          </Button>
        )}
        {isGameStarted && groomingData.isGameMaster && isLastQuestion && (
          <Button onClick={handleFinishGrooming} variant="text" className="text-right">
            {translate('FINISH_GAME')}
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
      <NextTaskErrorPopup
        show={showNextTaskErrorPopup}
        onClose={() => setShowNextTaskErrorPopup(false)}
        changeTask={changeTask}
        taskId={currentTask?.detail._id}
      />
      <StickyGroomingBottomBox visible={groomingData.isGameMaster} />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
