// frontend/postcss.config.js
const path = require('path');

module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: path.resolve(__dirname, 'tailwind.config.js'),
    },
    'autoprefixer': {},
  },
  // Enable source maps in development
  map: process.env.NODE_ENV === 'development' ? 'inline' : false,
  // Fix for Windows paths
  from: undefined,
};