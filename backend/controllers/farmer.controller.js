// ===================================================================
// FILE: backend/controllers/farmer.controller.js
// Farmer Profile & Dashboard Controller
// ===================================================================

const FarmerModel = require('../models/farmer.model');
const ClaimModel = require('../models/claim.model');
const { supabase } = require('../config/db');

class FarmerController {
  // Get farmer dashboard stats
  async getDashboard(req, res) {
    try {
      const farmerId = req.farmerId;

      // Get farmer details
      const farmer = await FarmerModel.findById(farmerId);

      // Get all claims
      const claims = await ClaimModel.findByFarmerId(farmerId);

      // Calculate stats
      const stats = {
        totalClaims: claims.length,
        pendingClaims: claims.filter(c => c.status === 'submitted' || c.status === 'ml_verification').length,
        approvedClaims: claims.filter(c => c.status === 'approved' || c.status === 'paid').length,
        rejectedClaims: claims.filter(c => c.status === 'rejected').length,
        totalPayout: claims
          .filter(c => c.status === 'paid')
          .reduce((sum, c) => sum + parseFloat(c.claim_amount || 0), 0),
        avgClaimAmount: claims.length > 0
          ? claims.reduce((sum, c) => sum + parseFloat(c.claim_amount || 0), 0) / claims.length
          : 0,
      };

      // Get recent claims
      const recentClaims = claims.slice(0, 5);

      res.json({
        success: true,
        farmer: {
          name: farmer.name,
          village: farmer.village,
          district: farmer.district,
          cropType: farmer.crop_type,
          landSize: farmer.land_size_acres,
        },
        stats,
        recentClaims,
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Update farmer profile
  async updateProfile(req, res) {
    try {
      const farmerId = req.farmerId;
      const updates = req.body;

      // Don't allow updating sensitive fields
      delete updates.phone;
      delete updates.email;
      delete updates.password;
      delete updates.password_hash;

      const updatedFarmer = await FarmerModel.update(farmerId, updates);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        farmer: updatedFarmer,
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get farmer by ID (admin only)
  async getFarmerById(req, res) {
    try {
      const { id } = req.params;
      const farmer = await FarmerModel.findById(id);

      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }

      res.json({
        success: true,
        farmer,
      });
    } catch (error) {
      console.error('Get farmer error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FarmerController();