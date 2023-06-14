import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { TooltipPlacement } from './enums';

export interface IProps {
  children: ReactNode;
  className?: string;
  placement?: keyof typeof TooltipPlacement;
}

// TODO: placement logic

export const Tooltip = ({ children, className }: IProps) => {
  const tooltipClasses = classNames('relative rounded-lg bg-extralightgray color-textgray p-2 text-xs', className);

  return (
    <div className={tooltipClasses}>
      <>{children}</>
      <span className="absolute block w-0 left-1/2 -top-2 border-8 border-t-0 border-transparent border-b-extralightgray" />
    </div>
  );
};
