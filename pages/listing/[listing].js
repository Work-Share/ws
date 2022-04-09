import styles from './listing.module.css';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';
import Meta from '../../components/meta';
import filter_data from '../../data/filters.json';

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
        </div>
    );
}
