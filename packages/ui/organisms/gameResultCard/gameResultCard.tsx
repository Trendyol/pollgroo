import React from 'react';
import { Typography } from '../../atoms';
import { GameResultCardScoreBadge } from '../../molecules/gameResultCardScoreBadge';
import translate from 'translations';

export interface IProps {
  order: number;
  total: number;
  score: number;
  text: string;
  storyPoint: number;
}

export const GameResultCard = ({ order, total, score, text, storyPoint }: IProps) => {
  return (
    <div className="flex flex-col items-start bg-lightblue rounded-[20px] px-5 py-2.5 w-full gap-y-4">
      <Typography element="span" size="xxs" color="labelgray">
        {translate('TASK')} {order}/{total}
      </Typography>
      <Typography element="span" size="xs" color="darkgray" weight="semibold">
        {text}
      </Typography>
      <div className="flex gap-x-2">
        {!!score && <GameResultCardScoreBadge label="Score" score={score} />}
        {!!storyPoint && <GameResultCardScoreBadge label="Story Point" score={storyPoint} />}
      </div>
    </div>
  );
};
