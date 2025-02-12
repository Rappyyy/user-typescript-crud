"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorStudent = exports.StudentSchema = void 0;
const zod_1 = require("zod");
const Validator_1 = require("../../middlewares/Validator");
exports.StudentSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "name is required.",
        invalid_type_error: "name must be a string",
    })
        .trim()
        .min(1, "name cannot be empty")
        .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
    roll_no: zod_1.z
        .number({
        required_error: "roll_no is required.",
        invalid_type_error: "roll_no must be a string",
    })
        .min(6, "roll_no must be more than 5 characters"),
    fees: zod_1.z
        .string({
        required_error: "fees is required.",
        invalid_type_error: "fees must be a string",
    })
        .trim()
        .min(1, "please provide an amount")
        .max(10, "must not be more than 10 characters"),
    medium: zod_1.z
        .string({
        required_error: "medium is required.",
        invalid_type_error: "medium must be a string",
    })
        .trim()
        .min(1, "please provide a medium")
        .max(10, "must not be more than 10 characters"),
}).strict();
exports.validatorStudent = new Validator_1.Validator().execute(exports.StudentSchema);
