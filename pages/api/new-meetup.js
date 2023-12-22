import { MongoClient } from "mongodb"

const handler = async (req, res) => {
  if(req.method === 'POST'){
    const data = req.body

    const client = await MongoClient.connect('mongodb+srv://testing:t4s0GndSTn67pIjE@cluster0.rmrhmyh.mongodb.net/meetups?retryWrites=true&w=majority')

    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    client.close()

    res.status(201).json({message: 'Data meetup inserted!'})
  }
}

export default handler
