import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email') // 'email' | 'otp'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function validateEmail(e) {
    return e && e.endsWith('@pocketfm.com')
  }

  async function handleSendOTP(e) {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Access restricted to PocketFM team only.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()

      if (data.success) {
        setStep('otp')
        setSuccess('OTP sent to your email. Check your inbox.')
      } else {
        setError(data.message || 'Failed to send OTP')
      }
    } catch {
      setError('Server error. Please check if backend is running.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault()
    setError('')

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })
      const data = await res.json()

      if (data.success) {
        onLogin(data.token, data.email)
      } else {
        setError(data.message || 'Invalid OTP')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleResendOTP() {
    setStep('email')
    setOtp('')
    setSuccess('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-pocket-bg flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pocket-orange opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pocket-orange opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
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

        {/* Card */}
        <div className="bg-pocket-card border border-pocket-border rounded-2xl p-8">
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="yourname@pocketfm.com"
                  className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors"
                  autoFocus
                  required
                />
                {email && !validateEmail(email) && (
                  <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
                    <span>⚠</span> Access restricted to @pocketfm.com emails only
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-pocket-orange hover:bg-pocket-orange-dim disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending OTP...
                  </span>
                ) : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">
                    Enter OTP
                  </label>
                  <span className="text-xs text-gray-500">{email}</span>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }}
                  placeholder="6-digit code"
                  className="w-full bg-[#111] border border-pocket-border text-white placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pocket-orange transition-colors text-center text-2xl tracking-widest font-bold"
                  autoFocus
                  maxLength={6}
                  inputMode="numeric"
                />
                <p className="mt-1.5 text-xs text-gray-500">OTP expires in 10 minutes</p>
              </div>

              {success && (
                <div className="bg-green-900/30 border border-green-700 text-green-400 text-sm rounded-lg px-4 py-3">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-pocket-orange hover:bg-pocket-orange-dim disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify & Login'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                className="w-full text-gray-400 hover:text-white text-sm transition-colors"
              >
                ← Change email or resend OTP
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Internal tool • PocketFM Content Team
        </p>
      </div>
    </div>
  )
}
