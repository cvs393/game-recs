import { useState } from 'react'
import { PasswordProtection } from './components/PasswordProtection'
import { GameRecommender } from './GameRecommender'

export function PasswordGate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [authExpiresAt, setAuthExpiresAt] = useState<number | null>(null)

  // Check if already authenticated on mount
  useState(() => {
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
  })

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

  return <GameRecommender 
    authToken={authToken} 
    expiresAt={authExpiresAt} 
    onLogout={handleLogout} 
  />
} 