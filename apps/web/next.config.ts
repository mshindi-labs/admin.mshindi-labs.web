import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/**',
      },
    ],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_CLIENT_ID: process.env.NEXT_PUBLIC_API_CLIENT_ID,
    API_CLIENT_SECRET: process.env.API_CLIENT_SECRET,
    API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  },
};

export default nextConfig;
