import styles from './card.module.css';

export default function ListingCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.card_img} style={{ backgroundImage: "url(" + props.img + ")" }}>
      </div>
      <div className={styles.card_info}>
        <p>{props.name}</p>
      </div>
    </div>
  );
}
