import styles from './host.module.css';
import Card from './cards/listedPropertiesCard';

export default function Host(props, data) {
    return (
        <div>
            <div className={styles.section}>
                <h1>Listed Properties</h1>

                {props.data.map((property, key) => {
                    return <Card key={key} name={property.name} img_url={property.image_url} />
                })}
            </div>
        </div>
    );
}