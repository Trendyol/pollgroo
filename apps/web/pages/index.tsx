import { Typography } from '@/../../packages/ui';
import translate from 'translations';
import Image from 'next/image';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pollgroo - Home</title>
        <meta name="description" content="Pollgroo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="h-screen flex items-center justify-center bg-secondary">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <Image className="lg:w-56" src="/logo/pollgroo.svg" alt="POLLGROO" width="160" height="160" priority={true} />
          <Typography size="xxs" color="lightgray" element="p">
            {translate('LANDING_DESCRIPTION')}
          </Typography>
        </div>
      </main>
    </>
  );
}
