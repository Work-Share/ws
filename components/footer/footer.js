import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className={styles.footer}>
      <div className={styles.scroll_to_top}><p onClick={scrollToTop}>To Top</p></div>
      <div className={styles.information}>
        <div className={styles.information_row}>
          <p>Contact: noemailyet</p>
          <Link href="/about"><a className={styles.about}>About</a></Link>
          <Link href="/help"><a className={styles.about}>Help</a></Link>
        </div>
        <p>WorkShare</p>
      </div>
    </div>
  );
}
