import express from 'express';
import { login, logout, refresh } from '../controllers/authController.js';
const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);


export default authRouter;