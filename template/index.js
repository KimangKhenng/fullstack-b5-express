import express from 'express';
const app = express();

app.use(express.json());


app.listen(3000, () => {
    console.log('Server D8 running on port 3000');
});