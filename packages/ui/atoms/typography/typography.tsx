import classNames from 'classnames';
import { TextColor, TextSize, TextWeight } from './enums';

export interface IProps {
  size?: keyof typeof TextSize;
  element: keyof JSX.IntrinsicElements;
  children: string | JSX.Element;
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
      {children}
    </Component>
  );
};

