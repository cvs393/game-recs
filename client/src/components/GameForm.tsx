import { useState } from 'react'
import type { GameFormProps } from '../types'

const AVAILABLE_GENRES = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Simulation',
  'Sports',
  'Puzzle',
  'Platformer',
  'Fighting',
  'Racing',
  'MMO',
  'MOBA',
  'Battle Royale',
  'Horror',
  'Visual Novel'
]

const PLAYER_TYPES = [
  'Casual',
  'Competitive',
  'Social',
  'Hardcore',
  'Explorer',
  'Achiever',
  'Collector'
]

export function GameForm({ onSubmit, loading }: GameFormProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedPlayerType, setSelectedPlayerType] = useState<string>('')

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre)
      } else if (prev.length < 3) {
        return [...prev, genre]
      } else {
        return prev // Do not allow more than 3
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGenres.length > 0) {
      onSubmit(selectedGenres, selectedPlayerType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Up to 3 Favorite Genres
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AVAILABLE_GENRES.map(genre => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedGenres.includes(genre)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${selectedGenres.length >= 3 && !selectedGenres.includes(genre) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        {selectedGenres.length === 3 && (
          <p className="text-xs text-blue-600 mt-1">You can only select up to 3 genres.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What Type of Player Are You? <span className="text-gray-400">(Optional)</span>
        </label>
        <select
          value={selectedPlayerType}
          onChange={(e) => setSelectedPlayerType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select player type (optional)</option>
          {PLAYER_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || selectedGenres.length === 0}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (loading || selectedGenres.length === 0)
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {loading ? 'Finding Games...' : 'Get Recommendations'}
      </button>
    </form>
  )
} 