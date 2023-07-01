import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormGetValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { ScoringButton } from '../../molecules/scoring-button';
import { ScoringButtonVariant } from '../../molecules/scoring-button/enums';
import { Typography } from '../../../ui/atoms/typography';
import { Tooltip } from '../../../ui/atoms/tooltip';
import { Popup } from '../../../ui/molecules/popup';
import { IconAlertSmall } from '@tabler/icons-react';
import { useMobileDetect } from 'hooks';

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
  const [isShowDescriptionPopup, setIsShowDescriptionPopup] = useState(false);
  const { isMobile } = useMobileDetect();
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
      if (parsedUserVote.taskId === currentTaskId)
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

  const renderDescription = () => {
    if (!description) {
      return null;
    }

    const icon = <span className="w-4 h-4 flex justify-center items-center bg-yellow/50 rounded-full pointer group-hover:bg-yellow lg:transition-all duration-300">
      <IconAlertSmall className="text-white w-5" />
    </span>;

    if (isMobile) {
      return (
        <>
          <a onClick={() => setIsShowDescriptionPopup(true)}>{icon}</a>
          <Popup title={label} show={isShowDescriptionPopup} onClose={() => setIsShowDescriptionPopup(false)}>
            <div className="pt-2">
              {description}
            </div>
          </Popup>
        </>
      );
    }
    return (
      <Tooltip className="max-w-sm w-max" renderContent={description}>
        {icon}
      </Tooltip>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <div className="flex items-center gap-x-2">
        <Typography element="label" color="silver" size="xs" weight="semibold">
          {label}
        </Typography>
        {renderDescription()}
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
