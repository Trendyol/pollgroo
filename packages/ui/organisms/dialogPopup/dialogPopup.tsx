import { ReactNode } from 'react';
import { Typography } from '../../atoms';
import { Popup } from '../../molecules';

export interface IProp {
  onClose: (value: boolean) => void;
  show: boolean;
  title: string;
  text: string;
  children?: ReactNode;
  renderIcon: ReactNode;
}

export const DialogPopup = ({ show, title, text, renderIcon, children, onClose }: IProp) => {
  return (
    <Popup show={show} onClose={onClose}>
      <div className="flex flex-col items-center gap-y-5 pt-2" data-testid="dialog-popup">
        <span className="block w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-lightgray">
          <>{renderIcon}</>
        </span>
        <Typography element="h5" size="xl" weight="bold" color="black" className="text-center">
          {title}
        </Typography>
        <Typography element="p" size="md" color="silver" className="text-center">
          {text}
        </Typography>
        <>{children}</>
      </div>
    </Popup>
  );
};
