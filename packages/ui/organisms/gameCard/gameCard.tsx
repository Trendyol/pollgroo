import React from 'react';
import translate from 'translations';
import { Button, Typography } from '../../atoms';
import { useRouter } from 'next/router';

export interface IProps {
  gameId: string;
  teamName: string;
  gameTitle: string;
  isDone?: boolean;
}

export const GameCard = ({ teamName, gameTitle, gameId, isDone }: IProps) => {
  const router = useRouter();

  const handleClick = () => {
    isDone ? router.push(`/grooming/${gameId}/result`) : router.push(`/grooming/${gameId}`);
  };

  return (
    <div className="py-4 px-3 border border-bordergray rounded-lg flex flex-col gap-y-3 w-full">
      <Typography element="p" color="gray" size="xs" weight="semibold">
        {teamName}
      </Typography>
      <Typography element="p" color="gray" size="xxs">
        {gameTitle}
      </Typography>
      <div className="flex items-center gap-x-3">
        <Button className="h-8 py-1 px-4" variant="primary" onClick={handleClick}>
          {isDone ? translate('GAME_CARD_RESULT_TEXT') : translate('VIEW')}
        </Button>
      </div>
    </div>
  );
};
