import React from 'react';
import { AuthPage, FormValues, Loader } from 'ui';
import axios from 'axios';
import loginUser from '@/helpers/loginUser';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from 'contexts';

const Register = () => {
  const router = useRouter();
  const { showLoader, setShowLoader } = useApp();

  const handleSubmit = async (data: FormValues) => {
    setShowLoader(true);
    try {
      const registerRes = await axios.post('api/auth/register', data);
      if (registerRes) {
        const loginRes = await loginUser(data);
        if (loginRes?.ok) {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pollgroo - Register</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Loader active={showLoader} />
      <AuthPage logoUrl="/logo/pollgroo3.svg" type="register" onSubmit={handleSubmit}></AuthPage>
    </>
  );
};

export default Register;
