/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
  },
  async redirects() {
    return [
      { source: '/app/change-feed', destination: '/app/decisions', permanent: true },
      { source: '/app/change-feed/:aceId', destination: '/app/decisions/:aceId', permanent: true },
    ]
  },
}

module.exports = nextConfig
