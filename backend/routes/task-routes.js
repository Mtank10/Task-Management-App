import express from 'express';
import {auth} from '../middleware/auth-middleware.js';
import {getAllTasks, createTask, updateTask, deleteTask,getTaskById} from '../controller/task-controller.js';

const router = express.Router();


router.get('/',auth, getAllTasks);
router.get('/:id',auth, getTaskById);
router.post('/',auth, createTask);
router.put('/:id',auth, updateTask);
router.delete('/:id',auth, deleteTask);

export default router;
