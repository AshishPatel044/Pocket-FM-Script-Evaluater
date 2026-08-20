const nodemailer = require('nodemailer');

function createTransporter() {
  // Use Gmail SMTP if credentials provided, else use Ethereal for dev
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Fallback: SMTP2GO or any generic SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    }
  });
}

async function sendOTP(email, otp) {
  // If no email config, log OTP to console (dev mode)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`\n🔐 DEV MODE — OTP for ${email}: ${otp}\n`);
    return { messageId: 'dev-mode', previewUrl: null };
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"PocketFM Script Evaluator" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your PocketFM Script Evaluator OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0F0F0F; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #FF4500; font-size: 24px; margin: 0;">PocketFM</h1>
          <p style="color: #999; font-size: 14px; margin-top: 4px;">Script Evaluator Tool</p>
        </div>
        <div style="background: #1A1A1A; border-radius: 8px; padding: 24px; text-align: center;">
          <p style="color: #CCC; font-size: 16px; margin-bottom: 16px;">Your one-time password is:</p>
          <div style="font-size: 40px; font-weight: bold; color: #FF4500; letter-spacing: 8px; margin: 16px 0;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 13px; margin-top: 16px;">This OTP expires in <strong style="color: #FFF;">10 minutes</strong>.</p>
          <p style="color: #888; font-size: 13px;">Do not share this with anyone.</p>
        </div>
        <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = { sendOTP };
