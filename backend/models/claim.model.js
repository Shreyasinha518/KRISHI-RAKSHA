// ===================================================================
// FILE: backend/models/claim.model.js
// ===================================================================

const { supabase } = require('../config/db');

class ClaimModel {
  // Create new claim
  static async create(claimData) {
    const {
      farmerId,
      farmerPhone,
      cropType,
      damagePercentage,
      claimAmount,
      damageDescription,
      damageCause,
      ipfsHash,
      evidenceUrls,
      geoLocation,
    } = claimData;

    const { data, error } = await supabase
      .from('claims')
      .insert([
        {
          farmer_id: farmerId,
          farmer_phone: farmerPhone,
          crop_type: cropType,
          damage_percentage: damagePercentage,
          claim_amount: claimAmount,
          damage_description: damageDescription,
          damage_cause: damageCause,
          ipfs_hash: ipfsHash,
          evidence_urls: evidenceUrls,
          geo_location: geoLocation,
          status: 'submitted',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Find claim by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get all claims for a farmer
  static async findByFarmerId(farmerId) {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Update claim
  static async update(id, updates) {
    const { data, error } = await supabase
      .from('claims')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update ML verification results
  static async updateMLVerification(id, mlResults) {
    return await this.update(id, {
      ml_image_verified: mlResults.imageVerified,
      ml_fraud_score: mlResults.fraudScore,
      ml_predicted_damage: mlResults.predictedDamage,
      ml_predicted_yield: mlResults.predictedYield,
      ml_verification_result: mlResults.fullResult,
      status: mlResults.approved ? 'ml_verification' : 'rejected',
      rejection_reason: mlResults.rejectionReason,
    });
  }

  // Update blockchain data
  static async updateBlockchainData(id, blockchainData) {
    return await this.update(id, {
      blockchain_claim_id: blockchainData.claimId,
      blockchain_tx_hash: blockchainData.transactionHash,
    });
  }

  // Approve claim
  static async approve(id, approvalTxHash) {
    return await this.update(id, {
      blockchain_approved: true,
      blockchain_approval_tx_hash: approvalTxHash,
      status: 'approved',
    });
  }

  // Mark as paid
  static async markAsPaid(id, paymentData) {
    return await this.update(id, {
      payment_status: 'completed',
      payment_reference: paymentData.reference,
      payment_completed_at: new Date().toISOString(),
      payment_tx_hash: paymentData.blockchainTxHash,
      status: 'paid',
    });
  }

  // Get pending claims (for admin)
  static async getPendingClaims() {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .in('status', ['submitted', 'ml_verification'])
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }
}

module.exports = ClaimModel;