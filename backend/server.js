require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CivicFix backend is running ✅');
});

const otpStore = {};

app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CivicFix <onboarding@resend.dev>',
        to: [email],
        subject: 'Your CivicFix Verification Code',
        html: `<div style="font-family: Arial, sans-serif;"><h2>CivicFix Verification</h2><p>Your OTP is:</p><h1>${otp}</h1><p>This code expires in 5 minutes.</p></div>`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ success: false, message: data.message || 'Failed to send email' });
    }

    console.log('OTP email sent:', data);
    res.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, code } = req.body;
  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
  }
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
  }
  if (record.otp !== code) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  delete otpStore[email];
  res.json({ success: true, message: 'OTP verified' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`CivicFix backend running on port ${PORT}`);
});