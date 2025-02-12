import express, { Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import studentRoutes from './routes/userRoutes';
import mySqlPool from './config/db';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/student', studentRoutes);


// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  let errorMessage = err.message || 'Internal server error';

  // If the error message is a JSON string (for validation errors), parse it
  try {
    errorMessage = JSON.parse(errorMessage);
  } catch {
    // If it’s not a JSON string, leave it as-is
  }

  res.status(statusCode).json({
    status: 'failed',
    message: statusCode === 409 ? 'Validation error' : 'Internal server error',
    errors: Array.isArray(errorMessage) ? errorMessage : [{ message: errorMessage }],
  });
});


const PORT = process.env.PORT || 8000;

mySqlPool
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
