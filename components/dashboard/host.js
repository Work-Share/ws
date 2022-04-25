import styles from './host.module.css';
import Card from '../listing/card';

export default function Host(props) {
    return (
        <div>
            <div className={styles.section}>
                <h1>Listed Properties</h1>
                {
                    props.data.length > 0 ?
                        props.data.map((property, key) => {
                            return <Card key={key} name={property.name} />
                        })
                    :
                        <p><i>You have not posted any properties</i></p>
                }
            </div>
        </div>
    );
}