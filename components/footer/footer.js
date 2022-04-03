import styles from './footer.module.css';

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
        <p>Contact: noemailyet</p>
        <p>WorkShare</p>
      </div>
    </div>
  );
}
