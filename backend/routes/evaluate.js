const express = require('express');
const router = express.Router();
const { evaluateScript, compareScripts } = require('../services/openaiService');

router.post('/', async (req, res) => {
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

router.post('/compare', async (req, res) => {
  try {
    const { promoA, promoB, showName, genre, episodeRange } = req.body;
    if (!promoA || !promoB || !showName || !genre) return res.status(400).json({ success: false, message: 'Both promos, show name, and genre are required' });
    res.json({ success: true, evaluation: await compareScripts(promoA, promoB, showName, genre, episodeRange || '1-50') });
  } catch (error) { console.error('Comparison error:', error); res.status(500).json({ success: false, message: error.message || 'Comparison failed' }); }
});

module.exports = router;
