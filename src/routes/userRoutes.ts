import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

import { validatorUser } from '../controllers/middleware/userControllerValidator';

const userRoutes = express.Router();

userRoutes.post('/create', validatorUser, createUser);
userRoutes.get('/getall', getUsers);
userRoutes.get('/get/:id', getUserById);

userRoutes.put('/update/:id', updateUser);
userRoutes.delete('/delete/:id', deleteUser);

export default userRoutes;
