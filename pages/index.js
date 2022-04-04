import Head from 'next/head';
import styles from './index.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>WorkShare</title>
        <meta name="description" content="Unleash your creativity" />
      </Head>
      
      <div className={styles.banner}>
        <div className={styles.banner_overlay}></div>
        <div className={styles.banner_content}>
          <h1>Welcome to WorkShare</h1>
          <p>Find a workspace and unleash your creativity</p>
          <Link href="/search"><button>Start Searching</button></Link>
        </div>
      </div>
    </div>
  )
}
