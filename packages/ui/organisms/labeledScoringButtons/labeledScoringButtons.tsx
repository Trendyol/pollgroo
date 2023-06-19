import React, { useEffect } from 'react';
import { ScoringButton } from '../../molecules/scoring-button';
import { ScoringButtonVariant } from '../../molecules/scoring-button/enums';
import { Typography } from '../../../ui/atoms/typography';
import { Tooltip } from '../../../ui/atoms/tooltip';
import { FieldValues, UseFormGetValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { IconQuestionMark } from '@tabler/icons-react';


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
  description?: string;
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
  currentTaskId,
  description,
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
      <div className="flex items-center gap-x-2">
        <Typography element="label" color="silver" size="xs" weight="semibold">
          {label}
        </Typography>
        {description && (
          <Tooltip className="max-w-sm w-max" renderContent={description}>
            <span className="w-4 h-4 flex justify-center items-center bg-yellow/50 rounded-full pointer ">
              <IconQuestionMark className="text-white w-3 w-3" />
            </span>
          </Tooltip>
        )}
      </div>
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
