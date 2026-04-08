import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController.js';
const postRouter = express.Router();

import { createPostValidator, getPostValidation, verifyJWT } from '../middlewares/index.js';


postRouter.get('/', verifyJWT, getPostValidation, getAllPosts);

postRouter.get('/:id', verifyJWT, getPostById);

postRouter.post('/', verifyJWT, createPostValidator, createPost);

postRouter.put('/:id', verifyJWT, updatePost);

postRouter.delete('/:id', verifyJWT, deletePost);

export default postRouter;