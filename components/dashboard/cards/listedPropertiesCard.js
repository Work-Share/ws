import React from 'react'
import styles from './listedPropertiesCard.module.css'

export default function Card(props, name, img_url) {
  return (
    <div className={styles.card}>
      <img src={props.img_url} className={styles.image} />
      <div className={styles.content}>
        <div>{props.name}</div>
        <div>Manage</div>
      </div>
    </div>
  )
}
