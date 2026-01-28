/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Allow images from external domains if needed
  images: {
    domains: [],
  },
}

module.exports = nextConfig
