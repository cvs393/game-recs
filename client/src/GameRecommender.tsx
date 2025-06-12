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
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-12 items-start justify-center">
          {/* Main Form: Slightly larger column */}
          <div className="card col-span-12 lg:col-span-4 flex flex-col items-center bg-bluebg-100 shadow-xl p-8 fade-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-bluebg-800 text-center">Find Your Next Game</h2>
            <GameForm onSubmit={handleSubmit} loading={loading} />
          </div>
          {/* Recommendations: Center column */}
          <div className="card col-span-12 lg:col-span-5 flex flex-col bg-white shadow-xl p-8 fade-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-bluebg-800">Recommended Games</h2>
            <GameRecommendations games={recommendations} loading={loading} onFavorite={handleFavorite} />
          </div>
          {/* Favorites: Rightmost column (wider, scrollable) */}
          <div className="card col-span-12 lg:col-span-3 flex flex-col min-w-[180px] min-h-[220px] bg-bluebg-50 shadow-xl p-6 fade-in relative">
            <button
              className="absolute top-3 right-3 text-bluebg-300 hover:text-red-500 transition-colors duration-200 text-lg"
              title="Clear Favorites"
              onClick={() => setFavorites([])}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-serif font-semibold mb-4 text-bluebg-800 text-center">Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-bluebg-700 text-base text-center font-serif">No favorites yet.</p>
            ) : (
              <ul className="flex flex-wrap gap-6 justify-center w-full mt-1 overflow-y-auto max-h-[260px]">
                {favorites.map(game => (
                  <li key={(game as any)._id || (game as any).id} className="slide-up">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="w-24 h-24 rounded-full object-cover border-2 border-bluebg-300 shadow-md mx-auto"
                    />
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