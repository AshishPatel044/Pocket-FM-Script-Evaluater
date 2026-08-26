require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const evaluateRoutes = require('./routes/evaluate');
const { catalog } = require('./services/docxKnowledgeBase');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow all origins so Vercel frontend can reach Railway backend
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PocketFM Script Evaluator API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/evaluate', evaluateRoutes);
app.get('/api/shows', (req, res) => res.json({ success: true, shows: catalog() }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Vercel imports the Express app as a serverless handler; local development
// still starts a normal HTTP server.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Script Evaluator backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
