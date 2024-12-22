import dotenv from 'dotenv';  // Import dotenv
dotenv.config();  // Load .env file variables into process.env

import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, './frontend/dist')));
// CORS configuration
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/auth', authRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
});

// Access environment variables using process.env
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
