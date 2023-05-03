import React from 'react';
import { Dropdown, DropdownProps, Typography } from '../../atoms';

export interface IProps extends DropdownProps {
  label: string;
}

export const LabeledDropdown = ({ className, error, id, label, options, ...props }: IProps) => {
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
      <Dropdown options={options} error={error} id={inputId} {...props} />
    </div>
  );
};
