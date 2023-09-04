import React, { useCallback, useEffect, useState } from 'react';
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
import { IconChevronLeft } from '@tabler/icons-react';

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
    setIsEditMetricPointClicked,
    isEditMetricPointClicked,
    removeGroomingTask
  } = useGrooming();
  const { showLoader } = useApp();
  const socket = useSocket();
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;
  const isLastQuestion = tasks.length - 1 === currentTaskNumber;
  const currentTask = tasks[currentTaskNumber];

  const handleUserVote = useCallback(
    (data: Participant) => {
      setParticipants(data);
    },
    [setParticipants]
  );

  const handleStartGame = useCallback(
    (data: boolean) => {
      setIsGameStarted(data);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [setIsGameStarted]
  );

  const handleCalculateTaskResult = useCallback(
    (data: any) => {
      if (!isEditMetricPointClicked && data.taskId !== taskResult.taskId) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data));
    },
    [setTaskResult, isEditMetricPointClicked, taskResult.taskId]
  );

  const handleUpdateTaskResult = useCallback(
    (data: any) => {
      setTaskResult(data);
      localStorage.setItem('taskResult', JSON.stringify(data));
    },
    [setTaskResult]
  );

  const handleTaskSelection = useCallback(
    (data: any) => {
      setTasks(data);
    },
    [setTasks]
  );

  const handleFinishGroomingRedirection = useCallback(() => {
    router.push(`/grooming/${groomingData._id}/result`);
  }, [router, groomingData._id]);

  useEffect(() => {
    if (groomingData.isFinished) {
      router.push(`/grooming/${groomingData._id}/result`);
      return;
    }

    socket?.on('userVote', handleUserVote);
    socket?.on('startGame', handleStartGame);
    socket?.on('calculateTaskResult', handleCalculateTaskResult);
    socket?.on('updateTaskResult', handleUpdateTaskResult);
    socket?.on('taskSelection', handleTaskSelection);
    socket?.on('finishGrooming', handleFinishGroomingRedirection);

    const userVote = localStorage.getItem('userVote');
    if (userVote) {
      const parsedUserVote = JSON.parse(userVote);
      if (parsedUserVote.taskId === currentTask?.detail._id) {
        socket?.emit('userVote', {
          groomingId: groomingData._id,
          formData: JSON.parse(userVote).votes,
          userId: extendedSession.user.id,
        });
      }
    }

    return () => {
      socket?.off('userVote', handleUserVote);
      socket?.off('startGame', handleStartGame);
      socket?.off('calculateTaskResult', handleCalculateTaskResult);
      socket?.off('updateTaskResult', handleUpdateTaskResult);
      socket?.off('taskSelection', handleTaskSelection);
      socket?.off('finishGrooming', handleFinishGroomingRedirection);
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
    handleUserVote,
    handleStartGame,
    handleCalculateTaskResult,
    handleUpdateTaskResult,
    handleTaskSelection,
    handleFinishGroomingRedirection,
    currentTask?.detail._id,
  ]);

  useEffect(() => {
    const storedTaskResult = localStorage.getItem('taskResult');
    if (storedTaskResult) {
      const parsedTaskResult = JSON.parse(storedTaskResult);
      if (parsedTaskResult.taskId === currentTask?.detail._id) {
        setTaskResult(JSON.parse(storedTaskResult));
      }
    }
  }, [setTaskResult, currentTask?.detail._id]);

  const changeTask = (showPopup?: boolean) => {
    if (taskResult.currentTaskNumber !== currentTaskNumber && showPopup) {
      setShowNextTaskErrorPopup(true);
      return;
    }
    socket?.emit('changeTask', { groomingId: groomingData._id, taskNumber: currentTaskNumber + 1 });
    const handleTaskChange = async () => {
      const newNumber = currentTaskNumber + 1;
      await changeCurrentTaskNumber(newNumber);
    };
    handleTaskChange();
  };

  const handleSkip = () => {
    setShowNextTaskErrorPopup(true);
  };

  const handleFinishGrooming = () => {
    finishGrooming().then(() => {
      router.push(`/grooming/${groomingData._id}/result`);
      socket?.emit('finishGrooming', groomingData._id);
    });
  };

  const handleSkipAndFinishGrooming = async () => {
    await removeGroomingTask(currentTask?.detail._id);
    finishGrooming().then(() => {
      router.push(`/grooming/${groomingData._id}/result`);
      socket?.emit('finishGrooming', groomingData._id);
    });
  }

  const handleBackToTaskResultClick = () => {
    setIsEditMetricPointClicked(false);
  };

  if (groomingData.isFinished) {
    return null;
  }

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="py-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        {isEditMetricPointClicked && (
          <Button variant="blackText" onClick={handleBackToTaskResultClick} className="text-left">
            <div className="flex gap-x-2">
              <IconChevronLeft />
              <span>{translate('BACK_TO_TASK_RESULT')}</span>
            </div>
          </Button>
        )}
        {isGameStarted && groomingData.isGameMaster && !isLastQuestion && (
          <div className="ml-auto flex gap-x-3 w-full">
            <Button onClick={handleSkip} variant="secondary" className="py-2 px-5" fluid>
              {translate('SKIP')}
            </Button>
            <Button onClick={changeTask} variant="primary" className="py-2 px-5" fluid>
              {translate('NEXT')}
            </Button>
          </div>
        )}
        {isGameStarted && groomingData.isGameMaster && isLastQuestion && (
          <div className="ml-auto flex gap-x-3 w-full">
            <Button onClick={handleSkipAndFinishGrooming} variant="secondary" className="py-2 px-5" fluid>
              {translate('SKIP_AND_FINISH_GAME')}
            </Button>
            <Button onClick={handleFinishGrooming} variant="primary" className="py-2 px-5" fluid>
              {translate('FINISH_GAME')}
            </Button>
          </div>
        )}
        <SelectGroomingTasks />
        <GroomingWaitingInfo />
        <GroomingTasks />
        <GroomingForm userId={extendedSession?.user.id} />
        <TaskResultForm />
        <ParticipantsContainer userId={extendedSession?.user.id} />
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
