import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getHostUrl } from '../../../helpers/getHostUrl';
import { TeamPage } from 'ui';
import { TeamContextProvider } from 'contexts';
import Head from 'next/head';
import { TeamData } from '@/types/common';

interface IProps {
  data: TeamData;
}

export default function Team({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Pollgroo - Team</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <TeamContextProvider data={data}>
        <TeamPage logoUrl="/logo/pollgroo3.svg" iconOnlyLogo='/logo/pollgroo-icon-only.svg' />
      </TeamContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/teams/${teamId}`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
      withCredentials: true,
    });
    const data = res.data.team;
    return { props: { data } };
  } catch (err) {
    console.log(err);
    return { props: { data: [] } };
  }
}
