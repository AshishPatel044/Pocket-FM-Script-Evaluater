import { useState } from 'react'
import ScoreCard from '../components/ScoreCard'
import FeedbackPanel from '../components/FeedbackPanel'
import ComparisonPanel from '../components/ComparisonPanel'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'rewrites', label: 'Rewrites & P0' },
]

export default function ResultPage({ result, showName, genre, onReset, script }) {
  const [tab, setTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = buildCopyText(result, showName, genre)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  function buildCopyText(r, show, gen) {
    const lines = [
      `PocketFM Script Evaluator — Results`,
      `Show: ${show} | Genre: ${gen}`,
      ``,
      `OVERALL SCORE: ${r.overallScore}/10 [${r.tier}] — ${r.tierLabel}`,
      ``,
      `PARAMETER SCORES:`,
      ...(r.parameterScores ? Object.entries(r.parameterScores).map(([k, v]) => `  ${k}: ${v.score}/10 — ${v.feedback}`) : []),
      ``,
      `WHAT'S WORKING:`,
      ...(r.whatIsWorking || []).map((p, i) => `  ${i + 1}. ${p}`),
      ``,
      `WEAK POINTS:`,
      ...(r.weakPoints || []).map((p, i) => `  ${i + 1}. ${p.issue}\n     Why: ${p.whyItFails}\n     Where: ${p.location}`),
      ``,
      `P0 COMPARISON:`,
      `  Closest P0: ${r.p0Comparison?.closestP0Script}`,
      `  What P0 does differently: ${r.p0Comparison?.whatP0DoesDifferently}`,
    ]
    return lines.join('\n')
  }

  return (
    <div className="fade-in">
      {/* Result header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Evaluation Results</h2>
          <p className="text-gray-400 text-sm mt-0.5">{showName} • {genre} Genre</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 border border-pocket-border text-gray-300 hover:text-white hover:border-gray-500 text-sm rounded-lg px-4 py-2 transition-colors"
          >
            {copied ? (
              <><span className="text-green-400">✓</span> Copied!</>
            ) : (
              <><span>📋</span> Copy Results</>
            )}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-pocket-orange hover:bg-pocket-orange-dim text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
          >
            + Evaluate Another
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-pocket-card border border-pocket-border rounded-xl p-1 mb-6 w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-pocket-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ScoreCard result={result} />
          <FeedbackPanel result={result} />
        </div>
      )}

      {tab === 'feedback' && (
        <div className="max-w-3xl">
          <FeedbackPanel result={result} />
        </div>
      )}

      {tab === 'rewrites' && (
        <div className="max-w-3xl">
          <ComparisonPanel result={result} />
        </div>
      )}
    </div>
  )
}
