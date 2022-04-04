import Link from 'next/link';
import styles from './nav.module.css';
import { useSession, signOut } from 'next-auth/react';

export default function Nav() {
  const { data: session, status } = useSession();
  const signed_in_links = [
    <li key="dashboard"><Link href="/dashboard"><a>DASHBOARD</a></Link></li>,
    <li key="signout"><a className={styles.signout} onClick={signOut}>SIGN OUT</a></li>
  ];

  const signed_out_links = [
    <li key="login"><Link href="/auth/login"><a>LOGIN</a></Link></li>,
    <li key="signup"><Link href="/auth/signup"><a>SIGN UP</a></Link></li>
  ];



  return (
    <div className={styles.nav}>
        <ul>
          <li><Link href="/"><a>WorkShare</a></Link></li>
          <li><Link href="/"><a>HOME</a></Link></li>
          <li><Link href="/search"><a>SEARCH</a></Link></li>
          { status === "authenticated" ? signed_in_links : signed_out_links }
        </ul>
    </div>
  );
}
