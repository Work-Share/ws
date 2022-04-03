import Link from 'next/link';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <div className={styles.nav}>
        <ul>
          <li><p>WorkShare</p></li>
          <li><Link href="/"><a>HOME</a></Link></li>
          <li><Link href="/auth/login"><a>LOGIN</a></Link></li>
          <li><Link href="/auth/signup"><a>SIGN UP</a></Link></li>
        </ul>
    </div>
  );
}
