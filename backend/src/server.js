import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import {protect} from './middleware/authMiddleware.js';
import rateLimiter from './middleware/rateLimiter.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/notes', protect, notesRoutes);

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});


// Get-NetTCPConnection -LocalPort 5001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }