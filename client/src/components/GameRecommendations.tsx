import type { GameRecommendationsProps } from '../types'

const DEFAULT_IMAGE = '/default-game.png'

interface Props extends GameRecommendationsProps {
  onFavorite?: (game: any) => void
}

export function GameRecommendations({ games, loading, onFavorite }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>Select your preferences to get game recommendations</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {games.map(game => (
        <div key={game.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
              <img
                src={game.imageUrl || DEFAULT_IMAGE}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">{game.title}</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {game.genres.map(genre => (
                  <span
                    key={genre}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">{game.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  Rating: {game.rating.toFixed(1)}/10
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  Player Type: {game.playerTypes}
                </span>
                {onFavorite && (
                  <button
                    type="button"
                    className="ml-4 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-xs rounded font-semibold text-white"
                    onClick={() => onFavorite(game)}
                  >
                    ★ Favorite
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 