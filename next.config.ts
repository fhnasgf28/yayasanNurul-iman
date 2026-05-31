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
  allowedDevOrigins: [
    "landingpage.clipperyt.online",
    "yayasan.clipperyt.online",
    "nuruliman.clipperyt.online",
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
