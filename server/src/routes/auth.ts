import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Validation middleware
const validatePasswordRequest = [
  body('password')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Password is required')
]

// Verify password endpoint
router.post('/verify', validatePasswordRequest, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { password } = req.body
    const correctPassword = process.env.SITE_PASSWORD

    if (!correctPassword) {
      console.error('SITE_PASSWORD environment variable is not set')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    if (password === correctPassword) {
      // Generate a simple token that expires in 24 hours
      const token = Buffer.from(Date.now().toString()).toString('base64')
      res.json({ 
        success: true,
        token,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
      })
    } else {
      res.status(401).json({ 
        success: false,
        error: 'Invalid password' 
      })
    }
  } catch (error) {
    console.error('Error verifying password:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as authRoutes } 