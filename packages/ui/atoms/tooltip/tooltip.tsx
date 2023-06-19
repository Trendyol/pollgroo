import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { TooltipPlacement } from './enums';

export interface IProps {
  children: ReactNode;
  renderContent: ReactNode;
  className?: string;
  placement?: keyof typeof TooltipPlacement;
}

// TODO: placement logic

export const Tooltip = ({ renderContent, children, className }: IProps) => {
  const tooltipClasses = classNames('absolute top-7 left-0 -translate-x-2/4 rounded-lg bg-extralightgray color-textgray p-2 text-xs group-hover:opacity-100 opacity-0 transition-opacity z-50 hidden lg:block', className);

  return (
    <div className="relative group cursor-pointer">
      <>{children}</>
      <div className={tooltipClasses}>
        <>{renderContent}</>
        <span className="absolute block w-0 left-1/2 -top-2 border-8 border-t-0 border-transparent border-b-extralightgray" />
      </div>
    </div>
  );
};
