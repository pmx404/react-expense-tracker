import express from'express';
import { signup, signIn } from '../controllers/auth.js';

const authRouter = express.Router()

authRouter.post('/signup',signup )
authRouter.post('/signin', signIn)

export default authRouter;