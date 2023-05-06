import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTeams } from 'contexts';

interface FormValues {
  teamTitle: string;
}

type InputName = 'teamTitle';

export const CreateTeamForm = () => {
  const { postCreateTeamData, getTeams, setShowCreateTeamModal } = useTeams();
  const schema = yup.object().shape({
    teamTitle: yup.string().required(),
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
    setShowCreateTeamModal(false);
    await postCreateTeamData(data.teamTitle);
    await getTeams();
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
        {renderInput('teamTitle', 'Team Title', 'text')}
      </>
    );
  };

  return (
    <form
      id="createTeamForm"
      className="flex flex-col h-full items-center gap-y-4 pt-4 px-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      {renderFormElements()}
      <Button className="h-11 text-white font-bold" type="submit" fluid>
        {translate('CREATE')}
      </Button>
    </form>
  );
};
