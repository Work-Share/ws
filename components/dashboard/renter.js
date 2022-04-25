import styles from './renter.module.css';
import Card from '../listing/card';
import { RentedPropertiesCard, SavedPropertiesCard } from './cards/dashboardCards';

export default function Renter(props) {
    const rented_properties = [];

    // console.log(props);

    return (
        <div>
            <div className={styles.section}>
                <h1>Rented Properties</h1>
                {
                    props.data.rentedProperties.length > 0 ?
                        props.data.rentedProperties.map((property, key) => {
                            if (property !== "") {
                                const p = property[0]
                                return <RentedPropertiesCard key={key} name={p.name} img_url={p.image_url} id={p._id} />
                            }
                        })
                        :
                        <p><i>You ratskin, you have not rented any properties. Go to search and give us your money.</i></p>
                }
            </div>
            <div className={styles.section}>
                <h1>Saved Properties</h1>
                {
                    props.data.savedProperties.length > 0 ?
                        props.data.savedProperties.map((property, key) => {
                            if (property !== "") {
                                const p = property[0]

                                return <SavedPropertiesCard key={key} name={p.name} img_url={p.image_url} id={p._id} />
                            }
                        })
                        :
                        <p><i>You have not saved any properties</i></p>
                }
            </div>
        </div>
    );
}