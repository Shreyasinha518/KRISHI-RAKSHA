// ===================================================================
// FILE 2: backend/config/mail.js
// Gmail SMTP for Email Verification
// ===================================================================

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'KRISHI RAKSHA - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to KRISHI RAKSHA! 🌾</h2>
        <p>Your email verification OTP is:</p>
        <h1 style="color: #22c55e; font-size: 32px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', email);
    return true;
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return false;
  }
};

module.exports = { sendVerificationEmail };