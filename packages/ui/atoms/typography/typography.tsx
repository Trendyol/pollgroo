import classNames from 'classnames';
import { TextColor, TextSize, TextWeight } from './enums';
import { ReactNode } from 'react';

export interface IProps {
  element: keyof JSX.IntrinsicElements;
  children: ReactNode;
  size?: keyof typeof TextSize;
  className?: string;
  color?: keyof typeof TextColor;
  weight?: keyof typeof TextWeight;
  props?: any;
}

export const Typography = ({
  size = 'base',
  element,
  children,
  className,
  color = 'default',
  weight = 'regular',
  ...props
}: IProps) => {
  const Component = element;
  const classes = classNames(TextSize[size], TextColor[color], TextWeight[weight], className);

  return (
    <Component className={classes} {...props}>
      <>{children}</>
    </Component>
  );
};
