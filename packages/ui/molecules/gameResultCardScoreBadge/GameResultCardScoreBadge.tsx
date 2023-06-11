import React from 'react';
import { Typography } from '../../atoms';

export interface IProps {
  score: number;
}

export const GameResultCardScoreBadge = ({ score }: IProps) => {
  return (
    <div className="inline-block bg-orange font-semibold rounded-[10px] px-[10px] py-[5px]">
      <Typography
        element="div"
        size="xxs"
        color="white"
        weight="semibold"
        className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px]"
      >
        Score : {Boolean(score) && String(score)}
      </Typography>
    </div>
  );
};
