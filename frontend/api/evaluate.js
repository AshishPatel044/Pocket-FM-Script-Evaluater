// Deployment adapter. The backend owns the New Rule Set.docx rubric,
// source retrieval, benchmark comparison, and OpenAI call.
export const config = { maxDuration: 60 }

export default async function handler(req, res) {
  if (!['POST', 'OPTIONS'].includes(req.method)) return res.status(405).json({ success: false, message: 'Method not allowed' })
  if (req.method === 'OPTIONS') return res.status(204).end()
  const backend = process.env.BACKEND_URL || process.env.VITE_API_URL
  if (!backend) return res.status(500).json({ success: false, message: 'BACKEND_URL is not configured. Point it to the deployed evaluator backend.' })
  try {
    const response = await fetch(`${backend.replace(/\/$/, '')}/api/evaluate`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(req.body) })
    const body = await response.text()
    res.status(response.status).setHeader('content-type', 'application/json').send(body)
  } catch (error) { res.status(502).json({ success: false, message: `Evaluator backend unavailable: ${error.message}` }) }
}
