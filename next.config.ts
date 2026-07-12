import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://bcl-website.oladeleomoyemi2002.workers.dev/api/:path*"
            : "http://localhost:8787/api/:path*",
      },
    ];
  },
};

export default nextConfig;
