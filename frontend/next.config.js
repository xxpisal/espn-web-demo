/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'a.espncdn.com' },
      { protocol: 'https', hostname: 'a1.espncdn.com' },
      { protocol: 'https', hostname: 'a2.espncdn.com' },
      { protocol: 'https', hostname: 'a3.espncdn.com' },
      { protocol: 'https', hostname: 'a4.espncdn.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'sport-api.eunglyzhia.com' },
      { protocol: 'https', hostname: 'sport-hub.eunglyzhia.social' },
      { protocol: 'https', hostname: '**.espncdn.com' },
      { protocol: 'https', hostname: '1000logos.net' },
      { protocol: 'https', hostname: '**.akamaized.net' },
      { protocol: 'https', hostname: 'espnmedia-cdn.akamaized.net' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
