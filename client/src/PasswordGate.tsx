import { useState, useEffect } from 'react'
import { PasswordProtection } from './components/PasswordProtection'
import { GameRecommender } from './GameRecommender'
import { TripRecommender } from './TripRecommender'
import { Tabs } from './components/Tabs'

export function PasswordGate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [authExpiresAt, setAuthExpiresAt] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'games' | 'trips'>('games')

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const expiresAt = localStorage.getItem('authExpiresAt')
    
    if (token && expiresAt && parseInt(expiresAt) > Date.now()) {
      setAuthToken(token)
      setAuthExpiresAt(parseInt(expiresAt))
      setIsAuthenticated(true)
    } else if (token) {
      // Clear expired token
      localStorage.removeItem('authToken')
      localStorage.removeItem('authExpiresAt')
    }
  }, [])

  const handleAuthenticated = (token: string, expiresAt: number) => {
    setAuthToken(token)
    setAuthExpiresAt(expiresAt)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthToken(null)
    setAuthExpiresAt(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authExpiresAt')
  }

  // Only render the main app if authenticated
  if (!isAuthenticated || !authToken || !authExpiresAt) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />
  }

  // Set background color based on tab
  const tabBg = activeTab === 'games' ? 'bg-bluebg-50' : 'bg-primary-50'

  return (
    <div className={`min-h-screen ${tabBg} transition-colors duration-300`}>
      <header className={`${tabBg} shadow-none pb-2 pt-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-serif font-bold text-editorial tracking-tight">
              {activeTab === 'games' ? 'Game Recommender' : 'Trip Recommender'}
            </h1>
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-base px-6 py-2 rounded-pill font-serif"
            >
              Logout
            </button>
          </div>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      <div className="transition-colors duration-300">
        {activeTab === 'games' ? (
          <div className="bg-bluebg-50 min-h-[80vh] transition-colors duration-300">
            <GameRecommender 
              authToken={authToken} 
              expiresAt={authExpiresAt} 
              onLogout={handleLogout} 
            />
          </div>
        ) : (
          <div className="bg-primary-50 min-h-[80vh] transition-colors duration-300">
            <TripRecommender 
              authToken={authToken} 
              expiresAt={authExpiresAt} 
              onLogout={handleLogout} 
            />
          </div>
        )}
      </div>
    </div>
  )
} 