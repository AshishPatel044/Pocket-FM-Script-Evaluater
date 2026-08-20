import { useState } from 'react'
import ResultPage from './ResultPage'

const API_URL = import.meta.env.VITE_API_URL || ''

const LOADING_MESSAGES = [
  'Reading your script...',
  'Analyzing hook line quality...',
  'Checking sequence logic...',
  'Evaluating scene design...',
  'Comparing with P0 benchmarks...',
  'Scoring pacing & transitions...',
  'Generating detailed feedback...',
  'Almost there...',
]

export default function EvaluatorPage({ auth, onLogout }) {
  const [form, setForm] = useState({
    showName: '',
    genre: 'Fantasy',
    episodeRange: '1-50',
    script: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleEvaluate(e) {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!form.script.trim() || form.script.trim().length < 50) {
      setError('Please paste a complete promo script (minimum 50 characters)')
      return
    }

    setLoading(true)
    let msgIndex = 0
    setLoadingMsg(LOADING_MESSAGES[0])

    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIndex])
    }, 3000)

    try {
      const res = await fetch(`${API_URL}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (data.success) {
        setResult(data.evaluation)
      } else {
        if (res.status === 401) {
          onLogout()
          return
        }
        setError(data.message || 'Evaluation failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      clearInterval(msgInterval)
      setLoading(false)
      setLoadingMsg('')
    }
  }

  function handleReset() {
    setResult(null)
    setError('')
    setForm(f => ({ ...f, script: '' }))
  }

  return (
    <div className="min-h-screen bg-pocket-bg">
      {/* Header */}
      <header className="bg-pocket-card border-b border-pocket-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pocket-orange rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <span className="text-white font-bold">PocketFM</span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <span className="text-gray-400 text-sm hidden sm:inline">Script Evaluator</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">{auth.email}</span>
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-white text-sm border border-pocket-border hover:border-gray-500 rounded-lg px-3 py-1.5 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {result ? (
          <ResultPage
            result={result}
            showName={form.showName}
            genre={form.genre}
            onReset={handleReset}
            script={form.script}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Evaluate a Promo Script</h2>
                <p className="text-gray-400 mt-1 text-sm">Paste your script and get AI-powered feedback against P0 benchmarks</p>
              </div>

              <form onSubmit={handleEvaluate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Show Name</label>
                    <input
                      type="text"
                      value={form.showName}
                      onChange={e => setForm(f => ({ ...f, showName: e.target.value }))}
                      placeholder="e.g. The Warrior"
                      className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-pocket-orange transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                    <select
                      value={form.genre}
                      onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
                      className="w-full bg-[#111] border border-pocket-border text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-pocket-orange transition-colors"
                    >
                      <option value="Fantasy">Fantasy</option>
                      <option value="Drama">Drama</option>
                      <option value="Horror">Horror</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Episode Range</label>
                  <input
                    type="text"
                    value={form.episodeRange}
                    onChange={e => setForm(f => ({ ...f, episodeRange: e.target.value }))}
                    placeholder="e.g. 1-50"
                    className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-pocket-orange transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Promo Script</label>
                    {form.script && (
                      <span className="text-xs text-gray-500">{form.script.split(/\s+/).filter(Boolean).length} words</span>
                    )}
                  </div>
                  <textarea
                    value={form.script}
                    onChange={e => { setForm(f => ({ ...f, script: e.target.value })); setError('') }}
                    placeholder="Paste your promo script here...&#10;&#10;Start with the hook line, followed by context, scenes, and CTA questions."
                    rows={18}
                    className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors resize-none font-mono text-sm leading-relaxed"
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
                  disabled={loading || !form.showName || !form.script.trim()}
                  className="w-full bg-pocket-orange hover:bg-pocket-orange-dim disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3.5 transition-colors text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {loadingMsg}
                    </span>
                  ) : '⚡ Evaluate Script'}
                </button>
              </form>
            </div>

            {/* Right: Info panel */}
            <div className="fade-in space-y-5">
              <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-pocket-orange">📊</span> What Gets Evaluated
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Hook Line Quality', weight: '25%', color: 'bg-pocket-orange' },
                    { label: 'Context Clarity', weight: '10%', color: 'bg-yellow-500' },
                    { label: 'Sequence Logic', weight: '15%', color: 'bg-blue-500' },
                    { label: 'Scene Design', weight: '15%', color: 'bg-purple-500' },
                    { label: 'Pacing & Transitions', weight: '15%', color: 'bg-cyan-500' },
                    { label: 'Ending & CTA', weight: '10%', color: 'bg-green-500' },
                    { label: 'Narration/Dialogue Ratio', weight: '10%', color: 'bg-pink-500' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                      <span className="text-gray-300 text-sm flex-1">{item.label}</span>
                      <span className="text-gray-500 text-xs">{item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-pocket-orange">🏆</span> Performance Tiers
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="tier-p0 text-xs font-bold px-2.5 py-1 rounded-full">P0</span>
                    <div>
                      <span className="text-white text-sm font-medium">8.5 – 10.0</span>
                      <span className="text-gray-400 text-xs ml-2">Top performer, ready to publish</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tier-p1 text-xs font-bold px-2.5 py-1 rounded-full">P1</span>
                    <div>
                      <span className="text-white text-sm font-medium">6.5 – 8.4</span>
                      <span className="text-gray-400 text-xs ml-2">Good, needs specific fixes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tier-p2 text-xs font-bold px-2.5 py-1 rounded-full">P2</span>
                    <div>
                      <span className="text-white text-sm font-medium">Below 6.5</span>
                      <span className="text-gray-400 text-xs ml-2">Weak, major rework required</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-pocket-orange">💡</span> Tips Before Submitting
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Include the complete promo with hook, context, scenes, and CTA</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Select the correct genre for accurate P0 benchmark comparison</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Evaluation takes 15-30 seconds — Claude analyzes every element</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> You'll get rewrite suggestions for weak sections</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
