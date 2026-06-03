import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.litefiles.com" }],
        destination: "https://litefiles.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    skipWaiting: true,
    runtimeCaching: [
      {
        // Cache Google Fonts
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        // Cache Next.js static assets
        urlPattern: /\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static",
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        // Cache tool pages (stale-while-revalidate for fast loads)
        urlPattern: /^https?:\/\/[^/]+\/(compress-image-to-50kb|passport-photo-resize|resize-signature-to-20kb|pdf-compressor|image-to-pdf|ssc-document-resize)(.*)?$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "tool-pages",
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
      {
        // Cache homepage
        urlPattern: /^https?:\/\/[^/]+\/$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "homepage",
          expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
      {
        // Cache CDN libraries (PDF.js etc.)
        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "cdn-libs",
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
})(nextConfig);
