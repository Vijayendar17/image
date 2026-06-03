import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignatureClient from "./SignatureClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/resize-signature-to-20kb`;

export const metadata: Metadata = {
  title: "Resize Signature to 20KB Free Online | LiteFiles",
  description:
    "Compress signature to 20KB for SSC CGL, UPSC, IBPS PO, SBI Clerk, and all Indian competitive exam portals. Free online tool — instant, no signup required.",
  keywords: [
    "resize signature to 20kb",
    "signature compress online india",
    "signature size for ssc exam",
    "signature image 20kb free",
    "upsc signature size",
    "ibps signature resize 20kb",
    "signature jpg 10kb online",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Resize Signature to 20KB Free Online | LiteFiles",
    description: "Compress signature image to 20KB for SSC CGL, UPSC, IBPS PO, SBI Clerk exam portals. Instant, free, no signup.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Signature to 20KB Free Online | LiteFiles",
    description: "Resize signature to exact SSC, UPSC, IBPS specs. Under 20KB, instant, free.",
  },
};

const faqs = [
  { q: "What size should the signature be for SSC CGL?", a: "SSC CGL requires the signature in JPG format with a maximum file size of 12KB and minimum 1KB. Dimensions should be within 140x60 pixels." },
  { q: "What is the signature size for UPSC Civil Services?", a: "UPSC requires a scanned signature in JPEG format. File size should be between 1KB to 40KB, with dimensions approximately 140x60 pixels." },
  { q: "What signature size is required for IBPS PO/Clerk?", a: "IBPS requires the signature image in JPG format with a file size between 10KB to 20KB, and dimensions of 140x60 pixels." },
  { q: "How do I take a proper signature scan?", a: "Sign on white paper using a black or blue pen. Photograph or scan it, crop tightly around the signature, and then use this tool to resize and compress to the required KB." },
  { q: "What format should my signature be in for government portals?", a: "Almost all Indian government exam portals — SSC, UPSC, IBPS, SBI, RRB — require the signature in JPG (JPEG) format. PNG files are generally not accepted." },
  { q: "My signature background is not white — what should I do?", a: "Use a plain white sheet of paper when signing. If the background is off-white or grey after scanning, increase brightness and contrast before uploading here." },
];

const relatedTools = [
  { href: "/compress-image-to-50kb", icon: "🗜️", title: "Compress Image to 50KB", desc: "Reduce any JPG/PNG to exact KB for portals" },
  { href: "/passport-photo-resize", icon: "📷", title: "Passport Photo Resize", desc: "Resize to 35x45mm for VISA, PAN, Aadhaar" },
  { href: "/pdf-compressor", icon: "📄", title: "Aadhaar PDF Compressor", desc: "Reduce Aadhaar PDF below 200KB" },
  { href: "/image-to-pdf", icon: "🖼️", title: "Image to Scanned PDF", desc: "Convert photos to a scanned PDF document" },
  { href: "/ssc-document-resize", icon: "🏛️", title: "SSC/UPSC Document Resize", desc: "One-click exam-ready photo & signature" },
];

export default function SignaturePage() {
  return (
    <>
      <WebAppSchema
        name="Resize Signature to 20KB – For SSC, UPSC, IBPS, Bank Exams"
        description="Compress and resize your signature image to under 20KB for SSC CGL, UPSC, IBPS PO, SBI Clerk, and all competitive exam portals. Free, instant."
        url={PAGE_URL}
        keywords={["resize signature to 20kb", "signature compress for ssc", "upsc signature size", "ibps signature resize 20kb"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Signature to 20KB", url: PAGE_URL },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>
              ✍️ Signature Tool
            </span>
            <h1 className="tool-title">Resize Signature to 20KB</h1>
            <p className="tool-desc">
              Compress your signature image to exact size specifications for SSC, UPSC, IBPS, SBI, and all major competitive exam portals. One click — done.
            </p>
          </div>
        </div>

        <SignatureClient />

        <div className="seo-section">
          <h2>What is a Signature Resize to 20KB Tool?</h2>
          <p>
            A signature resize to 20KB tool compresses your scanned or photographed signature image to exactly the file size and pixel dimensions required by Indian government exam portals. LiteFiles handles everything in your browser — no server uploads, no privacy risks, and no software to install.
          </p>
          <p>
            Every major Indian competitive exam — SSC CGL, SSC CHSL, UPSC Civil Services, IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, RRB NTPC — requires a scanned signature uploaded during online registration. Each portal has its own strict requirements: typically 10KB to 20KB, in JPG format, at 140x60 pixels. Getting this wrong means your form will be rejected.
          </p>
          <p>
            LiteFiles gives you presets for every major exam so you can compress and resize your signature in seconds — guaranteed to meet portal requirements on the first upload.
          </p>

          <h2>How to Resize Your Signature to 20KB — Step by Step</h2>
          <ol className="step-list">
            <li>Sign your name on a <strong>plain white sheet of paper</strong> using a black or blue pen. Keep the signature clear and within a rectangular space.</li>
            <li><strong>Scan or photograph</strong> the signature clearly. Crop it tightly so only the signature is visible with minimal white border.</li>
            <li>Upload the signature image (JPG or PNG) by clicking <strong>Upload Signature</strong> above.</li>
            <li>Enter your <strong>target file size</strong> — e.g., 20KB for IBPS, 12KB for SSC, or 40KB for UPSC — and the tool will auto-compress.</li>
            <li>Click <strong>Download</strong> to save the compressed signature, ready to upload on any exam portal.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Indian competitive exam portals process crores of applications in a short registration window. To avoid server overload and maintain consistent data storage, portals impose tight limits on uploaded files. Signature images are usually capped at 10KB to 20KB — small enough to load quickly while still being legible.
          </p>
          <p>
            Because every portal has slightly different limits (SSC CGL: max 12KB; IBPS: 10–20KB; UPSC: up to 40KB), aspirants often struggle to get the right size. LiteFiles removes the guesswork by letting you set the exact target KB and delivers a compressed file that passes every portal check.
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
