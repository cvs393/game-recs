import express, { Request, Response } from 'express'
import { Game } from '../models/Game.js'

const router = express.Router()

// Get game recommendations based on genres and player type
router.post('/recommend', async (req: Request, res: Response) => {
  try {
    const { genres, playerType } = req.body

    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return res.status(400).json({ error: 'Genres are required and must be an array' })
    }

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

// Add a new game (admin only in production)
router.post('/', async (req: Request, res: Response) => {
  try {
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

export const gameRoutes = router 