import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

export default function JoinTeam() {
  const router = useRouter();
  const { joinLink } = router.query;

  const joinTeam = useCallback(async () => {
    try {
      const response = await axios.patch('/api/teams/join', {
        joinLink,
      });

      if (response.data.success) {
        router.push(`/team/${response.data.teamId}`);
      }
    } catch (error) {
      console.error('Error joining team:', error);
    }
  }, [joinLink, router]);

  useEffect(() => {
    if (joinLink) {
      joinTeam();
    }
  }, [joinLink, joinTeam]);

  return (
    <>
      <Head>
        <title>Pollgroo - Join Team</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </>
  );
}
