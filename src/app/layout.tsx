import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { siteConfig } from "./config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} – Free Image & PDF Tools for Govt Forms`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Free online tools to compress images, resize passport photos, reduce PDF size, and prepare documents for SSC, UPSC, and government form uploads. No signup required.",
  keywords: [
    "compress image to 50kb",
    "passport photo resize india",
    "signature resize 20kb",
    "aadhaar pdf compressor",
    "ssc upsc document resize",
    "image compress for government upload",
    "whatsapp image compressor india",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.baseUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: siteConfig.baseUrl,
    title: `${siteConfig.name} – Free Image & PDF Tools for Govt Forms`,
    description:
      "Free tools for Indians: compress images, resize passport photos, reduce PDF size for SSC/UPSC uploads. Works instantly in browser. No signup needed.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – Free Image & PDF Tools for Govt Forms`,
    description:
      "Compress images to 50KB, resize passport photos, reduce PDF — all free, instant, private. Made for Indian government form uploads.",
    site: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DocTools India" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        {/* Offline banner */}
        <div id="offline-banner" style={{
          display: "none",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 9999,
          background: "#ff6b35",
          color: "white",
          textAlign: "center",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}>
          📶 You&apos;re offline — but this tool still works! All processing runs in your browser.
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('offline', function() {
              document.getElementById('offline-banner').style.display = 'block';
            });
            window.addEventListener('online', function() {
              document.getElementById('offline-banner').style.display = 'none';
            });
          `
        }} />
        {children}
      </body>
    </html>
  );
}
