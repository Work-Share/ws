import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(500).json({ msg: 'Route not valid' });
  }

  let checkin_date = new Date(req.query.checkin);
  let checkout_date = new Date(req.query.checkout);

  if (checkout_date < checkin_date || !req.query.count || req.query.count <= 0) {
    res.status(200).json({ listings: [] });
  }


  // Connect to database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (!client) {
    return res.status(500).json({ msg: 'Cannot connect to the database' });
  }
  const db = client.db('listings');

  const data = await db.collection("listings").find({
        open_date: { $lte: checkin_date },
        close_date: { $gte: checkout_date }
    }).limit(parseInt(req.query.count)).toArray();
    const listings = JSON.parse(JSON.stringify(data));

    res.status(200).json({listings: listings});
}
