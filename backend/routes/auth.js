const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/otpService');

const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    if (!email.endsWith('@pocketfm.com')) {
      return res.status(403).json({ success: false, message: 'Access restricted to PocketFM team only.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, { otp, expiresAt });

    await sendOTP(email, otp);

    return res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
});

router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    if (!email.endsWith('@pocketfm.com')) {
      return res.status(403).json({ success: false, message: 'Access restricted to PocketFM team only.' });
    }

    const stored = otpStore.get(email);

    if (!stored) {
      return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    if (stored.otp !== otp.toString()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }

    otpStore.delete(email);

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || 'pocketfm_secret_key_2024',
      { expiresIn: '24h' }
    );

    return res.json({ success: true, token, email });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, message: 'Verification failed. Please try again.' });
  }
});

module.exports = router;
