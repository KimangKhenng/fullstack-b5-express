import express from 'express';
const postRouter = express.Router();

postRouter.use((req, res, next) => {
    console.log("Hello World from Post")
    next();
});

postRouter.get('/', (req, res) => {
    res.json({ message: 'Get all posts' });
});

postRouter.get('/:id', (req, res) => {
    res.json({ message: 'Get post', id: req.params.id });
});

postRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'Create post' });
});

export default postRouter;