import styles from './listing.module.css';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';
import Meta from '../../components/meta';

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
    console.log(props);

    return (
        <div>
            <Meta title={props.listing.name} />
            <h1>{props.listing.name}</h1>
            <div className={styles.info_grid}>
                <div className={styles.image} style={{backgroundImage: 'url(' + props.listing.image_url + ')'}}>

                </div>
                <div className={styles.description}>
                    <p>{props.listing.description}</p>
                </div>
            </div>
        </div>
    );
}