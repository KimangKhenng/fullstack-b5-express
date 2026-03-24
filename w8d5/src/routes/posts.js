import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController.js';
const postRouter = express.Router();

import { createPostValidator, getPostValidation, validateResult } from '../middlewares/index.js';


postRouter.get('/', getPostValidation, getAllPosts);

postRouter.get('/:id', getPostById);

postRouter.post('/', createPostValidator, createPost);

postRouter.put('/:id', updatePost);

postRouter.delete('/:id', deletePost);

export default postRouter;