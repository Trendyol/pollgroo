import React from 'react';
import { Input, IProps as InputProps } from '../../atoms/input';
import { Typography } from '../../atoms/typography';

export interface IProps extends InputProps {
  label: string;
}

export const LabeledInput = ({ className, error, id, label, ...props }: IProps) => {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-');
  const labelProps = { htmlFor: inputId };
  return (
    <div className={className}>
      <Typography
        className="font-semibold"
        element="label"
        color={error ? 'red' : 'labelgray'}
        size="xs"
        {...labelProps}
      >
        {label}
      </Typography>
      <Input id={inputId} error={error} {...props} />
    </div>
  );
};
