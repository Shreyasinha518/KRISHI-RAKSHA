// ===================================================================
// FILE: backend/app.js
// Express App Setup & Middleware
// REPLACE YOUR EXISTING FILE WITH THIS
// ===================================================================

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const farmerRoutes = require('./routes/farmer.routes');
const claimRoutes = require('./routes/claim.routes');
const blockchainRoutes = require('./routes/blockchain.routes');
const payoutRoutes = require('./routes/payout.routes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api', blockchainRoutes); // blockchain routes at /api/blockchain/...
app.use('/api/payouts', payoutRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to KRISHI RAKSHA API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      farmers: '/api/farmers',
      claims: '/api/claims',
      blockchain: '/api/blockchain',
      payouts: '/api/payouts',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;