import React from 'react';
import { AuthPage } from '@/../../packages/ui';

const ForgotPasswordPage = () => {
  const handleSubmit = (data: any) => {
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="forgotPassword" onSubmit={handleSubmit}></AuthPage>;
};

export default ForgotPasswordPage;
