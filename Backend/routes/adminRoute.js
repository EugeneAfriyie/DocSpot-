import express  from 'express';
import upload from '../Middleware/multer.js';
import { addDoctor, adminLogin } from '../Controllers/adminController.js';
import authAdminMiddleware from '../Middleware/authAdminMiddleware.js';




const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdminMiddleware, upload.single('image'), addDoctor)
adminRouter.post('/admin-login', adminLogin)

export {adminRouter}