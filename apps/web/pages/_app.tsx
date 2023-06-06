import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter } from '@next/font/google';
import { AppContextProvider } from 'contexts';

const inter = Inter({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={600} refetchOnWindowFocus={false}>
      <AppContextProvider>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  );
};

export default App;
