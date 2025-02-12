"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/v1/student', studentRoutes_1.default);
// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    let errorMessage = err.message || 'Internal server error';
    // If the error message is a JSON string (for validation errors), parse it
    try {
        errorMessage = JSON.parse(errorMessage);
    }
    catch (_a) {
        // If it’s not a JSON string, leave it as-is
    }
    res.status(statusCode).json({
        status: 'failed',
        message: statusCode === 409 ? 'Validation error' : 'Internal server error',
        errors: Array.isArray(errorMessage) ? errorMessage : [{ message: errorMessage }],
    });
});
const PORT = process.env.PORT || 8000;
db_1.default
    .query('SELECT 1')
    .then(() => {
    console.log('MySQL DB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('MySQL connection error:', error);
});
