import express from 'express';
import {auth } from '../middleware/auth-middleware.js';
import {registerUser,loginUser, getCurrentUser} from '../controller/auth-controller.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me',auth,getCurrentUser)

export default router;