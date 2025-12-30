// ===================================================================
// FILE: backend/middleware/validation.middleware.js
// ===================================================================

// Validate phone number
exports.validatePhone = (req, res, next) => {
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  
  // Indian phone number format: +91XXXXXXXXXX
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid Indian phone number format. Use +91XXXXXXXXXX' });
  }
  
  next();
};

// Validate email
exports.validateEmail = (req, res, next) => {
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  next();
};

// Validate OTP
exports.validateOTP = (req, res, next) => {
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  
  const { otp } = req.body;
  
  if (!otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }
  
  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: 'OTP must be 6 digits' });
  }
  
  next();
};

// Validate claim data
exports.validateClaim = (req, res, next) => {
  const { cropType, damagePercentage, claimAmount } = req.body;
  
  if (!cropType || !damagePercentage || !claimAmount) {
    return res.status(400).json({ error: 'Crop type, damage percentage, and claim amount are required' });
  }
  
  if (damagePercentage < 0 || damagePercentage > 100) {
    return res.status(400).json({ error: 'Damage percentage must be between 0 and 100' });
  }
  
  if (claimAmount <= 0) {
    return res.status(400).json({ error: 'Claim amount must be positive' });
  }
  
  next();
};