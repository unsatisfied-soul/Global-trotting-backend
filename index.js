const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000
require('dotenv').config()
const fileUpload = require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use(fileUpload())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h6wi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect()
        const Globaltrottings =  client.db('Globaltrottings')
        const touristspot = Globaltrottings.collection('touristspot')

        //post touristspot
        app.post('/touristspot', async(req,res)=> {
            const title = req.body.title
            const desc = req.body.desc
            const date = req.body.date
            const image = req.body.image
            const encodepic = req.body.image
            // const bufferImage = Buffer.from(encodepic,'base64')
            const touristdata = {
                title,
                desc,
                date,
                image
            }
            const result = await touristspot.insertOne(touristdata)
            res.json(result)
        })

        //get touristspot
        app.get('/touristspot', async(req,res)=> {
            const cursor = touristspot.find({})
            const travelingplace = await cursor.toArray()
            res.send(travelingplace)
        })

    }finally{}
}
run().catch(console.dir)
app.get('/',(req,res)=> {
    res.send('welcome to our site!')
})
app.listen(port,()=> {
    console.log(`listen ${port}`)
})