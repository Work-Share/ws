import styles from './listing.module.css';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';
import Meta from '../../components/meta';
import filter_data from '../../data/filters.json';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    if (!client) {
        return {
            props: {}
        };
    }
    const db = client.db('listings');

    const data = await db.collection('listings').findOne({ _id: ObjectID(params.listing) });

    if (!data) {
        console.log('Listing not found');
        return {
            props: {}
        };
    }

    const listing = JSON.parse(JSON.stringify(data));

    return {
        props: {
            listing,
            params
        }
    };
}

export default function Listing(props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    console.log(props);

    const amenities_html = [];
    props.listing.amenities.forEach((amenity) => {
        let filter = filter_data.filters.find((f) => { return f.key === amenity; });
        if (!filter) return;
        amenities_html.push(<li key={amenity}>{filter.value}</li>);
    });

    var email

    if (session) email = session.user.email

    const saveProperty = () => {
        const listing_id = props.listing._id
        // let search_params = new URLSearchParams();
        // search_params.append('email', email);
        // search_params.append('listing_id', this.props.postData._id)
        const data = {
            email: email,
            listing_id: listing_id
        }
        fetch('/api/dashboard/addSavedProperty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(alert('Property saved!'))
    }

    return (
        <div>
            <Meta title={props.listing.name} />
            <h1 className={styles.title}>{props.listing.name}</h1>
            <button onClick={saveProperty}>Bookmark Listing</button>
            <div className={styles.info_grid}>
                <div className={styles.image} style={{ backgroundImage: 'url(' + props.listing.image_url + ')' }}>
                </div>
                <div className={styles.description}>
                    <p>{props.listing.description}</p>
                </div>
                <div className={styles.address}>
                    <p>{props.listing.address}</p>
                </div>
                <div className={styles.amenities}>
                    {props.listing.amenities.length > 0 ?
                        <div>
                            <h1>Amenities</h1>
                            <ul>
                                {amenities_html}
                            </ul>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div className={styles.checkout}>
                {status === "authenticated" ?
                    <button onClick={() => { router.push('/listing/checkout') }}>Checkout</button>
                    :
                    <div>
                        <p>You must have an account to rent a property</p>
                        <Link href={{ pathname: "/auth/signup", query: { redirect: "/listing/" + props.listing._id } }}><a>Sign up</a></Link>
                        <Link href={{ pathname: "/auth/login", query: { redirect: "/listing/" + props.listing._id } }}><a>Log in</a></Link>
                    </div>
                }
            </div>
        </div>
    );
}
