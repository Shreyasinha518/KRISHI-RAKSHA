// ===================================================================
// FILE: backend/services/ml.service.js
// Updated to match KRISHI RAKSHA ML API endpoints
// ===================================================================

const axios = require('axios');

class MLService {
  static ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000';

  // Verify claim using all ML models
  static async verifyClaim(claim) {
    try {
      console.log('🔬 Running ML verification for claim:', claim.id);
      
      // Use the complete evaluation endpoint
      const response = await axios.post(`${this.ML_API_URL}/api/v1/evaluate-claim`, {
        image_path: claim.evidence_urls?.[0] || '',
        crop_type: claim.crop_type,
        land_size: claim.land_size_acres || 5,
        expected_yield: null, // Will be calculated by ML
        claim_amount: claim.claim_amount,
        weather_features: this.getWeatherFeatures(claim.geo_location),
        sowing_date: null,
        soil_type: 'loamy', // Default, can be added to claim form
        irrigation_type: 'canal', // Default, can be added to claim form
        fertilizer_usage: 'moderate', // Default, can be added to claim form
        historical_claims: [],
        user_id: claim.farmer_id,
      });
      
      const result = response.data;
      
      console.log('✅ ML verification completed:', result);
      
      return {
        approved: result.approved,
        imageVerified: result.image_verification?.is_valid || false,
        fraudScore: result.fraud_detection?.fraud_score || 0,
        predictedDamage: this.calculateDamagePercentage(result.yield_prediction),
        predictedYield: result.yield_prediction?.predicted_yield || 0,
        fullResult: result,
        rejectionReason: result.approved ? null : (result.reason || 'Claim validation failed'),
      };
    } catch (error) {
      console.error('❌ ML verification failed:', error.message);
      
      // Fallback to individual API calls if complete evaluation fails
      return await this.verifyClaimIndividual(claim);
    }
  }

  // Fallback: Individual API calls
  static async verifyClaimIndividual(claim) {
    try {
      console.log('⚠️ Using individual ML endpoints as fallback');
      
      // Step 1: Image Verification (if available)
      let imageResult = { verified: true, confidence: 0.85 };
      if (claim.evidence_urls && claim.evidence_urls.length > 0) {
        imageResult = await this.verifyImage(claim.evidence_urls[0], claim.crop_type);
      }
      
      // Step 2: Fraud Detection
      const fraudResult = await this.detectFraud(claim);
      
      // Step 3: Yield Prediction
      const yieldResult = await this.predictYield(claim);
      
      // Combine results
      const approved = 
        imageResult.verified && 
        fraudResult.fraudScore < 0.5 && 
        Math.abs(yieldResult.predictedDamage - claim.damage_percentage) < 20;
      
      return {
        approved,
        imageVerified: imageResult.verified,
        fraudScore: fraudResult.fraudScore,
        predictedDamage: yieldResult.predictedDamage,
        predictedYield: yieldResult.predictedYield,
        fullResult: {
          image: imageResult,
          fraud: fraudResult,
          yield: yieldResult,
        },
        rejectionReason: approved ? null : this.getRejectionReason(imageResult, fraudResult, yieldResult),
      };
    } catch (error) {
      console.error('❌ Individual ML verification also failed:', error);
      throw error;
    }
  }

  // Image verification
  static async verifyImage(imagePath, cropType) {
    try {
      const response = await axios.post(`${this.ML_API_URL}/api/v1/verify-image`, {
        image_path: imagePath,
        crop_type: cropType,
      });
      
      const result = response.data;
      
      return {
        verified: result.is_valid || false,
        confidence: result.confidence || 0,
        cropTypeMatch: result.crop_match || false,
        duplicateDetected: result.is_duplicate || false,
      };
    } catch (error) {
      console.error('Image verification API failed:', error.message);
      // Return mock data as fallback
      return {
        verified: true,
        confidence: 0.85,
        cropTypeMatch: true,
        duplicateDetected: false,
      };
    }
  }

  // Fraud detection
  static async detectFraud(claim) {
    try {
      const response = await axios.post(`${this.ML_API_URL}/api/v1/detect-fraud`, {
        crop_type: claim.crop_type,
        land_size: claim.land_size_acres || 5,
        expected_yield: null,
        claim_amount: claim.claim_amount,
        weather_features: this.getWeatherFeatures(claim.geo_location),
        historical_claims: [],
        user_id: claim.farmer_id,
      });
      
      const result = response.data;
      
      return {
        fraudScore: result.fraud_score || 0,
        riskLevel: result.risk_level || 'low',
        anomalyDetected: result.anomaly_features?.length > 0 || false,
        anomalyFeatures: result.anomaly_features || [],
      };
    } catch (error) {
      console.error('Fraud detection API failed:', error.message);
      // Return mock data as fallback
      return {
        fraudScore: 0.15,
        riskLevel: 'low',
        anomalyDetected: false,
        anomalyFeatures: [],
      };
    }
  }

  // Yield prediction - Updated to handle frontend data format
  static async predictYield(data) {
    try {
      // Handle both old claim format and new frontend format
      const payload = {
        crop_type: data.crop_type || data.cropType,
        land_size_acres: data.land_size_acres || data.landAreaValue || 5,
        sowing_date: data.sowing_date || data.sowingDate,
        soil_type: data.soil_type || data.soilType || 'loamy',
        irrigation_type: data.irrigation_type || data.irrigationType || 'canal',
        fertilizer_usage: data.fertilizer_usage || data.fertilizerUsage || 'moderate',
        weather_features: this.getWeatherFeatures(data.geo_location),
      };

      console.log('🌾 Sending yield prediction request:', payload);

      const response = await axios.post(`${this.ML_API_URL}/api/v1/predict-yield`, payload);
      
      const result = response.data;
      console.log('✅ Yield prediction response:', result);
      
      return {
        predictedYield: result.predicted_yield || 2500,
        predictedDamage: this.calculateDamagePercentage(result),
        confidence: result.confidence || 0.78,
      };
    } catch (error) {
      console.error('❌ Yield prediction API failed:', error.message);
      console.log('🔄 Using mock data for yield prediction');
      
      // Return mock data as fallback with more realistic values
      const baseYield = {
        rice: 3500,
        wheat: 3000,
        cotton: 1800,
        sugarcane: 70000,
        maize: 2500,
      };
      
      const cropType = data.crop_type || data.cropType || 'rice';
      const landSize = parseFloat(data.land_size_acres || data.landAreaValue || 5);
      const baseYieldPerAcre = baseYield[cropType] || 2500;
      
      return {
        predictedYield: Math.round(baseYieldPerAcre * landSize * (0.8 + Math.random() * 0.4)),
        predictedDamage: Math.random() * 20, // 0-20% damage
        confidence: 0.75 + Math.random() * 0.2, // 75-95% confidence
      };
    }
  }

  // Helper: Get weather features
  static getWeatherFeatures(geoLocation) {
    // This would normally fetch real weather data
    // For now, return default features
    return {
      temperature: 28.5,
      rainfall: 15.2,
      humidity: 65,
      wind_speed: 12.5,
    };
  }

  // Helper: Calculate damage percentage from yield prediction
  static calculateDamagePercentage(yieldPrediction) {
    if (!yieldPrediction || !yieldPrediction.predicted_yield) {
      return 0;
    }
    
    // Estimate damage based on yield difference
    // This is a simplified calculation
    return Math.min(100, Math.max(0, 100 - (yieldPrediction.confidence * 100)));
  }

  // Get rejection reason
  static getRejectionReason(imageResult, fraudResult, yieldResult) {
    if (!imageResult.verified) {
      return 'Image verification failed. Photos may not match claimed crop type or damage.';
    }
    if (fraudResult.fraudScore >= 0.5) {
      return `High fraud risk detected (score: ${fraudResult.fraudScore}). Claim patterns appear suspicious.`;
    }
    if (fraudResult.anomalyFeatures && fraudResult.anomalyFeatures.length > 0) {
      return `Anomalies detected: ${fraudResult.anomalyFeatures.join(', ')}`;
    }
    return 'Claimed damage does not match ML predictions based on evidence and historical data.';
  }
}

module.exports = MLService;