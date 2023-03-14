import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        body {
          background: ${"#1D2939"};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default App;
