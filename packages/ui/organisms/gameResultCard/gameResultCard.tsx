import React from 'react';
import { Typography } from '../../atoms';
import { GameResultCardScoreBadge } from '../../molecules/gameResultCardScoreBadge';
import translate from 'translations';

export interface IProps {
  order: number;
  total: number;
  score: number;
  text: string;
}

export const GameResultCard = ({ order, total, score, text }: IProps) => {
  return (
    <div className="flex flex-col items-start bg-lightblue rounded-[20px] px-5 py-2.5">
      <Typography
        element="span"
        size="xs"
        color="labelgray"
        className="mb-[5px] sm:mb-[15px] text-[12px] sm:text-[16px] leading-[14px] sm:leading-[24px] !font-semibold"
      >
        {translate('TASK')} {order}/{total}
      </Typography>
      <Typography
        element="span"
        size="lg"
        color="darkgray"
        weight="semibold"
        className="mb-[5px] sm:mb-[15px] text-[16px] sm:text-[20px] !leading-[24px] sm:!leading-[30px]"
      >
        {text}
      </Typography>
      <GameResultCardScoreBadge score={score} />
    </div>
  );
};
