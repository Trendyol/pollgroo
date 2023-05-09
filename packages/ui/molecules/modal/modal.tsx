import React, { ReactNode, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export interface IProp {
  onClose: (value: boolean) => void;
  show: boolean;
  title: string;
  children: ReactNode;
}
export const Modal = ({ show, onClose, title, children }: IProp) => {
  const handleClose = React.useCallback(() => onClose(false), [onClose]);
  const headerClass = classNames(
    'relative h-14 bg-lightblue flex items-center justify-center border-b border-lightgray',
    'lg:bg-white lg:justify-between lg:px-6 lg:pt-10 lg:border-b-0'
  );
  const modalClass = classNames(
    'fixed top-0 left-0 lg:left-auto min-h-screen w-full bg-white transition-all duration-500 translate-y-full z-[100]',
    'lg:translate-y-0 lg:translate-x-full lg:w-1/3 lg:right-0'
  );
  const closeIconClass = classNames(
    'text-gray absolute inset-y-0 my-auto right-5',
    'lg:cursor-pointer lg:relative lg:right-0 lg:m-0'
  );
  const nodeRef = useRef(null);

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  const onModalClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <CSSTransition
      in={show}
      timeout={200}
      nodeRef={nodeRef}
      classNames={{
        appear: 'translate-y-full lg:translate-x-full',
        appearActive: 'translate-y-full lg:translate-x-full',
        appearDone: 'translate-y-full lg:translate-x-full',
        enter: 'translate-y-full lg:translate-x-full',
        enterActive: 'translate-y-full lg:translate-x-full',
        enterDone: 'translate-y-0 lg:translate-x-0',
        exit: 'translate-y-full lg:translate-x-full',
        exitActive: 'translate-y-full lg:translate-x-full',
        exitDone: 'translate-y-full lg:translate-x-full',
      }}
      unmountOnExit
    >
      <div data-testid="modal-overlay" className="lg:fixed lg:inset-0 lg:bg-black/50 z-[90]" onClick={handleClose}>
        <div ref={nodeRef} className={modalClass} onClick={onModalClick}>
          <header className={headerClass}>
            <Typography element="h4" size="md" weight="bold">
              {title}
            </Typography>
            <IconX data-testid="modal-close-icon" className={closeIconClass} onClick={handleClose} />
          </header>
          <div data-testid="modal-body">
            <>{children}</>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
