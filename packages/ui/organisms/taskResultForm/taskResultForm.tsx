import React, { useEffect } from 'react';
import { useGrooming, useSocket } from 'contexts';
import { GroomingTaskCard } from '../groomingTaskCard';
import { Button, Input, Typography } from '../../atoms';
import { IconReportAnalytics } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  [key: string]: number;
}

export const TaskResultForm = () => {
  const {
    getCurrentTaskNumber,
    tasks,
    currentTaskNumber,
    isGameStarted,
    taskResult,
    groomingData,
    updateGroomingTaskScore,
    isEditMetricPointClicked,
  } = useGrooming();
  const currentTask = tasks && tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  const validationSchema = yup.object().shape({
    ...groomingData.metrics?.reduce((fields: { [key: string]: yup.NumberSchema }, metric) => {
      fields[metric.name] = yup
        .number()
        .min(0, 'Minimum value you can enter is 0')
        .max(
          metric.name === 'storyPoint' ? 8 : 5,
          `Maximum value you can enter is ${metric.name === 'storyPoint' ? 8 : 5}`
        )
        .transform((value, originalValue) => {
          if (typeof originalValue === 'string') {
            const convertedValue = originalValue.replace(',', '.');
            return parseFloat(convertedValue);
          }
          return value;
        })
        .typeError(`${metric.title} must be a number`)
        .required(`This field is required`);
      return fields;
    }, {}),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchCurrentTaskNumber = async () => {
      await getCurrentTaskNumber();
    };
    fetchCurrentTaskNumber();
  }, [getCurrentTaskNumber]);

  useEffect(() => {
    if (isGameStarted && groomingData.isGameMaster && taskResult.currentTaskNumber === currentTaskNumber) {
      updateGroomingTaskScore(taskResult.score, taskResult.averages?.storyPoint);
    }
  }, [
    updateGroomingTaskScore,
    groomingData.isGameMaster,
    currentTaskNumber,
    isGameStarted,
    taskResult.currentTaskNumber,
    taskResult.score,
    taskResult.averages?.storyPoint,
  ]);

  const submitHandler = (data: FormData) => {
    socket?.emit('updateTaskResult', {
      taskResult: {
        ...taskResult,
        averages: data,
      },
      groomingId: groomingData._id,
      metrics: groomingData.metrics,
    });
  };

  useEffect(() => {
    if (taskResult.averages) {
      Object.keys(taskResult.averages).forEach((key) => {
        setValue(key, taskResult.averages[key]);
      });
    }
  }, [taskResult.averages, setValue]);

  if (!isGameStarted || taskResult.currentTaskNumber !== currentTaskNumber) {
    if (!groomingData.isScrumPoker || !taskResult.averages) {
      return null;
    }
  }

  if (isEditMetricPointClicked) {
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
      <div className="flex flex-col gap-y-5 items-center justify-center">
        <div className="bg-backgroundprimary rounded-full w-14 h-14 flex items-center justify-center">
          <IconReportAnalytics className="text-primary w-8 h-8 lg:w-10 lg:h-10" />
        </div>
        <Typography element="h5" color="black" size="md" weight="semibold">
          Results
        </Typography>
        {!!Number(taskResult.score) && (
          <Typography element="p" color="gray" size="xs" weight="regular">
            Score is
            <Typography element="span" weight="bold" className="ml-1">
              {taskResult.score}
            </Typography>
          </Typography>
        )}
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <ul>
          {groomingData.metrics.map((metric) => (
            <li key={metric._id} className="flex justify-between items-center lg:flex-col lg:gap-y-2 lg:w-1/2 lg:mx-auto mb-6">
              <Typography element="label" color="primary" weight="bold" size="xxs">
                {metric.title}
              </Typography>
              <Controller
                name={metric.name}
                control={control}
                defaultValue={taskResult?.averages ? taskResult?.averages[metric.name] : 'Error while fetching metrics'}
                render={({ field }) => (
                  <Input
                    name={metric.name}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors[metric.name]?.message}
                    errorMessage={errors[metric.name]?.message?.toString()}
                    disabled={!groomingData.isGameMaster}
                    fluid
                  />
                )}
              />
            </li>
          ))}
        </ul>
        {groomingData.isGameMaster && (
          <div className="w-full flex gap-x-3">
            {!groomingData.isScrumPoker && (
              <Button variant="primary" className="p-2 mt-1" type="submit" fluid>
                Apply
              </Button>
            )}
          </div>
        )}
      </form>
    </>
  );
};
