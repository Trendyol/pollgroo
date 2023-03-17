import React from 'react';
import classNames from 'classnames';
import { ButtonVariant } from './enums';
import { useForm } from "react-hook-form";

export interface IProps {
  children: string | JSX.Element;
  variant?: keyof typeof ButtonVariant;
  className?: string;
  onClick?: () => void;
  fluid?: boolean;
}

export const Button = ({ children, variant = 'primary', className, onClick, fluid = false }: IProps) => {
  const buttonClasses = classNames(ButtonVariant[variant], 'rounded-lg', { 'w-full': fluid }, className);
  console.log(useForm());
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
