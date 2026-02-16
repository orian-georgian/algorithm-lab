import createNextIntlPlugin from "next-intl/plugin";
import nextPwa from "next-pwa";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withPWA = nextPwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline"
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "next-intl", "react-hook-form"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30
  }
};

export default withPWA(withNextIntl(nextConfig));
