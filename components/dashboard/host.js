import React, { useState } from 'react';
import styles from './host.module.css';
import ListedPropertiesCard from './cards/dashboardCards';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

function AddListingModal(props, open, close) {
    const { data: session, status } = useSession();
    var email

    if (session) email = session.user.email

    const router = useRouter()

    const [name, setName] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [openDate, setOpenDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState("");

    const addListing = () => {
        let search_params = new URLSearchParams();
        search_params.append('email', email);
        search_params.append('name', name);
        search_params.append('open_date', openDate);
        search_params.append('close_date', closeDate);
        search_params.append('image_url', imageUrl);
        search_params.append('address', address);
        search_params.append('price', price);

        const res = fetch('/api/dashboard/addListing?' + search_params.toString(), {
            method: 'GET'
        })
        .then(() => router.reload())
    }

    return (
        <Modal
            isOpen={props.open}
            onRequestClose={props.close}
            contentLabel="Manage"
            className={styles.modal_container}
        >
            <div className={styles.modal_content}>
                <h1 className={styles.form_title}>Upload a listing</h1>
                <form action="" method="get">
                    <div className={styles.input_group}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input type="text" name="name" id="name" placeholder="Name of the workspace" onChange={e => {
                            const newName = e.target.value;
                            setName(newName);
                        }} required />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="open_date" className={styles.label}>Open Date</label>
                        <input type="date" name="open_date" id="open_date" className={styles.open} onChange={e => {
                            const newOpenDate = e.target.value;
                            if (e.target.value > closeDate) {
                                setCloseDate(e.target.value);
                            }
                            setOpenDate(newOpenDate);
                        }} required />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="close_date" className={styles.label}>Close Date</label>
                        <input type="date" name="close_date" id="close_date" className={styles.close} onChange={e => {
                            const newCloseDate = e.target.value;
                            setCloseDate(newCloseDate);
                        }} required />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="image" className={styles.label}>Image url</label>
                        <input type="url" name="for" id="for" placeholder="Image url (ends with .jpg or .png)" onChange={e => {
                            const newImageUrl = e.target.value;
                            setImageUrl(newImageUrl);
                        }} required />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="address" className={styles.label}>Address</label>
                        <input type="text" name="address" id="address" placeholder="Street address" onChange={e => {
                            const newAddress = e.target.value;
                            setAddress(newAddress);
                        }} required />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="price" className={styles.label}>Price</label>
                        <input type="number" name="price" id="price" min="0" onChange={e => {
                            const newPrice = e.target.value;
                            setPrice(newPrice);
                        }} required />
                    </div>
                </form>
                <div>
                    <button><input type="button" value="Upload" onClick={addListing} className={styles.input} /></button>
                    <button><input type="button" value="Cancel" onClick={props.close} className={styles.input} /></button>
                </div>
                {/* <p className={styles.error}>{error}</p> */}
            </div>
        </Modal>
    )
}

export default function Host(props) {
    // Modal
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div className={styles.section}>
                <h1>Listed Properties</h1>
                {
                    props.data.length > 0 ?
                        props.data.map((property, key) => {
                            if (property != "") {
                                const p = property[0]
                                return <ListedPropertiesCard key={key} name={p.name} img_url={p.image_url} id={p._id} />
                            }
                        })

                        :
                        <p><i>You have not posted any properties</i></p>
                }

                <button onClick={() => setIsOpen(true)}>Add Listing</button>
                <AddListingModal open={modalIsOpen} close={closeModal} />
            </div>
        </div>
    );
}