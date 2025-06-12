import { useState, useEffect } from 'react'
import axios from 'axios'

interface Props {
  onAuthenticated: (token: string, expiresAt: number) => void
}

export function PasswordProtection({ onAuthenticated }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const expiresAt = localStorage.getItem('authExpiresAt')
    
    if (token && expiresAt && parseInt(expiresAt) > Date.now()) {
      onAuthenticated(token, parseInt(expiresAt))
    } else if (token) {
      // Clear expired token
      localStorage.removeItem('authToken')
      localStorage.removeItem('authExpiresAt')
    }
  }, [onAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://game-recs.onrender.com'
      const response = await axios.post(`${apiUrl}/api/auth/verify`, { password })
      
      if (response.data.success) {
        const { token, expiresAt } = response.data
        localStorage.setItem('authToken', token)
        localStorage.setItem('authExpiresAt', expiresAt.toString())
        onAuthenticated(token, expiresAt)
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Incorrect password. Please try again.')
      } else {
        setError('An error occurred. Please try again.')
      }
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Game Recommender
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the password to access the site
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                error ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder="Enter password"
              disabled={loading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verifying...' : 'Access Site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 