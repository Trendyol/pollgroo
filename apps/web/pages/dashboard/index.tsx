import React from 'react';
import axios from 'axios';
import authOptions from 'pages/api/auth/[...nextauth]';
import { DashboardPage } from 'ui';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { DashboardContextProvider } from 'contexts';

export default function Dashboard({ data }: IProps) {
  return (
    <DashboardContextProvider gameCardData={data}>
      <DashboardPage logoUrl="/logo/pollgroo3.svg" />
    </DashboardContextProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);

  if (!session || !context.req.headers.cookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/games/get-games`, {
  //   headers: {
  //     cookie: context.req.headers.cookie,
  //   },
  //   withCredentials: true
  // });
  // const data: GameCardData[] = res.data;
  const data = [{
    _id: "string",
    title: "string",
    isStarted: false,
    tasks: "[string]",
    team: {
      _id: "string",
      name: "string",
      members: ["string"],
      tasks: ["string"],
      games: ["string"],
      createdAt: "string",
      updatedAt: "string",
    },
    createdAt: "string",
    updatedAt: "string",
  }]

  return { props: { data } };
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
