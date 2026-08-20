export default function ComparisonPanel({ result }) {
  const p0 = result.p0Comparison
  if (!p0) return null

  return (
    <div className="space-y-6">
      {/* Rewrite Suggestions */}
      {result.rewriteSuggestions?.length > 0 && (
        <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="text-pocket-orange">✏️</span> Rewrite Suggestions
          </h3>
          <div className="space-y-6">
            {result.rewriteSuggestions.map((item, i) => (
              <div key={i}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Original */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full bg-red-500/30 border border-red-500/50 flex items-center justify-center">
                        <span className="text-red-400 text-xs">✗</span>
                      </div>
                      <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Original</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
                      <p className="text-gray-300 text-sm italic leading-relaxed">"{item.original}"</p>
                    </div>
                  </div>

                  {/* Rewritten */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/30 border border-green-500/50 flex items-center justify-center">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Rewritten</span>
                    </div>
                    <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
                      <p className="text-gray-200 text-sm leading-relaxed font-medium">"{item.rewritten}"</p>
                    </div>
                  </div>
                </div>

                {item.reason && (
                  <div className="mt-2 flex items-start gap-2">
                    <span className="text-pocket-orange text-xs flex-shrink-0 mt-0.5">→</span>
                    <p className="text-gray-400 text-xs">{item.reason}</p>
                  </div>
                )}

                {i < result.rewriteSuggestions.length - 1 && (
                  <div className="border-b border-pocket-border mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* P0 Comparison */}
      <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="text-yellow-400">🏆</span> P0 Benchmark Comparison
        </h3>

        <div className="bg-[#111] border border-pocket-border rounded-xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <span className="tier-p0 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">P0</span>
            <div>
              <p className="text-white font-semibold text-sm">{p0.closestP0Script}</p>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">{p0.whatP0DoesDifferently}</p>
            </div>
          </div>
        </div>

        {p0.keyLessons?.length > 0 && (
          <div>
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Key Lessons</h4>
            <div className="space-y-3">
              {p0.keyLessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pocket-orange/20 border border-pocket-orange/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-pocket-orange text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{lesson}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
