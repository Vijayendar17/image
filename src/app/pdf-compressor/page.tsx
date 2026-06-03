import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PdfCompressorClient from "./PdfCompressorClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/pdf-compressor`;

export const metadata: Metadata = {
  title: "Compress PDF Free Online | LiteFiles",
  description:
    "Compress Aadhaar card PDF, marksheets and certificates to under 200KB for SSC, UPSC, IBPS, and Indian bank job portal uploads. Free, 100% private, no signup.",
  keywords: [
    "aadhaar pdf compressor",
    "compress pdf under 200kb free",
    "reduce pdf size online india",
    "compress certificate pdf for upload",
    "pdf size reducer free india",
    "merge pdf under 2mb india",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Compress PDF Free Online | LiteFiles",
    description: "Compress Aadhaar PDF, marksheets, certificates below 200KB for online portal uploads. Free PDF compressor for SSC, UPSC, bank applications.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Free Online | LiteFiles",
    description: "Compress Aadhaar PDF under 200KB instantly. Free, private, no server uploads.",
  },
};

const faqs = [
  { q: "Why do portals reject large PDF files?", a: "Indian government job portals typically limit document uploads to 200KB–2MB. Aadhaar PDFs from DigiLocker are often 1–3MB and need compression before uploading." },
  { q: "Can I compress an Aadhaar-protected PDF?", a: "If your Aadhaar PDF is password-protected, enter your 8-digit birth year + PIN from UIDAI to unlock it first, then upload the unlocked file here." },
  { q: "Will the text remain readable after compression?", a: "Yes. We use smart compression that maintains readability while reducing file size. All text, names, and ID numbers remain perfectly legible after compression." },
  { q: "Is my Aadhaar data safe?", a: "Absolutely. Your PDF is processed entirely in your browser using JavaScript. It never leaves your device — we have zero access to your Aadhaar number or personal data." },
  { q: "What is the maximum PDF size allowed on government portals?", a: "SSC and IBPS portals typically allow 200KB–500KB per document. UPSC allows up to 1MB. Bank application portals (SBI, RBI) usually cap at 200KB or 500KB." },
  { q: "Can I compress multiple PDFs at once?", a: "Currently LiteFiles compresses one PDF at a time. Simply compress each document individually — the process takes only a few seconds per file." },
];

const relatedTools = [
  { href: "/compress-image-to-50kb", icon: "🗜️", title: "Compress Image to 50KB", desc: "Reduce any JPG/PNG to exact KB for portals" },
  { href: "/passport-photo-resize", icon: "📷", title: "Passport Photo Resize", desc: "Resize to 35x45mm for VISA, PAN, Aadhaar" },
  { href: "/resize-signature-to-20kb", icon: "✍️", title: "Signature to 20KB", desc: "Compress signature for SSC, UPSC, IBPS" },
  { href: "/image-to-pdf", icon: "🖼️", title: "Image to Scanned PDF", desc: "Convert photos to a scanned PDF document" },
  { href: "/ssc-document-resize", icon: "🏛️", title: "SSC/UPSC Document Resize", desc: "One-click exam-ready photo & signature" },
];

export default function PdfCompressorPage() {
  return (
    <>
      <WebAppSchema
        name="Aadhaar PDF Compressor – Free Online"
        description="Compress Aadhaar card PDF, marksheets, and certificates below 200KB or 1MB for online portal uploads. Free PDF size reducer for SSC, UPSC, bank applications."
        url={PAGE_URL}
        keywords={["aadhaar pdf compressor", "compress pdf under 200kb free", "reduce pdf size india", "pdf compressor for government upload"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "PDF Compressor", url: PAGE_URL },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-green">📄 PDF Tool</span>
            <h1 className="tool-title">Aadhaar PDF Compressor</h1>
            <p className="tool-desc">
              Reduce your Aadhaar card PDF, marksheet, or certificate below 200KB, 500KB, or 1MB for online portal uploads. Fast, free, and 100% private.
            </p>
          </div>
        </div>

        <PdfCompressorClient />

        <div className="seo-section">
          <h2>What is an Aadhaar PDF Compressor?</h2>
          <p>
            An Aadhaar PDF compressor is a free online tool that reduces the file size of your Aadhaar card PDF, academic marksheets, certificates, or any other PDF document to meet the upload limits of Indian government and bank portals. LiteFiles processes your PDF entirely in your browser — your sensitive documents never reach any server.
          </p>
          <p>
            PDFs downloaded from DigiLocker or e-Aadhaar are often 1MB to 3MB in size — far too large for most portal upload fields. Government job portals such as SSC, UPSC, IBPS, SBI, NPS, and RBI limit document uploads to 200KB or 500KB. Our tool compresses PDFs to any target size while keeping all text and images clear and legible.
          </p>
          <p>
            Whether you are uploading your Aadhaar as address proof, submitting marksheets for a bank job application, or attaching certificates to a UPSC form, LiteFiles ensures your PDF is the right size every time.
          </p>

          <h2>How to Compress Your PDF — Step by Step</h2>
          <ol className="step-list">
            <li>Click <strong>Upload PDF</strong> or drag your PDF file into the drop zone above.</li>
            <li>Choose your <strong>target file size</strong> — for example, 200KB for SSC/IBPS portals or 1MB for UPSC.</li>
            <li>The tool <strong>automatically compresses</strong> the PDF. Preview the result to confirm all text is readable.</li>
            <li>Verify the compressed file size meets your portal&apos;s requirement (shown on-screen after compression).</li>
            <li>Click <strong>Download</strong> to save the compressed PDF to your device.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Government and banking portals in India — including SSC, UPSC, IBPS, SBI, NSDL, and DigiLocker — handle millions of document uploads during peak application seasons. Strict file size limits (typically 200KB to 2MB per document) protect portal performance and reduce storage costs for these high-traffic systems.
          </p>
          <p>
            Aadhaar PDFs from UIDAI are often encrypted and large. Marksheets scanned at high DPI can be several MB. Our PDF compressor strips unnecessary metadata and re-encodes document content to hit your exact target — so your form submission goes through on the first try.
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
