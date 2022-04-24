import styles from './host.module.css';
import ListedPropertiesCard from './cards/listedPropertiesCard';

export default function Host(props, data) {
    return (
        <div>
            <div className={styles.section}>
                <h1>Listed Properties</h1>

                {props.data.map((property, key) => {
                    if (property.name) {
                        return <ListedPropertiesCard name={property.name} img_url={property.image_url} />
                    }
                })}
            </div>
        </div>
    );
}