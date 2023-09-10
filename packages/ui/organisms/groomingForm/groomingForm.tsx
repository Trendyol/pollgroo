import React, { useEffect, useState } from 'react';
import { useGrooming, useSocket, useApp } from 'contexts';
import { GroomingTaskCard, LabeledScoringButtons } from '../../organisms';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { isDeepEqual, isObjectEmpty } from 'helpers';
import translate from 'translations';

export const GroomingForm = ({ userId }: { userId?: string }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setToasterContent } = useApp();
  const {
    groomingData,
    setParticipants,
    isGameStarted,
    currentTaskNumber,
    setCurrentTaskNumber,
    taskResult,
    tasks,
    isEditMetricPointClicked,
    setIsEditMetricPointClicked,
    viewOnlyMode
  } = useGrooming();
  const { metrics } = groomingData;
  const currentTask = tasks && tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  const validationSchema = yup.object().shape({
    ...metrics?.reduce((fields: { [key: string]: yup.StringSchema }, metric) => {
      fields[metric.name] = yup.string().required(`${metric.title} is required`);
      return fields;
    }, {}),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const lastScores = watch();

  useEffect(() => {
    socket?.on('changeTask', (data) => {
      setCurrentTaskNumber(data.taskNumber);
      localStorage.removeItem('userVote');
      reset();
      setParticipants(data.allUsers);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setIsEditMetricPointClicked(false);
    });
  }, [socket, reset, setParticipants, setCurrentTaskNumber, setIsEditMetricPointClicked]);

  const onSubmit = (data: any) => {
    socket?.emit('userVote', { groomingId: groomingData._id, formData: data, userId });
    localStorage.setItem('userVote', JSON.stringify({ votes: getValues(), taskId: currentTask?._id, gameId: groomingData._id }));
    setToasterContent({
      show: true,
      variant: 'success',
      text: 'Voted successfully!',
    });
    if (isEditMetricPointClicked) {
      socket?.emit('calculateTaskResult', {
        groomingId: groomingData._id,
        metrics: groomingData.metrics,
        currentTaskNumber,
        taskId: currentTask?._id,
      });
    }
  };

  const getUserVoteFromLocalStorage = () => {
    const userVote = localStorage.getItem('userVote');
    if (userVote) {
      const parsedUserVote = JSON.parse(userVote);
      if (parsedUserVote.taskId === currentTask?._id) {
        return parsedUserVote.votes;
      }
    }
    return null;
  };

  useEffect(() => {
    const userVoteFromLocalStorage = getUserVoteFromLocalStorage();
    if (
      (!!userVoteFromLocalStorage && isDeepEqual(lastScores, userVoteFromLocalStorage)) ||
      (Object.values(lastScores).some((score) => score === undefined) && !userVoteFromLocalStorage ||
        isObjectEmpty(lastScores))
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [lastScores, getUserVoteFromLocalStorage]);

  if (!isGameStarted || taskResult.currentTaskNumber === currentTaskNumber) {
    if (!groomingData.isScrumPoker && !isEditMetricPointClicked || taskResult.averages && !isEditMetricPointClicked) {
      return null;
    }
  }

  if (groomingData.isScrumPoker && taskResult.averages && !isEditMetricPointClicked || viewOnlyMode) {
    return null;
  }

  return (
    <>
      <GroomingTaskCard
        key={currentTask?._id}
        title={currentTask?.title}
        description={currentTask?.description}
        taskId={currentTask?._id}
        gameId={currentTask?.gameId}
        order={currentTaskNumber + 1}
        totalTaskNumber={tasks.length}
        className='w-1/2 mx-auto'
        disableEdit
      />
      {!viewOnlyMode && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
          {metrics.map((metric) => (
            <Controller
              key={metric._id}
              name={metric.name}
              control={control}
              render={() => (
                <LabeledScoringButtons
                  label={metric.title}
                  name={metric.name}
                  description={metric.description}
                  scores={metric.points}
                  error={!!errors[metric.name]}
                  errorMessage={errors[metric.name]?.message?.toString()}
                  getValues={getValues}
                  setValue={setValue}
                  triggerValidation={trigger}
                  currentTaskId={currentTask?._id}
                  groomingId={groomingData._id}
                />
              )}
            />
          ))}
          <div className="flex items-center gap-x-3">
            <Button type="submit" variant="primary" className="h-10 w-96 mx-auto" disabled={isButtonDisabled}>
              {translate('VOTE')}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
