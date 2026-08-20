import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import EvaluatorPage from './pages/EvaluatorPage'

export default function App() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('pocketfm_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Basic expiry check — token lasts 24h, stored as timestamp
        if (parsed.loginTime && Date.now() - parsed.loginTime < 24 * 60 * 60 * 1000) {
          setAuth(parsed)
        } else {
          localStorage.removeItem('pocketfm_auth')
        }
      } catch {
        localStorage.removeItem('pocketfm_auth')
      }
    }
  }, [])

  function handleLogin(token, email) {
    const authData = { token, email, loginTime: Date.now() }
    localStorage.setItem('pocketfm_auth', JSON.stringify(authData))
    setAuth(authData)
  }

  function handleLogout() {
    localStorage.removeItem('pocketfm_auth')
    setAuth(null)
  }

  if (!auth) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <EvaluatorPage auth={auth} onLogout={handleLogout} />
}
