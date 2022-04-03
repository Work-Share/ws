import './global.css'
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Nav />
      <div className="page_content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp
