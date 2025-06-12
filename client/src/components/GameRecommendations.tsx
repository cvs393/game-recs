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
    <div className="space-y-8">
      {games.map(game => (
        <div key={game.id} className="bg-bluebg-50 rounded-[2rem] shadow-xl p-10 hover:shadow-2xl transition-shadow fade-in slide-up">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-24 h-24 bg-bluebg-200 rounded-2xl overflow-hidden">
              <img
                src={game.imageUrl || DEFAULT_IMAGE}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-2xl font-serif font-bold text-bluebg-800 mr-2 break-words max-w-full">
                  {game.title}
                </h3>
                {game.genres.map(genre => (
                  <span
                    key={genre}
                    className="inline-flex items-center px-3 py-0.5 rounded-pill text-sm font-semibold bg-bluebg-400 text-white shadow-sm max-w-[10rem] truncate"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-lg text-bluebg-700 font-sans leading-relaxed break-words whitespace-normal max-w-full">
                {game.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-base text-bluebg-900 font-medium">
                <span>Rating: <span className="font-bold">{game.rating.toFixed(1)}/10</span></span>
                <span className="text-bluebg-300">•</span>
                <span className="truncate max-w-[16rem]">Player Type: {game.playerTypes}</span>
                {onFavorite && (
                  <button
                    type="button"
                    className="ml-auto px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm rounded-pill font-bold text-white btn transition-all duration-200 scale-100 hover:scale-105 shadow whitespace-nowrap"
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