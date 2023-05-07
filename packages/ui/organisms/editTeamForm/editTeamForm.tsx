import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTeam } from 'contexts';
import { useRouter } from 'next/router';

interface FormValues {
  teamName: string;
}

type InputName = 'teamName';

export const EditTeamForm = () => {
  const { setShowEditTeamModal, team, getTeam, deleteTeam, editTeam } = useTeam();
  const router = useRouter();

  const schema = yup.object().shape({
    teamName: yup.string().required(),
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
    setShowEditTeamModal(false);
    await editTeam(data.teamName);
    await getTeam();
  };

  const handleDelete = async () => {
    setShowEditTeamModal(false);
    await deleteTeam();
    router.push('/teams');
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
        defaultValue={team.name}
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
        {renderInput('teamName', 'Team Name', 'text')}
      </>
    );
  };

  return (
    <form
      id="editTeamForm"
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
