import express from 'express';
import userRouter from './users.js';
import postRouter from './posts.js';
const router = express.Router();


// Mount routers
router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;