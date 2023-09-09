import axios from 'axios';
import { getHostUrl } from '../../helpers/getHostUrl';
import { GameContextProvider } from 'contexts';
import { GetServerSidePropsContext } from 'next';
import { GamesPage } from 'ui';
import Head from 'next/head';
import { GameCardData } from '@/types/common';

export default function Games({ data, errorMessage }: IProps) {
  return (
    <>
      <Head>
        <title>Pollgroo - Games</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GameContextProvider data={data}>
        <GamesPage logoUrl="/logo/pollgroo3.svg" iconOnlyLogo='/logo/pollgroo-icon-only.svg' />
      </GameContextProvider>
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
  } catch (err: any) {
    return { props: { data: [], errorMessage: err.response.data.message } };
  }
}

interface IProps {
  data: GameCardData[];
  errorMessage?: string;
}
