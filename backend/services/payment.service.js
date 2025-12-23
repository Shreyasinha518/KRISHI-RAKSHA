// ===================================================================
// FILE: backend/services/payment.service.js
// ===================================================================

const TransactionModel = require('../models/transaction.model');
const FarmerModel = require('../models/farmer.model');

class PaymentService {
  // Initiate payment
  static async initiatePayment(claim, farmer) {
    try {
      // Determine payment method (prefer UPI)
      const paymentMethod = farmer.upi_id ? 'upi' : 'bank_transfer';
      
      // Create transaction record
      const transaction = await TransactionModel.create({
        claimId: claim.id,
        farmerId: farmer.id,
        amount: claim.claim_amount,
        paymentMethod,
        upiId: farmer.upi_id,
        bankAccountNumber: farmer.bank_account_number,
      });
      
      // Mock payment gateway call
      // In production, integrate with real payment gateway
      const paymentResult = await this.processPayment(
        paymentMethod,
        farmer.upi_id || farmer.bank_account_number,
        claim.claim_amount,
        transaction.id
      );
      
      // Update transaction status
      await TransactionModel.updateStatus(
        transaction.id,
        paymentResult.success ? 'success' : 'failed',
        paymentResult
      );
      
      return {
        success: paymentResult.success,
        transaction,
        paymentReference: paymentResult.reference,
      };
    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  }

  // Process payment (mock - replace with real gateway)
  static async processPayment(method, destination, amount, transactionId) {
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      const reference = `PAY_${Date.now()}_${transactionId}`;
      
      console.log(`💰 Payment processed: ${method} to ${destination} for ₹${amount}`);
      
      return {
        success: true,
        reference,
        timestamp: new Date().toISOString(),
        method,
        amount,
      };
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = PaymentService;