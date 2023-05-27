import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ButtonVariant } from './enums';

export interface IProps {
  children: ReactNode;
  variant?: keyof typeof ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fluid?: boolean;
}

export const Button = ({ children, type, variant = 'primary', className, onClick, fluid = false }: IProps) => {
  const buttonClasses = classNames(ButtonVariant[variant], 'rounded-lg', { 'w-full': fluid }, className);

  return (
    <button className={buttonClasses} type={type || "button"} onClick={onClick}>
      <>{children}</>
    </button>
  );
};
