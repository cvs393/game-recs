import { useState, useEffect } from 'react'
import axios from 'axios'
import { TripForm } from './components/TripForm'
import { TripRecommendations } from './components/TripRecommendations'
import type { TripPreferences, TripRecommendation } from './types'

interface Props {
  authToken: string
  expiresAt: number
  onLogout: () => void
}

export function TripRecommender({ authToken, expiresAt, onLogout }: Props) {
  const [recommendation, setRecommendation] = useState<TripRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (preferences: TripPreferences) => {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const response = await axios.post(`${apiUrl}/api/trips/recommend`, preferences)
      setRecommendation(response.data)
    } catch (error) {
      setError('Failed to fetch trip recommendations. Please try again.')
    } finally {
      setLoading(false)
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Main Form: Largest column */}
          <div className="card col-span-5 flex flex-col items-center bg-accent-50 shadow-xl p-12 fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-editorial text-center">Plan Your Trip</h2>
            <TripForm onSubmit={handleSubmit} loading={loading} />
          </div>
          {/* Recommendations: Middle column */}
          <div className="card col-span-7 flex flex-col bg-primary-50 shadow-xl p-12 fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-editorial">Your Trip Plan</h2>
            <TripRecommendations recommendation={recommendation} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  )
} 