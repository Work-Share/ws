import React, { useState } from 'react'
import styles from './listedPropertiesCard.module.css'
import Modal from 'react-modal';

function ManageModal(props, open, close) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.close}
      contentLabel="Manage"
    >
      <div></div>
    </Modal>
  )
}

export default function Card(props, name, img_url) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.card}>
      <img src={props.img_url} className={styles.image} />
      <div className={styles.content}>
        <div>{props.name}</div>
        <button onClick={openModal}>Manage</button>
        <ManageModal open={modalIsOpen} close={closeModal} />
      </div>
    </div>
  )
}
