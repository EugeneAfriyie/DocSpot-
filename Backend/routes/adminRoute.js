import express  from 'express';
import upload from '../Middleware/multer.js';
import { addDoctor } from '../Controllers/adminController.js';




const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)


export {adminRouter}