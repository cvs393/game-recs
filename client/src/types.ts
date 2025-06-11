export interface Game {
  id: string
  title: string
  genres: string[]
  playerTypes: string
  description: string
  rating: number
  imageUrl: string
}

export interface GameFormProps {
  onSubmit: (genres: string[], playerType: string) => Promise<void>
  loading: boolean
}

export interface GameRecommendationsProps {
  games: Game[]
  loading: boolean
} 