import { Request, Response } from 'express';
import mySqlPool from '../config/db';

// Get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const [data]: [any[], any] = await mySqlPool.query('SELECT * FROM students');

    res.status(200).json({
      success: true,
      message: 'All student records',
      totalStudents: data.length,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in getting all student records',
      error,
    });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      res.status(400).json({
        success: false,
        message: 'Invalid or missing student ID',
      });
      return;
    }

    const [data]: [any[], any] = await mySqlPool.query('SELECT * FROM students WHERE id = ?', [studentId]);

    if (data.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No records found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in getting student by ID',
      error,
    });
  }
};

// Create student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, roll_no, fees, medium } = req.body;

    if (!name || !roll_no || !fees || !medium) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
      return;
    }

    const [result]: [any, any] = await mySqlPool.query(
      'INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)',
      [name, roll_no, fees, medium]
    );

    res.status(201).json({
      success: true,
      message: 'New student record created',
      studentId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in creating student',
      error,
    });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;
    const { name, roll_no, fees, medium } = req.body;

    if (!studentId) {
      res.status(400).json({
        success: false,
        message: 'Invalid or missing student ID',
      });
      return;
    }

    const [result]: [any, any] = await mySqlPool.query(
      'UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?',
      [name, roll_no, fees, medium, studentId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'No student found to update',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student details updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in updating student details',
      error,
    });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid student ID',
      });
      return;
    }

    const [result]: [any, any] = await mySqlPool.query('DELETE FROM students WHERE id = ?', [studentId]);

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'No student found to delete',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in deleting student',
      error,
    });
  }
};
