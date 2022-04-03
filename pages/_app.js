import './global.css'
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <div className="page_content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp
