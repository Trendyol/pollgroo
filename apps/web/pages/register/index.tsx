import React from 'react';
import { AuthPage, FormValues, Loader, Toaster } from 'ui';
import axios from 'axios';
import loginUser from '@/helpers/loginUser';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useApp } from 'contexts';

const Register = () => {
  const router = useRouter();
  const { showLoader, setShowLoader, toasterContent, setToasterContent } = useApp();

  const handleSubmit = async (data: FormValues) => {
    setShowLoader(true);
    try {
      const registerRes = await axios.post('api/auth/register', data);
      if (registerRes) {
        const loginRes = await loginUser({ ...data, providerId: 'credentials' });
        if (loginRes?.ok) {
          router.push('/dashboard');
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setToasterContent({ show: true, variant: 'error', text: err.response?.data.message });
      }
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
      {toasterContent && (
        <Toaster
          show={toasterContent.show}
          variant="error"
          text={toasterContent.text}
          className="absolute right-4 top-4 z-50"
          onClose={() => setToasterContent(undefined)}
        />
      )}
      <Loader active={showLoader} />
      <AuthPage
        logoUrl="/logo/pollgroo3.svg"
        type="register"
        onSubmit={handleSubmit}
        bannerVoteImage="/images/banner-vote-image.svg"
      ></AuthPage>
    </>
  );
};

export default Register;
