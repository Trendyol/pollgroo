import React, { useEffect } from 'react';
import { ScoringButton } from '../../molecules/scoring-button';
import { ScoringButtonVariant } from '../../molecules/scoring-button/enums';
import { Typography } from '../../../ui/atoms/typography';
import { FieldValues, UseFormGetValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';


export interface IProps {
  error?: boolean;
  label: string;
  scores: number[];
  errorMessage?: string;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  triggerValidation?: UseFormTrigger<FieldValues>;
  name: string;
  currentTaskId: string;
}

export const LabeledScoringButtons = ({
  error,
  errorMessage,
  label,
  scores,
  getValues,
  setValue,
  triggerValidation,
  name,
  currentTaskId
}: IProps) => {
  useEffect(() => {
    const storedValue = getUserVoteFromLocalStorage();
    if (storedValue) {
      setValue(name, storedValue);
    }
  }, [name, setValue]);

  const handleClick = (score: number) => {
    setValue(name, score);
    if (error && triggerValidation) {
      triggerValidation();
    }
  };

  const getUserVoteFromLocalStorage = () => {
    const userVote = localStorage.getItem('userVote');
    if (userVote) {
      const parsedUserVote = JSON.parse(userVote);
      if(parsedUserVote.taskId === currentTaskId)
      return parsedUserVote.votes[name];
    }
    return null;
  }

  const renderScoringButtons = () => {
    return scores.map((score) => {
      const buttonIsSelected = getValues()[name] === score;
      let variant = "secondary";

      if (buttonIsSelected) {
        if (getUserVoteFromLocalStorage() === score && !!getUserVoteFromLocalStorage()) {
          variant = "success";
        } else if (getUserVoteFromLocalStorage() !== score || !getUserVoteFromLocalStorage()) {
          variant = "primary";
        }
      }

      return (
        <ScoringButton key={`${name}-scoring-button-${score}`} variant={variant as keyof typeof ScoringButtonVariant} onClick={() => handleClick(score)}>
          {score === 0 ? "?" : score}
        </ScoringButton>
      )
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <Typography element="label" color="silver" size="xs" weight="semibold">
        {label}
      </Typography>
      <div className="flex flex-row gap-2.5">
        {renderScoringButtons()}
      </div>
      {error && (
        <Typography
          className="w-full py-1.5 text-center rounded-lg bg-lightred"
          element="p"
          color="red"
          size="xxs"
          weight="semibold"
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
