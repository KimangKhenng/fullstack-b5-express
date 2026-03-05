import express, { json } from 'express';
import router from './routes/index.js';

const app = express()

const PORT = 3000

const posts = [
    { id: 1, title: 'First Post', content: 'Hello World', author: 'John' },
    { id: 2, title: 'Second Post', content: 'Learning Express', author: 'Jane' }
];

app.all('/', (req, res) => {
    const info = {
        // URL Information
        url: req.url,                    // '/users/123?sort=name'
        path: req.path,                  // '/users/123'
        originalUrl: req.originalUrl,    // Full URL with query
        baseUrl: req.baseUrl,            // Router mount path

        // HTTP Information
        method: req.method,              // 'GET', 'POST', etc.
        protocol: req.protocol,          // 'http' or 'https'
        secure: req.secure,              // true if https

        // Parameters
        params: req.params,              // Route parameters
        query: req.query,                // Query string
        body: req.body,                  // Request body (needs middleware)

        // Headers
        headers: req.headers,            // All headers
        get: req.get('Content-Type'),    // Specific header

        // Client Information
        ip: req.ip,                      // Client IP
        ips: req.ips,                    // If behind proxy
        hostname: req.hostname,          // Host from header

        // Cookies (needs cookie-parser)
        cookies: req.cookies,
        signedCookies: req.signedCookies
    };

    res.json(info);
});

// Match any route ending with 'fly'
app.get(/.*fly$/, (req, res) => {
    res.send('Matches butterfly, dragonfly, etc.');
});

// Match routes with numbers only
// app.get('/users/:id(\\d+)', (req, res) => {
//     res.json({ id: req.params.id }); // Only numeric IDs
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logRequest = (req, res, next) => {
    console.log(req.ip)
    next()
}

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

const validator = (req, res, next) => {
    if (req.body.name) {
        next();
    } else {
        res.status(400).json({ error: 'Name required' });
    }
};

app.use(logRequest)

app.use('/api', router)

// const createUser = (req, res) => {
//     const { name, email, age } = req.body;

//     console.log('Request body:', req.body);

//     res.status(201).json({
//         message: 'User created',
//         user: { name, email, age }
//     });
// }

// app.post('/users', [logger, validator], createUser);

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    res.json({ name, email, message });
});

// Root route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to My First API',
//         version: '1.0.0',
//         endpoints: {
//             home: '/',
//             about: '/about',
//             users: '/api/users',
//             health: '/api/health'
//         }
//     });
// });

app.get('/about', (req, res) => {
    res.json({
        name: 'My First API',
        description: 'A simple Express.js REST API',
        author: 'Your Name'
    });
});

// API routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.get('/api/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found'
        });
    }

    res.json({
        success: true,
        data: post
    });
});

app.get('/api/posts-search', (req, res) => {
    const { author } = req.query;
    console.log(author)

    if (!author) {
        return res.status(400).json({
            success: false,
            error: 'Author query parameter is required'
        });
    }

    const results = posts.filter(p =>
        p.author.toLowerCase().includes(author.toLowerCase())
    );

    res.json({
        success: true,
        count: results.length,
        data: results
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})