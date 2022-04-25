import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  // Validate request
  if (req.method !== 'POST') {
    return res.status(500).json({ msg: 'Route not valid' });
  }

  const { email, password, host } = req.body;

  // Validate data
  if (!email || !email.includes('@') || !password) {
    return res.status(422).json({ msg: 'Invalid data'});
  }


  // Connect to database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (!client) {
    return res.status(500).json({ msg: 'Cannot connect to the database' });
  }
  const db = client.db('Users');

  // Check if the user already exists
  const checkExisting = await db.collection('UserData').findOne({email: email});
  if (checkExisting) {
    client.close();
    return res.status(422).json({msg: 'A user with that email already exists'});
  }

  // Add the user
  // Give empty strings otherwise the array won't be created
  const status = await db.collection('UserData').insertOne({
    email,
    password: await hash(password, 12),
    host: host,
    rentedProperties: [""],
    savedProperties: [""],
    listedProperties: [""]
  });

  client.close();
  return res.status(200).json({msg: 'User successfully created'});
}
