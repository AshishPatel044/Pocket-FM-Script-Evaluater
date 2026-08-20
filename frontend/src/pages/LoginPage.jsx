import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your name or email')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await res.json()

      if (data.success) {
        onLogin(data.token, data.email)
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch {
      setError('Cannot reach server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-pocket-bg flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pocket-orange opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pocket-orange opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pocket-orange rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">PocketFM</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Script Evaluator</h1>
          <p className="text-gray-400 text-sm">AI-powered promo script analysis tool</p>
        </div>

        <div className="bg-pocket-card border border-pocket-border rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name or Email
              </label>
              <input
                type="text"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="e.g. Ashish or ashish@pocketfm.com"
                className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors"
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full bg-pocket-orange hover:bg-pocket-orange-dim disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Logging in...
                </span>
              ) : 'Enter Tool →'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Internal tool • PocketFM Content Team
        </p>
      </div>
    </div>
  )
}
