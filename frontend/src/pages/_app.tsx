// import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
// import '../styles/bootstrap.css';
// import '../styles/main.scss';
// import '../styles/_bootswatch.scss';
// import 'react-multi-carousel/lib/styles.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import { theme } from '../styles/themes';
import { useRouter } from 'next/router';
// import Analytics from '../components/Analytics';
import Script from 'next/script';
import './../styles/globals.css'

interface Props {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props) { // AppProps
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [router.events]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

// import type { AppProps } from 'next/app'
 
// export default function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
