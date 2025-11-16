import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();

// Behind Render/Heroku/Vercel proxies - required so "secure" cookies work
app.set('trust proxy', 1);

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' ? clientOrigin : true,
  credentials: true 
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


