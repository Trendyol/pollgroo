import axios from 'axios';
import { getHostUrl } from '../../helpers/getHostUrl';
import { GameResultsContextProvider } from 'contexts';
import { GetServerSidePropsContext } from 'next';
import { GameResultsPage } from 'ui';
import Head from 'next/head';
import { GameCardData } from '@/types/common';

export default function GameResults({ data, errorMessage }: IProps) {
  return (
    <>
      <Head>
        <title>Pollgroo - Game Results</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GameResultsContextProvider data={data}>
        <GameResultsPage logoUrl="/logo/pollgroo3.svg" />
      </GameResultsContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/games/finished-games`, {
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