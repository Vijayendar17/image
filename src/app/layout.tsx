import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DocTools India – Free Image & PDF Tools for Govt Forms",
    template: "%s | DocTools India",
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
  openGraph: {
    type: "website",
    siteName: "DocTools India",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
