import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './checkout.module.css';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';


export async function getServerSideProps(ctx) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    if (!client) {
        return {
            props: {}
        };
    }
    const db = client.db('listings');

    console.log(ctx);
    const data = await db.collection('listings').findOne({ _id: ObjectID(ctx.query.listing) });

    if (!data) {
        console.log('Listing not found');
        return {
            props: {}
        };
    }

    const listing = JSON.parse(JSON.stringify(data));

    return {
        props: {
            listing
        }
    };
}

export default function Checkout(props) {
    const router = useRouter();
    const id = router.query.listing;
    const { data: session, status } = useSession();

    const [checkin, setCheckin] = useState(router.query.checkin);
    const [checkout, setCheckout] = useState(router.query.checkout);
    const [loading, setLoading] = useState(false);

    const d = new Date();
    const today = d.toISOString().split("T")[0];

    const cancelButton = async (e) => {
        e.preventDefault();
        router.push('/listing/' + id);
    }

    const checkoutButton = async (e) => {
        e.preventDefault();

        setLoading(true);

        const res = await fetch('/api/listings/checkout', {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email,
                listing_id: id
            })
        });

        alert('Successfully checked-out, redirecting you to the dashboard');

        router.push("/dashboard");
    }

    const calculateDays = (e) => {
        let check_in = new Date(checkin);
        let check_out = new Date(checkout);

        let days = (check_out.getTime() - check_in.getTime()) / (1000 * 3600 * 24);

        return days + 1;
    }

    console.log(props);

    return (
        <div>
            <Link href={{ pathname: '/listing/' + id }}><a className={styles.back}>Back</a></Link>
            <h1 className={styles.title}>Checkout</h1>
            <h1 className={styles.title}>Confirm details</h1>
            <p className={styles.price_per_day}>Renting {props.listing.name}</p>
            <form className={styles.form_container}>
                <div className={styles.form_element_wrapper}>
                    <div className={styles.form_element}>
                        <label>Check in</label>
                        <input type="date" value={checkin} min={today} onChange={ (e) => {
                            setCheckin(e.target.value);
                        }} />
                    </div>
                    <div className={styles.form_element}>
                        <label>Check out</label>
                        <input type="date" value={checkout} min={checkin} onChange={ (e) => {
                            setCheckout(e.target.value);
                        }} />
                    </div>
                </div>
                <p className={styles.price_per_day}>Price per day: ${props.listing.price}</p>
                <p className={styles.price_per_day}>Total price: ${props.listing.price * calculateDays()}</p>
            </form>
            <h1 className={styles.title}>Enter Information</h1>
            <form className={styles.form_container}>
                <div className={styles.form_element_wrapper}>
                    <div className={styles.form_element}>
                        <label>Name on card</label>
                        <input value="John Doe" readOnly />
                    </div>
                    <div className={styles.form_element}>
                        <label>Card Number</label>
                        <input value="4532850325577465" readOnly />
                    </div>
                    <div className={styles.form_element}>
                        <label>Expiration Date</label>
                        <input value="02/28" readOnly />
                    </div>
                    <div className={styles.form_element}>
                        <label>CCV</label>
                        <input value="397" readOnly />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={cancelButton}>Cancel</button>
                    <button onClick={checkoutButton}>Checkout</button>
                </div>
            </form>

            { loading ?
                <div className="loading">
                    <p>Loading</p>
                    <div className="lds_ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}
