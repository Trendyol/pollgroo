import React from 'react';
import classNames from 'classnames';
import { Button } from '../../atoms/button';
import { Typography } from '../../atoms/typography';
import { ScoringButtonVariant } from './enums';

export interface IProps {
  children: string | number | JSX.Element;
  onClick?: () => void;
  className?: string;
  variant?: keyof typeof ScoringButtonVariant;
}

export const ScoringButton = ({children, variant = "secondary", onClick, className}: IProps) => {
	const size = 'w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2';
	const classes = classNames(ScoringButtonVariant[variant], size, className);

  return (
    <Button className={classes} variant={variant} onClick={onClick}>
      <Typography className="font-semibold" element="span" size="xs">
        {children}
      </Typography>
    </Button>
  );
};
