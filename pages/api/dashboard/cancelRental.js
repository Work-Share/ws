import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("Users");
    const email = req.query.email
    const id = req.query.id

    await db.collection("UserData").update(
        { email: email },
        { $pull: { rentedProperties: id } }
    );

    res.status(200).json({ listing_id: "Hi" });
}