import React from 'react';
import { AuthPage, FormValues } from '@/../../packages/ui';
import axios from 'axios';
import loginUser from '@/helpers/loginUser';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (data: FormValues) => {
    try {
      const registerRes = await axios.post('api/auth/register', data);
      if (registerRes) {
        const loginRes = await loginUser(data);
        if (loginRes?.ok) {
          router.push('/dashboard');
        }
      }
    } catch (err) {}
  };

  return <AuthPage logoUrl="/logo/pollgroo3.svg" type="register" onSubmit={handleSubmit}></AuthPage>;
};

export default Register;
