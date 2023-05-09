import React from 'react';
import { AuthPage, FormValues, Loader } from 'ui';
import { useRouter } from 'next/router';
import loginUser from '@/helpers/loginUser';
import Head from 'next/head';
import { useApp } from 'contexts';

const Login = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const { showLoader, setShowLoader } = useApp();

  const handleSubmit = async (data: FormValues) => {
    setShowLoader(true);
    try {
      const loginRes = await loginUser(data);
      setShowLoader(false);
      if (loginRes?.ok) {
        router.push((callbackUrl as string) || '/dashboard');
      }
    } catch (err) {
      setShowLoader(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pollgroo - Login</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Loader active={showLoader} />
      <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>
    </>
  );
};

export default Login;
