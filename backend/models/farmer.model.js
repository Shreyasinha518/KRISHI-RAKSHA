// ===================================================================
// FILE: backend/models/farmer.model.js
// ===================================================================

const { supabase } = require('../config/db');
const bcrypt = require('bcryptjs');

class FarmerModel {
  // Create new farmer
  static async create(farmerData) {
    const {
      phone,
      email,
      password,
      name,
      village,
      district,
      state,
      landSizeAcres,
      cropType,
      farmerPhotoUrl,
      farmPhotoUrl,
      upiId,
      bankAccountNumber,
      bankIfscCode,
      bankName,
      metamaskAddress,
    } = farmerData;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('farmers')
      .insert([
        {
          phone,
          email,
          password_hash: passwordHash,
          name,
          village,
          district,
          state,
          land_size_acres: landSizeAcres,
          crop_type: cropType,
          farmer_photo_url: farmerPhotoUrl,
          farm_photo_url: farmPhotoUrl,
          upi_id: upiId,
          bank_account_number: bankAccountNumber,
          bank_ifsc_code: bankIfscCode,
          bank_name: bankName,
          metamask_address: metamaskAddress,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Find farmer by phone
  static async findByPhone(phone) {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Find farmer by email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Find farmer by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Update farmer
  static async update(id, updates) {
    const { data, error } = await supabase
      .from('farmers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Verify phone
  static async verifyPhone(id) {
    return await this.update(id, { is_phone_verified: true });
  }

  // Verify email
  static async verifyEmail(id) {
    return await this.update(id, { is_email_verified: true });
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update MetaMask address
  static async updateMetaMaskAddress(id, address) {
    return await this.update(id, { metamask_address: address });
  }
}

module.exports = FarmerModel;