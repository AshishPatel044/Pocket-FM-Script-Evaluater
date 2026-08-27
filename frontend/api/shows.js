const DEFAULT_BACKEND = 'https://pocket-fm-script-evaluater-production.up.railway.app'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })
  const backend = (process.env.BACKEND_URL || process.env.VITE_API_URL || DEFAULT_BACKEND).replace(/\/$/, '')
  try {
    const response = await fetch(`${backend}/api/shows`, { signal: AbortSignal.timeout(10000) })
    const body = await response.text()
    res.status(response.status).setHeader('content-type', 'application/json').send(body)
  } catch (error) {
    res.status(502).json({ success: false, message: `Evaluator backend unavailable: ${error.message}` })
  }
}
