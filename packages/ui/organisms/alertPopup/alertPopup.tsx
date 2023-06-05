import { IconCheck, IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Typography } from '../../atoms';
import { Popup } from '../../molecules';

enum AlertPopupType {
  success = "success",
  error = "error",
}

export interface IProp {
  onClose: (value: boolean) => void;
  show: boolean;
  title: string;
  text: string;
  type?: keyof typeof AlertPopupType;
  children?: ReactNode;
}

export const AlertPopup = ({ type = AlertPopupType.success, show, title, text, onClose, children }: IProp) => {
  const renderIcon = () => {
    const iconWrapperClass = classNames("block w-12 h-12 flex items-center justify-center rounded-full", {
      "bg-lightgreen": type === AlertPopupType.success,
      "bg-lightred": type === AlertPopupType.error,
    });
    const iconClass = classNames("text-xl", {
      "text-green": type === AlertPopupType.success,
      "text-red": type === AlertPopupType.error,
    });

    const icon = {
      [AlertPopupType.success]: IconCheck,
      [AlertPopupType.error]: IconX
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
        <>{children}</>
      </div>
    </Popup>
  );
};
