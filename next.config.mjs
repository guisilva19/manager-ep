/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remova a configuração de remotePatterns se não for necessária
  },

  async rewrites() {
    return [
      {
        source: "api/:path*",
        destination: `https://electric-backend-production.up.railway.app/:path*`,
      },
    ];
  },
};

export default nextConfig;
