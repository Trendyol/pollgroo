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
  disabled?: boolean;
}

export const Button = ({ children, type, variant = 'primary', className, onClick, fluid = false, disabled = false }: IProps) => {
  const buttonClasses = classNames(ButtonVariant[variant], 'rounded-lg disabled:opacity-30', { 'w-full': fluid }, className);

  return (
    <button className={buttonClasses} type={type || "button"} onClick={onClick} disabled={disabled}>
      <>{children}</>
    </button>
  );
};
