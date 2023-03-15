import React from 'react';
import classNames from 'classnames';
import { ButtonVariant } from './enums';

export interface IProps {
  children: React.ReactNode;
  variant?: keyof typeof ButtonVariant;
  className?: string;
  onClick?: () => void;
  fluid?: boolean;
}

export const Button = ({ children, variant = 'primary', className, onClick, fluid = false }: IProps) => {
  const buttonClasses = classNames(ButtonVariant[variant], 'rounded-lg', { 'w-full': fluid }, className);

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
