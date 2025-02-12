"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const studentControllerValidator_1 = require("../controllers/middleware/studentControllerValidator");
const router = express_1.default.Router();
router.post('/create', studentControllerValidator_1.validatorStudent, studentController_1.createStudent);
router.get('/getall', studentController_1.getStudents);
router.get('/get/:id', studentController_1.getStudentById);
router.put('/update/:id', studentController_1.updateStudent);
router.delete('/delete/:id', studentController_1.deleteStudent);
exports.default = router;
