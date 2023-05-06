import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getHostUrl } from '../../../helpers/getHostUrl';
import { TeamPage } from 'ui';
import { TeamContextProvider } from 'contexts';

interface IProps {
  data: TeamData;
}

export default function Team({ data }: IProps) {
  return (
    <TeamContextProvider data={data}>
      <TeamPage logoUrl="/logo/pollgroo3.svg" />
    </TeamContextProvider>
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

interface TeamData {
  _id: string;
  name: string;
  members: string[];
  tasks: string[];
  games: string[];
  createdAt: string;
  updatedAt: string;
}
