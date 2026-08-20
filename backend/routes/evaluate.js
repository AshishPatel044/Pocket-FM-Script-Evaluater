const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { evaluateScript } = require('../services/claudeService');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pocketfm_secret_key_2024');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login again.' });
  }
}

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { script, showName, genre, episodeRange } = req.body;

    if (!script || !showName || !genre) {
      return res.status(400).json({ success: false, message: 'Script, show name, and genre are required' });
    }

    if (script.trim().length < 50) {
      return res.status(400).json({ success: false, message: 'Script is too short to evaluate. Please paste the full promo script.' });
    }

    const evaluation = await evaluateScript(script, showName, genre, episodeRange || '1-50');

    return res.json({ success: true, evaluation });
  } catch (error) {
    console.error('Evaluation error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Evaluation failed. Please try again.' });
  }
});

module.exports = router;
