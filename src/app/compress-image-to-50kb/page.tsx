import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompressImageClient from "./CompressImageClient";
import AdSlot from "../components/AdSlot";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online Free – JPG PNG for Govt Form Upload",
  description:
    "Compress image to 50KB, 100KB or any size for free. Perfect for SSC, UPSC, IBPS bank exam form uploads, WhatsApp, and government portals. No signup, works instantly in browser.",
  keywords: [
    "compress image to 50kb",
    "image compress for government exam upload",
    "jpg compress online india",
    "compress image to 100kb free",
    "reduce image size for ssc form",
    "whatsapp image compressor india",
  ],
  alternates: {
    canonical: `${siteConfig.baseUrl}/compress-image-to-50kb`,
  },
  openGraph: {
    title: "Compress Image to 50KB Online Free – JPG PNG for Govt Form Upload",
    description:
      "Compress JPG or PNG to 50KB, 100KB for SSC, UPSC, IBPS government form uploads. Free, instant, no signup.",
    url: `${siteConfig.baseUrl}/compress-image-to-50kb`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Compress Image to 50KB Free – ${siteConfig.name}`,
    description: "Compress JPG/PNG to 50KB for government exam uploads. Instant, private, no signup.",
  },
};

export default function CompressImagePage() {
  const faqs = [
    {
      q: "Why do government portals reject images larger than 50KB?",
      a: "Most Indian government exam portals (SSC, UPSC, IBPS, RRB, etc.) have strict file size limits because they process millions of applications. Keeping files small ensures faster uploads and reduces server storage costs.",
    },
    {
      q: "Will my image quality be ruined after compression?",
      a: "Our tool uses smart quality optimization — it reduces file size while maintaining acceptable visual quality. For passport-style photos and form uploads, the quality is always sufficient.",
    },
    {
      q: "Is my image uploaded to any server?",
      a: "No. Compression happens entirely in your browser using JavaScript. Your file never leaves your device. We have no servers receiving your images.",
    },
    {
      q: "Which formats are supported?",
      a: "We support JPG (JPEG) and PNG. For government forms, JPG is generally preferred as it compresses smaller than PNG.",
    },
    {
      q: "What if the compressed image is still too large?",
      a: "Lower the quality further using the custom KB input. The tool shows you real-time file size so you can hit your exact target.",
    },
  ];

  return (
    <>
      <WebAppSchema
        name="Compress Image to 50KB – Free Online Tool"
        description="Compress JPG or PNG images to 50KB, 100KB or any size for SSC, UPSC, IBPS government form uploads. Free, no signup, works in browser."
        url="https://litefiles.vercel.app/compress-image-to-50kb"
        keywords={["compress image to 50kb", "image compress for government upload", "jpg compress india", "reduce image size ssc upsc"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://litefiles.vercel.app" },
        { name: "Compress Image to 50KB", url: "https://litefiles.vercel.app/compress-image-to-50kb" },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-orange">🗜️ Image Compressor</span>
            <h1 className="tool-title">Compress Image to 50KB</h1>
            <p className="tool-desc">
              Reduce your JPG or PNG file size to exactly 50KB, 100KB, or any custom size. Used by thousands for SSC, UPSC, IBPS, and government portal uploads.
            </p>
          </div>
        </div>
        
        {/* Top Ad Slot (Leaderboard) */}
        <div className="container" style={{ maxWidth: 900 }}>
          <AdSlot label="Advertisement (728x90 Leaderboard)" style={{ minHeight: "90px", marginTop: "2rem" }} />
        </div>

        <CompressImageClient />

        {/* Mid-content Ad Slot */}
        <div className="container" style={{ maxWidth: 900 }}>
          <AdSlot label="Advertisement (Mid-content Banner)" />
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Why do government portals reject images larger than 50KB?",
              a: "Most Indian government exam portals (SSC, UPSC, IBPS, RRB, etc.) have strict file size limits because they process millions of applications. Keeping files small ensures faster uploads and reduces server storage costs.",
            },
            {
              q: "Will my image quality be ruined after compression?",
              a: "Our tool uses smart quality optimization — it reduces file size while maintaining acceptable visual quality. For passport-style photos and form uploads, the quality is always sufficient.",
            },
            {
              q: "Is my image uploaded to any server?",
              a: "No. Compression happens entirely in your browser using JavaScript. Your file never leaves your device. We have no servers receiving your images.",
            },
            {
              q: "Which formats are supported?",
              a: "We support JPG (JPEG) and PNG. For government forms, JPG is generally preferred as it compresses smaller than PNG.",
            },
            {
              q: "What if the compressed image is still too large?",
              a: "Drag the quality slider lower, or reduce dimensions. The tool shows you real-time file size so you can hit your exact target.",
            },
          ].map((faq) => (
            <div key={faq.q} className="faq-item">
              <p className="faq-question">{faq.q}</p>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
