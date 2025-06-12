import express from 'express'

const router = express.Router()

// Mock data for demonstration
const generateTripRecommendation = (preferences: any): any => {
  const { country, budget, duration, numberOfPeople } = preferences
  
  // Calculate base costs based on budget level
  const budgetMultiplier = {
    low: 0.7,
    medium: 1,
    high: 1.5
  }[budget as 'low' | 'medium' | 'high']

  // Generate a realistic trip recommendation
  return {
    packingList: [
      'Passport and travel documents',
      'Weather-appropriate clothing',
      'Comfortable walking shoes',
      'Travel adapter',
      'First aid kit',
      'Camera',
      'Portable charger',
      'Travel-sized toiletries',
      'Daypack',
      'Water bottle'
    ],
    transportation: [
      {
        type: 'International Flight',
        details: `Round-trip flights to ${country} from major international airports`
      },
      {
        type: 'Local Transportation',
        details: 'Public transportation passes and taxi services available'
      }
    ],
    touristSpots: [
      {
        name: 'Historic City Center',
        description: 'Explore the rich cultural heritage and architecture',
        rating: 4.5
      },
      {
        name: 'Natural Park',
        description: 'Beautiful natural landscapes and hiking trails',
        rating: 4.8
      },
      {
        name: 'Local Museum',
        description: 'Learn about the local history and culture',
        rating: 4.2
      }
    ],
    restaurants: [
      {
        name: 'Local Cuisine Restaurant',
        cuisine: 'Local',
        priceRange: '$$',
        rating: 4.6
      },
      {
        name: 'International Fusion',
        cuisine: 'Fusion',
        priceRange: '$$$',
        rating: 4.4
      },
      {
        name: 'Street Food Market',
        cuisine: 'Local',
        priceRange: '$',
        rating: 4.7
      }
    ],
    funFacts: [
      `${country} is known for its unique cultural traditions`,
      'The local cuisine has been influenced by various cultures throughout history',
      'The country has several UNESCO World Heritage sites',
      'The local language has interesting historical roots',
      'The region is famous for its traditional arts and crafts'
    ],
    hotels: [
      {
        name: 'City Center Hotel',
        priceRange: '$$$',
        rating: 4.5,
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant']
      },
      {
        name: 'Boutique Hotel',
        priceRange: '$$',
        rating: 4.3,
        amenities: ['Free WiFi', 'Breakfast Included', 'Gym']
      },
      {
        name: 'Budget Hostel',
        priceRange: '$',
        rating: 4.0,
        amenities: ['Free WiFi', 'Shared Kitchen', 'Common Room']
      }
    ],
    events: [
      {
        name: 'Cultural Festival',
        date: 'During your stay',
        description: 'Annual celebration of local culture and traditions'
      },
      {
        name: 'Food Festival',
        date: 'Weekend event',
        description: 'Showcasing local cuisine and international dishes'
      }
    ],
    totalCost: {
      estimated: Math.round(1000 * budgetMultiplier * duration * numberOfPeople),
      currency: 'USD',
      breakdown: [
        {
          category: 'Accommodation',
          amount: Math.round(100 * budgetMultiplier * duration * numberOfPeople)
        },
        {
          category: 'Transportation',
          amount: Math.round(300 * budgetMultiplier * numberOfPeople)
        },
        {
          category: 'Food & Dining',
          amount: Math.round(50 * budgetMultiplier * duration * numberOfPeople)
        },
        {
          category: 'Activities & Entertainment',
          amount: Math.round(200 * budgetMultiplier * duration * numberOfPeople)
        },
        {
          category: 'Shopping & Souvenirs',
          amount: Math.round(100 * budgetMultiplier * numberOfPeople)
        }
      ]
    }
  }
}

router.post('/recommend', (req, res) => {
  try {
    const preferences: any = req.body
    const recommendation = generateTripRecommendation(preferences)
    res.json(recommendation)
  } catch (error) {
    console.error('Error generating trip recommendation:', error)
    res.status(500).json({ error: 'Failed to generate trip recommendation' })
  }
})

export const tripRoutes = router 