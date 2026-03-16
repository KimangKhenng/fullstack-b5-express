import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
const userRouter = express.Router();

// All routes start with /api/users

// GET /api/users
userRouter.get('/', getAllUsers);

// GET /api/users/:id
userRouter.get('/:id', getUserById);

// POST /api/users
userRouter.post('/', createUser);

// PUT /api/users/:id
userRouter.put('/:id', updateUser);

// DELETE /api/users/:id
userRouter.delete('/:id', deleteUser);

export default userRouter;