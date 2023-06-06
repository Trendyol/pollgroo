import React, { useEffect, useState } from 'react';
import { useGrooming, useSocket } from 'contexts';
import { GroomingTaskCard, LabeledScoringButtons } from '../../organisms';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApp } from 'contexts';
import { Button } from '../../atoms';
import { isDeepEqual } from 'helpers';

export const GroomingForm = ({ userId }: { userId?: string }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setToasterContent } = useApp();
  const { groomingData, setParticipants, isGameStarted, currentTaskNumber, setCurrentTaskNumber, taskResult, tasks } =
    useGrooming();
  const { metrics } = groomingData;
  const currentTask = tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  const validationSchema = yup.object().shape({
    ...metrics.reduce((fields: { [key: string]: yup.StringSchema }, metric) => {
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
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const lastScores = watch();

  useEffect(() => {
    socket.on('changeTask', (data) => {
      setCurrentTaskNumber(data.taskNumber);
      localStorage.removeItem('userVote');
      reset();
      setParticipants(data.allUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, reset, setParticipants, setCurrentTaskNumber]);

  const onSubmit = (data: any) => {
    console.log(data);
    socket.emit('userVote', { groomingId: groomingData._id, formData: data, userId });
    localStorage.setItem('userVote', JSON.stringify(getValues()));
    setToasterContent({
      show: true,
      variant: "success",
      text: "Voted successfully!"
    })
  };

  const getUserVoteFromLocalStorage = () => {
    const userVote = localStorage.getItem('userVote');
    if (userVote) {
      return JSON.parse(userVote);
    }
    return null;
  };

  useEffect(() => {
    const userVoteFromLocalStorage = getUserVoteFromLocalStorage();

    if ((!!userVoteFromLocalStorage && isDeepEqual(lastScores, userVoteFromLocalStorage)) || (Object.values(lastScores).some(score => score === undefined) && !userVoteFromLocalStorage)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [lastScores, getUserVoteFromLocalStorage]);

  if (!isGameStarted || taskResult.currentTaskNumber === currentTaskNumber) {
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
        disableEdit
      />
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
                scores={metric.points}
                error={!!errors[metric.name]}
                errorMessage={errors[metric.name]?.message?.toString()}
                getValues={getValues}
                setValue={setValue}
                triggerValidation={trigger}
              />
            )}
          />
        ))}
        <Button type="submit" variant="primary" className="h-10" disabled={isButtonDisabled} fluid>
          Save
        </Button>
      </form>
    </>
  );
};
