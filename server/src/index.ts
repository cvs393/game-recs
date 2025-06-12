import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { gameRoutes } from './routes/games.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Security middleware
app.use(helmet()) // Adds various HTTP headers for security

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
})
app.use(limiter)

// CORS configuration
const allowedOrigins = [
  'https://cvs393.github.io',
  'http://localhost:5175' // For local development
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Body parsing middleware
app.use(express.json({ limit: '10kb' })) // Limit body size to 10kb

// Routes
app.use('/api/games', gameRoutes)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/game-recommender'
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }) 