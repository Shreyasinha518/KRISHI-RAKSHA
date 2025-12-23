const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: function() { return !this.phone; },
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: function() { return !this.email; }
    },
    otp: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['email', 'phone'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(+new Date() + 10 * 60 * 1000) // 10 minutes from now
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for TTL (auto-delete expired OTPs)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster lookups
otpSchema.index({ email: 1, otp: 1 });
otpSchema.index({ phone: 1, otp: 1 });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
