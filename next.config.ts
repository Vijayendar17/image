import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withPWA({
  dest: "public",             // Output sw.js + workbox files to /public
  register: true,             // Auto-register the service worker
  skipWaiting: true,          // Activate new SW immediately without waiting
  disable: process.env.NODE_ENV === "development", // Disable in dev to avoid confusion
  runtimeCaching: [
    {
      // Cache Google Fonts stylesheets
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, // 1 year
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      // Cache JS/CSS/image static assets
      urlPattern: /\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30 days
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      // Cache all tool pages (HTML) — serve stale while revalidating in background
      urlPattern: /^https?:\/\/[^/]+\/(compress-image-to-50kb|passport-photo-resize|resize-signature-to-20kb|pdf-compressor|image-to-pdf|ssc-document-resize)(.*)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "tool-pages",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 }, // 7 days
      },
    },
    {
      // Cache the homepage
      urlPattern: /^https?:\/\/[^/]+\/$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "homepage",
        expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 7 }, // 7 days
      },
    },
    {
      // Cache CDN libraries (e.g. PDF.js from cdnjs)
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "cdn-libs",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 }, // 90 days
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
})(nextConfig);
