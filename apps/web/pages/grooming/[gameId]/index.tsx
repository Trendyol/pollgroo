import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getHostUrl } from '../../../helpers/getHostUrl';
import { GroomingPage } from 'ui';
import { GroomingContextProvider, SocketProvider } from 'contexts';
import Head from 'next/head';
import { GroomingData, SessionUser } from '@/types/common';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface IProps {
  data: GroomingData;
}

interface ExtendedSession extends Session {
  user: SessionUser;
}

export default function Grooming({ data }: IProps) {
  const { data: session } = useSession();
  const extendedSession = session as ExtendedSession;

  return (
    <>
      <Head>
        <title>Pollgroo - Grooming</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GroomingContextProvider data={data}>
        {extendedSession?.user.id && (
          <SocketProvider data={{user: extendedSession.user, groomingId: data._id}}>
            <GroomingPage logoUrl="/logo/pollgroo3.svg" iconOnlyLogo='/logo/pollgroo-icon-only.svg' />
          </SocketProvider>
        )}
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
