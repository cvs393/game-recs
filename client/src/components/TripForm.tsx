import { useState } from 'react'
import type { TripPreferences } from '../types'

interface TripFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  loading: boolean;
}

const TRAVEL_TYPES = ['vacation', 'work'] as const;
const BIOMES = ['beach', 'forest', 'mountain', 'plains', 'desert', 'underwater', 'urban', 'rural'] as const;
const FOOD_TYPES = ['local', 'american', 'italian', 'asian', 'mexican', 'mediterranean', 'indian', 'fusion'] as const;
const BUDGET_LEVELS = ['low', 'medium', 'high'] as const;

export function TripForm({ onSubmit, loading }: TripFormProps) {
  const [preferences, setPreferences] = useState<TripPreferences>({
    age: 25,
    gender: '',
    weather: '',
    travelType: 'vacation',
    biome: 'beach',
    country: '',
    foodType: 'local',
    budget: 'medium',
    numberOfPeople: 1,
    duration: 7
  });

  const handleChange = (field: keyof TripPreferences, value: string | number) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value === '' ? '' : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              min="1"
              max="120"
              value={preferences.age}
              onChange={(e) => handleChange('age', e.target.value === '' ? '' : parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <input
              type="text"
              value={preferences.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weather Preference</label>
            <input
              type="text"
              value={preferences.weather}
              onChange={(e) => handleChange('weather', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., sunny, mild, tropical"
              required
            />
          </div>
        </div>

        {/* Travel Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Travel Type</label>
            <select
              value={preferences.travelType}
              onChange={(e) => handleChange('travelType', e.target.value as 'vacation' | 'work')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {TRAVEL_TYPES.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Biome</label>
            <select
              value={preferences.biome}
              onChange={(e) => handleChange('biome', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {BIOMES.map(biome => (
                <option key={biome} value={biome}>
                  {biome.charAt(0).toUpperCase() + biome.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={preferences.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter destination country"
              required
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Type Preference</label>
            <select
              value={preferences.foodType}
              onChange={(e) => handleChange('foodType', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {FOOD_TYPES.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Budget Level</label>
            <select
              value={preferences.budget}
              onChange={(e) => handleChange('budget', e.target.value as 'low' | 'medium' | 'high')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {BUDGET_LEVELS.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)} Budget
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of People</label>
            <input
              type="number"
              min="1"
              max="20"
              value={preferences.numberOfPeople}
              onChange={(e) => handleChange('numberOfPeople', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
            <input
              type="number"
              min="1"
              max="90"
              value={preferences.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Planning Your Trip...' : 'Get Trip Recommendations'}
      </button>
    </form>
  );
} 