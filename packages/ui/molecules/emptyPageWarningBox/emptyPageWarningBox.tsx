import React from 'react';
import { Typography } from '../../atoms';

interface IProps {
  warningText: string;
}

export const EmptyPageWarningBox = ({ warningText }: IProps) => {
  return (
    <div className='mt-32'>
      <Typography element="p" size="xxl" color="lightgray" className='text-center'>
        {warningText}
      </Typography>
    </div>
  );
};
