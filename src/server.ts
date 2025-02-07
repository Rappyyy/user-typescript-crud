import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import mySqlPool from './config/db';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/student', studentRoutes);

app.get('/test', async (req: Request, res: Response) => {
  try {
    const [rows] = await mySqlPool.query('SELECT 1');
    res.status(200).send('<h1>Test Route Working</h1>');
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).send('Database connection error');
  }
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
