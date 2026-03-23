import express from 'express';
import router from './routes/index.js';
const app = express();
import 'dotenv/config'
import connectDB from './config/database.js';

connectDB()

app.use(express.json());

app.use('/api', router)

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err.message
    });
});

app.listen(3000, () => {
    console.log('Server W8 D4 running on port 3000');
});