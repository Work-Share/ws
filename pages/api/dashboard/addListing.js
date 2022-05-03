import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("listings");
    const query = req.query

    let open_date = new Date(query.open_date);
    let close_date = new Date(query.close_date);

    await db.collection("listings").insert({
        name: query.name,
        open_date: open_date,
        close_date: close_date,
        image_url: query.image_url,
        address: query.address,
        rating: 0,
        price: query.price,
        amenities: [],
        description: query.description
        // amenities: req.query.amenities
    })

    const db2 = client.db("listings");
    await db2.collection("listings").createIndex({ "$**": "text" }, { name: "TextIndex" })

    const listing = await db2.collection("listings").find({ name: { $eq: query.name } }).toArray();
    const listingData = JSON.parse(JSON.stringify(listing));

    const db3 = client.db("Users");
    const data = await db3.collection("UserData").updateOne(
        { email: query.email },
        { $push: { listedProperties: listingData[0]._id } }
    );

    res.status(200).json({ x: listingData[0]._id })
}