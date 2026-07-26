import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignores type checking during production build so you can deploy instantly
    ignoreBuildErrors: true,
  },
};

export default nextConfig;