import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp, useTeam } from 'contexts';

interface FormValues {
  taskTitle: string;
  taskDescription: string;
}

type InputName = 'taskTitle' | 'taskDescription';

export const TeamTaskEditForm = () => {
  const { editTeamTask, setShowEditTeamTaskModal, selectTeamTaskToEdit, getTeamTasks, deleteTeamTask } = useTeam();
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
    setShowEditTeamTaskModal(false);
    setShowLoader(true);
    await editTeamTask(data.taskTitle, data.taskDescription);
    await getTeamTasks(selectTeamTaskToEdit.teamId);
    setShowLoader(false);
  };

  const handleDelete = async () => {
    setShowEditTeamTaskModal(false);
    setShowLoader(true);
    await deleteTeamTask();
    await getTeamTasks(selectTeamTaskToEdit.teamId);
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
        {renderInput('taskTitle', 'Task Title', 'text', selectTeamTaskToEdit.title)}
        {renderInput('taskDescription', 'Task Description', 'text', selectTeamTaskToEdit.description)}
      </>
    );
  };

  return (
    <form
      id="teamTaskEditForm"
      className="flex flex-col h-full items-center gap-y-7 pt-4 px-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      {renderFormElements()}
      <div className="flex flex-col gap-y-3 w-full">
        <Button className="h-11 font-bold" type="submit" fluid>
          {translate('SAVE')}
        </Button>
        <Button onClick={handleDelete} className="h-11 font-bold" variant="danger" fluid>
          {translate('DELETE')}
        </Button>
      </div>
    </form>
  );
};
