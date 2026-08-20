const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Direct login — no OTP required
router.post('/login', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || 'pocketfm_secret_key_2024',
      { expiresIn: '7d' }
    );

    return res.json({ success: true, token, email });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

// Keep old routes as no-ops so any cached frontend calls don't crash
router.post('/send-otp', (req, res) => {
  res.json({ success: true, message: 'OTP not required. Use /login instead.' });
});

router.post('/verify-otp', (req, res) => {
  res.json({ success: true, message: 'OTP not required. Use /login instead.' });
});

module.exports = router;
