import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { Game } from '../models/Game.js'

const router = express.Router()

// Validation middleware
const validateRecommendationRequest = [
  body('genres')
    .isArray()
    .withMessage('Genres must be an array')
    .notEmpty()
    .withMessage('At least one genre is required')
    .custom((genres: string[]) => {
      if (genres.length > 3) {
        throw new Error('Maximum of 3 genres allowed')
      }
      return true
    }),
  body('playerType')
    .optional()
    .isString()
    .withMessage('Player type must be a string')
]

// Get game recommendations based on genres and player type
router.post('/recommend', validateRecommendationRequest, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { genres, playerType } = req.body

    let query: any = { genres: { $in: genres } }
    if (playerType) {
      query.playerTypes = playerType
    }

    let games = await Game.find(query).sort({ rating: -1 }).limit(10)

    // Fallback: if no matches and playerType was provided, try just genres
    if (games.length === 0 && playerType) {
      games = await Game.find({ genres: { $in: genres } }).sort({ rating: -1 }).limit(10)
    }

    res.json(games)
  } catch (error) {
    console.error('Error getting game recommendations:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Validation middleware for adding games
const validateGameInput = [
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('genres')
    .isArray()
    .withMessage('Genres must be an array')
    .notEmpty()
    .withMessage('At least one genre is required'),
  body('playerTypes')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Player type is required'),
  body('description')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('rating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be between 0 and 10'),
  body('imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL')
]

// Add a new game (admin only in production)
router.post('/', validateGameInput, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const game = new Game(req.body)
    await game.save()
    res.status(201).json(game)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    console.error('Error adding game:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all games (for development)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const games = await Game.find().sort({ rating: -1 })
    res.json(games)
  } catch (error) {
    console.error('Error getting games:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as gameRoutes } 