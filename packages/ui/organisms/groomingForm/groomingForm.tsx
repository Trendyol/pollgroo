import React from 'react';
import { useGrooming } from 'contexts';
import { GroomingTaskCard, LabeledScoringButtons } from '../../organisms';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const GroomingForm = () => {
  const { groomingData } = useGrooming();
  const { metrics } = groomingData;

  const validationSchema = yup.object().shape({
    ...metrics.reduce((fields: { [key: string]: yup.StringSchema }, metric) => {
      fields[metric.name] = yup.string().required(`${metric.name} is required`);
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <GroomingTaskCard
        key={groomingData.tasks[0].detail?._id}
        title={groomingData.tasks[0].detail?.title}
        description={groomingData.tasks[0].detail?.description}
        taskId={groomingData.tasks[0].detail?._id}
        gameId={groomingData.tasks[0].detail?.gameId}
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
                label={metric.name}
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
