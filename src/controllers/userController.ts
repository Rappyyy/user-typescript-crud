import { Request, Response } from 'express';
import { UserRepository } from './repository/implementation/userRepository';

const userRepo = new UserRepository();

// Get all students
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepo.getUsers();
    res.status(200).json({
      success: true,
      message: 'All student records',
      totalUsers: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in getting all student records',
      error
    });
  }
};

// Get student by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
      return;
    }

    const user = await userRepo.getUserById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: 'No records found' });
      return;
    }

    res.status(200).json({ success: true, studentDetails: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in getting student by ID', error });
  }
};

// Create student
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, middle_name, last_name, name_extension, email, password, username } = req.body;

    // Ensure all required fields are provided
    if (!first_name || !middle_name || !last_name || !name_extension || !email || !password) {
      res.status(400).json({ success: false, message: "Please provide all required fields" });
      return;
    }

    // Proceed with user creation if validation passes
    const newUser = await userRepo.create({ first_name, middle_name, last_name, name_extension, email, password, username });

    res.status(201).json({ success: true, message: "New user record created", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in creating user", error });
  }
};


// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const { first_name, middle_name, last_name, name_extension, email, password, username } = req.body;

    if (!userId) {
      res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
      return;
    }

    const updatedUser = await userRepo.updateUser(userId, { first_name, middle_name, last_name, name_extension, email, password, username });

    res.status(200).json({ success: true, message: 'User details updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in updating user details', error});
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ success: false, message: 'Please provide a valid user ID' });
      return;
    }

    const deletedUser = await userRepo.delete(userId);
    res.status(200).json({ success: true, message: 'Student deleted successfully', student: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in deleting student', error});
  }
};
