import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PassportPhotoClient from "./PassportPhotoClient";
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

export const metadata: Metadata = {
  title: "Passport Photo Resize Online Free – 35x45mm, 50KB for VISA & Govt Forms",
  description:
    "Resize passport photo to 35×45mm, 51×51mm or any standard size. Compress under 50KB for Indian VISA, PAN card, Aadhaar, bank, and government job applications. Free, no signup.",
  keywords: [
    "passport photo resize india",
    "resize passport photo to 35x45",
    "passport photo size 50kb online free",
    "photo resize for pan card",
    "photo size for indian visa",
    "photo compress for aadhaar update",
  ],
  alternates: {
    canonical: `${siteConfig.baseUrl}/passport-photo-resize`,
  },
  openGraph: {
    title: "Passport Photo Resize Online Free – 35x45mm, 50KB for VISA & Govt Forms",
    description:
      "Resize passport photo to 35×45mm for Indian VISA, PAN, Aadhaar, bank applications. Free, no signup.",
    url: `${siteConfig.baseUrl}/passport-photo-resize`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Passport Photo Resize Free – ${siteConfig.name}`,
    description: "Resize & compress passport photo to 35×45mm, under 50KB. Accepted by all Indian portals.",
  },
};

export default function PassportPhotoPage() {
  const faqs = [
    { q: "What size is a standard Indian passport photo?", a: "Indian passport photos must be 35mm × 45mm (3.5cm × 4.5cm). The face should occupy 70-80% of the frame with a plain white background." },
    { q: "What file size is required for Indian VISA applications?", a: "Most Indian VISA and passport portals require the photo to be between 10KB and 50KB in JPG format. Some portals like NRI OCI require files under 300KB." },
    { q: "What size photo is needed for PAN card application?", a: "NSDL requires passport-sized photos. The uploaded file must be a JPG under 50KB with dimensions approximately 213×213 pixels." },
    { q: "Can I use this for UPSC Mains photo upload?", a: "Yes! UPSC's DAF form requires a recent passport photograph in JPG format with a maximum size of 300KB. Our tool handles all these size requirements." },
  ];

  return (
    <>
      <WebAppSchema
        name="Passport Photo Resize Online Free"
        description="Resize passport photo to 35x45mm or any standard size. Compress under 50KB for Indian VISA, PAN, Aadhaar, bank exam applications. Free, no signup."
        url="https://litefiles.vercel.app/passport-photo-resize"
        keywords={["passport photo resize india", "resize photo for pan card", "photo size for indian visa", "passport photo 50kb online"]}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://litefiles.vercel.app" },
        { name: "Passport Photo Resize", url: "https://litefiles.vercel.app/passport-photo-resize" },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue">📷 Passport Photo</span>
            <h1 className="tool-title">Passport Photo Resize & Compress</h1>
            <p className="tool-desc">
              Resize your photo to standard passport dimensions (35×45mm, 51×51mm, etc.) and compress below 50KB. Accepted by Indian VISA, PAN, Aadhaar, and all major portals.
            </p>
          </div>
        </div>
        <PassportPhotoClient />

        <div className="faq-section">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Passport Photo Size Guide
          </h2>
          {[
            { q: "What size is a standard Indian passport photo?", a: "Indian passport photos must be 35mm × 45mm (3.5cm × 4.5cm). The face should occupy 70-80% of the frame with a plain white background." },
            { q: "What file size is required for Indian VISA applications?", a: "Most Indian VISA and passport portals require the photo to be between 10KB and 50KB in JPG format. Some portals like NRI OCI require files under 300KB." },
            { q: "What size photo is needed for PAN card application?", a: "NSDL requires passport-sized photos. The uploaded file must be a JPG under 50KB with dimensions approximately 213×213 pixels." },
            { q: "Can I use this for UPSC Mains photo upload?", a: "Yes! UPSC's DAF form requires a recent passport photograph in JPG format with a maximum size of 300KB. Our tool handles all these size requirements." },
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
