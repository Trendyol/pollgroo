import React from 'react';
import { AuthPage, FormValues } from '@/../../packages/ui';
import { useRouter } from 'next/router';
import loginUser from '@/helpers/loginUser';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;

  const handleSubmit = async (data: FormValues) => {
    try {
      const loginRes = await loginUser(data);
      if (loginRes?.ok) {
        router.push((callbackUrl as string) || '/dashboard');
      }
    } catch (err) {}
  };

  return (
    <>
      <Head>
        <title>Pollgroo - Login</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>
    </>
  );
};

export default Login;
