import React from 'react';
import { AuthPage, FormValues, Loader, Toaster } from 'ui';
import { useRouter } from 'next/router';
import loginUser from '@/helpers/loginUser';
import Head from 'next/head';
import { useApp } from 'contexts';

const Login = () => {
  const { showLoader, setShowLoader, toasterContent, setToasterContent } = useApp();
  const router = useRouter();
  const { callbackUrl } = router.query;

  const handleSubmit = async (data: FormValues) => {
    setShowLoader(true);
    try {
      const loginRes = await loginUser(data);
      setShowLoader(false);
      if (loginRes?.error) {
        setToasterContent({ show: true, variant: 'error', text: loginRes.error });
      }
      if (loginRes?.ok) {
        setToasterContent(undefined);
        router.push((callbackUrl as string) || '/dashboard');
      }
    } catch (err: unknown) {
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
      <AuthPage logoUrl="/logo/pollgroo3.svg" type="login" onSubmit={handleSubmit}></AuthPage>
    </>
  );
};

export default Login;
