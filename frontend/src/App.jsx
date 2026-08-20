import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import EvaluatorPage from './pages/EvaluatorPage'

// Generate a valid HS256 JWT using the browser Web Crypto API.
// Uses the same default secret as the backend so Railway's old JWT
// middleware accepts it without any backend changes.
async function generateJWT(email) {
  const SECRET = 'pocketfm_secret_key_2024'

  function b64url(str) {
    return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  const header  = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const now     = Math.floor(Date.now() / 1000)
  const payload = b64url(JSON.stringify({ email, iat: now, exp: now + 60 * 60 * 24 * 7 }))
  const data    = `${header}.${payload}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const sig = b64url(String.fromCharCode(...new Uint8Array(sigBuffer)))

  return `${data}.${sig}`
}

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

  async function handleLogin(_, email) {
    const token = await generateJWT(email)
    const authData = { token, email, loginTime: Date.now() }
    localStorage.setItem('pocketfm_auth', JSON.stringify(authData))
    setAuth(authData)
  }

  function handleLogout() {
    localStorage.removeItem('pocketfm_auth')
    setAuth(null)
  }

  if (!ready) return null

  if (!auth) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <EvaluatorPage auth={auth} onLogout={handleLogout} />
}
