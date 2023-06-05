import React from 'react';
import classNames from 'classnames';
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react';
import { CSSTransition } from 'react-transition-group';
import { ToasterVariant } from './enums';
import { Typography } from '../../atoms';

export interface IProps {
  show: boolean;
  text: string;
  variant?: keyof typeof ToasterVariant;
  className?: string;
  onClose?: (value: boolean) => void;
}

export const Toaster = ({ show, text, variant = 'success', className, onClose }: IProps) => {
  const handleClose = React.useCallback(() => !!onClose && onClose(false), [onClose]);
  const nodeRef = React.useRef(null);
  const toasterClasses = classNames('lg:w-4/12 grid grid-flow-col justify-between items-center rounded-lg gap-x-2.5 p-3.5', className, {
    "bg-green/50": variant === ToasterVariant.success,
    "bg-red/50": variant === ToasterVariant.error,
    "bg-yellow/50": variant === ToasterVariant.warning,
  });

  const renderIcon = () => {
    const iconWrapperClass = classNames("block w-6 h-6 flex items-center justify-center rounded-full", {
      "bg-green": variant === ToasterVariant.success,
      "bg-red": variant === ToasterVariant.error,
      "bg-yellow": variant === ToasterVariant.warning,
    });

    const icon = {
      [ToasterVariant.success]: IconCheck,
      [ToasterVariant.error]: IconX,
      [ToasterVariant.warning]: IconExclamationMark
    }
    const IconComponent = icon[variant];

    return (
      <span className={iconWrapperClass}>
        <IconComponent data-testid="toaster-icon" className="w-3 h-3 text-white" />
      </span>
    );
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      nodeRef={nodeRef}
      classNames={{
        enter: 'opacity-0',
        enterActive: 'opacity-100 transition-opacity',
        exit: 'opacity-100',
        exitActive: 'opacity-0 transition-opacity',
      }}
      unmountOnExit
    >
      <div ref={nodeRef} className={toasterClasses}>
        <div className="grid grid-flow-col items-center gap-x-2.5">
          {renderIcon()}
          <Typography element="p" size="xs" color="white">
            {text}
          </Typography>
        </div>
        {!!onClose && (
          <button onClick={handleClose} data-testid="toaster-close-button">
            <IconX className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </CSSTransition>
  );
};
