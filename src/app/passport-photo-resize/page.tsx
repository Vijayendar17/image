import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PassportPhotoClient from "./PassportPhotoClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

const BASE = siteConfig.baseUrl;
const PAGE_URL = `${BASE}/passport-photo-resize`;

export const metadata: Metadata = {
  title: "Passport Photo Resize Free Online | LiteFiles",
  description:
    "Resize passport photo to 35x45mm and compress under 50KB for Indian VISA, PAN card, Aadhaar, UPSC, SSC, and bank exam portals. Free, instant, no signup required.",
  keywords: [
    "passport photo resize india",
    "resize passport photo to 35x45",
    "passport photo size 50kb online free",
    "photo resize for pan card",
    "photo size for indian visa",
    "photo compress for aadhaar update",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Passport Photo Resize Free Online | LiteFiles",
    description: "Resize passport photo to 35x45mm for Indian VISA, PAN, Aadhaar, bank applications. Free, instant, no signup.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Resize Free Online | LiteFiles",
    description: "Resize & compress passport photo to 35x45mm, under 50KB. Accepted by all Indian portals.",
  },
};

const faqs = [
  { q: "What size is a standard Indian passport photo?", a: "Indian passport photos must be 35mm x 45mm (3.5cm x 4.5cm). The face should occupy 70-80% of the frame with a plain white background and no shadows." },
  { q: "What file size is required for Indian VISA applications?", a: "Most Indian VISA and passport portals require the photo to be between 10KB and 50KB in JPG format. Some portals such as NRI OCI require files under 300KB." },
  { q: "What size photo is needed for PAN card application?", a: "NSDL/UTI requires a passport-sized photo. The uploaded JPG must be under 50KB with dimensions approximately 213x213 pixels for online PAN card applications." },
  { q: "Can I use this for UPSC Mains photo upload?", a: "Yes. UPSC DAF form requires a recent passport photograph in JPEG format under 300KB. Our tool handles all standard size and file size requirements in one step." },
  { q: "What background colour is required for Indian passport photos?", a: "A plain white background is required for Indian passport, VISA, and most government exam photos. Ensure there are no shadows behind the subject." },
  { q: "Can I crop and resize my photo to the correct dimensions here?", a: "Yes. Upload your photo, select the preset (e.g., Indian Passport 35x45mm), crop to fit the face correctly, then compress to the required KB — all in one tool." },
];

const relatedTools = [
  { href: "/compress-image-to-50kb", icon: "🗜️", title: "Compress Image to 50KB", desc: "Reduce any JPG/PNG to exact KB for portals" },
  { href: "/resize-signature-to-20kb", icon: "✍️", title: "Signature to 20KB", desc: "Compress signature for SSC, UPSC, IBPS" },
  { href: "/pdf-compressor", icon: "📄", title: "Aadhaar PDF Compressor", desc: "Reduce Aadhaar PDF below 200KB" },
  { href: "/image-to-pdf", icon: "🖼️", title: "Image to Scanned PDF", desc: "Convert photos to a scanned PDF document" },
  { href: "/ssc-document-resize", icon: "🏛️", title: "SSC/UPSC Document Resize", desc: "One-click exam-ready photo & signature" },
];

export default function PassportPhotoPage() {
  return (
    <>
      <WebAppSchema
        name="Passport Photo Resize Online Free"
        description="Resize passport photo to 35x45mm or any standard size. Compress under 50KB for Indian VISA, PAN, Aadhaar, bank exam applications. Free, no signup."
        url={PAGE_URL}
        keywords={["passport photo resize india", "resize photo for pan card", "photo size for indian visa", "passport photo 50kb online"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE },
        { name: "Passport Photo Resize", url: PAGE_URL },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue">📷 Passport Photo</span>
            <h1 className="tool-title">Passport Photo Resize &amp; Compress</h1>
            <p className="tool-desc">
              Resize your photo to standard passport dimensions (35x45mm, 51x51mm) and compress below 50KB. Accepted by Indian VISA, PAN card, Aadhaar, and all major exam portals.
            </p>
          </div>
        </div>

        <PassportPhotoClient />

        <div className="seo-section">
          <h2>What is a Passport Photo Resize Tool?</h2>
          <p>
            A passport photo resize tool lets you crop, resize, and compress your photo to meet the exact dimensions and file size requirements of Indian government portals — without visiting a photo studio or using complex software. LiteFiles processes everything in your browser, so your photo never leaves your device.
          </p>
          <p>
            Indian passport and VISA portals require photos in strict 35mm x 45mm format, under 50KB, in JPG. PAN card applications via NSDL require approximately 213x213px. Aadhaar update portals, UPSC DAF, SSC, and IBPS each have slightly different specs — our presets handle all of them with one click.
          </p>
          <p>
            Whether you are applying for a new passport, updating your Aadhaar, or filling the UPSC Civil Services application form, this tool ensures your photo meets every technical requirement on the first try.
          </p>

          <h2>How to Resize Your Passport Photo — Step by Step</h2>
          <ol className="step-list">
            <li>Upload your photo by clicking <strong>Upload Image</strong> or drag your JPG/PNG into the tool above.</li>
            <li>Select the <strong>preset</strong> that matches your portal — for example, &quot;Indian Passport 35x45mm&quot; or &quot;PAN Card 213x213px&quot;.</li>
            <li><strong>Crop</strong> the photo so the face is centred and fills 70-80% of the frame as required by Indian portals.</li>
            <li>Set the <strong>target file size</strong> (e.g., 50KB) and let the tool compress automatically.</li>
            <li><strong>Download</strong> your resized passport photo — ready to upload on any Indian government portal.</li>
          </ol>

          <h2>Why Indian Government Portals Require Specific File Sizes</h2>
          <p>
            Portals like Passport Seva, UIDAI (Aadhaar), UPSC, NSDL, and IBPS each define exact photo specs because they store and process millions of images. Standardising dimensions ensures uniform display across printed and digital ID documents, while file size caps keep upload times fast on low-bandwidth connections common in Tier 2 and Tier 3 cities.
          </p>
          <p>
            A photo even 1KB over the limit causes a portal rejection error. Our tool targets the exact file size you specify, so you never face a &quot;file too large&quot; error before an important application deadline.
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
