import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  output: "standalone",
  images: {
    domains: ["cdnx.jumpseller.com", "cards.scryfall.io",  "images.jumpseller.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
