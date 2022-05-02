import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    if (!client) {
        return res.status(500).json({ msg: 'Cannot connect to the database' });
    }
    const db = client.db('Users');

    let params = JSON.parse(req.body);

    await db.collection("UserData").update(
        {email: params.email},
        {$push: {rentedProperties: params.listing_id}}
    );


    return res.status(200).json({ msg: "Successfully checked out listing" });
}