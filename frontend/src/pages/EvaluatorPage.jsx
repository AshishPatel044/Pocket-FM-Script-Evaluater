import { useState, useRef } from 'react'
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

// Extract text from .docx using mammoth (loaded from CDN via dynamic import)
async function extractDocx(file) {
  const arrayBuffer = await file.arrayBuffer()
  // mammoth is loaded via CDN script tag in index.html
  if (typeof mammoth === 'undefined') {
    throw new Error('DOCX parser not loaded. Please refresh and try again.')
  }
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

// Extract text from .pdf using PDF.js
async function extractPdf(file) {
  const arrayBuffer = await file.arrayBuffer()
  if (typeof pdfjsLib === 'undefined') {
    throw new Error('PDF parser not loaded. Please refresh and try again.')
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map(item => item.str).join(' ') + '\n'
  }
  return text
}

export default function EvaluatorPage({ auth, onLogout }) {
  const [form, setForm] = useState({
    showName: '',
    genre: 'Fantasy',
    episodeRange: '1-50',
    script: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [fileLoading, setFileLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    setFileLoading(true)
    setError('')
    setFileName(file.name)

    try {
      let text = ''
      const ext = file.name.split('.').pop().toLowerCase()

      if (ext === 'docx' || ext === 'doc') {
        text = await extractDocx(file)
      } else if (ext === 'pdf') {
        text = await extractPdf(file)
      } else {
        // plain text fallback
        text = await file.text()
      }

      if (!text.trim()) {
        setError('Could not extract text from the file. Please paste the script manually.')
        setFileName('')
      } else {
        setForm(f => ({ ...f, script: text.trim() }))
      }
    } catch (err) {
      setError('Failed to read file: ' + err.message)
      setFileName('')
    } finally {
      setFileLoading(false)
      // Reset input so same file can be re-uploaded
      e.target.value = ''
    }
  }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (data.success) {
        setResult(data.evaluation)
      } else {
        // Never logout on error — just show the error message
        setError(data.message || 'Evaluation failed. Please try again.')
      }
    } catch {
      setError('Cannot reach the evaluation server. Please check that the backend is running and VITE_API_URL is set correctly in Vercel.')
    } finally {
      clearInterval(msgInterval)
      setLoading(false)
      setLoadingMsg('')
    }
  }

  function handleReset() {
    setResult(null)
    setError('')
    setFileName('')
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
                <p className="text-gray-400 mt-1 text-sm">Paste your script or upload a file — get AI-powered feedback against P0 benchmarks</p>
              </div>

              <form onSubmit={handleEvaluate} className="space-y-5">
                {/* Show Name + Genre */}
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

                {/* Episode Range */}
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

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Script File</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-[#111] border-2 border-dashed border-pocket-border hover:border-pocket-orange rounded-lg px-4 py-5 flex items-center gap-4 cursor-pointer transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pocket-border group-hover:bg-pocket-orange/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      {fileLoading ? (
                        <svg className="animate-spin w-5 h-5 text-pocket-orange" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-pocket-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {fileName ? (
                        <>
                          <p className="text-white text-sm font-medium truncate">{fileName}</p>
                          <p className="text-green-400 text-xs mt-0.5">File loaded — script extracted below</p>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-300 text-sm">Click to upload .docx, .doc, or .pdf</p>
                          <p className="text-gray-500 text-xs mt-0.5">Text will be extracted automatically</p>
                        </>
                      )}
                    </div>
                    {fileName && (
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setFileName(''); setForm(f => ({ ...f, script: '' })) }}
                        className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx,.doc,.pdf,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Script Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Promo Script
                      <span className="text-gray-500 font-normal ml-1">(or paste directly)</span>
                    </label>
                    {form.script && (
                      <span className="text-xs text-gray-500">{form.script.split(/\s+/).filter(Boolean).length} words</span>
                    )}
                  </div>
                  <textarea
                    value={form.script}
                    onChange={e => { setForm(f => ({ ...f, script: e.target.value })); setError('') }}
                    placeholder="Paste your promo script here, or upload a file above..."
                    rows={14}
                    className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors resize-none font-mono text-sm leading-relaxed"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || fileLoading || !form.showName || !form.script.trim()}
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
                  {[
                    { tier: 'P0', range: '8.5 – 10.0', label: 'Top performer, ready to publish', cls: 'tier-p0' },
                    { tier: 'P1', range: '6.5 – 8.4', label: 'Good, needs specific fixes', cls: 'tier-p1' },
                    { tier: 'P2', range: 'Below 6.5', label: 'Weak, major rework required', cls: 'tier-p2' },
                  ].map(t => (
                    <div key={t.tier} className="flex items-center gap-3">
                      <span className={`${t.cls} text-xs font-bold px-2.5 py-1 rounded-full`}>{t.tier}</span>
                      <div>
                        <span className="text-white text-sm font-medium">{t.range}</span>
                        <span className="text-gray-400 text-xs ml-2">{t.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-pocket-orange">💡</span> Tips
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Upload .docx or .pdf — text extracts automatically</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Include hook, context, scenes, and CTA questions</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Select the correct genre for accurate P0 comparison</li>
                  <li className="flex items-start gap-2"><span className="text-gray-600 mt-0.5">•</span> Evaluation takes 15–30 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
