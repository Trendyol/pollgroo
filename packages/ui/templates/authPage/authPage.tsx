import React from 'react';
import { AuthBanner, AuthForm } from '../../organisms';
import { FormValues } from './interfaces';

export interface IProps {
  logoUrl: string;
  type: 'login' | 'register' | 'forgotPassword';
  onSubmit: (data: FormValues) => void;
  onGoogleSubmit?: () => void;
  bannerVoteImage: string;
}

export const AuthPage = ({ logoUrl, type, onSubmit, onGoogleSubmit, bannerVoteImage }: IProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-6 lg:flex-row lg:w-full lg:py-6 lg:px-12 xl:px-32 2xl:px-72">
      <AuthBanner logoUrl={logoUrl} bannerVoteImage={bannerVoteImage} />
      <AuthForm type={type} onSubmit={onSubmit} onGoogleSubmit={onGoogleSubmit} />
    </div>
  );
};
