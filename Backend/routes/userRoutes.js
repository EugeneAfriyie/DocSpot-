import express  from 'express';
import { loginuser, registeruser } from '../Controllers/userController.js';
import upload from '../Middleware/multer.js';




const userRouter = express.Router();

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)

export {userRouter}