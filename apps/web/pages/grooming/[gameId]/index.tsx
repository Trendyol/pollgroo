import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export default function Grooming({ data }: any) {
  return <div>{JSON.stringify(data)}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const gameId = context.query.gameId;
  const isLocal = context.req.headers.host?.includes('localhost');
  const hostUrl = isLocal ? `http://${context.req.headers.host}` : `https://${context.req.headers.host}`;
  try {
    const res = await axios.get(`${hostUrl}/api/games/${gameId}/tasks`, {
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
