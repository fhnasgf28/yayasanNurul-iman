import type { NextConfig } from "next";

const tunnelSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const tunnelHostname = tunnelSiteUrl
  ? (() => {
      try {
        return new URL(tunnelSiteUrl).hostname;
      } catch {
        return undefined;
      }
    })()
  : undefined;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
  allowedDevOrigins: [
    "landingpage.clipperyt.online",
    "yayasan.clipperyt.online",
    "nuruliman.clipperyt.online",
    "yayasannuruliman.clipperyt.online",
    ...(tunnelHostname ? [tunnelHostname] : []),
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.nu.or.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
