import { getSession } from 'next-auth/react';
import styles from './dashboard.module.css';
import Renter from '../components/dashboard/renter';
import Host from '../components/dashboard/host';
import { useSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    };
  }

  // Connect to database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (!client) {
    return {
      props: {}
    };
  }
  // Get User data
  const db = client.db('Users');
  const user_data = await db.collection("UserData").findOne({ email: session.user.email });
  const user = JSON.stringify(user_data);

  // Get the rented listings

  // Get the saved listings

  // If the user is a host, get the rented properties
  

  // Return the data
  return {
    props: {user}
  };
}

export default function Dashboard(props) {
  const user = JSON.parse(props.user);

  return (
    <div>
      { user.host === 'true' ?
          <div>
            <Host />
          </div>
        :
          <div></div>
      }
      <div>
        <Renter />
      </div>
    </div>
  );
}
