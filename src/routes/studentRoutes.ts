import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';

const router = express.Router();

router.post('/create', createStudent);
router.get('/getall', getStudents);
router.get('/get/:id', getStudentById);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

export default router;
