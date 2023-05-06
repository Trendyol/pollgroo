import axios from 'axios';
import { getHostUrl } from '../../helpers/getHostUrl';
import { GetServerSidePropsContext } from 'next';
import { TeamsPage } from 'ui';
import { TeamsContextProvider } from 'contexts';
import Head from 'next/head';

export default function Games({ data, errorMessage }: any) {
  return (
    <>
      <Head>
        <title>Pollgroo - Teams</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <TeamsContextProvider data={data}>
        <TeamsPage logoUrl="/logo/pollgroo3.svg" />
      </TeamsContextProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/teams/get-teams`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
      withCredentials: true,
    });
    const data: TeamData[] = res.data.teams;
    return { props: { data } };
  } catch (err: any) {
    return { props: { data: [], errorMessage: err.response.data.message } };
  }
}

interface TeamData {
  _id: string;
  name: string;
  members: string[];
  tasks: string[];
  games: string[];
  createdAt: string;
  updatedAt: string;
}
