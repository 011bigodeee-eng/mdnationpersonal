import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  devIndicators: false,
  images: { qualities: [75, 85, 95] },
};
export default nextConfig;
