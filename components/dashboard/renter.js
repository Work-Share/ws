import styles from './renter.module.css';
import Card from '../listing/card';

export default function Renter(props) {
    const rented_properties = [];

    console.log(props);

    return (
        <div>
            <div className={styles.section}>
                <h1>Rented Properties</h1>
                {
                    props.data.rentedProperties.length > 0 ?
                        props.data.rentedProperties.map((property, key) => {
                            return <Card key={key} name={property.name} />
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
                            return <Card key={key} name={property.name} />
                        })
                    :
                        <p><i>You have not saved any properties</i></p>
                }
            </div>
        </div>
    );
}