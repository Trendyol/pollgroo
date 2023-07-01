import React from 'react';
import Image from 'next/image';

interface IProps {
  className?: string;
  profileCircleBackgroundColor: string;
  profileCircleTextColor: string;
  profileCircleText: string;
  image?: string;
}

export const ProfileCircle = ({
  profileCircleBackgroundColor,
  profileCircleText,
  profileCircleTextColor,
  className,
  image,
}: IProps) => {
  return !image ? (
    <div
      style={{
        backgroundColor: `${profileCircleBackgroundColor}`,
        color: `${profileCircleTextColor}`,
      }}
      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${className}`}
    >
      {profileCircleText}
    </div>
  ) : (
    <div className={`h-10 w-10 ${className}`}>
      <Image
        className="object-cover h-full w-full rounded-full"
        src={image}
        alt="Pollgroo User Image"
        width={40}
        height={40}
      />
    </div>
  );
};
