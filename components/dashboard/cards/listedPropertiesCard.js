import React, { useState } from 'react'
import styles from './listedPropertiesCard.module.css'
import Modal from 'react-modal';

function ManageModal(props, open, close) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.close}
      contentLabel="Manage"
      className={styles.modal_container}
    >
      <div></div>
    </Modal>
  )
}

export default function ListedPropertiesCard(props, name, img_url, id) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log("url(" + props.img_url + ")")

  return (
    <div className={styles.card_container}>
      <a>
        <div className={styles.card}>
          <div className={styles.card_img} style={{ backgroundImage: `url(${props.img_url})` }}>
          </div>
          <div className={styles.card_info}>
            <p>{props.name}</p>
            <button onClick={openModal}>Manage</button>
          </div>
        </div>
      </a>

      <ManageModal open={modalIsOpen} close={closeModal} />
    </div>
  );
}