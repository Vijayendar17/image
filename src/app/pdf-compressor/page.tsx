import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PdfCompressorClient from "./PdfCompressorClient";

export const metadata: Metadata = {
  title: "Aadhaar PDF Compressor Free – Compress PDF Under 200KB, 1MB for Upload",
  description:
    "Compress Aadhaar card, marksheet, or any PDF file under 200KB or 1MB for online portal uploads. Free Aadhaar PDF compressor for SSC, UPSC, bank job applications. No signup.",
  keywords: [
    "aadhaar pdf compressor",
    "compress pdf under 200kb free",
    "reduce pdf size online india",
    "compress certificate pdf for upload",
    "pdf size reducer free india",
    "merge pdf under 2mb india",
  ],
};

export default function PdfCompressorPage() {
  return (
    <>
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-green">📄 PDF Tool</span>
            <h1 className="tool-title">Aadhaar PDF Compressor</h1>
            <p className="tool-desc">
              Reduce your Aadhaar card PDF, marksheet, or certificate below 200KB, 500KB, or 1MB for online portal uploads. Fast, free, and private.
            </p>
          </div>
        </div>
        <PdfCompressorClient />

        <div className="faq-section">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            PDF Compression FAQ
          </h2>
          {[
            {
              q: "Why do portals reject large PDF files?",
              a: "Indian government job portals typically limit document uploads to 200KB–2MB to manage server load. Aadhaar PDFs from DigiLocker are often 1–3MB and need compression before uploading.",
            },
            {
              q: "Can I compress an Aadhaar-protected PDF?",
              a: "If your Aadhaar PDF is password-protected, you'll need to remove the password first. Enter your PIN (your 8-digit birth year + PIN from UIDAI) to unlock it, then upload here.",
            },
            {
              q: "Will the text remain readable after compression?",
              a: "Yes! We use smart compression that maintains readability while reducing file size. All text, names, and IDs remain perfectly legible.",
            },
            {
              q: "Is my Aadhaar data safe?",
              a: "Absolutely. Your PDF is processed entirely in your browser. It never leaves your device. We have zero access to your Aadhaar number or personal information.",
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
