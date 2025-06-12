import { useState, useEffect } from 'react'
import axios from 'axios'
import { GameForm } from './components/GameForm'
import { GameRecommendations } from './components/GameRecommendations'
import { Game } from './types'

interface Props {
  authToken: string
  expiresAt: number
  onLogout: () => void
}

export function GameRecommender({ authToken, expiresAt, onLogout }: Props) {
  const [recommendations, setRecommendations] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Game[]>([])

  // Set up axios with auth token
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }, [authToken])

  // Check token expiration
  useEffect(() => {
    if (expiresAt < Date.now()) {
      onLogout()
    }
  }, [expiresAt, onLogout])

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const handleSubmit = async (genres: string[], playerType: string) => {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://game-recs.onrender.com'
      const response = await axios.post(`${apiUrl}/api/games/recommend`, {
        genres,
        ...(playerType ? { playerType } : {})
      })
      setRecommendations(response.data)
    } catch (error) {
      setError('Failed to fetch game recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = (game: Game) => {
    const gameId = (game as any)._id || (game as any).id
    if (!favorites.some(fav => ((fav as any)._id || (fav as any).id) === gameId)) {
      setFavorites(prev => [...prev, game])
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-base text-red-600 font-serif">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Form: Largest column */}
          <div className="card col-span-5 flex flex-col justify-between bg-white/80 shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-6 text-editorial">Find Your Next Game</h2>
            <GameForm onSubmit={handleSubmit} loading={loading} />
          </div>
          {/* Recommendations: Middle column */}
          <div className="card col-span-5 flex flex-col justify-between bg-white/80 shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-6 text-editorial">Recommended Games</h2>
            <GameRecommendations games={recommendations} loading={loading} onFavorite={handleFavorite} />
          </div>
          {/* Favorites: Rightmost column */}
          <div className="card col-span-2 flex flex-col min-w-0 bg-white/80 shadow-lg">
            <h2 className="text-lg font-serif font-semibold mb-4 text-editorial text-center">Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-editorial text-sm text-center font-serif">No favorites yet.</p>
            ) : (
              <ul className="space-y-3 w-full">
                {favorites.map(game => (
                  <li key={(game as any)._id || (game as any).id} className="flex items-center space-x-2 w-full">
                    <img src={game.imageUrl} alt={game.title} className="w-10 h-10 rounded object-cover" />
                    <span className="text-sm font-medium truncate font-serif" title={game.title}>{game.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 