import React, { useEffect } from 'react';
import { useGrooming, useSocket } from 'contexts';
import { GroomingTaskCard } from '../groomingTaskCard';
import { Button, Input, Typography } from '../../atoms';
import { Metric } from '../../interfaces';
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
  } = useGrooming();
  const currentTask = tasks[currentTaskNumber]?.detail;
  const socket = useSocket();

  const validationSchema = yup.object().shape({
    ...groomingData.metrics.reduce((fields: { [key: string]: yup.NumberSchema }, metric) => {
      fields[metric.name] = yup
        .number()
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
    formState: { errors }
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
      updateGroomingTaskScore(taskResult.score);
    }
  }, [
    updateGroomingTaskScore,
    groomingData.isGameMaster,
    currentTaskNumber,
    isGameStarted,
    taskResult.currentTaskNumber,
    taskResult.score,
  ]);

  const renderMetricTitle = (key: string) => {
    return groomingData.metrics.find((metric: Metric) => metric.name === key)?.title;
  };

  const submitHandler = (data: FormData) => {
    socket.emit('updateTaskResult', {
      taskResult: {
        ...taskResult,
        averages: data,
      },
      groomingId: groomingData._id,
      metrics: groomingData.metrics,
    });
  };

  if (!isGameStarted || taskResult.currentTaskNumber !== currentTaskNumber) {
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
      <div className="flex flex-col gap-y-5 items-center justify-center">
        <div className="bg-backgroundprimary rounded-full w-14 h-14 flex items-center justify-center">
          <IconReportAnalytics className="text-primary w-8 h-8 lg:w-10 lg:h-10" />
        </div>
        <Typography element="h5" color="black" size="md" weight="semibold">
          Results
        </Typography>
        <Typography element="p" color="gray" size="xs" weight="regular">
          Score is
          <Typography element="span" weight="bold" className="ml-1">
            {taskResult.score}
          </Typography>
        </Typography>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <ul>
          {Object.keys(taskResult.averages).map((key: string) => (
            <li key={key} className="flex justify-between lg:grid items-center lg:grid-cols-2 mb-6">
              <Typography element="label" color="primary" weight="bold" size="xxs">
                {renderMetricTitle(key)}
              </Typography>
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <Input
                    name={key}
                    value={taskResult.averages[key]}
                    onChange={field.onChange}
                    error={!!errors[key]?.message}
                    errorMessage={errors[key]?.message?.toString()}
                    disabled={!groomingData.isGameMaster}
                    fluid
                  />
                )}
              />
            </li>
          ))}
        </ul>
        <Button variant="primary" className="p-2 mt-1" type="submit">
          Apply
        </Button>
      </form>
    </>
  );
};
