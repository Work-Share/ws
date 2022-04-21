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

    return (
        <div>
            <Meta title={props.listing.name} />
            <h1 className={styles.title}>{props.listing.name}</h1>
            <div className={styles.info_grid}>
                <div className={styles.image} style={{backgroundImage: 'url(' + props.listing.image_url + ')'}}>
                </div>
                <div className={styles.description}>
                    <p>{props.listing.description}</p>
                </div>
                <div className={styles.address}>
                    <p>{props.listing.address}</p>
                </div>
                <div className={styles.amenities}>
                    { props.listing.amenities.length > 0 ?
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
                    <button onClick={() => {router.push('/listing/checkout')}}>Checkout</button>
                :
                    <div>
                    <p>You must have an account to rent a property</p>
                    <Link><a>Sign up</a></Link>
                    <Link><a>Log in</a></Link>
                    </div>
                }
            </div>
        </div>
    );
}
