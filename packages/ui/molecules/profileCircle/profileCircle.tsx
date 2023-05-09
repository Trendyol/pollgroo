import React from 'react';

interface IProps {
  className?: string;
  profileCircleBackgroundColor: string;
  profileCircleTextColor: string;
  profileCircleText: string;
}

export const ProfileCircle = ({
  profileCircleBackgroundColor,
  profileCircleText,
  profileCircleTextColor,
  className,
}: IProps) => {
  return (
    <div
      style={{
        backgroundColor: `${profileCircleBackgroundColor}`,
        color: `${profileCircleTextColor}`,
      }}
      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${className}`}
    >
      {profileCircleText}
    </div>
  );
};
