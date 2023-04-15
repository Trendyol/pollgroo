import React from 'react';
import { AuthPage, FormValues } from '@/../../packages/ui';
import { useRouter } from 'next/router';
import loginUser from '@/helpers/loginUser';

const Login = () => {
  const router = useRouter();
  
  const handleSubmit = async (data: FormValues) => {
    try {
      const loginRes = await loginUser(data);
      if (loginRes?.ok) {
        router.push('/dashboard');
      }
    } catch (err) {}
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>;
};

export default Login;
