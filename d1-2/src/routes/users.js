import express from 'express';
const userRouter = express.Router();

// All routes start with /api/users

// GET /api/users
userRouter.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
});

// GET /api/users/:id
userRouter.get('/:id', (req, res) => {
    res.json({ message: 'Get user', id: req.params.id });
});

// POST /api/users
userRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'Create user', data: req.body });
});

// PUT /api/users/:id
userRouter.put('/:id', (req, res) => {
    res.json({ message: 'Update user', id: req.params.id });
});

// DELETE /api/users/:id
userRouter.delete('/:id', (req, res) => {
    res.status(204).send();
});

export default userRouter;