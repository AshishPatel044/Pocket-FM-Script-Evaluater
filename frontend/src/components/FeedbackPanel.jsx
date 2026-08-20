import { useState } from 'react'

export default function FeedbackPanel({ result }) {
  const [expandedWeak, setExpandedWeak] = useState(null)

  return (
    <div className="space-y-6">
      {/* What's Working */}
      {result.whatIsWorking?.length > 0 && (
        <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400 text-lg">✓</span> What's Working
          </h3>
          <ul className="space-y-3">
            {result.whatIsWorking.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weak Points */}
      {result.weakPoints?.length > 0 && (
        <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-400 text-lg">⚠</span> Weak Points
          </h3>
          <div className="space-y-3">
            {result.weakPoints.map((point, i) => (
              <div key={i} className="border border-red-900/50 bg-red-950/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedWeak(expandedWeak === i ? null : i)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-red-950/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-gray-200 text-sm font-medium">{point.issue}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ml-2 ${expandedWeak === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {expandedWeak === i && (
                  <div className="px-4 pb-4 space-y-2 border-t border-red-900/30">
                    {point.whyItFails && (
                      <div className="pt-3">
                        <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Why It Fails</span>
                        <p className="text-gray-300 text-sm mt-1">{point.whyItFails}</p>
                      </div>
                    )}
                    {point.location && (
                      <div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Location</span>
                        <p className="text-gray-400 text-sm mt-1 italic">{point.location}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Genre-Specific Feedback */}
      {result.genreSpecificFeedback && (
        <div className="bg-pocket-card border border-pocket-border rounded-xl p-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-400">🎭</span> Genre-Specific Feedback
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{result.genreSpecificFeedback}</p>
        </div>
      )}
    </div>
  )
}
