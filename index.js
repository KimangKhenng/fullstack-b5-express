import express from 'express';

const app = express()
const PORT = 3000

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to My First API',
        version: '1.0.0',
        endpoints: {
            home: '/',
            about: '/about',
            users: '/api/users',
            health: '/api/health'
        }
    });
});

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})