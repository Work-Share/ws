import { getSession } from 'next-auth/react';
import styles from './dashboard.module.css';
import Renter from '../components/dashboard/renter';
import Host from '../components/dashboard/host';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';

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

  // Get all listing data
  const db2 = client.db('listings');
  let listingData = {
    rentedProperties: [],
    savedProperties: [],
    listedProperties: []
  };

  // Get the rented listings
  for (let i = 0; i < user_data.rentedProperties.length; i++) {
    if (user_data.rentedProperties[i] != "") {
        let id = user_data.rentedProperties[i]
        const rentedPropertiesData = await db2.collection("listings").find({ _id: { $eq: ObjectID(id) } }).toArray();
        const rentedData = JSON.parse(JSON.stringify(rentedPropertiesData));
        listingData.rentedProperties.push(rentedData)
    }
  }

  // Get the saved listings
  for (let i = 0; i < user_data.savedProperties.length; i++) {
    if (user_data.savedProperties[i] != "") {
        let id = user_data.savedProperties[i]
        const savedPropertiesData = await db2.collection("listings").find({ _id: { $eq: ObjectID(id) } }).toArray();
        const savedData = JSON.parse(JSON.stringify(savedPropertiesData));
        listingData.savedProperties.push(savedData)
    }
  }

  // If the user is a host, get the listed properties
  if (user_data.host === 'true') {
    for (let i = 0; i < user_data.listedProperties.length; i++) {
      if (user_data.listedProperties[i] != "") {
          let id = user_data.listedProperties[i]
          const listingsData = await db2.collection("listings").find({ _id: { $eq: ObjectID(id) } }).toArray();
          const fetchData = JSON.parse(JSON.stringify(listingsData));
          listingData.listedProperties.push(fetchData);
      }
    }
  }

  // Return the data
  return {
    props: {
      user,
      listingData
    }
  };
}

export default function Dashboard(props) {
  const user = JSON.parse(props.user);
  console.log(props.listingData);

  return (
    <div>
      { user.host === 'true' ?
          <div>
            <Host data={props.listingData.listedProperties[0]} />
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
