import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "us-lax-1.linodeobjects.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
