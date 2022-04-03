import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
  // JWT
  session: {
    jwt: true
  },
  // Providers
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Connect to DB
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        // Get all the users
        const users = await client.db('Users').collection('UserData');
        // Find the user with the email
        const result = await users.findOne({ email: credentials.email });
        if (!result) {
          client.close();
          throw new Error('No user has the email');
        }
        // Check hashed and DB password
        const checkPassword = await compare(credentials.password, result.password);
        if (!checkPassword) {
          client.close();
          throw new Error('Passwords do not match');
        }
        // Success
        client.close();
        return { email: result.email };
      }
    })
  ]
});
