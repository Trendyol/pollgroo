import React from 'react';
import { AuthPage } from '@/../../packages/ui';

const RegisterPage = () => {
  const handleSubmit = (data: any) => {
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="register" onSubmit={handleSubmit}></AuthPage>;
};

export default RegisterPage;
