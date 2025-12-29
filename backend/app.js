// ===================================================================
// FILE: backend/app.js
// Express App Setup & Middleware
// REPLACE YOUR EXISTING FILE WITH THIS
// ===================================================================
const webhookRoutes = require('./routes/webhook.routes');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
// Update your CORS configuration in app.js (around line 9)
app.use(cors({
  origin: [
    'http://localhost:3000',  // Local development
    'https://your-frontend-domain.com'  // Your production frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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

// Update the health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version,
    platform: process.platform
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