import React from 'react';
import { AuthPage, FormValues } from '@/../../packages/ui';
import axios from 'axios';
import loginUser from '@/helpers/loginUser';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  return (
    <>
      <Head>
        <title>Pollgroo - Register</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AuthPage logoUrl="/logo/pollgroo3.svg" type="register" onSubmit={handleSubmit}></AuthPage>
    </>
  );
};

export default Register;
