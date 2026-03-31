import express from 'express';
import userRouter from './users.js';
import postRouter from './posts.js';
import fileRouter from './files.js';
import authRouter from './auth.js';
const router = express.Router();


// Mount routers
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/files', fileRouter);
router.use('/auth', authRouter)

export default router;