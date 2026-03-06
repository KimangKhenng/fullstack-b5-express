import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
const app = express();

app.use(express.json());
app.use(morgan('combined'))

app.use(helmet())

// 1. First middleware
app.use((req, res, next) => {
    console.log('1. Global middleware');
    next();
});

// 2. Second middleware
app.use((req, res, next) => {
    console.log('2. Another global middleware');
    next();
});

// 3. Route-specific middleware
app.get('/users',
    (req, res, next) => {
        console.log('3. Route middleware');
        next();
    },
    (req, res) => {
        console.log('4. Route handler');
        res.json({ message: 'Users' });
    }
);

app.get('/', (req, res) => {
    res.json({ "msg": "Hello from D4" })
})

app.get('/intentional-error', (req, res) => {
    throw Error('what?')
})


app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

app.listen(3000, () => {
    console.log('Server D4 running on port 3000');
});