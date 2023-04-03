import React from 'react';
import translate from 'translations';
import { Button, Typography } from '../../atoms';

export interface IProps {
  teamName: string;
  gameTitle: string;
  isDone?: boolean;
}

export const GameCard = ({ teamName, gameTitle, isDone }: IProps) => {
  // if game finished isDone value will be returned true, show "result" wording on primary button instead view
  // also hide edit button
  // handle click
  return (
    <div>
      <div className="py-4 px-3 border border-bordergray rounded-lg flex flex-col gap-y-3">
        <Typography element="p" color="gray" size="xs" weight="semibold">
          {teamName}
        </Typography>
        <Typography element="p" color="gray" size="xxs">
          {gameTitle}
        </Typography>
        <div className="flex items-center gap-x-3">
          <Button className="h-8 py-1 px-4" variant="primary">
            {translate('VIEW')}
          </Button>
          <Button className="h-8 py-1 px-4" variant="secondary">
            {translate('EDIT')}
          </Button>
        </div>
      </div>
    </div>
  );
};
