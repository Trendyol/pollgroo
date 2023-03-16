import React from 'react';
import classNames from 'classnames';
import { Typography } from '../typography';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface IProps extends InputProps {
  className?: string;
  fluid?: boolean;
  props?: any;
  error?: boolean;
  errorMessage?: string;
  children?: string | JSX.Element;
}

export const Input = ({ className, error, errorMessage, fluid = false, ...props }: IProps) => {
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
    <div>
      <input className={inputClassName} {...props} />
      {errorMessage && (
        <Typography className="py-1" element="p" color="red" size='xxs'>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
