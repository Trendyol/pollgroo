import React from 'react';
import { AuthPage } from '@/../../packages/ui';
import Head from 'next/head';

const ForgotPassword = () => {
  const handleSubmit = (data: any) => {};

  return (
    <>
      <Head>
        <title>Pollgroo - Forgot Password</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AuthPage
        bannerVoteImage="/images/banner-vote-image.svg"
        logoUrl="/logo/pollgroo3.svg"
        type="forgotPassword"
        onSubmit={handleSubmit}
      ></AuthPage>
    </>
  );
};

export default ForgotPassword;
