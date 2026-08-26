// Deployment adapter. The backend owns the New Rule Set.docx rubric,
// source retrieval, benchmark comparison, and OpenAI call.
export const config = { maxDuration: 60 }

export default async function handler(req, res) {
  if (!['POST', 'OPTIONS'].includes(req.method)) return res.status(405).json({ success: false, message: 'Method not allowed' })
  if (req.method === 'OPTIONS') return res.status(204).end()
  // Vercel needs the public URL of the separately deployed backend. During
  // local development the Vite proxy handles /api, so this function is only
  // used when the frontend is deployed as its own Vercel project.
  const backend = process.env.BACKEND_URL || process.env.VITE_API_URL
  if (!backend) return res.status(500).json({ success: false, message: 'BACKEND_URL is not configured. Point it to the deployed evaluator backend.' })
  try {
    const backendUrl = backend.replace(/\/$/, '')
    const response = await fetch(`${backendUrl}/api/evaluate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(55000)
    })
    const body = await response.text()
    res.status(response.status).setHeader('content-type', 'application/json').send(body)
  } catch (error) {
    const detail = error.name === 'TimeoutError' ? 'the backend timed out' : error.message
    res.status(502).json({ success: false, message: `Evaluator backend unavailable: ${detail}. Check BACKEND_URL and the backend /api/health endpoint.` })
  }
}
