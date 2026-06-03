import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SscDocClient from "./SscDocClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/ssc-document-resize`;

export const metadata: Metadata = {
  title: "SSC UPSC Document Resize Free Online | LiteFiles",
  description:
    "Resize photo and signature to exact SSC CGL, UPSC, IBPS PO, SBI Clerk, RRB NTPC specifications in one click. Free tool for all Indian competitive exam portals.",
  keywords: [
    "ssc document resize",
    "upsc photo size requirements",
    "ibps photo signature resize",
    "ssc cgl photo size pixels",
    "competitive exam photo resize india",
    "sbi po photo signature size",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SSC UPSC Document Resize Free Online | LiteFiles",
    description: "One-click resize photo & signature to exact SSC, UPSC, IBPS, SBI, RRB specs. Free, instant, no signup.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSC UPSC Document Resize Free Online | LiteFiles",
    description: "Resize photo & signature to exact exam portal specs. SSC, UPSC, IBPS, SBI. Free, instant.",
  },
};

const faqs = [
  { q: "What are SSC CGL photo and signature requirements?", a: "SSC CGL requires a photo of 100x120 pixels in JPG format (maximum 50KB) and a signature of 140x60 pixels in JPG format (maximum 12KB, minimum 1KB)." },
  { q: "What photo size does UPSC require for CSE application?", a: "UPSC Civil Services requires a recent passport-size photograph in JPEG format, 200x230 pixels, under 300KB. The signature should be 140x60 pixels and under 40KB." },
  { q: "What are IBPS PO signature specifications?", a: "IBPS requires a JPG signature image of 140x60 pixels with a file size between 10KB and 20KB. The photo should be 200x230 pixels, under 50KB." },
  { q: "Can I use this for SBI PO / Clerk applications?", a: "Yes. SBI PO and Clerk require a 200x200 pixel photo (under 50KB) and a 140x60 pixel signature (under 20KB). Select the SBI preset and the tool applies these specs automatically." },
  { q: "What are the RRB NTPC photo and signature requirements?", a: "RRB NTPC requires a JPG photo of 200x230 pixels under 50KB, and a JPG signature of 140x60 pixels under 20KB — identical to IBPS specifications." },
  { q: "How do I know if my resized file meets the portal's requirements?", a: "After resizing, the tool displays the final pixel dimensions and file size. Compare these against your exam's requirements shown in the specifications table on this page." },
];

const relatedTools = [
  { href: "/compress-image-to-50kb", icon: "🗜️", title: "Compress Image to 50KB", desc: "Reduce any JPG/PNG to exact KB for portals" },
  { href: "/passport-photo-resize", icon: "📷", title: "Passport Photo Resize", desc: "Resize to 35x45mm for VISA, PAN, Aadhaar" },
  { href: "/resize-signature-to-20kb", icon: "✍️", title: "Signature to 20KB", desc: "Compress signature for SSC, UPSC, IBPS" },
  { href: "/pdf-compressor", icon: "📄", title: "Aadhaar PDF Compressor", desc: "Reduce Aadhaar PDF below 200KB" },
  { href: "/image-to-pdf", icon: "🖼️", title: "Image to Scanned PDF", desc: "Convert photos to a scanned PDF document" },
];

export default function SscDocPage() {
  return (
    <>
      <WebAppSchema
        name="SSC UPSC IBPS Document Resize – Free Online"
        description="Resize photo and signature to exact SSC CGL, UPSC, IBPS, SBI, RRB specifications in one click. Free, instant competitive exam document tool."
        url={PAGE_URL}
        keywords={["ssc document resize", "upsc photo size", "ibps signature resize", "competitive exam photo india"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "SSC / UPSC Document Resize", url: PAGE_URL },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
              🏛️ Exam Portals
            </span>
            <h1 className="tool-title">SSC / UPSC Document Resize</h1>
            <p className="tool-desc">
              Resize your photo and signature to exact specifications for SSC CGL, UPSC, IBPS PO, SBI Clerk, RRB NTPC, and all major competitive exam portals. One-click, no guesswork.
            </p>
          </div>
        </div>

        <SscDocClient />

        <div className="seo-section">
          <h2>What is the SSC / UPSC Document Resize Tool?</h2>
          <p>
            The SSC / UPSC Document Resize tool is a free online utility that resizes and compresses your photo and signature images to match the exact pixel dimensions and file size requirements of every major Indian competitive exam portal — including SSC CGL, SSC CHSL, UPSC Civil Services, IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, and RRB NTPC.
          </p>
          <p>
            Rather than guessing pixel dimensions or manually converting, select your exam from the preset list and the tool automatically applies the correct width, height, and maximum file size. Every preset is verified against the official exam notifications published by the respective recruiting bodies.
          </p>
          <p>
            Built specifically for Indian competitive exam aspirants, this tool eliminates one of the most common causes of rejected applications — wrong photo or signature dimensions. It runs entirely in your browser with no data sent to any server.
          </p>

          <h2>How to Resize Your Exam Documents — Step by Step</h2>
          <ol className="step-list">
            <li>Upload your <strong>photo or signature image</strong> (JPG or PNG) using the upload button above.</li>
            <li><strong>Select your exam</strong> from the preset dropdown — e.g., SSC CGL, UPSC CSE, IBPS PO, SBI Clerk, or RRB NTPC.</li>
            <li>The tool <strong>automatically applies</strong> the correct pixel dimensions and target file size for that exam.</li>
            <li><strong>Preview the result</strong> and verify the final size matches the specifications in your exam notification.</li>
            <li>Click <strong>Download</strong> to save the exam-ready file to your device.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Recruiting bodies like SSC, UPSC, IBPS, SBI, and RRB receive tens of millions of applications per exam cycle. Standardised photo and signature specifications ensure every candidate&apos;s documents are displayed and printed uniformly across admit cards, hall tickets, and ID verification systems.
          </p>
          <p>
            File size limits exist because online application portals must handle simultaneous uploads from lakhs of candidates. Oversized files slow down portal response and can cause upload errors during peak registration periods. Our tool gives you the exact file that every portal accepts — first time, every time.
          </p>

          <h2>Exam-wise Photo &amp; Signature Specifications</h2>
          <div style={{ overflowX: "auto", margin: "1rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                  {["Exam", "Photo Size (px)", "Photo File", "Signature Size", "Signature File"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["SSC CGL/CHSL", "100×120", "≤50KB JPG", "140×60", "≤12KB JPG"],
                  ["UPSC CSE", "200×230", "≤300KB JPG", "140×60", "≤40KB JPG"],
                  ["IBPS PO/Clerk", "200×230", "≤50KB JPG", "140×60", "≤20KB JPG"],
                  ["SBI PO/Clerk", "200×200", "≤50KB JPG", "140×60", "≤20KB JPG"],
                  ["RRB NTPC", "200×230", "≤50KB JPG", "140×60", "≤20KB JPG"],
                ].map(([exam, ...rest]) => (
                  <tr key={exam} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{exam}</td>
                    {rest.map((v, i) => (
                      <td key={i} style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
