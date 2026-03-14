import express  from 'express';
import upload from '../Middleware/multer.js';
import { addDoctor, adminLogin } from '../Controllers/adminController.js';




const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)
adminRouter.post('/admin-login', adminLogin)

export {adminRouter}