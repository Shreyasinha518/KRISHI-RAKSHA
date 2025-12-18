/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Configure fallbacks for client-side only
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false
      };
    }

    // Fix for Windows ESM loader issues with PostCSS
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
            oneOfRule.use.forEach((loader) => {
              if (loader.loader && loader.loader.includes('postcss-loader')) {
                // Ensure PostCSS config path is resolved correctly on Windows
                if (loader.options && loader.options.postcssOptions) {
                  loader.options.postcssOptions.config = path.join(__dirname, 'postcss.config.cjs');
                }
              }
            });
          }
        });
      }
    });

    return config;
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // File extensions for pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Image optimization settings
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  
  // Experimental features
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  
  // Sass/SCSS configuration
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
