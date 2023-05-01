import React from 'react';
import axios from 'axios';
import { DashboardPage } from 'ui';
import { GetServerSidePropsContext } from 'next';
import { DashboardContextProvider } from 'contexts';
import { getHostUrl } from '../../helpers/getHostUrl';

export default function Dashboard({ data }: IProps) {
  return (
    <DashboardContextProvider gameCardData={data}>
      <DashboardPage logoUrl="/logo/pollgroo3.svg" />
    </DashboardContextProvider>
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

interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: string[];
  team: {
    _id: string;
    name: string;
    members: string[];
    tasks: string[];
    games: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface IProps {
  data: GameCardData[];
}
