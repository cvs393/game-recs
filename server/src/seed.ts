import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Game } from './models/Game.js'

dotenv.config()

const games = [
  {
    title: "The Witcher 3: Wild Hunt",
    genres: ["RPG", "Action", "Open World"],
    playerTypes: "Single Player",
    description: "An epic open-world RPG with a compelling story and memorable characters.",
    rating: 9.5,
    imageUrl: "https://cdn2.steamgriddb.com/icon_thumb/ee9a1fc09b64d5cdd17ba7b7f6640409.png"
  },
  {
    title: "Overwatch 2",
    genres: ["FPS", "Team-Based", "Multiplayer"],
    playerTypes: "Multiplayer",
    description: "A team-based first-person shooter with unique heroes and abilities.",
    rating: 8.5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_2_cover_art.jpg"
  },
  {
    title: "Stardew Valley",
    genres: ["Simulation", "RPG", "Farming"],
    playerTypes: "Single Player",
    description: "A relaxing farming simulation game with RPG elements.",
    rating: 9.0,
    imageUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.6435-9/82176211_3575210549185859_4304681382447153152_n.png?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lSEemIaVlLUQ7kNvwG6mlkM&_nc_oc=AdlcPsbF5LFfcGhG9DZFt6iJMZLQD-8WgWGqnmNXEXUvOlcMQa-T-wvkxapb4GK7XE0JfVGXEQkhzBgO5qyy11Nd&_nc_zt=23&_nc_ht=scontent-lhr8-1.xx&_nc_gid=AvWKR2YzB1YzPywL9imfpQ&oh=00_AfO3fYHY8qxg-iUc9rGCSoUFAEYDFlAxUxmQxErPUlMFhA&oe=6870E43E"
  },
  {
    title: "League of Legends",
    genres: ["MOBA", "Strategy", "Multiplayer"],
    playerTypes: "Multiplayer",
    description: "A competitive team-based strategy game with unique champions.",
    rating: 8.8,
    imageUrl: "https://play-lh.googleusercontent.com/8egRWHqpQkJMqfKxgT1Vhm2nk0xMxT4ykL3mgkw8EWdaR8A-HwoaLHc7wDLnX6RTFtk"
  },
  {
    title: "Red Dead Redemption 2",
    genres: ["Action", "Adventure", "Open World"],
    playerTypes: "Single Player",
    description: "An epic western-themed action-adventure game with a rich story.",
    rating: 9.7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg"
  }
]

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/game-recommender'
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing games
    await Game.deleteMany({})
    console.log('Cleared existing games')

    // Insert new games
    await Game.insertMany(games)
    console.log('Added sample games to database')

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase() 