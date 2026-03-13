import express from 'express';
// Let dotenv load .env file and extract its content into process.env
import 'dotenv/config'
import { client } from './db.js'
import { ObjectId } from 'mongodb';

// await connect().catch(console.dir);
const app = express();
app.use(express.json())

await client.connect();
const db = client.db('fullstack-b5');
const usersCollection = db.collection('users')

const checkObjectId = (req, res, next) => {
    if (req.params.userId.length != 24) {
        return res.status(400).json({ msg: "Invalid ObjectId!" })
    }
    next()
}

app.use(express.json());

app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;
    const result = await usersCollection.insertOne({
        name: name,
        email: email,
        age: parseInt(age),
        createdAt: new Date()
    })
    return res.json(result)
})

app.get('/api/users', async (req, res) => {
    // Give me all you have in Users collection
    const users = await usersCollection.find({}).toArray();
    return res.json(users)
})

app.get('/api/users/:userId', checkObjectId, async (req, res) => {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.userId) })
    if (user) {
        return res.json(user)
    }
    return res.json({ msg: "User not found!" })
})


app.listen(3000, () => {
    console.log('Server D4 running on port 3000');
});