import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompressImageClient from "./CompressImageClient";
import AdSlot from "../components/AdSlot";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/compress-image-to-50kb`;

export const metadata: Metadata = {
  title: "Compress Image to 50KB Free Online | LiteFiles",
  description:
    "Compress JPG or PNG to exactly 50KB, 100KB, or any size for SSC CGL, UPSC, IBPS, and Indian government portal uploads. Free, instant, no signup needed.",
  keywords: [
    "compress image to 50kb",
    "image compress for government exam upload",
    "jpg compress online india",
    "compress image to 100kb free",
    "reduce image size for ssc form",
    "whatsapp image compressor india",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compress Image to 50KB Free Online | LiteFiles",
    description:
      "Compress JPG or PNG to 50KB, 100KB for SSC, UPSC, IBPS government form uploads. Free, instant, no signup.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image to 50KB Free Online | LiteFiles",
    description: "Compress JPG/PNG to 50KB for government exam uploads. Instant, private, no signup.",
  },
};

const faqs = [
  {
    q: "Why do government portals reject images larger than 50KB?",
    a: "Most Indian government exam portals (SSC, UPSC, IBPS, RRB, etc.) enforce strict file size limits because they process millions of applications. Keeping files small ensures faster uploads and reduces server storage costs.",
  },
  {
    q: "Will my image quality be ruined after compression?",
    a: "Our tool uses smart quality optimisation — it reduces file size while maintaining acceptable visual quality. For passport-style photos and form uploads, the quality is always sufficient for portal acceptance.",
  },
  {
    q: "Is my image uploaded to any server?",
    a: "No. Compression happens entirely in your browser using JavaScript. Your file never leaves your device. We have no servers receiving your images — 100% private.",
  },
  {
    q: "Which formats are supported?",
    a: "We support JPG (JPEG) and PNG. For government forms, JPG is generally preferred as it compresses to a smaller file size than PNG at similar quality.",
  },
  {
    q: "What if the compressed image is still too large?",
    a: "Lower the quality further using the custom KB input field. The tool shows you real-time file size after every adjustment so you can hit your exact target KB.",
  },
  {
    q: "Can I use this tool on my Android or iPhone?",
    a: "Yes! LiteFiles works on all modern browsers including Chrome on Android and Safari on iPhone. No app download needed — open the website and compress directly from your phone.",
  },
];

const relatedTools = [
  { href: "/passport-photo-resize", icon: "📷", title: "Passport Photo Resize", desc: "Resize to 35×45mm for VISA, PAN, Aadhaar" },
  { href: "/resize-signature-to-20kb", icon: "✍️", title: "Signature to 20KB", desc: "Compress signature for SSC, UPSC, IBPS exams" },
  { href: "/pdf-compressor", icon: "📄", title: "Aadhaar PDF Compressor", desc: "Reduce PDF below 200KB for portal uploads" },
  { href: "/image-to-pdf", icon: "🖼️", title: "Image to Scanned PDF", desc: "Convert photos to a scanned PDF document" },
  { href: "/ssc-document-resize", icon: "🏛️", title: "SSC/UPSC Document Resize", desc: "One-click exam-ready photo & signature" },
];

export default function CompressImagePage() {
  return (
    <>
      <WebAppSchema
        name="Compress Image to 50KB – Free Online Tool"
        description="Compress JPG or PNG images to 50KB, 100KB or any size for SSC, UPSC, IBPS government form uploads. Free, no signup, works in browser."
        url={PAGE_URL}
        keywords={["compress image to 50kb", "image compress for government upload", "jpg compress india", "reduce image size ssc upsc"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Compress Image to 50KB", url: PAGE_URL },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-orange">🗜️ Image Compressor</span>
            <h1 className="tool-title">Compress Image to 50KB</h1>
            <p className="tool-desc">
              Reduce your JPG or PNG file size to exactly 50KB, 100KB, or any custom size. Used by lakhs of aspirants for SSC, UPSC, IBPS, and government portal uploads.
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

        {/* ===== SEO Rich Content ===== */}
        <div className="seo-section">

          <h2>What is a Compress Image to 50KB Tool?</h2>
          <p>
            A compress image to 50KB tool is a free online utility that reduces the file size of your JPG or PNG photos to an exact target — such as 50KB or 100KB — without requiring any software installation. LiteFiles&apos; compressor runs entirely in your browser, so your photos are never uploaded to any server and remain completely private.
          </p>
          <p>
            This tool is designed for Indian users who need to upload photos to government exam portals such as SSC CGL, UPSC Civil Services, IBPS PO, SBI Clerk, RRB NTPC, and Aadhaar or PAN card portals. These portals enforce strict file size limits (typically 20KB to 100KB) and will reject submissions that exceed the limit.
          </p>
          <p>
            Whether you are compressing a passport photo for a UPSC DAF form, resizing a JPG for an IBPS application, or shrinking an image before WhatsApp — LiteFiles delivers the exact file size you need in seconds, completely free.
          </p>

          <h2>How to Compress Your Image to 50KB — Step by Step</h2>
          <ol className="step-list">
            <li>Click <strong>Upload Image</strong> or drag and drop your JPG or PNG file into the drop zone above.</li>
            <li>Enter your <strong>target size in KB</strong> — for example, type &quot;50&quot; for 50KB or &quot;100&quot; for 100KB in the input field.</li>
            <li>The tool <strong>automatically compresses</strong> your image to reach the target. Use the quality slider for fine-tuning if needed.</li>
            <li><strong>Preview the result</strong> to verify the image looks clear and meets your portal&apos;s visual requirements.</li>
            <li>Click <strong>Download</strong> to save the compressed image directly to your device.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Indian government exam portals — including SSC, UPSC, IBPS, NRA CET, and DigiLocker — handle crores of applications every cycle. To manage server load, processing speed, and storage costs, these portals enforce strict limits on uploaded documents. Photos typically must be between 10KB and 100KB, and signature images between 10KB and 20KB.
          </p>
          <p>
            Even 1KB over the portal&apos;s limit triggers an error and blocks form submission. This is why having a reliable compressor that hits an exact file size — not just &quot;roughly smaller&quot; — is essential for every competitive exam aspirant in India. LiteFiles was built precisely for this use case.
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
