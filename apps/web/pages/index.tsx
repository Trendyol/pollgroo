import { Typography } from '@/../../packages/ui';
import translate from 'translations';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="h-screen flex items-center justify-center bg-secondary">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <Image className="lg:w-56" src="/logo/pollgroo.svg" alt="POLLGROO" width="160" height="160" priority={true} />
        <Typography size="xxs" color="lightgray" element="p">
          {translate('LANDING_DESCRIPTION')}
        </Typography>
        <Typography
          element="h1"
          size="xxl"
          className="p-2 font-bold leading-15 text-center bg-gradient-to-r from-blue-300 via-teal-800 to-blue-300 bg-clip-text animate-gradient text-transparent"
        >
          {translate('LANDING_GREETING')}
        </Typography>
      </div>
    </main>
  );
}
