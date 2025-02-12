/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, dev }) => {
    // Disable minimization for easier debugging
    config.optimization.minimize = false;
    config.optimization.minimizer = [];
    
    return config;
  },
}

export default nextConfig;

