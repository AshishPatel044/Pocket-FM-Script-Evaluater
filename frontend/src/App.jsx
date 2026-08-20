import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import EvaluatorPage from './pages/EvaluatorPage'

export default function App() {
  const [auth, setAuth] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pocketfm_auth')
      if (stored) {
        const parsed = JSON.parse(stored)
        const age = Date.now() - (parsed.loginTime || 0)
        if (parsed.email && age < 7 * 24 * 60 * 60 * 1000) {
          setAuth(parsed)
        } else {
          localStorage.removeItem('pocketfm_auth')
        }
      }
    } catch {
      localStorage.removeItem('pocketfm_auth')
    }
    setReady(true)
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

  if (!ready) return null

  if (!auth) return <LoginPage onLogin={handleLogin} />

  return <EvaluatorPage auth={auth} onLogout={handleLogout} />
}
