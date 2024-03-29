import React, { useState } from 'react';
import styles from './card.module.css';
import Link from 'next/link';

export default function ListingCard(props) {
  return (
    <div className={styles.card_container}>
      <Link href={{ pathname: props.url, query: { 'checkin':  props.check_in, 'checkout': props.check_out } }}>
        <a>
          <div className={styles.card}>
            <div className={styles.card_img} style={{ backgroundImage: "url(" + props.img + ")" }}>
            </div>
            <div className={styles.card_info}>
              <p>{props.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}