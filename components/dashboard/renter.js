import styles from './renter.module.css';

export default function Renter(props) {
    const rented_properties = [];

    return (
        <div>
            <div className={styles.section}>
                <h1>Rented Properties</h1>
            </div>
            <div className={styles.section}>
                <h1>Saved Properties</h1>
            </div>
        </div>
    );
}