const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// user: eshakkhan29
// pass: ZP8MdgNzj3xUmN99


const uri = "mongodb+srv://eshakkhan29:ZP8MdgNzj3xUmN99@cluster0.grvhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db('testDb').collection('user');
        
        // all user find
        app.get('/user', async (req, res) => {
            const quarry = {};
            const cursor = userCollection.find(quarry);
            const result = await cursor.toArray();
            res.send(result);
        });

        //  Singel user find with ID
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const quarry = { _id: ObjectId(id) };
            const result = await userCollection.findOne(quarry);
            res.send(result);
        });

        // Add user 
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });

        // update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            const quarry = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateData.name,
                    mobile: updateData.mobile,
                    email: updateData.email,
                    address: updateData.address,
                    city: updateData.city,
                    zip: updateData.zip
                }
            };
            const result = await userCollection.updateOne(quarry, updateDoc, option);
            res.send(result);
        });

        // Delete user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = userCollection.deleteOne(query);
            res.send(result);
        })
    }

    finally {
    }
}
run().catch(console.dir);


// app.get('/', async (req, res) => {
//     res.send(users);
// })

app.listen(port, () => {
    console.log('work properly');
})