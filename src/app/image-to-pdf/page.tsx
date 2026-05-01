import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageToPdfClient from "./ImageToPdfClient";

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
  ],
};

export default function ImageToPdfPage() {
  return (
    <>
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
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Common Questions
          </h2>
          {[
            { q: "Does the PDF look like a real scanned document?", a: "Yes! We apply a subtle scan effect to make your PDF look like it was physically scanned. This is useful for document submissions that require scanned copies." },
            { q: "Can I add multiple images to one PDF?", a: "Yes! You can upload multiple images and they will be combined into a single multi-page PDF, one image per page." },
            { q: "What is the maximum file size I can upload?", a: "There's no strict limit since everything runs in your browser. However, very large images may slow down processing. We recommend under 10MB per image." },
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
