"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const db_1 = __importDefault(require("../config/db"));
// Get all students
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield db_1.default.query('SELECT * FROM students');
        res.status(200).json({
            success: true,
            message: 'All student records',
            totalStudents: data.length,
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getting all student records',
            error,
        });
    }
});
exports.getStudents = getStudents;
// Get student by ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({
                success: false,
                message: 'Invalid or missing student ID',
            });
            return;
        }
        const [data] = yield db_1.default.query('SELECT * FROM students WHERE id = ?', [studentId]);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getting student by ID',
            error,
        });
    }
});
exports.getStudentById = getStudentById;
// Create student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, roll_no, fees, medium } = req.body;
        if (!name || !roll_no || !fees || !medium) {
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
            return;
        }
        // if (req.body.name != String) {
        //   res.status(400).send({
        //     success:false,
        //     message: "Name should not be an integer"
        //   })
        //   return;
        // }
        const [result] = yield db_1.default.query('INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)', [name, roll_no, fees, medium]);
        res.status(201).json({
            success: true,
            message: 'New student record created',
            studentId: result.insertId,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in creating student',
            error,
        });
    }
});
exports.createStudent = createStudent;
// Update student
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [result] = yield db_1.default.query('UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?', [name, roll_no, fees, medium, studentId]);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in updating student details',
            error,
        });
    }
});
exports.updateStudent = updateStudent;
// Delete student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({
                success: false,
                message: 'Please provide a valid student ID',
            });
            return;
        }
        const [result] = yield db_1.default.query('DELETE FROM students WHERE id = ?', [studentId]);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in deleting student',
            error,
        });
    }
});
exports.deleteStudent = deleteStudent;
