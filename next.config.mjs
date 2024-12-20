/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remova a configuração de remotePatterns se não for necessária
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
