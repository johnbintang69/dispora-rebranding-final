import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import upload from './config/multer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(session({
  secret: 'disporasemarangSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 jam
  },
}));

// Middleware untuk menangani error dari multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Kesalahan dari multer
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Kesalahan lainnya
    return res.status(400).json({ message: err.message });
  }
  next();
});

// Menyajikan file statis dari direktori public
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api', authRoutes);
app.use('/api/news', newsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Upload directory: ${path.join(__dirname, 'public/uploads')}`);
});

export { app, upload };