import styles from './host.module.css';
// import ListingCard from '../listing/card';
import ListedPropertiesCard from './cards/listedPropertiesCard';

export default function Host(props) {
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
            </div>
        </div>
    );
}