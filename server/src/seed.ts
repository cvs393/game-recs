import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Game } from './models/Game.js'

dotenv.config()

const games = [
  // Action Games
  {
    title: "God of War Ragnarök",
    genres: ["Action", "Adventure"],
    playerTypes: ["Single Player", "Hardcore"],
    description: "An epic action-adventure game following Kratos and Atreus through Norse mythology with stunning visuals and intense combat.",
    rating: 9.4,
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png"
  },
  // Adventure Games
  {
    title: "The Legend of Zelda: Tears of the Kingdom",
    genres: ["Adventure", "Action", "RPG"],
    playerTypes: ["Single Player", "Explorer"],
    description: "An expansive open-world adventure with innovative gameplay mechanics and a rich story set in the land of Hyrule.",
    rating: 9.6,
    imageUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/zelda-tears-of-the-kingdom/hero"
  },
  // RPG Games
  {
    title: "Baldur's Gate 3",
    genres: ["RPG", "Strategy", "Adventure"],
    playerTypes: ["Single Player", "Multiplayer", "Hardcore"],
    description: "A critically acclaimed RPG with deep storytelling, tactical combat, and extensive character customization.",
    rating: 9.7,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg"
  },
  // Strategy Games
  {
    title: "Civilization VI",
    genres: ["Strategy", "Simulation"],
    playerTypes: ["Single Player", "Multiplayer", "Competitive"],
    description: "A turn-based strategy game where you build and lead a civilization from the Stone Age to the Information Age.",
    rating: 8.8,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg"
  },
  // Simulation Games
  {
    title: "Microsoft Flight Simulator",
    genres: ["Simulation", "Adventure"],
    playerTypes: ["Single Player", "Casual"],
    description: "A highly detailed flight simulator featuring real-world locations and realistic aircraft physics.",
    rating: 8.9,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/header.jpg"
  },
  // Sports Games
  {
    title: "FIFA 24",
    genres: ["Sports", "Simulation"],
    playerTypes: ["Single Player", "Multiplayer", "Competitive"],
    description: "The latest installment in the popular football simulation series with improved gameplay and realistic graphics.",
    rating: 8.5,
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202308/1020/0c8e831dae26a0a6d4c6c6c6c6c6c6c6.png"
  },
  // Puzzle Games
  {
    title: "Portal 2",
    genres: ["Puzzle", "Adventure"],
    playerTypes: ["Single Player", "Multiplayer", "Casual"],
    description: "A mind-bending puzzle game with innovative portal mechanics and witty humor.",
    rating: 9.5,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg"
  },
  // Platformer Games
  {
    title: "Hollow Knight",
    genres: ["Platformer", "Action", "Adventure"],
    playerTypes: ["Single Player", "Hardcore"],
    description: "A challenging metroidvania with beautiful hand-drawn art and tight platforming mechanics.",
    rating: 9.3,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg"
  },
  // Fighting Games
  {
    title: "Street Fighter 6",
    genres: ["Fighting", "Action"],
    playerTypes: ["Single Player", "Multiplayer", "Competitive"],
    description: "The latest entry in the iconic fighting game series with new mechanics and characters.",
    rating: 9.0,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1364780/header.jpg"
  },
  // Racing Games
  {
    title: "Forza Horizon 5",
    genres: ["Racing", "Simulation"],
    playerTypes: ["Single Player", "Multiplayer", "Casual"],
    description: "An open-world racing game set in Mexico with stunning visuals and extensive car customization.",
    rating: 9.2,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg"
  },
  // MMO Games
  {
    title: "Final Fantasy XIV",
    genres: ["MMO", "RPG"],
    playerTypes: ["Multiplayer", "Social", "Casual"],
    description: "A critically acclaimed MMORPG with a rich story, beautiful world, and engaging gameplay.",
    rating: 9.1,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/39210/header.jpg"
  },
  // MOBA Games
  {
    title: "Dota 2",
    genres: ["MOBA", "Strategy"],
    playerTypes: ["Multiplayer", "Competitive", "Hardcore"],
    description: "A complex and strategic MOBA with deep gameplay mechanics and a competitive scene.",
    rating: 8.7,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg"
  },
  // Battle Royale Games
  {
    title: "Fortnite",
    genres: ["Battle Royale", "Action"],
    playerTypes: ["Multiplayer", "Casual", "Social"],
    description: "A popular battle royale game with building mechanics and frequent content updates.",
    rating: 8.6,
    imageUrl: "https://cdn2.unrealengine.com/Fortnite/fortnite-chapter-4-og-1920x1080-2bb94c702298.png"
  },
  // Horror Games
  {
    title: "Resident Evil 4 Remake",
    genres: ["Horror", "Action", "Adventure"],
    playerTypes: ["Single Player", "Hardcore"],
    description: "A modern reimagining of the classic survival horror game with updated graphics and gameplay.",
    rating: 9.4,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg"
  },
  // Visual Novel Games
  {
    title: "Doki Doki Literature Club Plus!",
    genres: ["Visual Novel", "Horror"],
    playerTypes: ["Single Player", "Casual"],
    description: "A psychological horror visual novel that subverts expectations and breaks the fourth wall.",
    rating: 9.2,
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1388880/header.jpg"
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