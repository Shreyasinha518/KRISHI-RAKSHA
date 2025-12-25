from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys
from pathlib import Path

# Add the ML directory to Python path
ml_path = str(Path(__file__).parent.absolute())
if ml_path not in sys.path:
    sys.path.append(ml_path)

from inference.image_verification import ImageVerifier
from inference.yield_prediction import YieldPredictor
from inference.fraud_detection import FraudDetector

app = FastAPI(title="ML Model Server",
             description="API for Krishi Raksha ML Models",
             version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
image_verifier = ImageVerifier()

@app.get("/")
async def root():
    return {"message": "ML Model Server is running"}

@app.post("/api/verify-image")
async def verify_image(file: UploadFile = File(...)):
    """Verify image for damage and duplicates"""
    try:
        # Save uploaded file temporarily
        temp_file = "temp_image.jpg"
        with open(temp_file, "wb") as buffer:
            buffer.write(await file.read())
        
        # Process image
        result = image_verifier.run(temp_file)
        
        # Cleanup
        if os.path.exists(temp_file):
            os.remove(temp_file)
            
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict-yield")
async def predict_crop_yield(data: dict):
    """Predict crop yield based on input parameters"""
    try:
        predictor = YieldPredictor()
        prediction = predictor.predict(
            crop_type=data.get('crop_type', 'wheat'),
            land_size=data.get('land_size', '1 acre'),
            sowing_date=data.get('sowing_date', '2024-01-01'),
            soil_type=data.get('soil_type', 'loam'),
            irrigation_type=data.get('irrigation_type', 'drip'),
            fertilizer_usage=float(data.get('fertilizer_usage', 50)),
            weather_features=data.get('weather_features', {})
        )
        return {"status": "success", "prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/detect-fraud")
async def detect_insurance_fraud(data: dict):
    """Detect potential insurance fraud"""
    try:
        detector = FraudDetector()
        result = detector.detect(
            crop_type=data.get('crop_type', 'wheat'),
            land_size=data.get('land_size', '1 acre'),
            expected_yield=float(data.get('expected_yield', 100.0)),
            claim_amount=float(data.get('claim_amount', 5000.0)),
            weather_features=data.get('weather_features', {}),
            historical_claims=int(data.get('historical_claims', 0)),
            user_id=data.get('user_id', 'default_user')
        )
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
