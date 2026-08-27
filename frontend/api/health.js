// Deployment adapter for the separately deployed backend.
export default async function handler(req, res) {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }
  if (req.method === 'OPTIONS') return res.status(204).end()

  const backend = process.env.BACKEND_URL || process.env.VITE_API_URL
  if (!backend) return res.status(500).json({ success: false, message: 'BACKEND_URL is not configured.' })

  try {
    const response = await fetch(`${backend.replace(/\/$/, '')}/api/health`, {
      method: req.method === 'HEAD' ? 'HEAD' : 'GET',
      signal: AbortSignal.timeout(10000)
    })
    const body = await response.text()
    res.status(response.status).setHeader('content-type', 'application/json').send(body)
  } catch (error) {
    res.status(502).json({ success: false, message: `Evaluator backend unavailable: ${error.message}` })
  }
}
