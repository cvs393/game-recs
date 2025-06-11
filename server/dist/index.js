import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { gameRoutes } from './routes/games.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors({
  origin: 'https://cvs393.github.io'
}));
app.use(express.json());
// Routes
app.use('/api/games', gameRoutes);
app.post('/api/games/recommend', (req, res) => {
  // your recommendation logic here
});
app.get('/', (req, res) => {
  res.send('Game Recommender API is running!');
});
// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/game-recommender';
mongoose.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
