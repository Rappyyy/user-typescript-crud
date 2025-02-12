import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/userController';

import { validatorUser } from '../controllers/middleware/userControllerValidator';

const router = express.Router();

router.post('/create', validatorUser, createStudent);
router.get('/getall', getStudents);
router.get('/get/:id', getStudentById);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

export default router;
