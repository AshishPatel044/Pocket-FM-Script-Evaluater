export default function ScoreCard({ result }) {
  const score = result.overallScore
  const tier = result.tier
  const tierLabel = result.tierLabel

  const tierClass = tier === 'P0' ? 'tier-p0' : tier === 'P1' ? 'tier-p1' : 'tier-p2'
  const scoreColor = tier === 'P0' ? '#00C851' : tier === 'P1' ? '#FFBB33' : '#FF4444'

  const params = [
    { key: 'hookLine', label: 'Hook Line Quality', weight: '25%' },
    { key: 'context', label: 'Context Clarity', weight: '10%' },
    { key: 'sequence', label: 'Sequence Logic', weight: '15%' },
    { key: 'sceneDesign', label: 'Scene Design', weight: '15%' },
    { key: 'pacing', label: 'Pacing & Transitions', weight: '15%' },
    { key: 'ending', label: 'Ending & CTA', weight: '10%' },
    { key: 'ratio', label: 'Narration/Dialogue Ratio', weight: '10%' },
  ]

  function getBarColor(score) {
    if (score >= 8.5) return 'bg-green-500'
    if (score >= 6.5) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-pocket-card border border-pocket-border rounded-2xl overflow-hidden">
      {/* Score header */}
      <div className="p-8 text-center border-b border-pocket-border" style={{ background: `radial-gradient(ellipse at top, ${scoreColor}15, transparent 70%)` }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="text-7xl font-black" style={{ color: scoreColor }}>
            {typeof score === 'number' ? score.toFixed(1) : score}
          </span>
          <div className="text-left">
            <div className="text-gray-400 text-lg">/10</div>
            <div className={`${tierClass} text-sm font-bold px-3 py-1 rounded-full mt-1`}>{tier}</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{tierLabel}</p>
      </div>

      {/* Parameter breakdown */}
      <div className="p-6 space-y-4">
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
          Parameter Breakdown
        </h3>
        {params.map(param => {
          const data = result.parameterScores?.[param.key]
          if (!data) return null
          const pScore = data.score || 0
          const pct = (pScore / 10) * 100

          return (
            <div key={param.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{param.label}</span>
                  <span className="text-gray-600 text-xs">{param.weight}</span>
                </div>
                <span className="text-white font-bold text-sm">{pScore}/10</span>
              </div>
              <div className="w-full bg-[#111] rounded-full h-2 mb-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${getBarColor(pScore)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {data.feedback && (
                <p className="text-gray-400 text-xs">{data.feedback}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
