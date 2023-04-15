import React from 'react';
import { AuthBanner, AuthForm } from '../../organisms';
import { FormValues } from './interfaces';

export interface IProps {
  logoUrl: string;
  type: 'login' | 'register' | 'forgotPassword';
  onSubmit: (data: FormValues) => void;
}

export const AuthPage = ({ logoUrl, type, onSubmit }: IProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-6 lg:flex-row lg:w-full lg:p-5">
      <AuthBanner logoUrl={logoUrl} />
      <AuthForm type={type} onSubmit={onSubmit} />
    </div>
  );
};
