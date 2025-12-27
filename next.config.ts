import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/contacts",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/contacts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
