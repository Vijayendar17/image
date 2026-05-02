import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageToPdfClient from "./ImageToPdfClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

export const metadata: Metadata = {
  title: "Image to Scanned PDF Converter Free – JPG PNG to PDF India",
  description:
    "Convert JPG or PNG images to a professional scanned PDF online for free. Perfect for document submissions, college applications, and government portals. No signup required.",
  keywords: [
    "image to pdf converter india",
    "jpg to pdf free online",
    "png to scanned pdf converter",
    "convert photo to pdf for submission",
    "image to pdf no signup india",
    "multiple images to pdf free",
  ],
  alternates: {
    canonical: `${siteConfig.baseUrl}/image-to-pdf`,
  },
  openGraph: {
    title: "Image to Scanned PDF Converter Free – JPG PNG to PDF India",
    description:
      "Convert JPG or PNG to a professional scanned PDF online. Multi-image, instant, no signup needed.",
    url: `${siteConfig.baseUrl}/image-to-pdf`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Image to Scanned PDF – ${siteConfig.name}`,
    description: "Convert photos to scanned PDF free. Multiple images, instant, private.",
  },
};

const faqs = [
  {
    q: "Does the PDF look like a real scanned document?",
    a: "Yes! We apply a subtle scan effect (grain and tonal adjustment) to make your PDF look like it was physically scanned. This is widely accepted for document submissions.",
  },
  {
    q: "Can I add multiple images to one PDF?",
    a: "Yes! Upload multiple images and they will be combined into a single multi-page PDF — one image per page, in the order you upload them.",
  },
  {
    q: "What is the maximum file size I can upload?",
    a: "There is no strict limit since all processing happens in your browser. However, very large images (over 10MB each) may slow processing. We recommend keeping images under 10MB.",
  },
  {
    q: "Is my document uploaded to any server?",
    a: "No. Everything runs in your browser using JavaScript. Your images never leave your device and we have zero access to your files.",
  },
];

export default function ImageToPdfPage() {
  return (
    <>
      <WebAppSchema
        name="Image to Scanned PDF Converter – Free Online"
        description="Convert JPG or PNG photos to a professional scanned PDF. Combine multiple images into one PDF. Free, no signup, instant."
        url="https://litefiles.vercel.app/image-to-pdf"
        keywords={["image to pdf converter india", "jpg to pdf free", "convert photo to pdf online"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://litefiles.vercel.app" },
        { name: "Image to Scanned PDF", url: "https://litefiles.vercel.app/image-to-pdf" },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue" style={{ background: "rgba(234,179,8,0.15)", color: "#eab308", border: "1px solid rgba(234,179,8,0.3)" }}>
              🖼️ Image to PDF
            </span>
            <h1 className="tool-title">Image to Scanned PDF Converter</h1>
            <p className="tool-desc">
              Convert your JPG or PNG photos into a professional PDF file instantly. Combine multiple images into one PDF. Great for document submissions.
            </p>
          </div>
        </div>
        <ImageToPdfClient />

        <div className="faq-section">
          <h2 style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Common Questions
          </h2>
          {faqs.map((faq) => (
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
