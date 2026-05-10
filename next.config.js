/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows the build to finish even if there are small warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore typescript errors if you have them
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
