import React, { useState } from 'react';
import { ScoringButton } from '../../molecules/scoring-button';
import { Typography } from '../../../ui/atoms/typography';

interface Scores {
  id: number;
  value: string;
}

export interface IProps {
  error?: boolean;
  label: string;
  scores: Scores[];
  errorMessage?: string;
}

export const LabeledScoringButtons = ({ error, errorMessage, label, scores }: IProps) => {
  const [selectedScore, setSelectedScore] = useState(0);
  const handleClick = (scoreId: number) => {
    setSelectedScore((prev) => {
      const val = prev === scoreId ? 0 : scoreId;
      return val;
    });
  };

  return (
    <div className="w-96 flex flex-col justify-center items-center gap-2.5">
      <Typography element="label" color="silver" size="xs" weight="semibold">
        {label}
      </Typography>
      <div className="flex flex-row gap-2.5">
        {scores.map((score) => (
          <ScoringButton {...{ selected: selectedScore === score.id }} onClick={() => handleClick(score.id)}>
            {score.value}
          </ScoringButton>
        ))}
      </div>
      {error && (
        <Typography
          className="w-full py-1.5 text-center rounded-lg bg-lightred"
          element="div"
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
