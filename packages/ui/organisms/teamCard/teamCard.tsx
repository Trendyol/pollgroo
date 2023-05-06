import React from 'react';
import { Button, Typography } from '../../atoms';
import { useRouter } from 'next/router';
import translate from 'translations';

interface IProps {
  isMember?: boolean;
  teamId: string;
  name: string;
}

export const TeamCard = ({ isMember, teamId, name }: IProps) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/team/${teamId}`);
  };

  return (
    <div className="border border-lightgray rounded-lg flex flex-col gap-y-3 py-3 px-4">
      <div>members</div>
      <Typography element="p" color="black" weight="semibold" size="xs">
        {name}
      </Typography>
      <div className="flex justify-end">
        {isMember ? (
          <Button className="px-5 py-2" variant="secondary" onClick={handleViewClick}>
            {translate('VIEW')}
          </Button>
        ) : (
          <Button className="px-5 py-2" variant="primary">
            {translate('JOIN')}
          </Button>
        )}
      </div>
    </div>
  );
};
