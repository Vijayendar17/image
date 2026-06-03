import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageToPdfClient from "./ImageToPdfClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/image-to-pdf`;

export const metadata: Metadata = {
  title: "Convert Image to PDF Free Online | LiteFiles",
  description:
    "Convert JPG or PNG images to a scanned PDF for free. Combine multiple photos into one PDF for UPSC, SSC, and Indian government portal submissions. No signup.",
  keywords: [
    "image to pdf converter india",
    "jpg to pdf free online",
    "png to scanned pdf converter",
    "convert photo to pdf for submission",
    "image to pdf no signup india",
    "multiple images to pdf free",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Convert Image to PDF Free Online | LiteFiles",
    description: "Convert JPG or PNG to a professional scanned PDF online. Multi-image, instant, no signup needed.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Image to PDF Free Online | LiteFiles",
    description: "Convert photos to scanned PDF free. Multiple images, instant, private.",
  },
};

const faqs = [
  { q: "Does the PDF look like a real scanned document?", a: "Yes. We apply a subtle scan effect (grain and tonal adjustment) so your PDF looks like it was physically scanned. This is widely accepted for document submissions on Indian portals." },
  { q: "Can I add multiple images to one PDF?", a: "Yes. Upload multiple images and they will be combined into a single multi-page PDF — one image per page, in the order you upload them." },
  { q: "What is the maximum file size I can upload?", a: "There is no strict limit since all processing happens in your browser. However, very large images (over 10MB each) may slow processing. We recommend keeping images under 5MB each." },
  { q: "Is my document uploaded to any server?", a: "No. Everything runs in your browser using JavaScript. Your images never leave your device and we have zero access to your files — guaranteed privacy." },
  { q: "What government portals accept this PDF format?", a: "PDF documents created by this tool are accepted by SSC, UPSC, IBPS, SBI, NSDL, DigiLocker, college admission portals, and most Indian state government application systems." },
  { q: "Can I convert multiple pages of an Aadhaar card to one PDF?", a: "Yes. Photograph or scan each page of your Aadhaar separately, then upload both images here. They will be merged into a single two-page PDF ready for portal upload." },
];

const relatedTools = [
  { href: "/compress-image-to-50kb", icon: "🗜️", title: "Compress Image to 50KB", desc: "Reduce any JPG/PNG to exact KB for portals" },
  { href: "/passport-photo-resize", icon: "📷", title: "Passport Photo Resize", desc: "Resize to 35x45mm for VISA, PAN, Aadhaar" },
  { href: "/resize-signature-to-20kb", icon: "✍️", title: "Signature to 20KB", desc: "Compress signature for SSC, UPSC, IBPS" },
  { href: "/pdf-compressor", icon: "📄", title: "Aadhaar PDF Compressor", desc: "Reduce Aadhaar PDF below 200KB" },
  { href: "/ssc-document-resize", icon: "🏛️", title: "SSC/UPSC Document Resize", desc: "One-click exam-ready photo & signature" },
];

export default function ImageToPdfPage() {
  return (
    <>
      <WebAppSchema
        name="Image to Scanned PDF Converter – Free Online"
        description="Convert JPG or PNG photos to a professional scanned PDF. Combine multiple images into one PDF. Free, no signup, instant."
        url={PAGE_URL}
        keywords={["image to pdf converter india", "jpg to pdf free", "convert photo to pdf online"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Image to Scanned PDF", url: PAGE_URL },
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
              Convert your JPG or PNG photos into a professional PDF instantly. Combine multiple images into one PDF. Perfect for government portal document submissions.
            </p>
          </div>
        </div>

        <ImageToPdfClient />

        <div className="seo-section">
          <h2>What is an Image to Scanned PDF Converter?</h2>
          <p>
            An image to scanned PDF converter takes your JPG or PNG photos and packages them into a standard PDF document — optionally with a scan-like appearance. LiteFiles processes everything locally in your browser, so your documents never leave your device. No server, no storage, no privacy risk.
          </p>
          <p>
            Many Indian government exam portals and college admission systems accept only PDF documents for uploads. If you have a photo of your marksheet, Aadhaar card, caste certificate, or income certificate, this tool lets you convert it to a portal-ready PDF in seconds — no Adobe Acrobat or paid software needed.
          </p>
          <p>
            You can also combine multiple images into a single multi-page PDF, which is useful when submitting front and back of an Aadhaar card, or multiple pages of a marksheet, as a single document.
          </p>

          <h2>How to Convert Images to PDF — Step by Step</h2>
          <ol className="step-list">
            <li>Click <strong>Upload Images</strong> or drag one or more JPG/PNG files into the tool above.</li>
            <li><strong>Arrange the images</strong> in the correct page order if you are combining multiple documents.</li>
            <li>Select the <strong>scan effect</strong> if you want the PDF to look like a physically scanned document.</li>
            <li>Click <strong>Convert to PDF</strong> — the tool generates your PDF instantly in the browser.</li>
            <li>Click <strong>Download PDF</strong> to save the file, ready for portal upload.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Indian government portals — for UPSC, SSC, IBPS, NTA, NRA, and state PSCs — require documents in PDF format with specific size limits (typically 200KB to 2MB). These limits exist to standardise document handling across millions of applications and to ensure fast upload times on mobile networks used across Tier 2 and Tier 3 cities.
          </p>
          <p>
            A raw photograph taken on a smartphone can easily be 3MB to 8MB — far beyond what any portal accepts. Converting to PDF with LiteFiles reduces file size automatically, and you can further compress the output using our <Link href="/pdf-compressor" style={{ color: "var(--accent-orange)", textDecoration: "none", fontWeight: 600 }}>Aadhaar PDF Compressor</Link> if needed.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ margin: 0 }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="faq-item">
                <p className="faq-question">{faq.q}</p>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>

          <h2>Related Tools</h2>
          <div className="related-tools-grid">
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="related-tool-card">
                <span className="related-tool-icon">{tool.icon}</span>
                <div>
                  <div className="related-tool-title">{tool.title}</div>
                  <div className="related-tool-desc">{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
