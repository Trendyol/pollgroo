import React from 'react';
import translate from 'translations';
import * as yup from 'yup';
import { Button } from '../../atoms';
import { LabeledDropdown, LabeledInput } from '../../molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp, useGame } from 'contexts';
import { TeamData } from '../../interfaces';

interface FormValues {
  gameTitle: string;
  teamDropdown: string;
  gameTypeDropdown: string;
}

type InputName = 'gameTitle' | 'teamDropdown' | 'gameTypeDropdown';

export const CreateGameForm = () => {
  const { setShowCreateGameModal, teamData, getGameCardData, postCreateGameData } = useGame();
  const { setShowLoader } = useApp();

  const schema = yup.object().shape({
    gameTitle: yup.string().required(),
    teamDropdown: yup.string().required(),
    gameTypeDropdown: yup.string().required()
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
    setShowCreateGameModal(false);
    setShowLoader(true);
    const selectedTeamId = teamData.find((team: TeamData) => data.teamDropdown === team.name)?._id;
    const title = data.gameTitle;
    if (selectedTeamId) {
      await postCreateGameData(title, selectedTeamId, data.gameTypeDropdown);
    }
    await getGameCardData();
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

  const renderDropdown = (name: InputName, label: string, options: { id: string; value: string }[], defaultValue: string) => {
    // if needed they can be used in LabeledDropdown
    // onBlur={() => handleBlur(name)} if needed they can be uncomment.
    // onFocus={() => handleFocus(name)}
    // error={!!errors[name]?.message}

    if(!teamData || !teamData[0]) {
      return null;
    }
    
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <LabeledDropdown
            className="w-full"
            label={label}
            name={name}
            options={options}
            value={field.value}
            onChange={field.onChange}
            fluid
          />
        )}
      />
    );
  };

  const renderFormElements = () => {
    const teamOptions = teamData.map((team: TeamData) => {
      return { id: team._id, value: team.name };
    });
    const gameTypeOptions = [
      {id: "1", value: "StoryPoint only"},
      {id: "2", value: "Prioritization Matrice"}
    ]
    return (
      <>
        {renderInput('gameTitle', 'Game Title', 'text')}
        {renderDropdown('teamDropdown', 'Team', teamOptions, teamData[0]?.name)}
        {renderDropdown('gameTypeDropdown', 'Game Type', gameTypeOptions, gameTypeOptions[0].value)}
      </>
    );
  };

  return (
    <form
      id="createGameForm"
      className="flex flex-col h-full items-center gap-y-6 pt-4 px-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      {renderFormElements()}
      <Button className="h-11 text-white font-bold" type="submit" fluid>
        {translate('CREATE')}
      </Button>
    </form>
  );
};
