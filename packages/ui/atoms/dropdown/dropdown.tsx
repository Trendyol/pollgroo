import React from 'react';
import classNames from 'classnames';
import { Typography } from '../typography';

type SelectProps = React.InputHTMLAttributes<HTMLSelectElement>;

interface Option {
  id: number | string;
  value: number | string;
}

export interface IProps extends SelectProps {
  className?: string;
  fluid?: boolean;
  props?: any;
  error?: boolean;
  errorMessage?: string;
  options: Option[];
  children?: string | JSX.Element;
}

export const Dropdown = ({ className, error, errorMessage, fluid = false, options, ...props }: IProps) => {
  const inputClassName = classNames(
    { 'bg-white': !error },
    { 'bg-lightred': error },
    'border',
    { 'border-bordergray': !error },
    { 'border-red': error },
    'rounded-lg',
    'py-2.5 py-2',
    'px-3.5 lg:px-4',
    { 'w-full': fluid },
    'focus:outline-none',
    'text-black',
    className
  );

  return (
    <div className="relative">
      <select className={inputClassName} {...props}>
        {options.map((option) => (
          <option key={option.id}>{option.value}</option>
        ))}
      </select>
      {errorMessage && (
        <Typography className="py-1 absolute" element="p" color="red" size="xxs">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
