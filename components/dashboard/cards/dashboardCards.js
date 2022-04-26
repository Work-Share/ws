import React, { useState } from 'react'
import styles from './dashboardCards.module.css'
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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

export function RentedPropertiesCard(props, name, img_url, id) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

export function SavedPropertiesCard(props, name, img_url, id) {
  const { data: session, status } = useSession();
  var email

  if (session) email = session.user.email

  const router = useRouter()

  const removeSavedProperty = async () => {
    let search_params = new URLSearchParams();
    search_params.append('email', email);
    search_params.append('id', props.id);
    fetch("/api/dashboard/removeSavedProperty?" + search_params.toString())
      .then(router.reload())
  }

  return (
    <div className={styles.card_container}>
      <a>
        <div className={styles.card}>
          <div className={styles.card_img} style={{ backgroundImage: `url(${props.img_url})` }}>
          </div>
          <div className={styles.card_info}>
            <p>{props.name}</p>
            <button onClick={removeSavedProperty}>Remove</button>
          </div>
        </div>
      </a>

    </div>
  );
}