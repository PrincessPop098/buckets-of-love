/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dangerously allow production builds to successfully complete 
  // even if your project has type errors.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow production builds to complete even if your project has 
  // ESLint errors (common in 'vibe coding' rapid prototypes).
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Recommended for standardizing output for Vercel
  reactStrictMode: true,
}