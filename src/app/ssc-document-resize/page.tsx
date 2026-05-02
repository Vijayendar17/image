import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SscDocClient from "./SscDocClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

export const metadata: Metadata = {
  title: "SSC UPSC IBPS Document Resize Free – Photo & Signature for Exam Portals",
  description:
    "Resize photo and signature images to exact SSC CGL, UPSC, IBPS, SBI, RRB specifications in one click. Free online tool for competitive exam document preparation in India.",
  keywords: [
    "ssc document resize",
    "upsc photo size requirements",
    "ibps photo signature resize",
    "ssc cgl photo size pixels",
    "competitive exam photo resize india",
    "sbi po photo signature size",
  ],
  alternates: {
    canonical: `${siteConfig.baseUrl}/ssc-document-resize`,
  },
  openGraph: {
    title: "SSC UPSC IBPS Document Resize Free – Exam-Ready Photo & Signature",
    description:
      "One-click resize photo & signature to exact SSC, UPSC, IBPS, SBI, RRB specs. Free, instant, no signup.",
    url: `${siteConfig.baseUrl}/ssc-document-resize`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `SSC/UPSC Document Resize – ${siteConfig.name}`,
    description: "Resize photo & signature to exact exam portal specs. SSC, UPSC, IBPS, SBI. Free, instant.",
  },
};

const faqs = [
  {
    q: "What are SSC CGL photo and signature requirements?",
    a: "SSC CGL requires a photo of 100×120 pixels in JPG format (maximum 50KB) and a signature of 140×60 pixels in JPG format (maximum 12KB, minimum 1KB).",
  },
  {
    q: "What photo size does UPSC require for CSE application?",
    a: "UPSC Civil Services requires a recent passport-size photograph in JPEG format, 200×230 pixels, under 300KB. The signature should be 140×60 pixels and under 40KB.",
  },
  {
    q: "What are IBPS PO signature specifications?",
    a: "IBPS requires a JPG signature image of 140×60 pixels with a file size between 10KB and 20KB. The photo should be 200×230 pixels, under 50KB.",
  },
  {
    q: "Can I use this for SBI PO / Clerk applications?",
    a: "Yes! SBI PO and Clerk require a 200×200 pixel photo (under 50KB) and a 140×60 pixel signature (under 20KB). Our SSC/UPSC preset handles SBI specs with one click.",
  },
];

export default function SscDocPage() {
  return (
    <>
      <WebAppSchema
        name="SSC UPSC IBPS Document Resize – Free Online"
        description="Resize photo and signature to exact SSC CGL, UPSC, IBPS, SBI, RRB specifications in one click. Free, instant competitive exam document tool."
        url="https://litefiles.vercel.app/ssc-document-resize"
        keywords={["ssc document resize", "upsc photo size", "ibps signature resize", "competitive exam photo india"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://litefiles.vercel.app" },
        { name: "SSC / UPSC Document Resize", url: "https://litefiles.vercel.app/ssc-document-resize" },
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

        <div className="faq-section">
          <h2 style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Exam-wise Photo Specifications
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                  {["Exam", "Photo Size (px)", "Photo File", "Signature Size", "Signature File"].map(h => (
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

          <div style={{ marginTop: "2rem" }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="faq-item">
                <p className="faq-question">{faq.q}</p>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
