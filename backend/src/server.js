import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import notesRoutes from './routes/notesRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(rateLimiter);

const PORT = process.env.PORT || 5001;


app.use('/api/notes', notesRoutes);~

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});


// Get-NetTCPConnection -LocalPort 5001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }