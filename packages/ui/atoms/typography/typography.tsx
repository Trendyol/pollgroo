import classNames from 'classnames';
import { TextColor, TextSize } from './enums';

export interface IProps {
  size?: keyof typeof TextSize;
  element: keyof JSX.IntrinsicElements;
  children: string | JSX.Element;
  className?: string;
  color?: keyof typeof TextColor;
  props?: any;
}

export const Typography = ({ size="base", element, children, className, color="default", ...props }: IProps) => {
  const Component = element;
  const classes = classNames(TextSize[size], TextColor[color], className);

  return <Component className={classes} {...props}>{children}</Component>;
};

