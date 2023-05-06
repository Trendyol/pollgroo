import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getHostUrl } from '../../../helpers/getHostUrl';
import { GroomingPage } from 'ui';
import { GroomingContextProvider } from 'contexts';

interface IProps {
  data: GroomingData;
}

export default function Grooming({ data }: IProps) {
  return (
    <GroomingContextProvider data={data}>
      <GroomingPage logoUrl="/logo/pollgroo3.svg" />
    </GroomingContextProvider>
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

interface GroomingData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: Task[];
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

interface Task {
  description: string;
  gameId?: string;
  metrics?: { maxPoint: number; minPoint: number; name: string; _id: string }[];
  score?: number;
  title: string;
  _id: string;
}
