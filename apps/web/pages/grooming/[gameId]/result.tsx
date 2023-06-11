import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GroomingResultPage, Loader } from 'ui';
import Head from 'next/head';
import { GroomingResultData } from '@/types/common';
import { useRouter } from 'next/router';
import { useApp } from 'contexts';

export default function GroomingResult() {
  const [finishedGroomingDetail, setFinishedGroomingDetail] = useState({} as GroomingResultData);
  const { showLoader, setShowLoader } = useApp();
  const { query } = useRouter();

  useEffect(() => {
    setShowLoader(true);
    const fetchFinishedGrooming = async () => {
      try {
        const res = await axios.get(`/api/games/${query.gameId}/result`);
        setFinishedGroomingDetail(res.data);
      } catch (e) {
        setShowLoader(false);
      } finally {
        setShowLoader(false);
      }
    };

    if (query.gameId) {
      fetchFinishedGrooming();
    }
  }, [query.gameId, setShowLoader]);

  return (
    <>
      <Head>
        <title>Pollgroo - Grooming Result</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GroomingResultPage logoUrl="/logo/pollgroo3.svg" groomingDetail={finishedGroomingDetail} />
      <Loader active={showLoader} />
    </>
  );
}
