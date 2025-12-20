// backend/controllers/claim.controller.js
const blockchainService = require('../services/blockchain.service');
const mlService = require('../services/ml.service');
const ipfsService = require('../services/ipfs.service');
// Your database model
const Claim = require('../models/claim.model');

// Submit claim
exports.submitClaim = async (req, res) => {
  try {
    const { farmerId, cropType, damagePercentage, claimAmount, evidenceFiles } = req.body;

    // Step 1: Upload evidence to IPFS
    const ipfsHash = await ipfsService.uploadFiles(evidenceFiles);

    // Step 2: Submit to blockchain
    const blockchainResult = await blockchainService.submitClaim({
      farmerId,
      cropType,
      damagePercentage,
      claimAmount,
      ipfsHash,
    });

    if (!blockchainResult.success) {
      return res.status(500).json({
        error: 'Blockchain submission failed',
        details: blockchainResult.error,
      });
    }

    // Step 3: Save to PostgreSQL database
    const claim = await Claim.create({
      farmerId,
      cropType,
      damagePercentage,
      claimAmount,
      ipfsHash,
      blockchainClaimId: blockchainResult.claimId,
      transactionHash: blockchainResult.transactionHash,
      status: 'pending',
    });

    res.json({
      success: true,
      message: 'Claim submitted successfully',
      claimId: claim.id,
      blockchainClaimId: blockchainResult.claimId,
      transactionHash: blockchainResult.transactionHash,
      explorerUrl: `https://alfajores.celoscan.io/tx/${blockchainResult.transactionHash}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve claim (called by admin after ML verification)
exports.approveClaim = async (req, res) => {
  try {
    const { claimId } = req.params;

    // Step 1: Get claim from database
    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    // Step 2: Run ML verification
    const mlResult = await mlService.verifyClaim(claim);
    if (!mlResult.approved) {
      return res.status(400).json({
        error: 'Claim rejected by ML models',
        reason: mlResult.reason,
      });
    }

    // Step 3: Approve on blockchain
    const blockchainResult = await blockchainService.approveClaim(claim.blockchainClaimId);

    if (!blockchainResult.success) {
      return res.status(500).json({
        error: 'Blockchain approval failed',
        details: blockchainResult.error,
      });
    }

    // Step 4: Update database
    await Claim.update(claimId, {
      status: 'approved',
      approvalTxHash: blockchainResult.transactionHash,
    });

    res.json({
      success: true,
      message: 'Claim approved',
      transactionHash: blockchainResult.transactionHash,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};