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
exports.StudentRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
class StudentRepository {
    create(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.default.query('INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)', [student.name, student.roll_no, student.fees, student.medium]);
            const createdStudent = Object.assign({ id: result.insertId.toString() }, student);
            return createdStudent;
        });
    }
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.default.query('SELECT * FROM students');
            return rows.map(row => ({
                id: row.id.toString(),
                name: row.name,
                roll_no: row.roll_no,
                fees: row.fees,
                medium: row.medium,
            }));
        });
    }
    getStudentById(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.default.query('SELECT * FROM students WHERE id = ?', [studentId]);
            if (rows.length === 0) {
                return undefined;
            }
            const student = rows[0];
            return {
                id: student.id.toString(),
                name: student.name,
                roll_no: student.roll_no,
                fees: student.fees,
                medium: student.medium,
            };
        });
    }
    updateStudent(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?', [student.name, student.roll_no, student.fees, student.medium, id]);
            return Object.assign({ id }, student);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.getStudentById(id);
            if (!student) {
                throw new Error('Student not found');
            }
            yield db_1.default.query('DELETE FROM students WHERE id = ?', [id]);
            return student;
        });
    }
}
exports.StudentRepository = StudentRepository;
