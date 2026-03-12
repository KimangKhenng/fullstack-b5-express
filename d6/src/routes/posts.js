import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController.js';
const postRouter = express.Router();


postRouter.get('/', getAllPosts);

postRouter.get('/:id', getPostById);

postRouter.post('/', createPost);

postRouter.put('/:id', updatePost);

postRouter.delete('/:id', deletePost);

export default postRouter;