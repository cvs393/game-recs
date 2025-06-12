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

export interface TripPreferences {
  age: number;
  gender: string;
  weather: string;
  travelType: 'vacation' | 'work';
  biome: string;
  country: string;
  foodType: string;
  budget: 'low' | 'medium' | 'high';
  numberOfPeople: number;
  duration: number;
}

export interface TripRecommendation {
  packingList: string[];
  transportation: {
    type: string;
    details: string;
  }[];
  touristSpots: {
    name: string;
    description: string;
    rating: number;
  }[];
  restaurants: {
    name: string;
    cuisine: string;
    priceRange: string;
    rating: number;
  }[];
  funFacts: string[];
  hotels: {
    name: string;
    priceRange: string;
    rating: number;
    amenities: string[];
  }[];
  events: {
    name: string;
    date: string;
    description: string;
  }[];
  totalCost: {
    estimated: number;
    currency: string;
    breakdown: {
      category: string;
      amount: number;
    }[];
  };
}

export interface TabProps {
  activeTab: 'games' | 'trips';
  onTabChange: (tab: 'games' | 'trips') => void;
} 