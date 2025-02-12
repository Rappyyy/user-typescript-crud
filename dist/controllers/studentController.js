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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const studentRepository_1 = require("./repository/implementation/studentRepository");
const studentRepo = new studentRepository_1.StudentRepository();
// Get all students
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentRepo.getStudents();
        res.status(200).json({
            success: true,
            message: 'All student records',
            totalStudents: students.length,
            data: students,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getting all student records',
            error
        });
    }
});
exports.getStudents = getStudents;
// Get student by ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({ success: false, message: 'Invalid or missing student ID' });
            return;
        }
        const student = yield studentRepo.getStudentById(studentId);
        if (!student) {
            res.status(404).json({ success: false, message: 'No records found' });
            return;
        }
        res.status(200).json({ success: true, studentDetails: student });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error in getting student by ID', error });
    }
});
exports.getStudentById = getStudentById;
// Create student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, roll_no, fees, medium } = req.body;
        // Ensure all required fields are provided
        if (!name || !roll_no || !fees || !medium) {
            res.status(400).json({ success: false, message: "Please provide all required fields" });
            return;
        }
        // Manual regex validation to check if 'name' contains numbers
        const nameRegex = /[0-9]/; // Matches any digit (0-9) in the name
        if (nameRegex.test(req.body.name)) { // Use .test() to check for numbers
            res.status(400).json({ success: false, message: "Invalid name: Name should not contain numbers" });
            return;
        }
        console.log(nameRegex.test(req.body.name));
        // Proceed with student creation if validation passes
        const newStudent = yield studentRepo.create({ name, roll_no, fees, medium });
        res.status(201).json({ success: true, message: "New student record created", student: newStudent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in creating student", error });
    }
});
exports.createStudent = createStudent;
// Update student
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const { name, roll_no, fees, medium } = req.body;
        if (!studentId) {
            res.status(400).json({ success: false, message: 'Invalid or missing student ID' });
            return;
        }
        const updatedStudent = yield studentRepo.updateStudent(studentId, { name, roll_no, fees, medium });
        res.status(200).json({ success: true, message: 'Student details updated successfully', student: updatedStudent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error in updating student details', error });
    }
});
exports.updateStudent = updateStudent;
// Delete student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({ success: false, message: 'Please provide a valid student ID' });
            return;
        }
        const deletedStudent = yield studentRepo.delete(studentId);
        res.status(200).json({ success: true, message: 'Student deleted successfully', student: deletedStudent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error in deleting student', error });
    }
});
exports.deleteStudent = deleteStudent;
