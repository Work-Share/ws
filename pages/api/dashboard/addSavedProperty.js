import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("Users");

    const email = req.body.email
    const listing_id = req.body.listing_id

    const data = await db.collection("UserData").update(
        { email: email },
        { $push: { savedProperties: listing_id } }
    );
}