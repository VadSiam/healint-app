import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { MainProvider } from './context';

export default function MyApp({ 
  Component, 
  pageProps,
}: AppProps) {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
