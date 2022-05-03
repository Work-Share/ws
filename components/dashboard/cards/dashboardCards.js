import React, { useState } from 'react'
import styles from './dashboardCards.module.css'
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function ManageModal(props, open, close) {
  const [name, setName] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const update = () => {
    let search_params = new URLSearchParams();
    search_params.append('email', email);
    search_params.append('name', name);
    search_params.append('open_date', openDate);
    search_params.append('close_date', closeDate);
    search_params.append('image_url', imageUrl);
    search_params.append('address', address);
    search_params.append('price', price);
    search_params.append('description', description);

    fetch("/api/dashboard/editListing?" + search_params.toString())
  }

  const deleteListing = () => {
    let search_params = new URLSearchParams();
    search_params.append('email', email);
    search_params.append('id', props.data[0]._id);
    fetch("/api/dashboard/deleteListing?" + search_params.toString())
  }

  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.close}
      contentLabel="Manage"
    >
      <div>
        <h1>Manage Listing</h1>

        <form action="" method="get">
          <div className={styles.input_group}>
            <label htmlFor="name" className={styles.label}>New name</label>
            <input type="text" name="name" id="name" placeholder="Name of the workspace" onChange={e => {
              const newName = e.target.value;
              setName(newName);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="open_date" className={styles.label}>New open Date</label>
            <input type="date" name="open_date" id="open_date" className={styles.open} onChange={e => {
              const newOpenDate = e.target.value;
              if (e.target.value > closeDate) {
                setCloseDate(e.target.value);
              }
              setOpenDate(newOpenDate);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="close_date" className={styles.label}>New close Date</label>
            <input type="date" name="close_date" id="close_date" className={styles.close} onChange={e => {
              const newCloseDate = e.target.value;
              setCloseDate(newCloseDate);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="image" className={styles.label}>New Image url</label>
            <input type="url" name="for" id="for" placeholder="Image url (ends with .jpg or .png)" onChange={e => {
              const newImageUrl = e.target.value;
              setImageUrl(newImageUrl);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="address" className={styles.label}>New address</label>
            <input type="text" name="address" id="address" placeholder="Street address" onChange={e => {
              const newAddress = e.target.value;
              setAddress(newAddress);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="price" className={styles.label}>New price</label>
            <input type="number" name="price" id="price" min="0" onChange={e => {
              const newPrice = e.target.value;
              setPrice(newPrice);
            }} required />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="description" className={styles.label}>New description</label>
            <input type="text" name="description" id="description" onChange={e => {
              const newDescription = e.target.value;
              setDescription(newDescription);
            }} required />
          </div>
        </form>

      </div>
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
  const { data: session, status } = useSession();
  var email

  if (session) email = session.user.email

  const router = useRouter()

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  const cancelRental = () => {
    let search_params = new URLSearchParams();
    search_params.append('email', email);
    search_params.append('id', props.id);
    fetch("/api/dashboard/cancelRental?" + search_params.toString())
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
            <button onClick={openModal}>Cancel</button>
          </div>
        </div>
      </a>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cancel"
        style={customStyles}
      >
        <div>
          <div>Are you sure you want to cancel the rental?</div>
          <button style={{ margin: '0.2rem' }} onClick={cancelRental} >Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
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