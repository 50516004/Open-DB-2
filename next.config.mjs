/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open-db-2-blob',
        port: '',
      },
    ],
  },
};

export default nextConfig;
