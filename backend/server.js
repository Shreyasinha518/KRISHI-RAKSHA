// backend/server.js
require('dotenv').config();
const http = require('http');
const express = require('express');
const app = require('./app');

// Import and use routes conditionally
const loadRoute = (path, routePath) => {
  try {
    const route = require(routePath);
    if (route && typeof route === 'function') {
      app.use(path, route);
      console.log(`✅ Route loaded: ${path}`);
      return true;
    }
  } catch (error) {
    console.warn(`⚠️  Route not available: ${path} (${error.message})`);
  }
  return false;
};

// Load routes
const routes = [
  { path: '/api/auth', file: './routes/auth.routes' },
  { path: '/api/farmers', file: './routes/farmer.routes' },
  { path: '/api/claims', file: './routes/claim.routes' },
  { path: '/api', file: './routes/blockchain.routes' }
];

// Initialize all routes
routes.forEach(route => loadRoute(route.path, route.file));

// Initialize blockchain service if available
try {
  const blockchainService = require('./services/blockchain.service');
  if (blockchainService && typeof blockchainService.initialize === 'function') {
    blockchainService.initialize();
    console.log('⛓️  Blockchain service initialized');
  }
} catch (error) {
  console.warn('⚠️  Blockchain service not available:', error.message);
}

// Get port from environment and store in Express.
const port = process.env.PORT || 5000;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event.
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`\n🚀 Server running on port ${bind}`);
  console.log(`🌐 Access the API at http://localhost:${port}/api`);
  console.log(`🔍 Health check: http://localhost:${port}/health`);
};

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);