import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (!name.trim()) return
    onLogin('local-session', name.trim())
  }

  return (
    <div className="min-h-screen bg-pocket-bg flex items-center justify-center px-4">
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
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name to continue"
                className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-pocket-orange hover:bg-pocket-orange-dim disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 transition-colors"
            >
              Enter Tool →
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
