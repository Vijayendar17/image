import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignatureClient from "./SignatureClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Resize Signature to 20KB Online Free – For SSC, UPSC, IBPS, Bank Exams",
  description:
    "Compress and resize your signature image to under 20KB or 50KB for SSC CGL, UPSC, IBPS PO, SBI Clerk, and all competitive exam portals. Free, instant, no signup needed.",
  keywords: [
    "resize signature to 20kb",
    "signature compress online india",
    "signature size for ssc exam",
    "signature image 20kb free",
    "upsc signature size",
    "ibps signature resize 20kb",
    "signature jpg 10kb online",
  ],
};

export default function SignaturePage() {
  const faqs = [
    { q: "What size should the signature be for SSC CGL?", a: "SSC requires the signature to be in JPG format with a maximum file size of 12KB and minimum 1KB. Dimensions should be within 140×60 pixels." },
    { q: "What is the signature size for UPSC Civil Services?", a: "UPSC requires a scanned signature in JPEG format. File size should be between 1KB to 40KB, with dimensions approximately 140×60 pixels." },
    { q: "What signature size is required for IBPS PO/Clerk?", a: "IBPS requires the signature image in JPG format with a file size between 10KB to 20KB, with dimensions of 140×60 pixels." },
    { q: "How do I take a proper signature scan?", a: "Sign on white paper using a black or blue pen. Photograph or scan it, crop tightly around the signature, and then use this tool to resize and compress it." },
  ];

  return (
    <>
      <WebAppSchema
        name="Resize Signature to 20KB – For SSC, UPSC, IBPS, Bank Exams"
        description="Compress and resize your signature image to under 20KB for SSC CGL, UPSC, IBPS PO, SBI Clerk, and all competitive exam portals. Free, instant."
        url="https://doctools.india/resize-signature-to-20kb"
        keywords={["resize signature to 20kb", "signature compress for ssc", "upsc signature size", "ibps signature resize 20kb"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://doctools.india" },
        { name: "Signature to 20KB", url: "https://doctools.india/resize-signature-to-20kb" },
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

        <div className="faq-section">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Signature Upload Requirements
          </h2>
          {[
            { q: "What size should the signature be for SSC CGL?", a: "SSC requires the signature to be in JPG format with a maximum file size of 12KB and minimum 1KB. Dimensions should be within 140×60 pixels." },
            { q: "What is the signature size for UPSC Civil Services?", a: "UPSC requires a scanned signature in JPEG format. File size should be between 1KB to 40KB, with dimensions approximately 140×60 pixels." },
            { q: "What signature size is required for IBPS PO/Clerk?", a: "IBPS requires the signature image in JPG format with a file size between 10KB to 20KB, with dimensions of 140×60 pixels." },
            { q: "How do I take a proper signature scan?", a: "Sign on white paper using a black or blue pen. Photograph or scan it, crop tightly around the signature, and then use this tool to resize and compress it." },
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
