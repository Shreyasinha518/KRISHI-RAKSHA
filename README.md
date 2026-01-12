# KRISHI RAKSHA

KRISHI RAKSHA is a fully deployable decentralized insurance verification and settlement platform designed to reduce farmer insurance fraud and claim delays in rural India. It addresses major issues in schemes like PMFBY such as manual verification, false damage reporting, lack of transparency, and delayed payouts by combining Machine Learning, Blockchain, Satellite Verification, and secure cloud infrastructure.

The system ensures that farmers provide their personal, farm, and payout details only once during registration, after which all claim processing is automated, transparent, and fast, with real Indian Rupee (INR) payouts directly to the farmer’s registered bank account or UPI ID.

---

## Core Objectives

- Prevent false crop damage claims using multi-layer verification
- Reduce claim settlement time through automation
- Ensure transparency using blockchain as an audit layer
- Deliver real INR payouts directly to farmers’ accounts
- Avoid repeated data entry for farmers during claims

---

## Key Features

- Phone number OTP verification
- Gmail (email) verification
- Password-based secure login
- Farmer profile creation (one-time)
- UPI ID and bank account storage at registration
- Farmer dashboard with graphs and claim status
- Photo, video, and satellite-based damage verification
- Machine Learning–based fraud detection and yield prediction
- Blockchain-based claim approval and audit logging
- Automatic INR payout after approval

---

## High-Level Claim Workflow

1. Farmer registers using phone OTP and email verification
2. Farmer provides profile, farm, and payout details once
3. Data is securely stored in Supabase PostgreSQL
4. Farmer submits a claim with damage details and photos/videos
5. Evidence is stored on IPFS and hashed on blockchain
6. Satellite verification confirms large-scale damage
7. ML models validate images, predict yield loss, and detect fraud
8. Smart contract records claim approval on Ethereum testnet
9. Backend listens to approval event
10. INR payout is automatically transferred to farmer’s registered UPI or bank account
11. Transaction and status are updated in the dashboard

---

## Role of Blockchain (Important Clarification)

Blockchain is **not used to send money to farmers**.

Instead:
- Blockchain stores claim hashes, timestamps, and approval records
- Smart contracts ensure claim decisions cannot be manipulated
- Ethereum testnet is used only for verification and audit logs
- Actual money transfer happens off-chain in INR via banking or UPI systems

This ensures legal compliance while maintaining transparency.

---

## Technology Stack

### Frontend
- Next.js
- Tailwind CSS
- Chart.js / Recharts
- MetaMask integration

### Backend
- Node.js
- Express.js
- JWT authentication
- Supabase PostgreSQL (cloud-hosted)

### Machine Learning
- Python
- TensorFlow / Scikit-learn
- FastAPI for ML inference APIs

### Blockchain
- Solidity
- Ethereum testnet
- Remix IDE
- ethers.js
- Chainlink oracles (weather data)

### Storage & Verification
- IPFS for media storage
- Satellite imagery APIs
- Supabase storage (optional)

---


## Automatic Money Transfer (INR)

- Farmer provides UPI ID and bank details at registration
- Details are securely stored in Supabase PostgreSQL
- During claim approval, backend fetches stored payout details
- Smart contract emits approval event
- Backend listens to event and triggers payment service
- INR is transferred via UPI or bank API
- Transaction status is saved and shown on dashboard

No crypto is sent to farmers.

---
## Project Structure

```
KRISHI-RAKSHA/
├── frontend/        # Next.js farmer dashboard
├── backend/         # Node.js + Express API
├── ml/              # ML models & FastAPI service
├── blockchain/      # Solidity smart contracts
├── docs/            # Architecture & API docs
└── README.md
```


## Deployment Ready

- Frontend deployable on Vercel
- Backend deployable on Render / Railway
- ML services deployable on Hugging Face or Cloud Run
- Supabase used as managed PostgreSQL cloud database
- Smart contract deployable via Remix on Ethereum testnet

---

## License

This project is licensed for educational, hackathon, and research purposes.
