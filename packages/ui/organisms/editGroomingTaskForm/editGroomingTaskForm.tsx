import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { useForm, Controller, get } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp, useGrooming } from 'contexts';

interface FormValues {
  taskTitle: string;
  taskDescription: string;
}

type InputName = 'taskTitle' | 'taskDescription';

export const EditGroomingTaskForm = () => {
  const { editGroomingTask, setShowEditGroomingTaskModal, selectedTaskToEdit, getGroomingTasks, removeGroomingTask, getGroomingTeamTasks } =
    useGrooming();
  const { setShowLoader } = useApp();

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
    setShowEditGroomingTaskModal(false);
    setShowLoader(true);
    await editGroomingTask(data.taskTitle, data.taskDescription);
    await getGroomingTasks();
    await getGroomingTeamTasks();
    setShowLoader(false);
  };

  const handleRemove = async () => {
    setShowEditGroomingTaskModal(false);
    setShowLoader(true);
    await removeGroomingTask();
    await getGroomingTasks();
    await getGroomingTeamTasks();
    setShowLoader(false);
  };

  const handleBlur = (fieldName: InputName) => {
    trigger(fieldName);
  };

  const handleFocus = (fieldName: InputName) => {
    clearErrors(fieldName);
  };

  const renderInput = (name: InputName, label: string, type: string, defaultValue: string) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
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
        {renderInput('taskTitle', 'Task Title', 'text', selectedTaskToEdit.title)}
        {renderInput('taskDescription', 'Task Description', 'text', selectedTaskToEdit.description)}
      </>
    );
  };

  return (
    <form
      id="editGroomingForm"
      className="flex flex-col h-full items-center gap-y-7 pt-4 px-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      {renderFormElements()}
      <Button className="h-11 text-white font-bold" type="submit" fluid>
        {translate('SAVE')}
      </Button>
      <Button onClick={handleRemove} className="h-11 font-bold" variant="danger" fluid>
        {translate('REMOVE')}
      </Button>
    </form>
  );
};
