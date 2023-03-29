import React from 'react';
import { AuthPage } from '@/../../packages/ui';

const Login = () => {
  const handleSubmit = (data: any) => {
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>;
};

export default Login;
