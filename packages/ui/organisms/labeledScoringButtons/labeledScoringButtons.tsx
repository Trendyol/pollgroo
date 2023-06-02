import React, { useState } from 'react';
import { ScoringButton } from '../../molecules/scoring-button';
import { Typography } from '../../../ui/atoms/typography';
import { FieldValues, UseFormGetValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

export interface IProps {
  error?: boolean;
  label: string;
  scores: number[];
  errorMessage?: string;
  getValues?: UseFormGetValues<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  triggerValidation?: UseFormTrigger<FieldValues>;
}

export const LabeledScoringButtons = ({
  error,
  errorMessage,
  label,
  scores,
  getValues,
  setValue,
  triggerValidation,
}: IProps) => {
  const [selectedScore, setSelectedScore] = useState(getValues ? getValues(label) : 0);

  const handleClick = (score: number) => {
    const newValue = selectedScore === score ? 0 : score;
    setSelectedScore(newValue);
    if (setValue) {
      setValue(label, newValue);
    }
    if (error && triggerValidation) {
      triggerValidation();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <Typography element="label" color="silver" size="xs" weight="semibold">
        {label}
      </Typography>
      <div className="flex flex-row gap-2.5">
        {scores.map((score, index) => (
          <ScoringButton key={index} selected={selectedScore === score} onClick={() => handleClick(score)}>
            {score.toString()}
          </ScoringButton>
        ))}
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
