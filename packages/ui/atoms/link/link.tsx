import React from 'react';
import classNames from 'classnames';
import { TextColor, TextSize } from './enums';

export interface IProps {
  size?: keyof typeof TextSize;
  href: string;
  children: string | JSX.Element;
  className?: string;
  color?: keyof typeof TextColor;
  props?: any;
}

export const Link = ({ href, children, size = 'base', className, color = 'default' }: IProps) => {
  const classes = classNames(TextSize[size], TextColor[color], className);

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
};
