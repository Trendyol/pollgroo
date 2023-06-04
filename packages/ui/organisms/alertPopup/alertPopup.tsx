import { IconCheck, IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Typography } from '../../atoms';
import { Popup } from '../../molecules';

export enum AlertPopupType {
  Success = "success",
  Error = "error",
}

export interface IProp {
  onClose: (value: boolean) => void;
  show: boolean;
  title: string;
  text: string;
  type?: AlertPopupType;
  children?: ReactNode;
}

export const AlertPopup = ({ type = AlertPopupType.Success, show, title, text, onClose, children }: IProp) => {
  const renderIcon = () => {
    const iconWrapperClass = classNames("block w-12 h-12 flex items-center justify-center rounded-full", {
      "bg-lightgreen": type === AlertPopupType.Success,
      "bg-lightred": type === AlertPopupType.Error,
    });
    const iconClass = classNames("text-xl", {
      "text-green": type === AlertPopupType.Success,
      "text-red": type === AlertPopupType.Error,
    });

    const icon = {
      [AlertPopupType.Success]: IconCheck,
      [AlertPopupType.Error]: IconX
    }
    const IconComponent = icon[type];

    return (
      <span className={iconWrapperClass}>
        <IconComponent data-testid="alert-popup-circle-icon" className={iconClass} />
      </span>
    );
  }

  return (
    <Popup show={show} onClose={onClose} showCloseButton={false}>
      <div className="flex flex-col items-center gap-y-5" data-testid="alert-popup">
        {renderIcon()}
        <Typography element="h5" size="lg" weight="bold" color="black" className="text-center">
          {title}
        </Typography>
        <Typography element="p" size="xs" color="silver" className="text-center">
          {text}
        </Typography>
        {children}
      </div>
    </Popup>
  );
};
