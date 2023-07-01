import React from 'react';
import { AuthBanner, AuthForm } from '../../organisms';
import { FormValues } from './interfaces';

export interface IProps {
  logoUrl: string;
  type: 'login' | 'register' | 'forgotPassword';
  onSubmit: (data: FormValues) => void;
  onGoogleSubmit?: () => void;
}

export const AuthPage = ({ logoUrl, type, onSubmit, onGoogleSubmit }: IProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-6 lg:flex-row lg:w-full lg:p-5">
      <AuthBanner logoUrl={logoUrl} />
      <AuthForm type={type} onSubmit={onSubmit} onGoogleSubmit={onGoogleSubmit} />
    </div>
  );
};
