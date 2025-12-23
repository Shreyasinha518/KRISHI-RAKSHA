// services/otp.supabase.service.js
const { supabase } = require('../config/db');
const { sendPhoneOTP } = require('../config/otp');
const { sendVerificationEmail } = require('../config/mail');

class SupabaseOTPService {
  // Generate 6-digit OTP
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send phone OTP
  static async sendPhoneOTP(phone) {
    try {
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('otps')
        .insert([{
          phone: phone,
          otp: otp,
          type: 'phone',
          expires_at: expiresAt.toISOString()
        }]);

      if (error) throw error;

      // Send via Twilio
      await sendPhoneOTP(phone, otp);
      
      return { success: true, message: 'OTP sent to phone' };
    } catch (error) {
      console.error('Send phone OTP failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send email OTP
  static async sendEmailOTP(email) {
    try {
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('otps')
        .insert([{
          email: email,
          otp: otp,
          type: 'email',
          expires_at: expiresAt.toISOString()
        }]);

      if (error) throw error;

      // Send via email
      await sendVerificationEmail(email, otp);
      
      return { success: true, message: 'OTP sent to email' };
    } catch (error) {
      console.error('Send email OTP failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Verify OTP
  static async verifyOTP(identifier, otp, type) {
    try {
      const now = new Date().toISOString();
      
      // Find valid OTP
      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq(type, identifier)
        .eq('otp', otp)
        .eq('type', type)
        .gt('expires_at', now)
        .eq('verified', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid or expired OTP' };
      }

      // Mark as verified
      const { error: updateError } = await supabase
        .from('otps')
        .update({ verified: true })
        .eq('id', data.id);

      if (updateError) throw updateError;

      return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
      console.error('Verify OTP failed:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SupabaseOTPService;