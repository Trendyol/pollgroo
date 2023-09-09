import React from 'react';
import axios from 'axios';
import { DashboardPage } from 'ui';
import { GetServerSidePropsContext } from 'next';
import { DashboardContextProvider } from 'contexts';
import { getHostUrl } from '../../helpers/getHostUrl';
import Head from 'next/head';
import { GameCardData } from '@/types/common';

export default function Dashboard({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Pollgroo - Dashboard</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DashboardContextProvider gameCardData={data}>
        <DashboardPage logoUrl="/logo/pollgroo3.svg" iconOnlyLogo='/logo/pollgroo-icon-only.svg' />
      </DashboardContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/games/get-games`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
      withCredentials: true,
    });
    const data: GameCardData[] = res.data;
    return { props: { data } };
  } catch (err) {
    return { props: { data: [] } };
  }
}

interface IProps {
  data: GameCardData[];
}
