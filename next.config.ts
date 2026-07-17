import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";
    const workerUrl = isProd
      ? "https://bcl-website.oladeleomoyemi2002.workers.dev"
      : "http://localhost:8787";

    return [
      {
        source: "/api/:path*",
        destination: `${workerUrl}/api/:path*`,
      },
      {
        source: "/assets/uploads/:path*",
        destination: `${workerUrl}/assets/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
