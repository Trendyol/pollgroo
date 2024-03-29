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
  GroomingInfoBox,
  ConnectionPopup
} from '../../organisms';
import { Loader, Popup } from '../../molecules';
import { SelectGroomingTasks } from '../../organisms/selectGroomingTasks';
import { ExtendedSession, Participant } from '../../interfaces';
import { useSession } from 'next-auth/react';
import { Button, Typography } from '../../atoms';
import { useRouter } from 'next/router';
import translate from 'translations';
import { IconCheck, IconChevronLeft, IconCopy, IconEye, IconEyeOff, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import classNames from 'classnames';
export interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

export const GroomingPage = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const [showNextTaskErrorPopup, setShowNextTaskErrorPopup] = useState(false);
  const [showSettingsActionBox, setShowSettingsActionBox] = React.useState(false);
  const [isInviteLinkCopied, setIsInviteLinkCopied] = useState(false);
  const [resetScrumPokerForm, setResetScrumPokerForm] = useState(0);
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
    removeGroomingTask,
    setViewOnlyMode,
    viewOnlyMode
  } = useGrooming();
  const { showLoader, setShowLoader } = useApp();
  const socket = useSocket();
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;
  const isLastQuestion = tasks?.length - 1 === currentTaskNumber;
  const currentTask = tasks && tasks[currentTaskNumber];

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

  const handleResetEstimates = useCallback(
    (data: any) => {
      localStorage.removeItem('taskResult');
      localStorage.removeItem('userVote');
      setTaskResult({});
      setParticipants(data);
      setIsEditMetricPointClicked(false);
      setResetScrumPokerForm((prev: number) => prev + 1);
    },
    [setParticipants, setTaskResult, setIsEditMetricPointClicked, setResetScrumPokerForm]
  );

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
    socket?.on('resetEstimates', handleResetEstimates);

    const userVote = localStorage.getItem('userVote');
    if (userVote) {
      const parsedUserVote = JSON.parse(userVote);
      if (parsedUserVote.taskId === currentTask?.detail._id) {
        if(!parsedUserVote.taskId){
          return;
        }
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
      socket?.off('resetEstimates', handleResetEstimates);
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
    handleResetEstimates,
  ]);

  useEffect(() => {
    const storedTaskResult = localStorage.getItem('taskResult');
    if (storedTaskResult) {
      const parsedTaskResult = JSON.parse(storedTaskResult);
      if (parsedTaskResult.taskId === currentTask?.detail._id) {
        setTaskResult(JSON.parse(storedTaskResult));
      }
      if(!parsedTaskResult.taskId){
        setTaskResult({});
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
  };

  const handleBackToTaskResultClick = () => {
    setIsEditMetricPointClicked(false);
  };

  const handleSettingsClick = () => {
    setShowSettingsActionBox(!showSettingsActionBox);
  };

  const getInviteLink = () => {
    let currentUrl: string = '';
    if (typeof window !== 'undefined') {
      currentUrl = window.location.href;
    }
    return currentUrl;
  }

  const handleCopyInviteLinkClick = () => {
    navigator.clipboard
      .writeText(getInviteLink())
      .then(() => {
        setIsInviteLinkCopied(true);
      })
      .catch((error) => {
        console.error('Unable to copy text: ', error);
      });
  };

  const handleDeleteGame = async () => {
    setShowSettingsActionBox(false);
    setShowLoader(true);
    try {
      const result = await axios.delete(`/api/games/${groomingData._id}`);
      if (result.data.isSuccess) {
        router.push('/games');
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };

  const handleViewMode = (event: any) => {
    event.stopPropagation();
    setViewOnlyMode(!viewOnlyMode);
  };

  if (groomingData.isFinished) {
    return null;
  }

  return (
    <NavigationLayout logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} subNavigationText={groomingData.title}>
      <div className="py-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <GroomingInfoBox />
        {isEditMetricPointClicked && (
          <Button variant="blackText" onClick={handleBackToTaskResultClick} className="text-left">
            <div className="flex gap-x-2">
              <IconChevronLeft />
              <span>{translate('BACK_TO_TASK_RESULT')}</span>
            </div>
          </Button>
        )}
        {!groomingData.isScrumPoker && isGameStarted && groomingData.isGameMaster && !isLastQuestion && (
          <div className="ml-auto flex gap-x-3 w-full">
            <Button onClick={handleSkip} variant="secondary" className="py-2 px-5" fluid>
              {translate('SKIP')}
            </Button>
            <Button onClick={changeTask} variant="primary" className="py-2 px-5" fluid>
              {translate('NEXT')}
            </Button>
          </div>
        )}
        {!groomingData.isScrumPoker && isGameStarted && groomingData.isGameMaster && isLastQuestion && (
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
        <GroomingForm userId={extendedSession?.user.id} resetScrumPokerForm={resetScrumPokerForm} />
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
      <StickyGroomingBottomBox visible={groomingData.isGameMaster} handleSettingsClick={handleSettingsClick} />
      <Loader active={showLoader} />
      <Popup show={showSettingsActionBox} onClose={handleSettingsClick} title="Settings">
        <ul className="mt-5">
          <li
            className="flex items-center gap-x-2 py-2 cursor-pointer hover:bg-extralightgray border-b border-lightgray"
            onClick={handleCopyInviteLinkClick}
          >
            {isInviteLinkCopied ? (
              <IconCheck className=" text-xs w-4 h-4 text-green" />
            ) : (
              <IconCopy className=" text-xs w-4 h-4 text-silver" />
            )}
            <Typography element="p" size="xxs" color="silver" className="break-all">
              {getInviteLink()}
            </Typography>
          </li>
          <li className="flex items-center gap-x-2 py-2 cursor-pointer hover:bg-extralightgray border-b border-lightgray">
            <button
              className={classNames('flex items-center gap-x-2 w-full', {
                'border-lightgray': !viewOnlyMode,
                'hover:bg-extralightgray': !viewOnlyMode,
                'text-green': viewOnlyMode,
                'text-silver': !viewOnlyMode,
              })}
              onClick={handleViewMode}
            >
              {!viewOnlyMode ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
              <Typography element="p" size="xxs" className="sm: hidden lg:block">
                {!viewOnlyMode ? translate('VIEW_ONLY_MODE') : translate('VOTER_MODE')}
              </Typography>
            </button>
          </li>
          <li
            className="flex items-center gap-x-2 py-2 cursor-pointer hover:bg-extralightgray"
            onClick={handleDeleteGame}
          >
            <IconTrash className="text-red text-xs w-4 h-4" />
            <Typography element="p" size="xxs" color="silver">
              {translate('DELETE_GAME')}
            </Typography>
          </li>
        </ul>
      </Popup>
      <ConnectionPopup />
    </NavigationLayout>
  );
};
