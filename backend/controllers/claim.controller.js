// ===================================================================
// FILE: backend/controllers/claim.controller.js
// Claim Submission & Processing Controller
// ===================================================================

const ClaimModel = require('../models/claim.model');
const FarmerModel = require('../models/farmer.model');
const IPFSService = require('../services/ipfs.service');
const MLService = require('../services/ml.service');
const blockchainService = require('../services/blockchain.service');

class ClaimController {
  // Submit new claim
  async submitClaim(req, res) {
    try {
      const farmerId = req.farmerId;
      const {
        cropType,
        damagePercentage,
        claimAmount,
        damageDescription,
        damageCause,
        geoLocation,
      } = req.body;

      // Get farmer details (for UPI/Bank info)
      const farmer = await FarmerModel.findById(farmerId);

      // Upload evidence to IPFS
      const files = req.files || [];
      let ipfsResult = { urls: [], mainHash: '' };

      if (files.length > 0) {
        ipfsResult = await IPFSService.uploadMultipleFiles(files);
        if (!ipfsResult.success) {
          return res.status(500).json({ error: 'Failed to upload evidence to IPFS' });
        }
      }

      // Create claim in database
      const claim = await ClaimModel.create({
        farmerId,
        farmerPhone: farmer.phone,
        cropType,
        damagePercentage,
        claimAmount,
        damageDescription,
        damageCause,
        ipfsHash: ipfsResult.mainHash,
        evidenceUrls: ipfsResult.urls,
        geoLocation,
      });

      // Submit to blockchain
      const blockchainResult = await blockchainService.submitClaim({
        farmerId: farmer.phone,
        cropType,
        damagePercentage,
        claimAmount,
        ipfsHash: ipfsResult.mainHash,
      });

      if (blockchainResult.success) {
        await ClaimModel.updateBlockchainData(claim.id, blockchainResult);
      }

      res.status(201).json({
        success: true,
        message: 'Claim submitted successfully',
        claim: {
          id: claim.id,
          blockchainClaimId: blockchainResult.claimId,
          transactionHash: blockchainResult.transactionHash,
          status: claim.status,
        },
        explorerUrl: `https://alfajores.celoscan.io/tx/${blockchainResult.transactionHash}`,
      });
    } catch (error) {
      console.error('Submit claim error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get all claims for current farmer
  async getMyClaims(req, res) {
    try {
      const farmerId = req.farmerId;
      const claims = await ClaimModel.findByFarmerId(farmerId);

      res.json({
        success: true,
        claims,
      });
    } catch (error) {
      console.error('Get claims error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get claim by ID
  async getClaimById(req, res) {
    try {
      const { id } = req.params;
      const claim = await ClaimModel.findById(id);

      if (!claim) {
        return res.status(404).json({ error: 'Claim not found' });
      }

      // Check if farmer owns this claim
      if (claim.farmer_id !== req.farmerId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json({
        success: true,
        claim,
      });
    } catch (error) {
      console.error('Get claim error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Process claim with ML verification (admin/system)
  async processClaim(req, res) {
    try {
      const { id } = req.params;

      const claim = await ClaimModel.findById(id);
      if (!claim) {
        return res.status(404).json({ error: 'Claim not found' });
      }

      // Run ML verification
      const mlResult = await MLService.verifyClaim(claim);

      // Update claim with ML results
      await ClaimModel.updateMLVerification(claim.id, mlResult);

      if (mlResult.approved) {
        // Approve on blockchain
        const blockchainResult = await blockchainService.approveClaim(
          claim.blockchain_claim_id
        );

        if (blockchainResult.success) {
          await ClaimModel.approve(claim.id, blockchainResult.transactionHash);
        }
      }

      res.json({
        success: true,
        message: mlResult.approved ? 'Claim approved' : 'Claim rejected',
        mlResult,
      });
    } catch (error) {
      console.error('Process claim error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClaimController();