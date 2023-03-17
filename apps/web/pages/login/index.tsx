import React from 'react';
import { AuthPage } from '@/../../packages/ui';

const LoginPage = () => {
  const handleSubmit = (data: any) => {
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>;
};

export default LoginPage;
