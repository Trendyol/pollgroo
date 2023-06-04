import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getHostUrl } from '../../../helpers/getHostUrl';
import { GroomingPage } from 'ui';
import { GroomingContextProvider, SocketProvider } from 'contexts';
import Head from 'next/head';
import { GroomingData } from '@/types/common';

interface IProps {
  data: GroomingData;
}

export default function Grooming({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Pollgroo - Grooming</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GroomingContextProvider data={data}>
        <SocketProvider>
          <GroomingPage logoUrl="/logo/pollgroo3.svg" />
        </SocketProvider>
      </GroomingContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const gameId = context.query.gameId;
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/games/${gameId}`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
      withCredentials: true,
    });
    const data = res.data;
    return { props: { data } };
  } catch (err) {
    console.log(err);
    return { props: { data: [] } };
  }
}
