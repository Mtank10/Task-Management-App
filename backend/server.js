import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './connection/dbconfig.js';
import authRoutes from './routes/auth-routes.js';
import taskRoutes from './routes/task-routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Task Management API is running',
        timestamp: new Date().toISOString()
    });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});