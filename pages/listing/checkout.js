import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './checkout.module.css';

export default function Checkout() {
    const router = useRouter();
    console.log(router);

    return (
        <div>
            <Link href={{ pathname: '/listing/' + router.query.listing }}><a>Back</a></Link>
            <h1>Checkout</h1>
            <h1>Confirm details</h1>
            <h1>Enter Information</h1>
            <form>
            <div className={styles.form_element_wrapper}>
                <div className={styles.form_element}>
                    <input value="John Doe" />
                    <input value="4532850325577465" />
                </div>
            </div>
            </form>
        </div>
    );
}
