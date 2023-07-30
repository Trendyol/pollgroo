import React from 'react';
import { AuthPage, FormValues, Loader, Toaster } from 'ui';
import { useRouter } from 'next/router';
import loginUser from '@/helpers/loginUser';
import Head from 'next/head';
import { useApp } from 'contexts';
import { signIn, useSession } from 'next-auth/react';

const Login = () => {
  const { showLoader, setShowLoader, toasterContent, setToasterContent } = useApp();
  const router = useRouter();
  const { callbackUrl } = router.query;
  const { status } = useSession();

  React.useEffect(() => {
    if (status === 'authenticated') {
      setToasterContent({ show: true, variant: 'success', text: 'Redirecting to dashboard..',  });
      router.push((callbackUrl as string) || '/dashboard');
    }
  }, [status, callbackUrl, router, setShowLoader, setToasterContent]);

  const handleSubmit = async (data: FormValues) => {
    setShowLoader(true);
    try {
      const loginRes = await loginUser({ ...data, providerId: 'credentials' });
      setShowLoader(false);
      if (loginRes?.error) {
        setToasterContent({ show: true, variant: 'error', text: loginRes.error });
      }
      if (loginRes?.ok) {
        router.push((callbackUrl as string) || '/dashboard');
      }
    } catch (err: unknown) {
      setShowLoader(false);
    }
  };

  const handleGoogleAuth = async () => {
    setShowLoader(true);
    try {
      await signIn('google');
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
          text={toasterContent.text}
          className="absolute right-4 top-4 z-50"
          onClose={() => setToasterContent(undefined)}
          autoClose={2000}
        />
      )}
      <Loader active={showLoader} />
      <AuthPage
        logoUrl="/logo/pollgroo3.svg"
        type="login"
        onSubmit={handleSubmit}
        onGoogleSubmit={handleGoogleAuth}
      ></AuthPage>
    </>
  );
};

export default Login;
