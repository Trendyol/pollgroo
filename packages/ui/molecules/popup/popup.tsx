import React, { ReactNode, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Typography } from '../../atoms';
import { useLockedBody } from '../../../hooks';

export interface IProp {
  onClose: (value: boolean) => void;
  show: boolean;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}
export const Popup = ({ show, onClose, title, children, showCloseButton = true }: IProp) => {
  const handleClose = React.useCallback(() => onClose(false), [onClose]);
  const [_, setLocked] = useLockedBody();
  const overlayClass = 'flex items-center justify-center fixed inset-0 bg-black/50 z-[90]';
  const headerClass = classNames('flex items-center justify-end gap-x-1', { 'justify-between': !!title });
  const popupClass = 'bg-white z-[100] p-6 rounded-lg lg:w-1/3';
  const closeIconClass = 'text-gray lg:cursor-pointer';
  const nodeRef = useRef(null);

  React.useEffect(() => {
    if (show) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [show]);

  const onPopupClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const renderHeader = () => {
    const showHeader = !!title || showCloseButton;
  
    if (!showHeader) {
      return null;
    }

    return (
      <header className={headerClass}>
        {!!title && (
          <Typography element="h4" size="md" weight="bold">
            {title}
          </Typography>
        )}
        {showCloseButton && (
          <IconX data-testid="popup-close-icon" className={closeIconClass} onClick={handleClose} />
        )}
      </header>
    );
  }

  return (
    <CSSTransition
      in={show}
      timeout={200}
      nodeRef={nodeRef}
      classNames={{
        enter: 'opacity-0',
        enterActive: 'opacity-100 transition-opacity duration-500',
        exit: 'opacity-100',
        exitActive: 'opacity-0 transition-opacity duration-500',
      }}
      unmountOnExit
    >
      <div ref={nodeRef} data-testid="popup-overlay" className={overlayClass} onClick={handleClose}>
        <div className={popupClass} onClick={onPopupClick}>
          {renderHeader()}
          <div data-testid="popup-body">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
