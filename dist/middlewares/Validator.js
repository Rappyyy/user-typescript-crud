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
exports.Validator = void 0;
const zod_1 = require("zod");
class Validator {
    execute(schema) {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.parseAsync(request.body);
                next(); // Validation passed, proceed to the next middleware
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    // Construct a proper error object for the error handler
                    const validationError = new Error(JSON.stringify(error.issues.map((e) => ({
                        path: e.path[0],
                        message: e.message,
                    }))));
                    validationError.status = 409; // Attach a status code to the error
                    return next(validationError); // Pass the error to the error-handling middleware
                }
                next(error); // Pass unexpected errors to the error handler
            }
        });
    }
}
exports.Validator = Validator;
