import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "www.avvatarindia.com",
        protocol: "https",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
