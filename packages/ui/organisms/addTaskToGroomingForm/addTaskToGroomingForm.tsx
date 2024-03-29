import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp, useGrooming, useSocket } from 'contexts';

interface FormValues {
  taskTitle: string;
  taskDescription: string;
}

type InputName = 'taskTitle' | 'taskDescription';

export const AddTaskToGroomingForm = () => {
  const { groomingData, addTaskToTheGrooming, getGroomingTasks, setShowAddTaskToGameModal } = useGrooming();
  const { setShowLoader } = useApp();
  const gameId = groomingData._id;
  const socket = useSocket();

  const schema = yup.object().shape({
    taskTitle: yup.string().required(),
    taskDescription: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data: FormValues) => {
    setShowLoader(true);
    setShowAddTaskToGameModal(false);
    await addTaskToTheGrooming(data.taskTitle, data.taskDescription, gameId);
    const newTasks = await getGroomingTasks();
    socket?.emit('taskSelection', { groomingId: groomingData._id, tasks: newTasks });
    setShowLoader(false);
  };

  const handleBlur = (fieldName: InputName) => {
    trigger(fieldName);
  };

  const handleFocus = (fieldName: InputName) => {
    clearErrors(fieldName);
  };

  const renderInput = (name: InputName, label: string, type: string) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <LabeledInput
            className="w-full"
            label={label}
            name={name}
            type={type}
            value={field.value}
            onChange={field.onChange}
            onBlur={() => handleBlur(name)}
            onFocus={() => handleFocus(name)}
            error={!!errors[name]?.message}
            errorMessage={errors[name]?.message}
            fluid
          />
        )}
      />
    );
  };

  const renderFormElements = () => {
    return (
      <>
        {renderInput('taskTitle', 'Task Title', 'text')}
        {renderInput('taskDescription', 'Task Description', 'text')}
      </>
    );
  };

  return (
    <form
      id="addTaskToGroomingForm"
      className="flex flex-col h-full items-center gap-y-7 pt-4 px-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      {renderFormElements()}
      <Button className="h-11 text-white font-bold" type="submit" fluid>
        {translate('CREATE')}
      </Button>
    </form>
  );
};
